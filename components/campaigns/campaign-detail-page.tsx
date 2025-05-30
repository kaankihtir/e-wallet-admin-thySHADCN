"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  Edit, 
  Gift, 
  Home, 
  Users, 
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeftRight,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  Mail,
  Phone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CampaignForm } from "./campaign-form"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock campaign data
const getMockCampaign = (id: string) => {
  const campaigns = [
    {
      id: "CAM-001",
      name: "Holiday Special",
      startDate: new Date("2023-12-01"),
      endDate: new Date("2024-01-31"),
      status: "Active",
      cashbackType: "PERCENTAGE",
      cashbackValue: "5",
      currency: "USD",
      maximumCashback: "10000",
      totalUsage: 245,
      totalCashback: 3456.78,
      progress: 35,
      targets: [
        { key: "merchant_id", operator: "IN", value: "MER123,MER456" },
        { key: "transaction_type", operator: "EQUALS", value: "PURCHASE" },
      ],
      transactions: [
        { id: "TRX-1001", date: "2023-12-15", amount: 100.00, cashback: 5.00, customer: "John Doe" },
        { id: "TRX-1002", date: "2023-12-16", amount: 250.00, cashback: 12.50, customer: "Jane Smith" },
        { id: "TRX-1003", date: "2023-12-18", amount: 75.00, cashback: 3.75, customer: "Mike Johnson" },
      ],
      customers: [
        { id: "CUS-001", name: "John Doe", usageCount: 5, totalCashback: 25.00 },
        { id: "CUS-002", name: "Jane Smith", usageCount: 3, totalCashback: 37.50 },
        { id: "CUS-003", name: "Mike Johnson", usageCount: 2, totalCashback: 8.75 },
      ]
    },
    {
      id: "CAM-002",
      name: "New User Bonus",
      startDate: new Date("2023-11-15"),
      endDate: null,
      status: "Active",
      cashbackType: "AMOUNT",
      cashbackValue: "10",
      currency: "USD",
      maximumCashback: "",
      totalUsage: 127,
      totalCashback: 1270.00,
      progress: 0,
      targets: [
        { key: "user_segment", operator: "EQUALS", value: "NEW_USER" },
      ],
      transactions: [
        { id: "TRX-2001", date: "2023-11-16", amount: 85.00, cashback: 10.00, customer: "Robert Brown" },
        { id: "TRX-2002", date: "2023-11-17", amount: 120.00, cashback: 10.00, customer: "Lisa Green" },
        { id: "TRX-2003", date: "2023-11-20", amount: 55.00, cashback: 10.00, customer: "David Wilson" },
      ],
      customers: [
        { id: "CUS-004", name: "Robert Brown", usageCount: 1, totalCashback: 10.00 },
        { id: "CUS-005", name: "Lisa Green", usageCount: 1, totalCashback: 10.00 },
        { id: "CUS-006", name: "David Wilson", usageCount: 1, totalCashback: 10.00 },
      ]
    },
  ]

  return campaigns.find(c => c.id === id) || campaigns[0]
}

// Update the mock transaction data to match the TransactionsTable format
const getMockTransactions = (campaignId: string) => {
  const campaign = getMockCampaign(campaignId)
  
  // Generate mock transactions based on the sample ones
  const baseTransactions = campaign.transactions || []
  const mockTransactions = []
  
  for (let i = 0; i < 20; i++) {
    const baseTrx = baseTransactions[i % baseTransactions.length]
    if (!baseTrx) continue
    
    const trxDate = new Date(baseTrx.date)
    trxDate.setDate(trxDate.getDate() + i)
    
    const type = i % 3 === 0 ? "topup" : i % 3 === 1 ? "withdraw" : "transfer"
    const status = i % 5 === 0 ? "processing" : i % 10 === 0 ? "failed" : "completed"
    const customerEmail = `${baseTrx.customer.toLowerCase().replace(' ', '.')}@example.com`
    const amount = Math.round(baseTrx.amount * (0.8 + Math.random() * 0.4) * 100) / 100
    
    mockTransactions.push({
      id: `TRX-${1000 + i}`,
      customer: baseTrx.customer,
      email: customerEmail,
      type: type as "topup" | "withdraw" | "transfer",
      amount: `$${amount.toFixed(2)}`,
      fee: `$${(amount * 0.01).toFixed(2)}`,
      status: status as "completed" | "processing" | "failed",
      date: format(trxDate, "MM.dd.yyyy HH:mm"),
      method: i % 2 === 0 ? "Bank Transfer" : "Credit Card",
      cashback: campaign.cashbackType === "PERCENTAGE" 
        ? Math.round(amount * (Number(campaign.cashbackValue) / 100) * 100) / 100
        : Number(campaign.cashbackValue),
      flagged: i % 7 === 0,
      flagReason: i % 7 === 0 ? "Contains suspicious term in description" : undefined
    })
  }
  
  return mockTransactions
}

// Mock customer data (simulate a larger dataset)
const getMockCustomers = (campaignId: string) => {
  const campaign = getMockCampaign(campaignId)
  
  // Generate 30 mock customers based on the sample ones
  const baseCustomers = campaign.customers || []
  const mockCustomers = []
  
  for (let i = 0; i < 30; i++) {
    const baseCustomer = baseCustomers[i % baseCustomers.length]
    if (!baseCustomer) continue
    
    const firstName = baseCustomer.name.split(' ')[0]
    const lastName = i > 15 ? `Smith-${i}` : `Customer-${i}`
    mockCustomers.push({
      id: `CUS-${100 + i}`,
      name: `${firstName} ${lastName}`,
      initials: `${firstName[0]}${lastName[0]}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 ${530 + i} ${100 + Math.floor(Math.random() * 900)} ${1000 + Math.floor(Math.random() * 9000)}`,
      usageCount: Math.floor(Math.random() * 10) + 1,
      totalCashback: Math.round((Math.random() * 100) * 100) / 100,
      milesAndSmilesId: `TK${1000000 + i}`,
    })
  }
  
  return mockCustomers
}

// Helper functions for transaction display
const getTypeIcon = (type: "topup" | "withdraw" | "transfer") => {
  switch (type) {
    case "topup":
      return <ArrowDownCircle className="h-4 w-4 text-green-500" />;
    case "withdraw":
      return <ArrowUpCircle className="h-4 w-4 text-red-500" />;
    case "transfer":
      return <ArrowLeftRight className="h-4 w-4 text-blue-500" />;
    default:
      return null;
  }
};

const getTypeText = (type: "topup" | "withdraw" | "transfer") => {
  switch (type) {
    case "topup":
      return "Top-up";
    case "withdraw":
      return "Withdrawal";
    case "transfer":
      return "Transfer";
    default:
      return type;
  }
};

export function CampaignDetailPage({ id }: { id: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [campaign] = useState(getMockCampaign(id))
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [transactions] = useState(getMockTransactions(id))
  const [customers] = useState(getMockCustomers(id))
  const [searchQuery, setSearchQuery] = useState("")
  const [customerSearchQuery, setCustomerSearchQuery] = useState("")
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<string | null>(null)
  const [transactionStatusFilter, setTransactionStatusFilter] = useState<string | null>(null)
  
  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by search query
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Filter by type
    const matchesType = !transactionTypeFilter || transaction.type === transactionTypeFilter;
    
    // Filter by status
    const matchesStatus = !transactionStatusFilter || transaction.status === transactionStatusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    return (
      customer.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
      customer.milesAndSmilesId.toLowerCase().includes(customerSearchQuery.toLowerCase())
    );
  });

  const handleSaveChanges = (data: any) => {
    console.log("Updated campaign data:", data)

    toast({
      title: "Campaign updated",
      description: `Campaign "${data.name}" has been updated successfully.`,
    })

    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with campaign ID and status */}
      <Card className="border rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full" 
                onClick={() => router.push("/campaigns")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="link" 
                className="h-auto p-0" 
                onClick={() => router.push("/")}
              >
                <Home className="h-4 w-4 mr-1" />
                <span>Dashboard</span>
              </Button>
              <ChevronRight className="h-4 w-4" />
              <Button 
                variant="link" 
                className="h-auto p-0" 
                onClick={() => router.push("/campaigns")}
              >
                <Gift className="h-4 w-4 mr-1" />
                <span>Campaigns</span>
              </Button>
              <ChevronRight className="h-4 w-4" />
              <span>{campaign.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{campaign.name}</h1>
                <Badge 
                  variant={
                    campaign.status === "Active" ? "default" : 
                    campaign.status === "Scheduled" ? "outline" : 
                    "secondary"
                  }
                >
                  {campaign.status}
                </Badge>
              </div>
              {!isEditing && activeTab === "overview" && (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                >
                  <Edit className="h-4 w-4 mr-2" /> 
                  Edit Campaign
                </Button>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex items-center mr-4">
                <span className="font-medium mr-1">ID:</span> {campaign.id}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {format(campaign.startDate, "MMM d, yyyy")} - {campaign.endDate ? format(campaign.endDate, "MMM d, yyyy") : "Ongoing"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Campaign Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.totalUsage}</div>
            <p className="text-xs text-muted-foreground">
              Campaign applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Cashback</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${campaign.totalCashback.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {campaign.cashbackType === "PERCENTAGE" 
                ? `${campaign.cashbackValue}% cashback rate`
                : `${campaign.cashbackValue} ${campaign.currency} fixed amount`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">
              Customers using this campaign
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {isEditing ? (
            <CampaignForm 
              initialData={{
                name: campaign.name,
                startDate: campaign.startDate,
                endDate: campaign.endDate ?? undefined,
                hasEndDate: !!campaign.endDate,
                currency: campaign.currency,
                cashbackType: campaign.cashbackType as "PERCENTAGE" | "AMOUNT",
                cashbackValue: campaign.cashbackValue,
                maximumCashback: campaign.maximumCashback,
                targets: campaign.targets.map(t => ({
                  key: t.key,
                  operator: t.operator,
                  value: t.value
                })),
              }}
              onSubmit={handleSaveChanges}
              onCancel={handleCancelEdit}
            />
          ) : (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Campaign Name</h3>
                      <div>{campaign.name}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Campaign Period</h3>
                      <div>
                        {format(campaign.startDate, "MMM d, yyyy")} - {campaign.endDate 
                          ? format(campaign.endDate, "MMM d, yyyy") 
                          : "Ongoing"}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Status</h3>
                      <div>
                        <Badge 
                          variant={
                            campaign.status === "Active" ? "default" : 
                            campaign.status === "Scheduled" ? "outline" : 
                            "secondary"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Currency</h3>
                      <div>
                        <Badge variant="outline">{campaign.currency}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Reward Type</h3>
                      <div>
                        {campaign.cashbackType === "PERCENTAGE" 
                          ? `${campaign.cashbackValue}% of transaction value` 
                          : `Fixed amount of ${campaign.cashbackValue} ${campaign.currency}`}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Maximum Cashback</h3>
                      <div>{campaign.maximumCashback ? `${campaign.maximumCashback} ${campaign.currency}` : "No limit"}</div>
                    </div>
                    
                    {campaign.maximumCashback && (
                      <div className="md:col-span-3 space-y-1 pt-2">
                        <h3 className="text-sm font-medium">Usage Progress</h3>
                        <div className="space-y-2">
                          <Progress value={campaign.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                              ${campaign.totalCashback.toFixed(2)} used
                            </span>
                            <span>
                              ${campaign.maximumCashback} ${campaign.currency} limit
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Target Criteria</h3>
                    <div className="space-y-2">
                      {campaign.targets.map((target, index) => (
                        <div key={index}>
                          {index > 0 && (
                            <div className="flex justify-center my-2">
                              <Badge variant="outline">AND</Badge>
                            </div>
                          )}
                          <div className="grid grid-cols-3 gap-2 p-2 border rounded-md">
                            <div>
                              <span className="text-xs font-medium">Key</span>
                              <p className="text-sm">{target.key.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                            </div>
                            <div>
                              <span className="text-xs font-medium">Operator</span>
                              <p className="text-sm">{target.operator === "EQUALS" ? "Equals" : "In"}</p>
                            </div>
                            <div>
                              <span className="text-xs font-medium">Value</span>
                              <p className="text-sm">{target.value}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search by ID, customer name or email..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={transactionTypeFilter || "all"} onValueChange={(value) => setTransactionTypeFilter(value === "all" ? null : value)}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="topup">Top-up</SelectItem>
                        <SelectItem value="withdraw">Withdrawal</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={transactionStatusFilter || "all"} onValueChange={(value) => setTransactionStatusFilter(value === "all" ? null : value)}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Transaction ID</TableHead>
                        <TableHead className="w-[200px]">Customer</TableHead>
                        <TableHead>Transaction Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Fee</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Cashback Earned</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.slice(0, 10).map((transaction) => (
                        <TableRow key={transaction.id} className={transaction.flagged ? "bg-amber-50" : ""}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-1">
                              {transaction.flagged && <AlertTriangle className="h-4 w-4 text-amber-600" />}
                              {transaction.id}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{transaction.customer}</div>
                              <div className="text-sm text-muted-foreground">
                                {transaction.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(transaction.type)}
                              <span>{getTypeText(transaction.type)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.fee}</TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
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
                          <TableCell className="font-medium text-green-600">
                            ${transaction.cashback.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Page 1 of {Math.ceil(filteredTransactions.length / 10)}
                    </div>
                    <Button variant="outline" size="sm">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <Input 
                    placeholder="Search by name, email or Miles & Smiles ID..." 
                    value={customerSearchQuery}
                    onChange={(e) => setCustomerSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
              
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Miles & Smiles ID</TableHead>
                        <TableHead>Usage Count</TableHead>
                        <TableHead>Total Cashback</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.slice(0, 10).map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback>{customer.initials}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{customer.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell className="font-mono text-sm">{customer.milesAndSmilesId}</TableCell>
                          <TableCell>{customer.usageCount}</TableCell>
                          <TableCell className="font-medium text-green-600">${customer.totalCashback.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => router.push(`/customers/${customer.id}`)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Customer Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call Customer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Page 1 of {Math.ceil(filteredCustomers.length / 10)}
                    </div>
                    <Button variant="outline" size="sm">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 