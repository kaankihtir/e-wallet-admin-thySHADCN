"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Eye, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  UploadCloud
} from "lucide-react"
import { mockChargebacks } from "@/lib/mock-data"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { ChargebackDocumentUpload } from "../chargeback/chargeback-document-upload"

interface CustomerChargebacksListProps {
  customerId: string;
}

export function CustomerChargebacksList({ customerId }: CustomerChargebacksListProps) {
  const router = useRouter();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [currentChargebackId, setCurrentChargebackId] = useState<string | null>(null);
  
  // Filter chargebacks for this customer
  const customerChargebacks = mockChargebacks.filter(chargeback => chargeback.customerId === customerId);
  
  const handleRowClick = (id: string) => {
    router.push(`/chargeback/${id}`);
  }
  
  const handleUploadClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentChargebackId(id);
    setUploadDialogOpen(true);
  }
  
  const handleForwardToBank = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would make an API call
    toast({
      title: "Chargeback forwarded to bank",
      description: `Chargeback #${id} has been forwarded to Ziraat Bank for processing.`,
    });
  }
  
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: '15%' }}>Request ID</TableHead>
              <TableHead style={{ width: '12%' }}>Type</TableHead>
              <TableHead style={{ width: '15%' }}>Amount</TableHead>
              <TableHead style={{ width: '15%' }}>
                <div className="flex items-center">
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead style={{ width: '18%' }}>Current Stage</TableHead>
              <TableHead style={{ width: '15%' }}>Status</TableHead>
              <TableHead style={{ width: '10%' }} className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerChargebacks.map((chargeback) => (
              <TableRow 
                key={chargeback.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(chargeback.id)}
              >
                <TableCell className="font-medium">{chargeback.id}</TableCell>
                <TableCell>{chargeback.type}</TableCell>
                <TableCell>{chargeback.amount.toFixed(2)} TL</TableCell>
                <TableCell>{format(new Date(chargeback.date), "dd MMM yyyy")}</TableCell>
                <TableCell>{getCurrentStage(chargeback)}</TableCell>
                <TableCell>
                  <StatusBadge status={chargeback.status} />
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleRowClick(chargeback.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleUploadClick(chargeback.id, e)}>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        <span>Upload Documents</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Send Message to Bank</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {chargeback.status === "pending_at_tkpay" && (
                        <DropdownMenuItem onClick={(e) => handleForwardToBank(chargeback.id, e)}>
                          <ArrowRight className="mr-2 h-4 w-4 text-blue-500" />
                          <span>Forward to Bank</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {customerChargebacks.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  This customer has not submitted any chargeback requests.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
            <DialogDescription>
              Attach additional documentation requested by Ziraat Bank
            </DialogDescription>
          </DialogHeader>
          
          {currentChargebackId && (
            <ChargebackDocumentUpload 
              chargebackId={currentChargebackId} 
              onComplete={() => setUploadDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
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