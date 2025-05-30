"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export function ChargebackUpdate() {
  const [requestId, setRequestId] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [notes, setNotes] = useState("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Document uploaded for request ${requestId}`)
    setRequestId("")
    setDocumentType("")
    setNotes("")
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="requestId">Chargeback Request ID</Label>
          <Select value={requestId} onValueChange={setRequestId}>
            <SelectTrigger id="requestId">
              <SelectValue placeholder="Select a request" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CHB-1001">CHB-1001 - POS Dispute</SelectItem>
              <SelectItem value="CHB-1002">CHB-1002 - ATM Dispute</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="documentType">Document Type</Label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger id="documentType">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="receipt">Transaction Receipt</SelectItem>
              <SelectItem value="statement">Account Statement</SelectItem>
              <SelectItem value="id">Identification</SelectItem>
              <SelectItem value="communication">Communication with Merchant</SelectItem>
              <SelectItem value="other">Other Supporting Document</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes"
            placeholder="Enter additional information about these documents"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="files">Upload Documents</Label>
          <div className="flex items-center gap-2">
            <Input
              id="files"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              multiple
              className="hidden"
            />
            <Label 
              htmlFor="files" 
              className="flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-background px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Upload className="mr-2 h-4 w-4" />
              <span>Select files</span>
            </Label>
            <div className="text-sm text-muted-foreground">
              JPG, PNG, or PDF (max 5MB)
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!requestId || !documentType}
          >
            Upload Documents
          </Button>
        </div>
      </div>
    </form>
  )
} 