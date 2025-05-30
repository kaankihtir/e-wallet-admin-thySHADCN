import { toast } from "@/components/ui/use-toast"

// Types for chargeback data
export type ChargebackStatus = 
  | "pending" 
  | "pending_info" 
  | "in_review" 
  | "approved" 
  | "rejected"

export type ChargebackType = "POS" | "ATM"

export type ChargebackReason = 
  | "unauthorized" 
  | "product_issue" 
  | "duplicate" 
  | "refund_not_processed"
  | "cash_not_dispensed"
  | "cash_deposit_problem"

export interface Chargeback {
  id: string
  customerId: string
  transactionId: string
  type: ChargebackType
  amount: number
  date: string
  reason: string
  reasonCode?: ChargebackReason
  status: ChargebackStatus
  timeline: ChargebackEvent[]
  additionalInfo?: Record<string, any>
}

export interface ChargebackEvent {
  type: "created" | "info_requested" | "document_added" | "status_change" | "completed"
  title: string
  description: string
  timestamp: string
  userId?: string
}

export interface ChargebackListParams {
  page?: number
  perPage?: number
  status?: ChargebackStatus
  type?: ChargebackType
  customerId?: string
  dateFrom?: string
  dateTo?: string
}

export interface ChargebackDocument {
  id: string
  chargebackId: string
  name: string
  type: string
  url: string
  uploadDate: string
  uploadedBy: string
}

// Mock service implementation
class ChargebackService {
  async getChargebacks(params: ChargebackListParams = {}): Promise<Chargeback[]> {
    // In a real implementation, this would call an API endpoint
    console.log("Fetching chargebacks with params:", params)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // This would be fetched from the backend
    return mockChargebacks
  }
  
  async getChargebackById(id: string): Promise<Chargeback | null> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const chargeback = mockChargebacks.find(c => c.id === id) || null
    return chargeback
  }
  
  async getChargebackDocuments(chargebackId: string): Promise<ChargebackDocument[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // This would be fetched from the backend
    return mockDocuments.filter(d => d.chargebackId === chargebackId) as ChargebackDocument[]
  }
  
  async uploadDocument(chargebackId: string, file: File, documentType: string, notes: string): Promise<boolean> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log(`Uploading document for chargeback ${chargebackId}:`, { documentType, notes, fileName: file.name })
    
    // Simulate success
    toast({
      title: "Document uploaded successfully",
      description: `${file.name} has been added to chargeback #${chargebackId}`,
    })
    
    return true
  }
  
  async updateChargebackStatus(
    chargebackId: string, 
    status: ChargebackStatus, 
    notes: string
  ): Promise<boolean> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    console.log(`Updating chargeback ${chargebackId} status:`, { status, notes })
    
    // Simulate success
    toast({
      title: "Chargeback status updated",
      description: `Chargeback #${chargebackId} has been marked as ${status}`,
    })
    
    return true
  }
  
  async requestAdditionalInfo(
    chargebackId: string, 
    message: string, 
    requiredDocuments: string[]
  ): Promise<boolean> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    console.log(`Requesting additional info for chargeback ${chargebackId}:`, { message, requiredDocuments })
    
    // Simulate success
    toast({
      title: "Information requested",
      description: `Additional information has been requested for chargeback #${chargebackId}`,
    })
    
    return true
  }
}

export const chargebackService = new ChargebackService() 