"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  ArrowRight, 
  BanknoteIcon, 
  Calendar, 
  CreditCard, 
  Hash, 
  UploadCloud, 
  User 
} from "lucide-react";
import { mockChargebacks, mockCustomers } from "@/lib/mock-data";
import { ChargebackFlowTimeline } from "@/components/chargeback/chargeback-flow-timeline";
import { format } from "date-fns";
import { ChargebackDocumentsList } from "@/components/chargeback/chargeback-documents-list";
import { ChargebackDocumentUpload } from "@/components/chargeback/chargeback-document-upload";
import { toast } from "@/components/ui/use-toast";
import { StatusBadge } from "@/components/chargeback/status-badge";
import { getCurrentStage } from "@/components/chargeback/utils";

interface ChargebackDetailClientProps {
  id: string;
}

export default function ChargebackDetailClient({ id }: ChargebackDetailClientProps) {
  const router = useRouter();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  const chargeback = mockChargebacks.find(c => c.id === id);
  
  if (!chargeback) {
    return <div>Chargeback not found</div>;
  }
  
  const customer = mockCustomers.find(c => c.id === chargeback.customerId);
  
  const handleForwardToBank = () => {
    toast({
      title: "Request forwarded to bank",
      description: `Chargeback request ${chargeback.id} has been forwarded to Ziraat Bank for review.`
    });
    
    // In a real application, you would make an API call here
    // and then redirect or update the UI based on the response
    
    // For the demo, we'll just redirect back to the list after a delay
    setTimeout(() => {
      router.push("/chargeback");
    }, 1500);
  };
  
  const handleUploadClick = () => {
    setUploadDialogOpen(true);
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/chargeback">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Chargeback List
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Chargeback Request #{chargeback.id}
            </h1>
            <p className="text-muted-foreground">
              {chargeback.type} Transaction Dispute • {format(new Date(chargeback.date), "dd MMMM yyyy")}
            </p>
          </div>
          
          <div className="flex gap-2">
            {chargeback.status === "pending_at_tkpay" && (
              <Button onClick={handleForwardToBank}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Forward to Bank
              </Button>
            )}
            
            {(chargeback.status === "pending_info" || chargeback.status === "pending_at_bank") && (
              <Button onClick={handleUploadClick}>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Status:</span>
                <StatusBadge status={chargeback.status} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Stage:</span>
                <span className="text-sm font-medium">{getCurrentStage(chargeback)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Date Submitted:</span>
                <span className="text-sm">{format(new Date(chargeback.timeline[0].timestamp), "dd MMM yyyy")}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Updated:</span>
                <span className="text-sm">
                  {format(new Date(chargeback.timeline[chargeback.timeline.length - 1].timestamp), "dd MMM yyyy")}
                </span>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Next Steps:</h3>
                {chargeback.status === "pending_at_tkpay" && (
                  <p className="text-sm text-muted-foreground">
                    This dispute needs to be reviewed and forwarded to Ziraat Bank for processing.
                  </p>
                )}
                {chargeback.status === "pending_at_bank" && (
                  <p className="text-sm text-muted-foreground">
                    This dispute is currently being reviewed by Ziraat Bank. No action is required at this time.
                  </p>
                )}
                {chargeback.status === "pending_info" && (
                  <p className="text-sm text-muted-foreground">
                    Additional documentation has been requested. Upload the required documents to proceed.
                  </p>
                )}
                {["approved", "rejected"].includes(chargeback.status) && (
                  <p className="text-sm text-muted-foreground">
                    This dispute has been {chargeback.status}. No further action is required.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Dispute Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <Hash className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Transaction ID:</span>
                </div>
                <div className="text-sm font-medium">{chargeback.transactionId}</div>
                
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Type:</span>
                </div>
                <div className="text-sm font-medium">{chargeback.type}</div>
                
                <div className="flex items-center">
                  <BanknoteIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Amount:</span>
                </div>
                <div className="text-sm font-medium">{chargeback.amount.toFixed(2)} TL</div>
                
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Transaction Date:</span>
                </div>
                <div className="text-sm font-medium">{format(new Date(chargeback.date), "dd MMMM yyyy")}</div>
                
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Customer:</span>
                </div>
                <div className="text-sm font-medium">
                  {customer?.name} ({customer?.id})
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="mb-2 text-sm font-medium">Dispute Reason:</h3>
                <p className="text-sm">{chargeback.reason}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="timeline" className="mt-4">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="customer">Customer Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Chargeback Flow Timeline</CardTitle>
                <CardDescription>
                  Track the progress of this dispute through the chargeback process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChargebackFlowTimeline events={chargeback.timeline} type={chargeback.type} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ChargebackDocumentsList documents={chargeback.documents} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customer" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add customer information rendering logic here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 