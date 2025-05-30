"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

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

interface LimitDetailsDialogProps {
  limit: Limit
  currency: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LimitDetailsDialog({ 
  limit, 
  currency, 
  open, 
  onOpenChange 
}: LimitDetailsDialogProps) {
  // Format currency amount
  const formatAmount = (amount: number | null) => {
    if (amount === null) return "No limit"
    return new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency, 
      maximumFractionDigits: 0 
    }).format(amount)
  }

  // Get period display name
  const getPeriodName = (periodId: string) => {
    const periodNames: Record<string, string> = {
      "one-time": "One Time",
      "daily": "Daily",
      "weekly": "Weekly",
      "monthly": "Monthly",
      "yearly": "Yearly"
    }
    return periodNames[periodId] || periodId
  }
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "passive":
        return <Badge className="bg-yellow-500">Passive</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Limit Details</DialogTitle>
          <DialogDescription>
            Viewing details for {getPeriodName(limit.period)} limit
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Period</Label>
              <span className="font-medium">{getPeriodName(limit.period)}</span>
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <Label>Status</Label>
              {getStatusBadge(limit.status)}
            </div>
            <Separator />
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">KYC Verified Users</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Minimum</Label>
                  <div className="rounded-md border px-3 py-2 text-sm">
                    {formatAmount(limit.kycVerified.min)}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Maximum</Label>
                  <div className="rounded-md border px-3 py-2 text-sm">
                    {formatAmount(limit.kycVerified.max)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Unverified Users</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Minimum</Label>
                  <div className="rounded-md border px-3 py-2 text-sm">
                    {formatAmount(limit.kycUnverified.min)}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Maximum</Label>
                  <div className="rounded-md border px-3 py-2 text-sm">
                    {formatAmount(limit.kycUnverified.max)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 