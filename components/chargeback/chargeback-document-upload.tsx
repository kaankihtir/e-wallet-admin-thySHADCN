"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Upload, X, CheckCircle } from "lucide-react"

interface ChargebackDocumentUploadProps {
  chargebackId: string;
  onComplete: () => void;
}

export function ChargebackDocumentUpload({ chargebackId, onComplete }: ChargebackDocumentUploadProps) {
  const [documentType, setDocumentType] = useState("")
  const [notes, setNotes] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...newFiles])
    }
  }
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Documents uploaded successfully",
        description: `Updated chargeback request #${chargebackId} with ${files.length} document(s)`,
      })
      
      onComplete()
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your documents. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
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
              onChange={handleFileChange}
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
          
          {files.length > 0 && (
            <div className="mt-2 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border border-border bg-background p-2">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Documents"}
        </Button>
      </div>
    </form>
  )
} 