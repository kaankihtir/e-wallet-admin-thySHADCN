"use client";

import { Button } from "@/components/ui/button";
import { mockDocuments } from "@/lib/mock-data";
import { FileText, UploadCloud, Download, Eye } from "lucide-react";
import { format } from "date-fns";

interface ChargebackDocumentsListProps {
  chargebackId: string;
  onUploadClick?: () => void;
}

export function ChargebackDocumentsList({ chargebackId, onUploadClick }: ChargebackDocumentsListProps) {
  const documents = mockDocuments.filter(doc => doc.chargebackId === chargebackId);
  
  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "receipt": return "Transaction Receipt";
      case "statement": return "Account Statement";
      case "communication": return "Merchant Communication";
      case "product_evidence": return "Product Evidence";
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-sm font-medium">
          {documents.length} Document{documents.length !== 1 ? 's' : ''} Attached
        </h3>
        
        <Button variant="outline" size="sm" onClick={onUploadClick}>
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload New Document
        </Button>
      </div>
      
      {documents.length > 0 ? (
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center">
                <FileText className="mr-3 h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <div className="flex text-xs text-muted-foreground">
                    <span>{getDocumentTypeLabel(doc.type)}</span>
                    <span className="mx-2">•</span>
                    <span>Uploaded on {format(new Date(doc.uploadDate), "dd MMM yyyy")}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
          <h3 className="text-sm font-medium">No documents attached</h3>
          <p className="text-xs text-muted-foreground mt-1">
            No supporting documents have been added to this chargeback request
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      )}
    </div>
  );
} 