"use client"
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
import { ArrowUpRight, ArrowDownRight, CreditCard, Shield, Wallet, DollarSign, Euro } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Define customer type for TypeScript
type CustomerData = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  countryCode: string;
  milesAndSmilesNumber: string;
  accountId: string;
  accountStatus: "active" | "suspended" | "closed";
  kycId: string;
  kycStatus: "verified" | "pending" | "rejected";
  kycLevel: string;
  walletId: string;
  walletStatus: "active" | "limited" | "blocked";
  balance: string;
  joinDate: string;
  address: string;
  nationality: string;
  citizenshipId: string;
  dateOfBirth: string;
  occupation: string;
  educationalBackground: string;
  sourceOfIncome: string;
  monthlyNetIncome: string;
  yearlyMoneyTransferVolume: string;
  yearlyMoneyTransferCount: string;
  documentNumber: string;
  documentType: string;
  documentExpiryDate: string;
  kycVerificationDate: string;
  kycNextVerificationDate: string;
  kycVerificationReason: string;
  kycNextVerificationReason: string;
};

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

export function CustomerOverview({ customer }: { customer: CustomerData }) {
  // Helper function to get status badge style
  const getStatusBadgeStyle = (status?: string) => {
    switch (status) {
      case "active":
      case "verified":
        return "border-green-500 text-green-500";
      case "suspended":
      case "pending":
      case "limited":
        return "border-amber-500 text-amber-500";
      case "closed":
      case "rejected":
      case "blocked":
        return "border-red-500 text-red-500";
      default:
        return "border-gray-500 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Current Balance</div>
              <div className="text-2xl font-bold">{customer.balance}</div>
            </div>

            <div className="space-y-2">
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

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Join Date</div>
              <div className="text-sm font-medium">{customer.joinDate}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
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

          <div className="flex gap-2 mt-4">
            <Button className="flex-1" variant="outline">
              Edit
            </Button>
            <Button className="flex-1">Contact</Button>
          </div>
        </CardContent>
      </Card>

      {/* KYC Status Section moved from KYC tab */}
      <Card>
        <CardHeader>
          <CardTitle>KYC Status</CardTitle>
          <CardDescription>Current verification status and schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Last Verification</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm font-medium">{customer.kycVerificationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reason:</span>
                    <span className="text-sm font-medium">{customer.kycVerificationReason}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge 
                      variant="outline"
                      className={getStatusBadgeStyle(customer.kycStatus)}
                    >
                      {customer.kycStatus?.charAt(0).toUpperCase() + customer.kycStatus?.slice(1) || 'Unknown'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">KYC ID:</span>
                    <span className="text-sm font-mono">{customer.kycId}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Current KYC Level</h3>
                <div className="flex items-center gap-2">
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
                  <span className="text-sm text-muted-foreground">
                    {customer.kycLevel === "full"
                      ? "All verifications complete"
                      : customer.kycLevel === "medium"
                        ? "Additional verification needed for full access"
                        : "Limited access until verification complete"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Next Verification</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm font-medium">{customer.kycNextVerificationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reason:</span>
                    <span className="text-sm font-medium">{customer.kycNextVerificationReason}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button>
                  <Shield className="mr-2 h-4 w-4" />
                  Send KYC Request
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
          <CardDescription>Overview of currency accounts and sub-accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Turkish Lira Account */}
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Turkish Lira (TRY)</h3>
                </div>
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  ₺12,450.75
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Debit</div>
                  <div className="font-medium">₺8,750.25</div>
                  <div className="text-xs text-muted-foreground mt-1">24 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "70%" }}></div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Credit</div>
                  <div className="font-medium">₺2,500.00</div>
                  <div className="text-xs text-muted-foreground mt-1">12 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "20%" }}></div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Cashback</div>
                  <div className="font-medium">₺1,200.50</div>
                  <div className="text-xs text-muted-foreground mt-1">8 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "10%" }}></div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">NonRefundable</div>
                  <div className="font-medium">₺0.00</div>
                  <div className="text-xs text-muted-foreground mt-1">0 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* US Dollar Account */}
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">US Dollar (USD)</h3>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  $2,350.50
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Debit</div>
                  <div className="font-medium">$1,850.50</div>
                  <div className="text-xs text-muted-foreground mt-1">10 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "78%" }}></div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Credit</div>
                  <div className="font-medium">$500.00</div>
                  <div className="text-xs text-muted-foreground mt-1">5 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "22%" }}></div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Cashback</div>
                  <div className="font-medium">$0.00</div>
                  <div className="text-xs text-muted-foreground mt-1">0 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">NonRefundable</div>
                  <div className="font-medium">$0.00</div>
                  <div className="text-xs text-muted-foreground mt-1">0 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Euro Account */}
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Euro (EUR)</h3>
                </div>
                <Badge variant="outline" className="border-amber-500 text-amber-500">
                  €1,750.25
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Debit</div>
                  <div className="font-medium">€1,750.25</div>
                  <div className="text-xs text-muted-foreground mt-1">8 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Credit</div>
                  <div className="font-medium">€0.00</div>
                  <div className="text-xs text-muted-foreground mt-1">0 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Cashback</div>
                  <div className="font-medium">€0.00</div>
                  <div className="text-xs text-muted-foreground mt-1">0 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground">NonRefundable</div>
                  <div className="font-medium">€0.00</div>
                  <div className="text-xs text-muted-foreground mt-1">0 transactions</div>
                  <div className="h-1 w-full bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  )
}

