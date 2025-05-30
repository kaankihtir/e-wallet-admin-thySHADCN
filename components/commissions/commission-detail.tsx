"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import {
  type Commission,
  getCommissionById,
  getCurrencySymbol,
  getCommissionSubTypeLabel,
  getCommissionTypeLabel,
} from "@/lib/commission-data"
import { Calendar, CreditCard, DollarSign, Percent, Wallet } from "lucide-react"

export function CommissionDetail({ id }: { id: string }) {
  const commission = getCommissionById(id)

  if (!commission) {
    return <div>Commission not found</div>
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "account_usage":
        return <Calendar className="h-5 w-5 mr-2" />
      case "money_transfer":
        return <Wallet className="h-5 w-5 mr-2" />
      case "topup":
        return <DollarSign className="h-5 w-5 mr-2" />
      case "prepaid_card":
        return <CreditCard className="h-5 w-5 mr-2" />
      default:
        return null
    }
  }

  const formatFee = (commission: Commission) => {
    const { fixedAmount, percentageRate, currency, calculationType } = commission
    const symbol = getCurrencySymbol(currency)

    if (calculationType === "mixed") {
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>
              {symbol}
              {fixedAmount?.toFixed(2)}
            </span>
          </div>
          <span>+</span>
          <div className="flex items-center">
            <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{percentageRate?.toFixed(2)}%</span>
          </div>
        </div>
      )
    } else if (calculationType === "fixed") {
      return (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>
            {symbol}
            {fixedAmount?.toFixed(2)}
          </span>
        </div>
      )
    } else if (calculationType === "percentage") {
      return (
        <div className="flex items-center">
          <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{percentageRate?.toFixed(2)}%</span>
        </div>
      )
    }

    return "N/A"
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>{commission.name}</CardTitle>
            <Badge variant={commission.status === "active" ? "default" : "secondary"}>
              {commission.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
          <CardDescription>Commission ID: {commission.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-center">
              {getTypeIcon(commission.type)}
              <div>
                <div className="font-medium">{getCommissionTypeLabel(commission.type)}</div>
                <div className="text-sm text-muted-foreground">
                  {getCommissionSubTypeLabel(commission.type, commission.subType)}
                  {commission.atmType && ` - ${commission.atmType}`}
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Currency</div>
                <div>{commission.currency}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Fee Structure</div>
                <div>{formatFee(commission)}</div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Transaction Count Limits</div>
                <div>
                  Minimum: {commission.minTransactions}
                  {commission.maxTransactions && `, Maximum: ${commission.maxTransactions}`}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Transaction Amount Limits</div>
                <div>
                  Minimum: {getCurrencySymbol(commission.currency)}
                  {commission.minAmount}
                  {commission.maxAmount &&
                    `, Maximum: ${getCurrencySymbol(commission.currency)}${commission.maxAmount}`}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="text-sm font-medium">Date Range</div>
              <div>
                Start Date: {format(commission.startDate, "PPP")}
                {commission.endDate && `, End Date: ${format(commission.endDate, "PPP")}`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

