"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import {
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Shield,
  AlertTriangle,
  LogIn,
  LogOut,
  Settings,
  MousePointer,
  KeySquare,
  UserCog,
  CheckCircle,
  HelpCircle,
  DollarSign,
  Receipt,
  ExternalLink,
  Filter
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

// Mock data for charts
const activityData = [
  { name: "Jan", transactions: 5, logins: 12 },
  { name: "Feb", transactions: 8, logins: 15 },
  { name: "Mar", transactions: 12, logins: 18 },
  { name: "Apr", transactions: 7, logins: 10 },
  { name: "May", transactions: 10, logins: 14 },
  { name: "Jun", transactions: 15, logins: 20 },
]

const balanceHistory = [
  { name: "Jan", balance: 5000 },
  { name: "Feb", balance: 7500 },
  { name: "Mar", balance: 6800 },
  { name: "Apr", balance: 9200 },
  { name: "May", balance: 11000 },
  { name: "Jun", balance: 12450 },
]

const recentTransactions = [
  {
    id: "TR123456",
    type: "topup",
    amount: "$500.00",
    date: "Mar 12, 2023",
    status: "completed",
  },
  {
    id: "TR123457",
    type: "withdrawal",
    amount: "$200.00",
    date: "Mar 10, 2023",
    status: "completed",
  },
  {
    id: "TR123458",
    type: "transfer",
    amount: "$350.00",
    date: "Mar 8, 2023",
    status: "completed",
  },
  {
    id: "TR123459",
    type: "topup",
    amount: "$1,000.00",
    date: "Mar 5, 2023",
    status: "completed",
  },
]

// Mock data for user activity
const userActivityData = [
  {
    id: 1,
    type: "page_view",
    event: "dashboard.view",
    timestamp: "2023-03-15T14:30:00",
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384756"
  },
  {
    id: 2,
    type: "page_view",
    event: "transactions.list.view",
    timestamp: "2023-03-15T14:35:00",
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384756"
  },
  {
    id: 3,
    type: "auth",
    event: "user.login.success",
    timestamp: "2023-03-15T14:30:00",
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384756",
    authMethod: "password"
  },
  {
    id: 4,
    type: "auth",
    event: "user.password.reset.request",
    timestamp: "2023-03-10T09:45:00",
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384712",
    authMethod: "email"
  },
  {
    id: 5,
    type: "settings",
    event: "user.settings.notifications.update",
    timestamp: "2023-03-08T16:20:00",
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384700",
    changes: {
      email_notifications: true,
      push_notifications: false
    }
  },
  {
    id: 6,
    type: "payment",
    event: "payment.method.add",
    timestamp: "2023-03-05T11:15:00",
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384693",
    paymentMethod: "card",
    cardType: "visa",
    last4: "4242"
  },
  {
    id: 7,
    type: "transaction",
    event: "transaction.create",
    timestamp: "2023-03-03T13:40:00",
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384680",
    transactionId: "TRX-87654321",
    amount: "250.00",
    currency: "USD",
    status: "completed"
  },
  {
    id: 8,
    type: "support",
    event: "support.ticket.create",
    timestamp: "2023-02-28T10:05:00",
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384650",
    ticketId: "TKT-12345678",
    category: "payment_issue"
  },
  {
    id: 9,
    type: "profile",
    event: "user.profile.update",
    timestamp: "2023-02-25T15:30:00",
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384642",
    fields: ["address", "phone"]
  },
  {
    id: 10,
    type: "auth",
    event: "user.2fa.enable",
    timestamp: "2023-02-20T09:15:00",
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384630",
    authMethod: "totp"
  },
  {
    id: 11,
    type: "page_view",
    event: "help.center.view",
    timestamp: "2023-02-18T14:20:00",
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384620"
  },
  {
    id: 12,
    type: "marketing",
    event: "marketing.email.clicked",
    timestamp: "2023-02-15T16:45:00",
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "New York, USA",
    userId: "U8765432",
    sessionId: "SES-29384610",
    campaignId: "CAMP-12345",
    emailId: "EM-567890"
  }
]

export function CustomerDetails({ customer }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="kyc">KYC & Documents</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 mt-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl">{customer.initials}</AvatarFallback>
                  </Avatar>
                  <Badge
                    variant={
                      customer.status === "verified"
                        ? "default"
                        : customer.status === "unverified"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {customer.status === "verified"
                      ? "Verified"
                      : customer.status === "unverified"
                        ? "Unverified"
                        : "Suspended"}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{customer.name}</CardTitle>
                <CardDescription>{customer.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Current Balance</div>
                    <div className="text-2xl font-bold">{customer.balance}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">KYC Level</div>
                      <Badge
                        variant="outline"
                        className={
                          customer.kycLevel === "full"
                            ? "border-green-500 text-green-500"
                            : customer.kycLevel === "medium"
                              ? "border-amber-500 text-amber-500"
                              : "border-gray-500 text-gray-500"
                        }
                      >
                        {customer.kycLevel === "full" ? "Full" : customer.kycLevel === "medium" ? "Medium" : "Basic"}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Join Date</div>
                      <div className="text-sm font-medium">{customer.joinDate}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">{customer.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">{customer.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">{customer.phone}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">123 Main St, New York, NY 10001</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      Edit
                    </Button>
                    <Button className="flex-1">Contact</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Total Transactions</div>
                    <div className="text-2xl font-bold">57</div>
                    <div className="flex items-center text-sm text-green-500">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      12% from last month
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Average Transaction</div>
                    <div className="text-2xl font-bold">$325.50</div>
                    <div className="flex items-center text-sm text-red-500">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      3% from last month
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Last Activity</div>
                    <div className="text-2xl font-bold">2 days ago</div>
                    <div className="text-sm text-muted-foreground">Mar 10, 2023 at 14:32</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Balance History</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={balanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Balance"]} />
                    <Line type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="transactions" name="Transactions" fill="#4f46e5" />
                    <Bar dataKey="logins" name="Logins" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full p-2 bg-muted">
                      {transaction.type === "topup" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : transaction.type === "withdrawal" ? (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <CreditCard className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {transaction.type === "topup"
                          ? "Top-up"
                          : transaction.type === "withdrawal"
                            ? "Withdrawal"
                            : "Transfer"}
                      </div>
                      <div className="text-sm text-muted-foreground">{transaction.id}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{transaction.amount}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">View All Transactions</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="transactions" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Complete transaction history for this customer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <Wallet className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Transaction History</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This section will display the complete transaction history for this customer.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="kyc" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>KYC Documents</CardTitle>
            <CardDescription>Identity verification documents and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Identity Document</h3>
                      <p className="text-sm text-muted-foreground">Passport or ID card</p>
                    </div>
                    <Badge variant={customer.kycLevel !== "basic" ? "default" : "outline"}>
                      {customer.kycLevel !== "basic" ? "Verified" : "Required"}
                    </Badge>
                  </div>
                  {customer.kycLevel !== "basic" ? (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Document Type:</span>
                        <span>Passport</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Document Number:</span>
                        <span>P12345678</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Expiry Date:</span>
                        <span>12/25/2028</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Verified On:</span>
                        <span>01/18/2023</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Upload Document
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Proof of Address</h3>
                      <p className="text-sm text-muted-foreground">Utility bill or bank statement</p>
                    </div>
                    <Badge variant={customer.kycLevel === "full" ? "default" : "outline"}>
                      {customer.kycLevel === "full" ? "Verified" : "Required"}
                    </Badge>
                  </div>
                  {customer.kycLevel === "full" ? (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Document Type:</span>
                        <span>Utility Bill</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Address:</span>
                        <span>123 Main St, New York</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Issue Date:</span>
                        <span>01/05/2023</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Verified On:</span>
                        <span>01/18/2023</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Upload Document
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">KYC Verification Timeline</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="h-full w-0.5 bg-green-500"></div>
                    </div>
                    <div>
                      <div className="font-medium">Basic Verification Completed</div>
                      <div className="text-sm text-muted-foreground">Email and phone verification</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        01/15/2023
                        <Clock className="h-3 w-3 ml-2 mr-1" />
                        10:23 AM
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="h-full w-0.5 bg-green-500"></div>
                    </div>
                    <div>
                      <div className="font-medium">Identity Verification Completed</div>
                      <div className="text-sm text-muted-foreground">Passport verification</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        01/18/2023
                        <Clock className="h-3 w-3 ml-2 mr-1" />
                        02:45 PM
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="h-full w-0.5 bg-green-500"></div>
                    </div>
                    <div>
                      <div className="font-medium">Address Verification Completed</div>
                      <div className="text-sm text-muted-foreground">Utility bill verification</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        01/18/2023
                        <Clock className="h-3 w-3 ml-2 mr-1" />
                        03:12 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activity" className="space-y-4 mt-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Event Log</CardTitle>
                <CardDescription>System events and user interactions analytics</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                    <span className="font-medium">User ID:</span> U8765432
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Total events:</span> {userActivityData.length}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  All Events
                </Badge>
                <Badge variant="outline">Page Views</Badge>
                <Badge variant="outline">Auth Events</Badge>
                <Badge variant="outline">Transactions</Badge>
                <Badge variant="outline">Settings</Badge>
                <Badge variant="outline">Profile</Badge>
              </div>
            
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Event Type</TableHead>
                      <TableHead className="w-[120px]">Timestamp</TableHead>
                      <TableHead className="w-[200px]">Device Info</TableHead>
                      <TableHead className="w-[140px]">Location / IP</TableHead>
                      <TableHead className="w-[140px]">Session ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActivityData.map((activity) => (
                      <TableRow key={activity.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {activity.type === "page_view" && <MousePointer className="h-4 w-4 text-blue-500" />}
                            {activity.type === "auth" && 
                              (activity.event.includes("login") ? <LogIn className="h-4 w-4 text-green-500" /> : 
                                activity.event.includes("password") ? <KeySquare className="h-4 w-4 text-amber-500" /> :
                                <Shield className="h-4 w-4 text-green-500" />)
                            }
                            {activity.type === "settings" && <Settings className="h-4 w-4 text-gray-500" />}
                            {activity.type === "payment" && <CreditCard className="h-4 w-4 text-purple-500" />}
                            {activity.type === "transaction" && <DollarSign className="h-4 w-4 text-green-500" />}
                            {activity.type === "support" && <HelpCircle className="h-4 w-4 text-blue-500" />}
                            {activity.type === "profile" && <UserCog className="h-4 w-4 text-indigo-500" />}
                            {activity.type === "marketing" && <ExternalLink className="h-4 w-4 text-gray-500" />}
                            <div>
                              <div className="font-mono text-xs text-foreground">{activity.event}</div>
                              <div className="text-xs text-muted-foreground">
                                {activity.type}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-xs">{new Date(activity.timestamp).toLocaleDateString()}</div>
                          <div className="font-mono text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleTimeString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">{activity.device}</div>
                          <div className="text-xs text-muted-foreground">{activity.browser} / {activity.os}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">{activity.location}</div>
                          <div className="font-mono text-xs text-muted-foreground">{activity.ip}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-xs truncate">{activity.sessionId}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">12</span> of <span className="font-medium">254</span> events
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

// Helper component for the check icon
function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

// Helper component for the lock icon
function Lock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

