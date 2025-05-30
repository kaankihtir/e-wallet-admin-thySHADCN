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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Eye, 
  UploadCloud, 
  MessageSquare, 
  CheckCircle,
  XCircle,
  Send
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { mockChargebacks, mockCustomers } from "@/lib/mock-data"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { ChargebackDocumentUpload } from "./chargeback-document-upload"

interface ChargebackListProps {
  filter: "all" | "pending_tkpay" | "pending_bank" | "pending_info" | "completed"
}

export function ChargebackList({ filter }: ChargebackListProps) {
  const router = useRouter();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedChargebackId, setSelectedChargebackId] = useState<string | null>(null);
  
  // Filter chargebacks based on the selected tab
  const filteredChargebacks = mockChargebacks.filter(chargeback => {
    if (filter === "all") return true
    if (filter === "pending_tkpay") return chargeback.status === "pending_at_tkpay"
    if (filter === "pending_bank") return chargeback.status === "pending_at_bank"
    if (filter === "pending_info") return chargeback.status === "pending_info"
    if (filter === "completed") return ["approved", "rejected"].includes(chargeback.status)
    return true
  })
  
  const getCustomerName = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId)
    return customer ? customer.name : customerId
  }
  
  const handleRowClick = (id: string) => {
    router.push(`/chargeback/${id}`);
  }
  
  const handleUploadClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    setSelectedChargebackId(id);
    setUploadDialogOpen(true);
  }
  
  const handleForwardToBank = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    toast({
      title: "Request forwarded to bank",
      description: `Chargeback request ${id} has been forwarded to Ziraat Bank for review.`
    });
    // In a real app, you would update the status in your API
  }
  
  const handleViewDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    router.push(`/chargeback/${id}`);
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: '12%' }}>Request ID</TableHead>
            <TableHead style={{ width: '15%' }}>Customer</TableHead>
            <TableHead style={{ width: '8%' }}>Type</TableHead>
            <TableHead style={{ width: '10%' }}>Amount</TableHead>
            <TableHead style={{ width: '13%' }}>
              <div className="flex items-center">
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead style={{ width: '16%' }}>Current Stage</TableHead>
            <TableHead style={{ width: '13%' }}>Status</TableHead>
            <TableHead style={{ width: '8%' }} className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredChargebacks.map((chargeback) => (
            <TableRow 
              key={chargeback.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleRowClick(chargeback.id)}
            >
              <TableCell className="font-medium">{chargeback.id}</TableCell>
              <TableCell>{getCustomerName(chargeback.customerId)}</TableCell>
              <TableCell>{chargeback.type}</TableCell>
              <TableCell>{chargeback.amount.toFixed(2)} TL</TableCell>
              <TableCell>{format(new Date(chargeback.date), "dd MMM yyyy")}</TableCell>
              <TableCell>{getCurrentStage(chargeback)}</TableCell>
              <TableCell>
                <StatusBadge status={chargeback.status} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => handleViewDetails(chargeback.id, e)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    
                    {(chargeback.status === "pending_info" || chargeback.status === "pending_at_bank") && (
                      <DropdownMenuItem onClick={(e) => handleUploadClick(chargeback.id, e)}>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        <span>Upload Documents</span>
                      </DropdownMenuItem>
                    )}
                    
                    {chargeback.status === "pending_at_tkpay" && (
                      <DropdownMenuItem onClick={(e) => handleForwardToBank(chargeback.id, e)}>
                        <Send className="mr-2 h-4 w-4" />
                        <span>Forward to Bank</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Send Message</span>
                    </DropdownMenuItem>
                    
                    {chargeback.status === "pending_at_tkpay" && chargeback.type === "POS" && (
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <Send className="mr-2 h-4 w-4 text-amber-500" />
                        <span>Send to Banksoft CTM</span>
                      </DropdownMenuItem>
                    )}
                    
                    {chargeback.status === "pending_at_tkpay" && chargeback.type === "ATM" && (
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <Send className="mr-2 h-4 w-4 text-amber-500" />
                        <span>Send to Anahtar System</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          
          {filteredChargebacks.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No chargebacks found for this filter.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
            <DialogDescription>
              Attach additional documentation for this chargeback request
            </DialogDescription>
          </DialogHeader>
          
          {selectedChargebackId && (
            <ChargebackDocumentUpload
              chargebackId={selectedChargebackId}
              onComplete={() => {
                setUploadDialogOpen(false);
                toast({
                  title: "Documents uploaded",
                  description: "The documents have been successfully uploaded."
                });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
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