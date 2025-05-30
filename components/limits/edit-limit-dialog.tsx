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

// Import Limit type from limits-table
interface Limit {
  id: string
  period: string
  kycVerified: {
    min: number
    max: number | null
  }
  kycUnverified: {
    min: number
    max: number | null
  }
  status: "active" | "passive" | "inactive"
}

interface EditLimitDialogProps {
  limit: Limit
  currency: string
  open: boolean
  onOpenChange: (open: boolean) => void
  isNew?: boolean
  customerId?: string
  groupId?: string
}

export function EditLimitDialog({ 
  limit: initialLimit, 
  currency, 
  open, 
  onOpenChange,
  isNew = false,
  customerId,
  groupId
}: EditLimitDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [limit, setLimit] = useState<Limit>({...initialLimit})
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      toast({
        title: "Limit updated",
        description: "The transaction limit has been updated successfully.",
      })
      
      // Close dialog after success
      setTimeout(() => {
        setIsSuccess(false)
        onOpenChange(false)
      }, 1500)
    }, 1000)
  }
  
  // Update limit state
  const updateLimit = (
    field: keyof Limit | 'kycVerifiedMin' | 'kycVerifiedMax' | 'kycUnverifiedMin' | 'kycUnverifiedMax',
    value: any
  ) => {
    const newLimit = {...limit}
    
    switch(field) {
      case 'kycVerifiedMin':
        newLimit.kycVerified.min = parseFloat(value)
        break
      case 'kycVerifiedMax':
        newLimit.kycVerified.max = value === '' ? null : parseFloat(value)
        break
      case 'kycUnverifiedMin':
        newLimit.kycUnverified.min = parseFloat(value)
        break
      case 'kycUnverifiedMax':
        newLimit.kycUnverified.max = value === '' ? null : parseFloat(value)
        break
      default:
        (newLimit as any)[field] = value
    }
    
    setLimit(newLimit)
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction Limit</DialogTitle>
          <DialogDescription>
            Update the transaction limit settings.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="period">Period</Label>
              <Select
                value={limit.period}
                onValueChange={(value) => updateLimit('period', value)}
                disabled={isSubmitting || isSuccess}
              >
                <SelectTrigger id="period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One Time</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2 mt-2">
              <Label>Status</Label>
              <RadioGroup 
                value={limit.status} 
                onValueChange={(value: "active" | "passive" | "inactive") => updateLimit('status', value)}
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
                    value={limit.kycVerified.min}
                    onChange={(e) => updateLimit('kycVerifiedMin', e.target.value)}
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
                    value={limit.kycVerified.max === null ? '' : limit.kycVerified.max}
                    onChange={(e) => updateLimit('kycVerifiedMax', e.target.value)}
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
                    value={limit.kycUnverified.min}
                    onChange={(e) => updateLimit('kycUnverifiedMin', e.target.value)}
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
                    value={limit.kycUnverified.max === null ? '' : limit.kycUnverified.max}
                    onChange={(e) => updateLimit('kycUnverifiedMax', e.target.value)}
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
                  Saving...
                </>
              ) : isSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 