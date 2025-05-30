"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpCircle, ArrowDownCircle, ArrowLeftRight, Search } from "lucide-react"

// Mock transaction data
const mockTransactions = [
  {
    id: "TR001",
    date: "2023-03-15",
    type: "purchase",
    merchant: "Amazon Turkey",
    amount: "₺250.75",
    status: "completed",
  },
  {
    id: "TR002",
    date: "2023-03-14",
    type: "purchase",
    merchant: "Migros Supermarket",
    amount: "₺125.50",
    status: "completed",
  },
  {
    id: "TR003",
    date: "2023-03-12",
    type: "refund",
    merchant: "Trendyol",
    amount: "₺75.00",
    status: "completed",
  },
  {
    id: "TR004",
    date: "2023-03-10",
    type: "withdrawal",
    merchant: "ATM",
    amount: "₺200.00",
    status: "completed",
  },
  {
    id: "TR005",
    date: "2023-03-08",
    type: "purchase",
    merchant: "MediaMarkt",
    amount: "₺1,200.00",
    status: "completed",
  },
  {
    id: "TR006",
    date: "2023-03-05",
    type: "purchase",
    merchant: "Starbucks",
    amount: "₺45.00",
    status: "completed",
  },
  {
    id: "TR007",
    date: "2023-03-03",
    type: "purchase",
    merchant: "Yemeksepeti",
    amount: "₺85.50",
    status: "completed",
  },
]

export function PrepaidCardTransactions({ cardId }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [transactions, setTransactions] = useState(mockTransactions)

  // Calculate summary statistics
  const totalSpent = transactions
    .filter((t) => t.type === "purchase")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount.replace("₺", "").replace(",", "")), 0)

  const totalRefunded = transactions
    .filter((t) => t.type === "refund")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount.replace("₺", "").replace(",", "")), 0)

  const totalWithdrawn = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount.replace("₺", "").replace(",", "")), 0)

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || transaction.type === filterType

    return matchesSearch && matchesType
  })

  const getTransactionIcon = (type) => {
    switch (type) {
      case "purchase":
        return <ArrowUpCircle className="h-4 w-4 text-red-500" />
      case "refund":
        return <ArrowDownCircle className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpCircle className="h-4 w-4 text-red-500" />
      default:
        return <ArrowLeftRight className="h-4 w-4 text-blue-500" />
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  return (
    <div className="space-y-6">
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ₺{totalSpent.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ₺{totalRefunded.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Withdrawn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ₺{totalWithdrawn.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="purchase">Purchases</SelectItem>
            <SelectItem value="refund">Refunds</SelectItem>
            <SelectItem value="withdrawal">Withdrawals</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.merchant}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : transaction.status === "pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {transaction.status === "completed"
                        ? "Completed"
                        : transaction.status === "pending"
                          ? "Pending"
                          : "Failed"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

