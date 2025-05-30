"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CreditCard,
  DollarSign,
  Edit,
  Eye,
  Trash2,
  Wallet,
} from "lucide-react"
import { format } from "date-fns"
import {
  type Commission,
  type CommissionType,
  type CommissionSubType,
  getCommissionsByType,
  getCommissionTypeLabel,
  getCommissionSubTypeLabel,
  getCurrencySymbol,
  formatFee,
} from "@/lib/commission-data"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function GroupedCommissionsList() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    account_usage: true,
    money_transfer: true,
    topup: true,
    prepaid_card: true,
  })

  const [openSubtypes, setOpenSubtypes] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleSubtype = (key: string) => {
    setOpenSubtypes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const commissionTypes: CommissionType[] = ["account_usage", "money_transfer", "topup", "prepaid_card"]

  const getTypeIcon = (type: CommissionType) => {
    switch (type) {
      case "account_usage":
        return <Calendar className="h-5 w-5" />
      case "money_transfer":
        return <Wallet className="h-5 w-5" />
      case "topup":
        return <DollarSign className="h-5 w-5" />
      case "prepaid_card":
        return <CreditCard className="h-5 w-5" />
    }
  }

  const formatDateRange = (startDate: Date, endDate: Date | null) => {
    const start = format(startDate, "MMM d, yyyy")

    if (!endDate) {
      return `From ${start}`
    }

    const end = format(endDate, "MMM d, yyyy")
    return `${start} - ${end}`
  }

  // Group commissions by subtype
  const groupCommissionsBySubtype = (commissions: Commission[]) => {
    const grouped: Record<string, Commission[]> = {}

    commissions.forEach((commission) => {
      const key = commission.subType
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(commission)
    })

    return grouped
  }

  return (
    <div className="space-y-6">
      {commissionTypes.map((type) => {
        const commissions = getCommissionsByType(type)

        if (commissions.length === 0) {
          return null
        }

        const groupedBySubtype = groupCommissionsBySubtype(commissions)

        return (
          <Collapsible
            key={type}
            open={openSections[type]}
            onOpenChange={() => toggleSection(type)}
            className="border rounded-lg"
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  {getTypeIcon(type)}
                  <div>
                    <h3 className="text-lg font-medium">{getCommissionTypeLabel(type)}</h3>
                    <p className="text-sm text-muted-foreground">{commissions.length} commissions</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  {openSections[type] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 pt-0 space-y-4">
                {Object.entries(groupedBySubtype).map(([subtype, subtypeCommissions]) => {
                  const subtypeKey = `${type}-${subtype}`
                  const isSubtypeOpen = openSubtypes[subtypeKey] !== false // Default to open

                  return (
                    <div key={subtypeKey} className="border rounded-md overflow-hidden">
                      <div
                        className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleSubtype(subtypeKey)}
                      >
                        <div className="font-medium">
                          {getCommissionSubTypeLabel(type, subtype as CommissionSubType)}
                          <span className="text-sm text-muted-foreground ml-2">({subtypeCommissions.length})</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          {isSubtypeOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                      </div>

                      {isSubtypeOpen && (
                        <div className="divide-y">
                          {subtypeCommissions.map((commission) => (
                            <div key={commission.id} className="p-3 hover:bg-muted/20">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant={commission.status === "active" ? "default" : "secondary"}>
                                    {commission.status === "active" ? "Active" : "Inactive"}
                                  </Badge>
                                  <Badge variant="outline" className="font-mono">
                                    {commission.currency}
                                  </Badge>
                                  {commission.atmType && <Badge variant="outline">{commission.atmType}</Badge>}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Link href={`/commissions/${commission.id}`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                  <Link href={`/commissions/${commission.id}/edit`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Fee:</span>{" "}
                                  <span className="font-medium">{formatFee(commission)}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Amount:</span>{" "}
                                  <span>
                                    {getCurrencySymbol(commission.currency)}
                                    {commission.minAmount}
                                    {commission.maxAmount
                                      ? ` - ${getCurrencySymbol(commission.currency)}${commission.maxAmount}`
                                      : "+"}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Date:</span>{" "}
                                  <span>{formatDateRange(commission.startDate, commission.endDate)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </div>
  )
}

