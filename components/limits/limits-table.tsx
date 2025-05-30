"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash, Eye, Plus } from "lucide-react"
import { LimitDetailsDialog } from "@/components/limits/limit-details-dialog"
import { EditLimitDialog } from "@/components/limits/edit-limit-dialog"
import { toast } from "@/components/ui/use-toast"

interface LimitPeriod {
  id: string
  name: string
}

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

// Mock data
const mockLimits: Record<string, Record<string, Limit[]>> = {
  TRY: {
    topup: [
      {
        id: "1",
        period: "daily",
        kycVerified: { min: 0, max: 10000 },
        kycUnverified: { min: 0, max: 2000 },
        status: "active"
      },
      {
        id: "2",
        period: "weekly",
        kycVerified: { min: 0, max: 50000 },
        kycUnverified: { min: 0, max: 10000 },
        status: "active"
      },
      {
        id: "3",
        period: "monthly",
        kycVerified: { min: 0, max: 150000 },
        kycUnverified: { min: 0, max: 20000 },
        status: "active"
      }
    ],
    payment: [
      {
        id: "4",
        period: "daily",
        kycVerified: { min: 10, max: 5000 },
        kycUnverified: { min: 10, max: 1000 },
        status: "active"
      },
      {
        id: "5",
        period: "one-time",
        kycVerified: { min: 10, max: 2000 },
        kycUnverified: { min: 10, max: 500 },
        status: "active"
      }
    ],
    withdraw: [],
    refund: [],
    transfer: []
  },
  USD: {
    topup: [
      {
        id: "6",
        period: "daily",
        kycVerified: { min: 0, max: 1000 },
        kycUnverified: { min: 0, max: 200 },
        status: "active"
      },
      {
        id: "7",
        period: "monthly",
        kycVerified: { min: 0, max: 15000 },
        kycUnverified: { min: 0, max: 2000 },
        status: "active"
      }
    ],
    payment: [],
    withdraw: [],
    refund: [],
    transfer: []
  },
  EUR: {
    topup: [],
    payment: [],
    withdraw: [],
    refund: [],
    transfer: []
  },
  GBP: {
    topup: [],
    payment: [],
    withdraw: [],
    refund: [],
    transfer: []
  }
}

// Limit periods
const limitPeriods: LimitPeriod[] = [
  { id: "one-time", name: "One Time" },
  { id: "daily", name: "Daily" },
  { id: "weekly", name: "Weekly" },
  { id: "monthly", name: "Monthly" },
  { id: "yearly", name: "Yearly" }
]

interface LimitsTableProps {
  currency: string
  transactionType: string
  customerId?: string
  groupId?: string
  isCustomView?: boolean
}

export function LimitsTable({ 
  currency, 
  transactionType, 
  customerId, 
  groupId,
  isCustomView = false 
}: LimitsTableProps) {
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [viewLimit, setViewLimit] = useState<Limit | null>(null)
  const [editLimit, setEditLimit] = useState<(Limit & { period: string }) | null>(null)
  const [addNewPeriod, setAddNewPeriod] = useState<string | null>(null)
  
  // Get limits for currency and transaction type
  const limits = mockLimits[currency]?.[transactionType] || []
  
  // Get existing periods to know which ones are defined
  const existingPeriods = limits.map(limit => limit.period)
  
  // Apply status filter
  const filteredLimits = limits.filter(limit => {
    if (statusFilter && limit.status !== statusFilter) return false
    return true
  })

  // Create a new limit placeholder for undefined periods
  const createEmptyLimit = (period: string) => ({
    id: `new-${period}-${Date.now()}`,
    period,
    kycVerified: { min: 0, max: null },
    kycUnverified: { min: 0, max: null },
    status: "inactive" as const
  })

  // Handle limit deletion
  const handleDeleteLimit = (limitId: string) => {
    // In a real app, this would call an API endpoint
    // For now, just show a toast notification
    toast({
      title: "Limit deleted",
      description: `Limit ID: ${limitId} has been deleted.`,
    })
  }

  // Get status badge color
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
    return limitPeriods.find(p => p.id === periodId)?.name || periodId
  }

  // Check if a limit is defined for a specific period
  const getLimitByPeriod = (period: string) => {
    return limits.find(limit => limit.period === period) || null
  }

  // Open edit dialog for a limit period (existing or new)
  const handleEditLimit = (period: string) => {
    const limit = getLimitByPeriod(period) || createEmptyLimit(period)
    setEditLimit(limit)
  }
  
  // Handle adding a new limit period
  const handleAddNewPeriod = () => {
    if (addNewPeriod) {
      handleEditLimit(addNewPeriod)
      setAddNewPeriod(null)
    }
  }

  // Check if editing is allowed
  const isEditingAllowed = () => {
    if (isCustomView) {
      // For customer view, only allow editing individual custom limits
      return !groupId && customerId
    }
    return true
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="passive">Passive</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        {/* Add new period dropdown */}
        {isEditingAllowed() && (
          <div className="flex gap-2 ml-auto">
            <Select value={addNewPeriod || ""} onValueChange={setAddNewPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Add period limit" />
              </SelectTrigger>
              <SelectContent>
                {limitPeriods.map((period) => (
                  <SelectItem
                    key={period.id}
                    value={period.id}
                    disabled={existingPeriods.includes(period.id)}
                  >
                    {period.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleAddNewPeriod}
              disabled={!addNewPeriod}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>KYC Verified (Min)</TableHead>
              <TableHead>KYC Verified (Max)</TableHead>
              <TableHead>Unverified (Min)</TableHead>
              <TableHead>Unverified (Max)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
            {limitPeriods.map((period) => {
              const limit = getLimitByPeriod(period.id)
              
              return (
                <TableRow key={period.id} className={!limit ? "opacity-60" : undefined}>
                  <TableCell className="font-medium">{period.name}</TableCell>
                  
                  {limit ? (
                    <>
                      <TableCell>{formatAmount(limit.kycVerified.min)}</TableCell>
                      <TableCell>{formatAmount(limit.kycVerified.max)}</TableCell>
                      <TableCell>{formatAmount(limit.kycUnverified.min)}</TableCell>
                      <TableCell>{formatAmount(limit.kycUnverified.max)}</TableCell>
                      <TableCell>{getStatusBadge(limit.status)}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        Undefined
            </TableCell>
                    </>
                  )}
                  
            <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {limit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setViewLimit(limit)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      )}
                      
                      {isEditingAllowed() && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditLimit(period.id)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">
                            {limit ? "Edit" : "Define"}
                          </span>
                        </Button>
                      )}
                      
                      {limit && isEditingAllowed() && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteLimit(limit.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                  </Button>
                      )}
                    </div>
            </TableCell>
          </TableRow>
              )
            })}
      </TableBody>
    </Table>
      </div>

      {viewLimit && (
        <LimitDetailsDialog
          limit={viewLimit}
          currency={currency}
          open={!!viewLimit}
          onOpenChange={() => setViewLimit(null)}
        />
      )}

      {editLimit && (
        <EditLimitDialog
          limit={editLimit}
          currency={currency}
          open={!!editLimit}
          onOpenChange={() => setEditLimit(null)}
          isNew={!existingPeriods.includes(editLimit.period)}
          customerId={customerId}
          groupId={groupId}
        />
      )}
    </div>
  )
} 