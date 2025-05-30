"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight, UploadCloud } from "lucide-react";
import { ChargebackDocumentUpload } from "./chargeback-document-upload";
import { toast } from "@/components/ui/use-toast";

interface ChargebackDetailActionsProps {
  chargeback: any;
}

export function ChargebackDetailActions({ chargeback }: ChargebackDetailActionsProps) {
  const router = useRouter();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
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
    <>
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
    </>
  );
} 