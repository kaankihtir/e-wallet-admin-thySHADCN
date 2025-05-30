"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, DollarSign, Edit, Eye, MoreHorizontal, Percent, Trash2, Wallet } from "lucide-react"
import { format } from "date-fns"
import {
  type Commission,
  commissions,
  getCurrencySymbol,
  getCommissionSubTypeLabel,
  getCommissionTypeLabel,
} from "@/lib/commission-data"
import Link from "next/link"

export function CommissionsList() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "account_usage":
        return <Calendar className="h-4 w-4 mr-2" />
      case "money_transfer":
        return <Wallet className="h-4 w-4 mr-2" />
      case "topup":
        return <DollarSign className="h-4 w-4 mr-2" />
      case "prepaid_card":
        return <CreditCard className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  const formatFee = (commission: Commission) => {
    const { fixedAmount, percentageRate, currency } = commission
    const symbol = getCurrencySymbol(currency)

    if (fixedAmount && percentageRate) {
      return (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>
            {symbol}
            {fixedAmount.toFixed(2)}
          </span>
          <span className="mx-1">+</span>
          <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{percentageRate.toFixed(2)}%</span>
        </div>
      )
    } else if (fixedAmount) {
      return (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>
            {symbol}
            {fixedAmount.toFixed(2)}
          </span>
        </div>
      )
    } else if (percentageRate) {
      return (
        <div className="flex items-center">
          <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{percentageRate.toFixed(2)}%</span>
        </div>
      )
    }

    return "N/A"
  }

  const formatDateRange = (startDate: Date, endDate: Date | null) => {
    const start = format(startDate, "MMM d, yyyy")

    if (!endDate) {
      return `${start} - No end date`
    }

    const end = format(endDate, "MMM d, yyyy")
    return `${start} - ${end}`
  }

  const formatTransactionLimits = (min: number, max: number | null) => {
    if (!max) {
      return `Min: ${min}`
    }

    return `${min} - ${max}`
  }

  const formatAmountLimits = (min: number, max: number | null, currency: string) => {
    const symbol = getCurrencySymbol(currency)

    if (!max) {
      return `Min: ${symbol}${min}`
    }

    return `${symbol}${min} - ${symbol}${max}`
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Transaction Limits</TableHead>
            <TableHead>Amount Limits</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commissions.map((commission) => (
            <TableRow key={commission.id}>
              <TableCell className="font-medium">{commission.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getTypeIcon(commission.type)}
                  <div className="flex flex-col">
                    <span>{getCommissionTypeLabel(commission.type)}</span>
                    <span className="text-xs text-muted-foreground">
                      {getCommissionSubTypeLabel(commission.type, commission.subType)}
                      {commission.atmType && ` - ${commission.atmType}`}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatFee(commission)}</TableCell>
              <TableCell>{formatTransactionLimits(commission.minTransactions, commission.maxTransactions)}</TableCell>
              <TableCell>
                {formatAmountLimits(commission.minAmount, commission.maxAmount, commission.currency)}
              </TableCell>
              <TableCell>{formatDateRange(commission.startDate, commission.endDate)}</TableCell>
              <TableCell>
                <Badge variant={commission.status === "active" ? "default" : "secondary"}>
                  {commission.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link href={`/commissions/${commission.id}`}>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View details</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/commissions/${commission.id}/edit`}>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

