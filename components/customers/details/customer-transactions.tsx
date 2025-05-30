"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeftRight,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  CreditCard,
  Globe,
  AlertTriangle,
} from "lucide-react"
import { TransactionDetailsDialog } from "@/components/customers/details/transaction-details-dialog"

// Add TypeScript interfaces for our data
interface PrepaidCard {
  id: string;
  name: string;
  number: string;
  type: string;
}

interface Transaction {
  id: string;
  customer: string;
  email: string;
  type: "topup" | "withdraw" | "transfer";
  amount: string;
  fee: string;
  status: "completed" | "processing" | "failed";
  date: string;
  method: string;
  currency: string;
  subAccountType: string;
  subAccountId: string;
  description: string;
  reference: string;
  ipAddress: string;
  device: string;
  location: string;
  prepaidCard: PrepaidCard | null;
  flagged?: boolean;
  flagReason?: string;
}

// Mock transactions data with currency and sub-account information
const transactions = [
  {
    id: "TR123456",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "topup",
    amount: "₺2,500.00",
    fee: "₺0.00",
    status: "completed",
    date: "03.12.2023 14:32",
    method: "Bank Transfer",
    currency: "TRY",
    subAccountType: "Debit",
    subAccountId: "TRY-DEBIT",
    description: "Bank transfer deposit",
    reference: "REF123456",
    ipAddress: "192.168.1.1",
    device: "Web Browser (Chrome)",
    location: "Istanbul, Turkey",
    prepaidCard: null
  },
  {
    id: "TR123457",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "withdraw",
    amount: "₺1,200.00",
    fee: "₺3.50",
    status: "completed",
    date: "03.12.2023 13:45",
    method: "Bank Transfer",
    currency: "TRY",
    subAccountType: "Debit",
    subAccountId: "TRY-DEBIT",
    description: "Bank withdrawal for crypto exchange",
    reference: "REF123457",
    ipAddress: "192.168.1.1",
    device: "Web Browser (Chrome)",
    location: "Istanbul, Turkey",
    prepaidCard: null,
    flagged: true,
    flagReason: "Contains suspicious term 'crypto' in description"
  },
  {
    id: "TR123458",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "transfer",
    amount: "₺500.00",
    fee: "₺1.50",
    status: "processing",
    date: "03.12.2023 12:30",
    method: "Wallet Transfer",
    currency: "TRY",
    subAccountType: "Credit",
    subAccountId: "TRY-CREDIT",
    description: "Internal wallet transfer",
    reference: "REF123458",
    ipAddress: "192.168.1.1",
    device: "Mobile App (iOS)",
    location: "Istanbul, Turkey",
    prepaidCard: null
  },
  {
    id: "TR123459",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "topup",
    amount: "₺3,000.00",
    fee: "₺0.00",
    status: "completed",
    date: "03.12.2023 11:15",
    method: "Credit Card",
    currency: "TRY",
    subAccountType: "Cashback",
    subAccountId: "TRY-CASHBACK",
    description: "Credit card deposit",
    reference: "REF123459",
    ipAddress: "192.168.1.1",
    device: "Mobile App (iOS)",
    location: "Istanbul, Turkey",
    prepaidCard: null
  },
  {
    id: "TR123460",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "withdraw",
    amount: "₺750.00",
    fee: "₺2.25",
    status: "failed",
    date: "03.12.2023 10:22",
    method: "Bank Transfer",
    currency: "TRY",
    subAccountType: "Debit",
    subAccountId: "TRY-DEBIT",
    description: "Failed bank withdrawal for gambling site",
    reference: "REF123460",
    ipAddress: "192.168.1.1",
    device: "Web Browser (Chrome)",
    location: "Istanbul, Turkey",
    prepaidCard: null,
    flagged: true,
    flagReason: "Contains suspicious term 'gambling' in description"
  },
  {
    id: "TR123461",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "transfer",
    amount: "$1,500.00",
    fee: "$4.50",
    status: "completed",
    date: "03.11.2023 16:45",
    method: "Wallet Transfer",
    currency: "USD",
    subAccountType: "Debit",
    subAccountId: "USD-DEBIT",
    description: "Internal wallet transfer",
    reference: "REF123461",
    ipAddress: "192.168.1.1",
    device: "Mobile App (iOS)",
    location: "Istanbul, Turkey",
    prepaidCard: null
  },
  {
    id: "TR123462",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "topup",
    amount: "$1,000.00",
    fee: "$0.00",
    status: "completed",
    date: "03.11.2023 14:20",
    method: "Credit Card",
    currency: "USD",
    subAccountType: "Credit",
    subAccountId: "USD-CREDIT",
    description: "Credit card deposit",
    reference: "REF123462",
    ipAddress: "192.168.1.1",
    device: "Web Browser (Chrome)",
    location: "Istanbul, Turkey",
    prepaidCard: null
  },
  {
    id: "TR123463",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "withdraw",
    amount: "€2,000.00",
    fee: "€6.00",
    status: "processing",
    date: "03.11.2023 11:10",
    method: "Bank Transfer",
    currency: "EUR",
    subAccountType: "Debit",
    subAccountId: "EUR-DEBIT",
    description: "Bank withdrawal",
    reference: "REF123463",
    ipAddress: "192.168.1.1",
    device: "Mobile App (iOS)",
    location: "Istanbul, Turkey",
    prepaidCard: null
  },
  // Add prepaid card transactions
  {
    id: "TR234567",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "transfer",
    amount: "₺150.00",
    fee: "₺0.00",
    status: "completed",
    date: "03.12.2023 09:45",
    method: "Card Payment",
    currency: "TRY",
    subAccountType: "Prepaid",
    subAccountId: "CARD-TRY-1",
    description: "Payment at Migros Supermarket",
    reference: "REF234567",
    ipAddress: "192.168.1.1",
    device: "POS Terminal",
    location: "Istanbul, Turkey",
    prepaidCard: {
      id: "CARD001",
      name: "Platinum Debit Card",
      number: "5412 **** **** 7890",
      type: "physical"
    }
  },
  {
    id: "TR234568",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "transfer",
    amount: "₺75.50",
    fee: "₺0.00",
    status: "completed",
    date: "03.12.2023 08:20",
    method: "Card Payment",
    currency: "TRY",
    subAccountType: "Prepaid",
    subAccountId: "CARD-TRY-1",
    description: "Payment at Starbucks",
    reference: "REF234568",
    ipAddress: "192.168.1.1",
    device: "POS Terminal",
    location: "Istanbul, Turkey",
    prepaidCard: {
      id: "CARD001",
      name: "Platinum Debit Card",
      number: "5412 **** **** 7890",
      type: "physical"
    }
  },
  {
    id: "TR234569",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "transfer",
    amount: "$120.00",
    fee: "$0.00",
    status: "completed",
    date: "03.12.2023 07:15",
    method: "Online Payment",
    currency: "USD",
    subAccountType: "Prepaid",
    subAccountId: "CARD-USD-1",
    description: "Payment at Amazon.com",
    reference: "REF234569",
    ipAddress: "192.168.1.1",
    device: "Web Browser (Chrome)",
    location: "Istanbul, Turkey",
    prepaidCard: {
      id: "CARD002",
      name: "Online Shopping Card",
      number: "4532 **** **** 1234",
      type: "virtual"
    }
  },
  {
    id: "TR234570",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "transfer",
    amount: "€45.99",
    fee: "€0.00",
    status: "completed",
    date: "03.11.2023 22:30",
    method: "Online Payment",
    currency: "EUR",
    subAccountType: "Prepaid",
    subAccountId: "CARD-EUR-1",
    description: "Payment at Zalando",
    reference: "REF234570",
    ipAddress: "192.168.1.1",
    device: "Mobile App (iOS)",
    location: "Istanbul, Turkey",
    prepaidCard: {
      id: "CARD008",
      name: "E-commerce Card",
      number: "4532 **** **** 5432",
      type: "virtual"
    }
  }
]

// Available currencies and sub-account types for filtering
const currencies = [
  { value: "all", label: "All Currencies" },
  { value: "TRY", label: "Turkish Lira (TRY)" },
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
]

const subAccountTypes = [
  { value: "all", label: "All Account Types" },
  { value: "Debit", label: "Debit" },
  { value: "Credit", label: "Credit" },
  { value: "Cashback", label: "Cashback" },
  { value: "NonRefundable", label: "NonRefundable Credit" },
]

export function CustomerTransactions({ customerId }: { customerId: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [transactionType, setTransactionType] = useState("all")
  const [currency, setCurrency] = useState("all")
  const [subAccountType, setSubAccountType] = useState("all")
  const [subAccountId, setSubAccountId] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const pageSize = 5

  // Initialize filters from URL query parameters
  useEffect(() => {
    const type = searchParams.get("type") || "all"
    const curr = searchParams.get("currency") || "all"
    const accType = searchParams.get("accountType") || "all"
    const accId = searchParams.get("accountId") || ""

    setTransactionType(type)
    setCurrency(curr)
    setSubAccountType(accType)
    setSubAccountId(accId)
  }, [searchParams])

  // Update URL when filters change
  const updateFilters = (filters: {
    type: string;
    currency: string;
    accountType: string;
    accountId: string;
  }) => {
    const params = new URLSearchParams()
    if (filters.type !== "all") params.append("type", filters.type)
    if (filters.currency !== "all") params.append("currency", filters.currency)
    if (filters.accountType !== "all") params.append("accountType", filters.accountType)
    if (filters.accountId) params.append("accountId", filters.accountId)

    router.push(`/customers/${customerId}?tab=transactions&${params.toString()}`)
  }

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by search query
    if (searchQuery && !transaction.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by transaction type
    if (transactionType !== "all" && transaction.type !== transactionType) {
      return false
    }

    // Filter by currency
    if (currency !== "all" && transaction.currency !== currency) {
      return false
    }

    // Filter by sub-account type
    if (subAccountType !== "all" && transaction.subAccountType !== subAccountType) {
      return false
    }

    // Filter by specific sub-account ID
    if (subAccountId && transaction.subAccountId !== subAccountId) {
      return false
    }

    return true
  })

  const totalPages = Math.ceil(filteredTransactions.length / pageSize)
  const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "topup":
        return <ArrowDownCircle className="h-4 w-4 text-green-500" />
      case "withdraw":
        return <ArrowUpCircle className="h-4 w-4 text-red-500" />
      case "transfer":
        return <ArrowLeftRight className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "topup":
        return "Top-up"
      case "withdraw":
        return "Withdrawal"
      case "transfer":
        return "Transfer"
      default:
        return type
    }
  }

  const handleViewTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDetailsDialogOpen(true)
  }

  const resetFilters = () => {
    setTransactionType("all")
    setCurrency("all")
    setSubAccountType("all")
    setSubAccountId("")
    setSearchQuery("")
    updateFilters({
      type: "all",
      currency: "all",
      accountType: "all",
      accountId: "",
    })
  }

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case "type":
        setTransactionType(value)
        break
      case "currency":
        setCurrency(value)
        break
      case "accountType":
        setSubAccountType(value)
        break
      case "accountId":
        setSubAccountId(value)
        break
    }

    updateFilters({
      type: key === "type" ? value : transactionType,
      currency: key === "currency" ? value : currency,
      accountType: key === "accountType" ? value : subAccountType,
      accountId: key === "accountId" ? value : subAccountId,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Complete transaction history for this customer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transaction ID..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select value={transactionType} onValueChange={(value) => handleFilterChange("type", value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="topup">Top-up</SelectItem>
                  <SelectItem value="withdraw">Withdrawal</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={currency} onValueChange={(value) => handleFilterChange("currency", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Currencies" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.value} value={curr.value}>
                      {curr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={subAccountType} onValueChange={(value) => handleFilterChange("accountType", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Account Types" />
                </SelectTrigger>
                <SelectContent>
                  {subAccountTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" onClick={resetFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Reset
              </Button>

              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {subAccountId && (
            <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
              <Badge variant="outline">Filtered by account: {subAccountId}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSubAccountId("")
                  updateFilters({
                    type: transactionType,
                    currency: currency,
                    accountType: subAccountType,
                    accountId: "",
                  })
                }}
              >
                Clear
              </Button>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Prepaid Card</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className={transaction.flagged ? "bg-amber-50" : ""}
                    onClick={() => handleViewTransactionDetails(transaction)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1">
                        {transaction.flagged && <AlertTriangle className="h-4 w-4 text-amber-600" />}
                        {transaction.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <span>{getTypeText(transaction.type)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.currency}</Badge>
                    </TableCell>
                    <TableCell>{transaction.subAccountType}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.fee}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      {transaction.prepaidCard ? (
                        <div className="flex flex-col">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 mb-1 whitespace-nowrap">
                            {transaction.prepaidCard.type === "physical" ? 
                              <CreditCard className="h-3 w-3 mr-1" /> : 
                              <Globe className="h-3 w-3 mr-1" />
                            }
                            {transaction.prepaidCard.name}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-mono">
                            {transaction.prepaidCard.number}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "default"
                            : transaction.status === "processing"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {transaction.status === "completed"
                          ? "Completed"
                          : transaction.status === "processing"
                            ? "Processing"
                            : "Failed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewTransactionDetails(transaction)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {paginatedTransactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {filteredTransactions.length > 0 && (
              <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page > 1 ? page - 1 : 1)}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <TransactionDetailsDialog
        transaction={selectedTransaction}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </div>
  )
}

