"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Wallet,
  DollarSign,
  Euro,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
  Minus,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for currency accounts
const currencyAccounts = [
  {
    currency: "TRY",
    symbol: "₺",
    name: "Turkish Lira",
    totalBalance: 12450.75,
    subAccounts: [
      { id: "TRY-DEBIT", type: "Debit", balance: 8750.25, lastTransaction: "2023-03-12", transactions: 24 },
      { id: "TRY-CREDIT", type: "Credit", balance: 2500.0, lastTransaction: "2023-03-10", transactions: 12 },
      { id: "TRY-CASHBACK", type: "Cashback", balance: 1200.5, lastTransaction: "2023-03-05", transactions: 8 },
      { id: "TRY-NONREF", type: "NonRefundable Credit", balance: 0.0, lastTransaction: "2023-02-15", transactions: 0 },
    ],
  },
  {
    currency: "USD",
    symbol: "$",
    name: "US Dollar",
    totalBalance: 2350.5,
    subAccounts: [
      { id: "USD-DEBIT", type: "Debit", balance: 1850.5, lastTransaction: "2023-03-08", transactions: 10 },
      { id: "USD-CREDIT", type: "Credit", balance: 500.0, lastTransaction: "2023-03-01", transactions: 5 },
      { id: "USD-CASHBACK", type: "Cashback", balance: 0.0, lastTransaction: null, transactions: 0 },
      { id: "USD-NONREF", type: "NonRefundable Credit", balance: 0.0, lastTransaction: null, transactions: 0 },
    ],
  },
  {
    currency: "EUR",
    symbol: "€",
    name: "Euro",
    totalBalance: 1750.25,
    subAccounts: [
      { id: "EUR-DEBIT", type: "Debit", balance: 1750.25, lastTransaction: "2023-03-05", transactions: 8 },
      { id: "EUR-CREDIT", type: "Credit", balance: 0.0, lastTransaction: null, transactions: 0 },
      { id: "EUR-CASHBACK", type: "Cashback", balance: 0.0, lastTransaction: null, transactions: 0 },
      { id: "EUR-NONREF", type: "NonRefundable Credit", balance: 0.0, lastTransaction: null, transactions: 0 },
    ],
  },
]

// Mock transactions for each sub-account
const mockTransactions = {
  "TRY-DEBIT": [
    { id: "TR123456", type: "deposit", amount: 500.0, date: "2023-03-12", description: "Bank transfer" },
    { id: "TR123457", type: "withdrawal", amount: 200.0, date: "2023-03-10", description: "ATM withdrawal" },
    { id: "TR123458", type: "deposit", amount: 1000.0, date: "2023-03-05", description: "Salary payment" },
  ],
  "TRY-CREDIT": [
    { id: "TR123459", type: "deposit", amount: 1500.0, date: "2023-03-10", description: "Credit load" },
    { id: "TR123460", type: "withdrawal", amount: 500.0, date: "2023-03-08", description: "Purchase" },
  ],
  "TRY-CASHBACK": [
    { id: "TR123461", type: "deposit", amount: 50.5, date: "2023-03-05", description: "Shopping cashback" },
    { id: "TR123462", type: "deposit", amount: 25.0, date: "2023-03-01", description: "Dining cashback" },
    { id: "TR123463", type: "withdrawal", amount: 75.0, date: "2023-02-28", description: "Cashback redemption" },
  ],
  "USD-DEBIT": [
    { id: "TR123464", type: "deposit", amount: 500.0, date: "2023-03-08", description: "International transfer" },
    { id: "TR123465", type: "withdrawal", amount: 150.0, date: "2023-03-05", description: "Online purchase" },
  ],
  "USD-CREDIT": [{ id: "TR123466", type: "deposit", amount: 500.0, date: "2023-03-01", description: "Credit load" }],
  "EUR-DEBIT": [
    { id: "TR123467", type: "deposit", amount: 1000.0, date: "2023-03-05", description: "International transfer" },
    { id: "TR123468", type: "withdrawal", amount: 250.0, date: "2023-03-01", description: "Online purchase" },
  ],
}

export function CustomerWallet({ customer }) {
  const router = useRouter()
  const [openCurrency, setOpenCurrency] = useState<string | null>("TRY")
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [balanceModalOpen, setBalanceModalOpen] = useState(false)
  const [selectedSubAccount, setSelectedSubAccount] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")
  const [operationType, setOperationType] = useState("deposit")

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case "TRY":
        return <Wallet className="h-5 w-5" />
      case "USD":
        return <DollarSign className="h-5 w-5" />
      case "EUR":
        return <Euro className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currencyAccounts.find((acc) => acc.currency === currency)?.symbol || ""
    return `${symbol}${amount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  const totalBalance = currencyAccounts.reduce((sum, account) => sum + account.totalBalance, 0)

  const handleAdjustBalance = (subAccount: any, currency: string) => {
    setSelectedSubAccount({ ...subAccount, currency })
    setAmount("")
    setReason("")
    setOperationType("deposit")
    setBalanceModalOpen(true)
  }

  const handleSubmitBalanceAdjustment = () => {
    // In a real implementation, this would call an API to adjust the balance
    console.log({
      accountId: selectedSubAccount.id,
      amount: Number.parseFloat(amount),
      operationType,
      reason,
    })

    // Close the modal
    setBalanceModalOpen(false)

    // Show success message or update UI
    alert(
      `Balance ${operationType === "deposit" ? "added to" : "withdrawn from"} ${selectedSubAccount.type} account: ${amount} ${selectedSubAccount.currency}`,
    )
  }

  const viewAccountTransactions = (accountId: string) => {
    // Navigate to transactions tab with filters applied
    const [currency, accountType] = accountId.split("-")

    // Navigate to the transactions tab with the appropriate filters
    router.push(
      `/customers/${customer.id}?tab=transactions&currency=${currency}&accountType=${accountType}&accountId=${accountId}`,
    )
  }

  return (
    <div className="space-y-6">
      {/* Currency Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currencyAccounts.map((account) => (
          <Card key={account.currency} className="relative overflow-hidden">
            <div
              className={`absolute top-0 left-0 w-1 h-full ${
                account.currency === "TRY"
                  ? "bg-blue-500"
                  : account.currency === "USD"
                    ? "bg-green-500"
                    : "bg-amber-500"
              }`}
            />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getCurrencyIcon(account.currency)}
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                </div>
                <Badge variant="outline">{account.currency}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{formatCurrency(account.totalBalance, account.currency)}</div>
              <div className="text-sm text-muted-foreground mb-2">
                {account.subAccounts.filter((sub) => sub.balance > 0).length} active sub-accounts
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    account.currency === "TRY"
                      ? "bg-blue-500"
                      : account.currency === "USD"
                        ? "bg-green-500"
                        : "bg-amber-500"
                  }`}
                  style={{ width: `${(account.totalBalance / totalBalance) * 100}%` }}
                />
              </div>
              <div className="text-xs text-right mt-1 text-muted-foreground">
                {((account.totalBalance / totalBalance) * 100).toFixed(1)}% of total
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Account Transactions */}
      {selectedAccount && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Account Transactions</CardTitle>
              <CardDescription>
                {selectedAccount.split("-")[0]} -{" "}
                {selectedAccount.split("-")[1].charAt(0) + selectedAccount.split("-")[1].slice(1).toLowerCase()} Account
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedAccount(null)}>
              Back to Accounts
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions[selectedAccount]?.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(transaction.amount, selectedAccount.split("-")[0])}</TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                  </TableRow>
                ))}
                {(!mockTransactions[selectedAccount] || mockTransactions[selectedAccount].length === 0) && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No transactions found for this account
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => viewAccountTransactions(selectedAccount)}>
                <Eye className="mr-2 h-4 w-4" />
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Currency Accounts Detail */}
      {!selectedAccount && (
        <Card>
          <CardHeader>
            <CardTitle>Currency Accounts</CardTitle>
            <CardDescription>Manage customer's currency accounts and sub-accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currencyAccounts.map((account) => (
              <Collapsible
                key={account.currency}
                open={openCurrency === account.currency}
                onOpenChange={() => setOpenCurrency(openCurrency === account.currency ? null : account.currency)}
                className="border rounded-md"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    {getCurrencyIcon(account.currency)}
                    <div>
                      <div className="font-medium">{account.name}</div>
                      <div className="text-sm text-muted-foreground">{account.subAccounts.length} sub-accounts</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(account.totalBalance, account.currency)}</div>
                      <div className="text-sm text-muted-foreground">Total Balance</div>
                    </div>
                    {openCurrency === account.currency ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0 border-t">
                    <div className="space-y-4">
                      {/* Card View */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {account.subAccounts.map((subAccount) => (
                          <Card key={subAccount.id} className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">{subAccount.type}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-xl font-bold">
                                {formatCurrency(subAccount.balance, account.currency)}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Last transaction: {formatDate(subAccount.lastTransaction)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {subAccount.transactions} transactions
                              </div>
                              <Progress
                                value={(subAccount.balance / (account.totalBalance || 1)) * 100}
                                className="h-1 mt-2"
                              />
                              <div className="flex justify-between mt-3 gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => viewAccountTransactions(subAccount.id)}
                                  disabled={subAccount.transactions === 0}
                                >
                                  <Eye className="h-3.5 w-3.5 mr-1" />
                                  Transactions
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => handleAdjustBalance(subAccount, account.currency)}
                                >
                                  <Plus className="h-3.5 w-3.5 mr-1" />
                                  Adjust
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Table View */}
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Account Type</TableHead>
                              <TableHead>Balance</TableHead>
                              <TableHead>Last Transaction</TableHead>
                              <TableHead>Transaction Count</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {account.subAccounts.map((subAccount) => (
                              <TableRow key={subAccount.id}>
                                <TableCell className="font-medium">{subAccount.type}</TableCell>
                                <TableCell>{formatCurrency(subAccount.balance, account.currency)}</TableCell>
                                <TableCell>{formatDate(subAccount.lastTransaction)}</TableCell>
                                <TableCell>{subAccount.transactions}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => viewAccountTransactions(subAccount.id)}
                                      disabled={subAccount.transactions === 0}
                                    >
                                      <Eye className="h-3.5 w-3.5 mr-1" />
                                      Transactions
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleAdjustBalance(subAccount, account.currency)}
                                    >
                                      <Plus className="h-3.5 w-3.5 mr-1" />
                                      Adjust
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Balance Adjustment Modal */}
      <Dialog open={balanceModalOpen} onOpenChange={setBalanceModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adjust Account Balance</DialogTitle>
            <DialogDescription>
              {selectedSubAccount && (
                <>
                  {selectedSubAccount.type} Account ({selectedSubAccount.currency}) Current Balance:{" "}
                  {selectedSubAccount && formatCurrency(selectedSubAccount.balance, selectedSubAccount.currency)}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <RadioGroup
              defaultValue="deposit"
              value={operationType}
              onValueChange={setOperationType}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deposit" id="deposit" />
                <Label htmlFor="deposit" className="flex items-center">
                  <Plus className="h-4 w-4 mr-1 text-green-500" />
                  Deposit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="withdraw" id="withdraw" />
                <Label htmlFor="withdraw" className="flex items-center">
                  <Minus className="h-4 w-4 mr-1 text-red-500" />
                  Withdraw
                </Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    {selectedSubAccount?.currency === "TRY"
                      ? "₺"
                      : selectedSubAccount?.currency === "USD"
                        ? "$"
                        : selectedSubAccount?.currency === "EUR"
                          ? "€"
                          : ""}
                  </span>
                  <Input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-7"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for adjustment"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSubmitBalanceAdjustment}
              disabled={!amount || Number.parseFloat(amount) <= 0 || !reason}
            >
              {operationType === "deposit" ? "Add Balance" : "Withdraw Balance"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

