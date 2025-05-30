"use client"
import { useState } from "react"
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

// Mock data for commissions
const commissions = [
  {
    id: "1",
    name: "Monthly Account Fee",
    type: "account_usage",
    subType: "monthly",
    atmType: null,
    currency: "USD",
    fixedAmount: 2.99,
    percentageRate: null,
    minAmount: 0,
    maxAmount: null,
    minTransactions: 1,
    maxTransactions: null,
    startDate: new Date(2023, 0, 1),
    endDate: null,
    status: "active",
  },
  {
    id: "2",
    name: "Bank Transfer Fee",
    type: "money_transfer",
    subType: "bank_account",
    atmType: null,
    currency: "EUR",
    fixedAmount: 1.5,
    percentageRate: 0.5,
    minAmount: 10,
    maxAmount: 1000,
    minTransactions: 1,
    maxTransactions: null,
    startDate: new Date(2023, 1, 15),
    endDate: new Date(2023, 11, 31),
    status: "active",
  },
  {
    id: "3",
    name: "Credit Card Topup",
    type: "topup",
    subType: "credit_card",
    atmType: null,
    currency: "TRY",
    fixedAmount: null,
    percentageRate: 1.2,
    minAmount: 50,
    maxAmount: 5000,
    minTransactions: 1,
    maxTransactions: 10,
    startDate: new Date(2023, 2, 10),
    endDate: null,
    status: "active",
  },
  {
    id: "4",
    name: "ATM Withdrawal Fee",
    type: "prepaid_card",
    subType: "atm_withdraw",
    atmType: "NOTONUS",
    currency: "USD",
    fixedAmount: 3.5,
    percentageRate: null,
    minAmount: 20,
    maxAmount: 500,
    minTransactions: 1,
    maxTransactions: 5,
    startDate: new Date(2023, 3, 5),
    endDate: new Date(2023, 8, 30),
    status: "inactive",
  },
  {
    id: "5",
    name: "International ATM Fee",
    type: "prepaid_card",
    subType: "atm_withdraw",
    atmType: "International",
    currency: "EUR",
    fixedAmount: 5,
    percentageRate: 2.5,
    minAmount: 50,
    maxAmount: 1000,
    minTransactions: 1,
    maxTransactions: null,
    startDate: new Date(2023, 4, 20),
    endDate: null,
    status: "active",
  },
]

export function CommissionsTable() {
  const [selectedCommissions, setSelectedCommissions] = useState<string[]>([])

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

  const getTypeLabel = (type: string, subType: string, atmType: string | null) => {
    let label = ""

    switch (type) {
      case "account_usage":
        label = "Account Usage"
        if (subType) {
          switch (subType) {
            case "daily":
              label += " (Daily)"
              break
            case "weekly":
              label += " (Weekly)"
              break
            case "monthly":
              label += " (Monthly)"
              break
            case "yearly":
              label += " (Yearly)"
              break
          }
        }
        break
      case "money_transfer":
        label = "Money Transfer"
        if (subType) {
          switch (subType) {
            case "bank_account":
              label += " (Bank Account)"
              break
            case "wallet_account":
              label += " (Wallet Account)"
              break
            case "credit_card":
              label += " (Credit Card)"
              break
          }
        }
        break
      case "topup":
        label = "Topup"
        if (subType) {
          switch (subType) {
            case "iban":
              label += " (IBAN)"
              break
            case "credit_card":
              label += " (Credit Card)"
              break
          }
        }
        break
      case "prepaid_card":
        label = "Prepaid Card"
        if (subType) {
          switch (subType) {
            case "atm_withdraw":
              label += " (ATM Withdraw)"
              break
            case "atm_balance":
              label += " (ATM Balance Check)"
              break
            case "atm_deposit":
              label += " (ATM Deposit)"
              break
          }

          if (atmType) {
            label += ` - ${atmType}`
          }
        }
        break
    }

    return label
  }

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "USD":
        return "$"
      case "EUR":
        return "€"
      case "TRY":
        return "₺"
      case "GBP":
        return "£"
      default:
        return "$"
    }
  }

  const formatFee = (commission: any) => {
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
                  <span>{getTypeLabel(commission.type, commission.subType, commission.atmType)}</span>
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
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
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

