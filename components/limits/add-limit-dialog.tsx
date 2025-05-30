"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Check, Loader2 } from "lucide-react"

interface AddLimitDialogProps {
  currency: string
  transactionType: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  customerId?: string | null
  groupId?: string | null
}

// Limit periods
const limitPeriods = [
  { id: "one-time", name: "One Time" },
  { id: "daily", name: "Daily" },
  { id: "weekly", name: "Weekly" },
  { id: "monthly", name: "Monthly" },
  { id: "yearly", name: "Yearly" }
]

// Transaction types
const transactionTypes = [
  { id: "topup", name: "Top-up" },
  { id: "payment", name: "Payment" },
  { id: "refund", name: "Refund" },
  { id: "withdraw", name: "Withdraw" },
  { id: "transfer", name: "Transfer" }
]

export function AddLimitDialog({ 
  currency, 
  transactionType: initialTransactionType,
  open, 
  onOpenChange,
  customerId,
  groupId
}: AddLimitDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // Form state
  const [transactionType, setTransactionType] = useState<string>(initialTransactionType || "topup")
  const [period, setPeriod] = useState<string>("daily")
  const [status, setStatus] = useState<"active" | "passive" | "inactive">("active")
  
  // KYC Verified limits
  const [kycVerifiedMin, setKycVerifiedMin] = useState<string>("0")
  const [kycVerifiedMax, setKycVerifiedMax] = useState<string>("")
  
  // KYC Unverified limits
  const [kycUnverifiedMin, setKycUnverifiedMin] = useState<string>("0")
  const [kycUnverifiedMax, setKycUnverifiedMax] = useState<string>("")
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Create limit object
    const newLimit = {
      id: Math.random().toString(36).substring(2, 9), // Generate mock ID
      transactionType,
      period,
      kycVerified: {
        min: parseFloat(kycVerifiedMin) || 0,
        max: kycVerifiedMax ? parseFloat(kycVerifiedMax) : null
      },
      kycUnverified: {
        min: parseFloat(kycUnverifiedMin) || 0,
        max: kycUnverifiedMax ? parseFloat(kycUnverifiedMax) : null
      },
      status,
      currency
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      toast({
        title: "Limit created",
        description: "The new transaction limit has been created successfully.",
      })
      
      // Reset and close dialog after success
      setTimeout(() => {
        resetForm()
        setIsSuccess(false)
        onOpenChange(false)
      }, 1500)
    }, 1000)
  }
  
  // Reset form to initial state
  const resetForm = () => {
    setTransactionType(initialTransactionType || "topup")
    setPeriod("daily")
    setStatus("active")
    setKycVerifiedMin("0")
    setKycVerifiedMax("")
    setKycUnverifiedMin("0")
    setKycUnverifiedMax("")
  }
  
  // Get transaction type name
  const getTransactionTypeName = (typeId: string) => {
    return transactionTypes.find(t => t.id === typeId)?.name || typeId
  }
  
  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        if (!open) resetForm()
        onOpenChange(open)
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction Limit</DialogTitle>
          <DialogDescription>
            {initialTransactionType 
              ? `Create a new ${getTransactionTypeName(initialTransactionType)} limit for ${currency}`
              : `Create a new transaction limit for ${currency}`
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {!initialTransactionType && (
              <div className="grid gap-2">
                <Label htmlFor="transactionType">Transaction Type</Label>
                <Select
                  value={transactionType}
                  onValueChange={setTransactionType}
                  disabled={isSubmitting || isSuccess}
                >
                  <SelectTrigger id="transactionType">
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="period">Period</Label>
              <Select
                value={period}
                onValueChange={setPeriod}
                disabled={isSubmitting || isSuccess}
              >
                <SelectTrigger id="period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {limitPeriods.map((period) => (
                    <SelectItem key={period.id} value={period.id}>
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2 mt-2">
              <Label>Status</Label>
              <RadioGroup 
                value={status} 
                onValueChange={(value: "active" | "passive" | "inactive") => setStatus(value)}
                className="flex space-x-4"
                disabled={isSubmitting || isSuccess}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="cursor-pointer">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passive" id="passive" />
                  <Label htmlFor="passive" className="cursor-pointer">Passive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="inactive" />
                  <Label htmlFor="inactive" className="cursor-pointer">Inactive</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-4 mt-4">
              <Label>KYC Verified Users</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kyc-verified-min" className="text-xs">
                    Minimum ({currency})
                  </Label>
                  <Input
                    id="kyc-verified-min"
                    type="number"
                    min="0"
                    step="0.01"
                    value={kycVerifiedMin}
                    onChange={(e) => setKycVerifiedMin(e.target.value)}
                    disabled={isSubmitting || isSuccess}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kyc-verified-max" className="text-xs">
                    Maximum ({currency}, empty for no limit)
                  </Label>
                  <Input
                    id="kyc-verified-max"
                    type="number"
                    min="0"
                    step="0.01"
                    value={kycVerifiedMax}
                    onChange={(e) => setKycVerifiedMax(e.target.value)}
                    disabled={isSubmitting || isSuccess}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid gap-4 mt-4">
              <Label>Unverified Users</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kyc-unverified-min" className="text-xs">
                    Minimum ({currency})
                  </Label>
                  <Input
                    id="kyc-unverified-min"
                    type="number"
                    min="0"
                    step="0.01"
                    value={kycUnverifiedMin}
                    onChange={(e) => setKycUnverifiedMin(e.target.value)}
                    disabled={isSubmitting || isSuccess}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kyc-unverified-max" className="text-xs">
                    Maximum ({currency}, empty for no limit)
                  </Label>
                  <Input
                    id="kyc-unverified-max"
                    type="number"
                    min="0"
                    step="0.01"
                    value={kycUnverifiedMax}
                    onChange={(e) => setKycUnverifiedMax(e.target.value)}
                    disabled={isSubmitting || isSuccess}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting || isSuccess}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : isSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Created
                </>
              ) : (
                "Create Limit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 