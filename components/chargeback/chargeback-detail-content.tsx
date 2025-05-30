"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ChargebackDocumentsList } from "@/components/chargeback/chargeback-documents-list";
import { ChargebackDocumentUpload } from "@/components/chargeback/chargeback-document-upload";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

interface ChargebackDetailContentProps {
  chargebackId: string;
}

export function ChargebackDetailContent({ chargebackId }: ChargebackDetailContentProps) {
  const router = useRouter();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  const chargeback = mockChargebacks.find(c => c.id === chargebackId);
  
  if (!chargeback) {
    return <div>Chargeback not found</div>;
  }
  
  const customer = mockCustomers.find(c => c.id === chargeback.customerId);
  
  const handleForwardToBank = () => {
    // In a real app, this would make an API call
    toast({
      title: "Chargeback forwarded to bank",
      description: `Chargeback #${chargeback.id} has been forwarded to Ziraat Bank for processing.`,
    });
    
    // In a real app, you would refresh the data after the API call
    // For now, just navigate back to the list
    setTimeout(() => {
      router.push("/chargeback");
    }, 1500);
  };
  
  return (
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
            <Button onClick={() => setUploadDialogOpen(true)}>
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
              <CardDescription>
                Supporting documentation for this chargeback request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChargebackDocumentsList 
                chargebackId={chargeback.id} 
                onUploadClick={() => setUploadDialogOpen(true)}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customer" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>
                Details about the customer who submitted this dispute
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customer ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-medium">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Contact Information</h4>
                      <p className="text-sm text-muted-foreground">Email: {customer.email}</p>
                      <p className="text-sm text-muted-foreground">Phone: {customer.phone}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Account Details</h4>
                      <p className="text-sm text-muted-foreground">Customer ID: {customer.id}</p>
                      <p className="text-sm text-muted-foreground">Wallet ID: {customer.walletId}</p>
                      <p className="text-sm text-muted-foreground">
                        Join Date: {format(new Date(customer.joinDate), "dd MMMM yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Customer information not available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Upload Documents Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
            <DialogDescription>
              Attach additional documentation requested by Ziraat Bank
            </DialogDescription>
          </DialogHeader>
          
          <ChargebackDocumentUpload 
            chargebackId={chargeback.id} 
            onComplete={() => setUploadDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getCurrentStage(chargeback: any): string {
  // Determine the current stage based on status and timeline
  if (chargeback.status === "pending_at_tkpay") {
    return "TKPAY Initial Review";
  } else if (chargeback.status === "pending_at_bank") {
    return "Ziraat Bank Review";
  } else if (chargeback.status === "pending_info") {
    return "Waiting for Additional Info";
  } else if (chargeback.status === "approved") {
    return "Refund Processed";
  } else if (chargeback.status === "rejected") {
    return "Dispute Rejected";
  }
  return "Unknown Stage";
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "pending_at_tkpay":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700">Pending at TKPAY</Badge>
    case "pending_at_bank":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700">Pending at Bank</Badge>
    case "pending_info":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700">Info Needed</Badge>
    case "approved":
      return <Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge>
    case "rejected":
      return <Badge variant="outline" className="bg-red-50 text-red-700">Rejected</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
} 