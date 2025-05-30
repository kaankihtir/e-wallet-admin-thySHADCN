"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  User, 
  FileCheck, 
  Wallet, 
  Mail, 
  Phone, 
  CreditCard,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  History,
  Edit,
  MousePointer, 
  KeySquare, 
  LogIn, 
  LogOut, 
  DollarSign, 
  ExternalLink, 
  HelpCircle, 
  Filter,
  Settings,
  UserCog,
  Shield,
  MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { CustomerOverview } from "@/components/customers/details/customer-overview"
import { CustomerTransactions } from "@/components/customers/details/customer-transactions"
import { CustomerKYC } from "@/components/customers/details/customer-kyc"
import { CustomerSecurity } from "@/components/customers/details/customer-security"
import { CustomerWallet } from "@/components/customers/details/customer-wallet"
import { CustomerPrepaidCards } from "@/components/customers/details/customer-prepaid-cards"
import { CustomerLoginHistory } from "@/components/customers/details/customer-login-history"
import { CustomerAdminLogs } from "@/components/customers/details/customer-admin-logs"
import { CustomerLimits } from "@/components/customers/details/customer-security"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { CustomerChargebacks } from "@/components/customers/details/customer-chargebacks"

// Country flags
const countryFlags = {
  "US": "🇺🇸",
  "TR": "🇹🇷",
  "GB": "🇬🇧",
  "DE": "🇩🇪",
  "FR": "🇫🇷",
  "IT": "🇮🇹",
  "ES": "🇪🇸",
} as const;

// Extended customer data type
type CustomerData = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  countryCode: keyof typeof countryFlags;
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

// Mock data for a customer
const mockCustomer: CustomerData = {
  id: "CUS001",
  name: "John Smith",
  initials: "JS",
  email: "john.smith@example.com",
  phone: "532 123 4567",
  countryCode: "TR",
  milesAndSmilesNumber: "TK987654321",
  accountId: "ACC48392",
  accountStatus: "active",
  kycId: "KYC75921",
  kycStatus: "verified",
  kycLevel: "full",
  walletId: "WAL12789",
  walletStatus: "active",
  balance: "$12,450.75",
  joinDate: "01.15.2023",
  address: "123 Main St, New York, NY 10001",
  nationality: "United States",
  citizenshipId: "123456789",
  dateOfBirth: "05.12.1985",
  occupation: "Software Engineer",
  educationalBackground: "Bachelor's Degree",
  sourceOfIncome: "Employment",
  monthlyNetIncome: "$8,500",
  yearlyMoneyTransferVolume: "$50,000 - $100,000",
  yearlyMoneyTransferCount: "25-50",
  documentNumber: "AB123456",
  documentType: "Passport",
  documentExpiryDate: "10.15.2028",
  kycVerificationDate: "01.10.2023",
  kycNextVerificationDate: "01.10.2024",
  kycVerificationReason: "Account Upgrade",
  kycNextVerificationReason: "ID Expiry",
}

// Mock status history data
const mockStatusHistory = [
  { id: 1, status: "active", changedAt: "2023-04-10T14:32:00", changedBy: "Admin User", reason: "Account verification completed" },
  { id: 2, status: "pending", changedAt: "2023-04-08T10:23:00", changedBy: "System", reason: "New account registration" },
]

// Mock login history data
const mockLoginHistory = [
  { 
    id: 1, 
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
    device: "iPhone 13", 
    browser: "Safari", 
    ipAddress: "192.168.1.123", 
    location: "Istanbul, Turkey", 
    status: "success" 
  },
  { 
    id: 2, 
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), 
    device: "MacBook Pro", 
    browser: "Chrome", 
    ipAddress: "192.168.1.123", 
    location: "Istanbul, Turkey", 
    status: "success" 
  },
  { 
    id: 3, 
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), 
    device: "Windows", 
    browser: "Edge", 
    ipAddress: "85.154.12.98", 
    location: "Ankara, Turkey", 
    status: "new_device" 
  },
  { 
    id: 4, 
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), 
    device: "Android", 
    browser: "Chrome", 
    ipAddress: "78.188.45.201", 
    location: "London, UK", 
    status: "failed" 
  },
  { 
    id: 5, 
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), 
    device: "iPhone 13", 
    browser: "Safari", 
    ipAddress: "192.168.1.123", 
    location: "Istanbul, Turkey", 
    status: "success" 
  },
]

// Update activity data structure to match the technical presentation
const mockActivityEvents = [
  {
    id: 1,
    type: "page_view",
    event: "dashboard.view",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "Istanbul, Turkey",
    userId: "U8765432",
    sessionId: "SES-29384756"
  },
  {
    id: 2,
    type: "page_view",
    event: "transactions.list.view",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "Istanbul, Turkey",
    userId: "U8765432",
    sessionId: "SES-29384756"
  },
  {
    id: 3,
    type: "auth",
    event: "user.login.success",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "Istanbul, Turkey",
    userId: "U8765432",
    sessionId: "SES-29384756",
    authMethod: "password"
  },
  {
    id: 4,
    type: "auth",
    event: "user.password.reset.request",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "Istanbul, Turkey",
    userId: "U8765432",
    sessionId: "SES-29384712",
    authMethod: "email"
  },
  {
    id: 5,
    type: "settings",
    event: "user.settings.notifications.update",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "Istanbul, Turkey",
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
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "Istanbul, Turkey",
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
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.1",
    device: "iPhone 13",
    os: "iOS 16.2",
    browser: "Safari 16.3",
    location: "Istanbul, Turkey",
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
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "Istanbul, Turkey",
    userId: "U8765432",
    sessionId: "SES-29384650",
    ticketId: "TKT-12345678",
    category: "payment_issue"
  },
  {
    id: 9,
    type: "profile",
    event: "user.profile.update",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "Istanbul, Turkey",
    userId: "U8765432",
    sessionId: "SES-29384642",
    fields: ["address", "phone"]
  },
  {
    id: 10,
    type: "auth",
    event: "user.2fa.enable",
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    ip: "192.168.1.2",
    device: "MacBook Pro",
    os: "macOS 13.2",
    browser: "Chrome 110.0.5481.177",
    location: "Istanbul, Turkey",
    userId: "U8765432",
    sessionId: "SES-29384630",
    authMethod: "totp"
  }
];

// Update the activity icon function to handle new event types
const getActivityIcon = (type: string, event?: string) => {
  switch (type) {
    case "auth":
      if (event?.includes("login")) return <LogIn className="h-4 w-4 text-green-500" />
      if (event?.includes("password")) return <KeySquare className="h-4 w-4 text-amber-500" />
      return <Shield className="h-4 w-4 text-green-500" />
    case "page_view":
      return <MousePointer className="h-4 w-4 text-blue-500" />
    case "settings":
      return <Settings className="h-4 w-4 text-gray-500" />
    case "payment":
      return <CreditCard className="h-4 w-4 text-purple-500" />
    case "transaction":
      return <DollarSign className="h-4 w-4 text-green-500" />
    case "support":
      return <HelpCircle className="h-4 w-4 text-blue-500" />
    case "profile":
      return <UserCog className="h-4 w-4 text-indigo-500" />
    case "marketing":
      return <ExternalLink className="h-4 w-4 text-gray-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

// Status Badge Component
interface StatusBadgeProps {
  type: "account" | "kyc" | "wallet";
  status?: string;
  id: string;
  level?: string;
  balance?: string;
  customer: CustomerData;
}

function StatusBadge({ type, status, id, level, balance, customer }: StatusBadgeProps) {
  const [showHistory, setShowHistory] = useState(false)
  const [showStatusChange, setShowStatusChange] = useState(false)
  const [newStatus, setNewStatus] = useState(status)
  const [reason, setReason] = useState("")

  // Get icon based on status
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "active":
      case "verified":
        return <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      case "suspended":
      case "pending":
      case "limited":
        return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
      case "closed":
      case "rejected":
      case "blocked":
        return <XCircle className="h-3.5 w-3.5 mr-1" />;
      default:
        return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
    }
  };

  // Get badge style based on status
  const getBadgeStyle = (status?: string) => {
    switch (status) {
      case "active":
      case "verified":
        return "bg-green-500/20 text-green-300 border-green-600";
      case "suspended":
      case "pending":
      case "limited":
        return "bg-amber-500/20 text-amber-300 border-amber-600";
      case "closed":
      case "rejected":
      case "blocked":
        return "bg-red-500/20 text-red-300 border-red-600";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-600";
    }
  };

  // Get available statuses based on type
  const getAvailableStatuses = () => {
    switch (type) {
      case "account":
        return ["active", "suspended", "closed"];
      case "kyc":
        return ["verified", "pending", "rejected"];
      case "wallet":
        return ["active", "limited", "blocked"];
      default:
        return [];
    }
  };

  // Get type label
  const getTypeLabel = () => {
    switch (type) {
      case "account":
        return "Account";
      case "kyc":
        return "KYC";
      case "wallet":
        return "Wallet";
      default:
        return "";
    }
  };

  // Handle status change
  const handleStatusChange = () => {
    if (!reason) {
      alert("Please provide a reason for the status change");
      return;
    }

    // In a real app, call API to update status
    console.log(`Changing ${type} status from ${status} to ${newStatus} with reason: ${reason}`);
    
    // Show success message
    alert(`${getTypeLabel()} status updated successfully`);
    setShowStatusChange(false);
    setReason("");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="text-gray-400 text-xs mb-1 uppercase">{getTypeLabel()} Status</div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge 
                variant="outline" 
                className={`flex items-center gap-1 cursor-pointer hover:bg-opacity-30 px-3 py-1.5 ${getBadgeStyle(status)}`}
              >
                {getStatusIcon(status)}
                <span>{status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}</span>
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="start">
              <DropdownMenuItem onClick={() => setShowHistory(true)}>
                <History className="mr-2 h-4 w-4" />
                <span>View History</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowStatusChange(true)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Change Status</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="text-xs text-gray-400 font-mono">#{id}</div>
        </div>
        
        {type === "kyc" && level && (
          <div className="text-xs text-gray-400 mt-1">
            Level: <span className="font-medium">{level.toUpperCase()}</span>
          </div>
        )}
        
        {type === "wallet" && balance && (
          <div className="text-xs text-gray-400 mt-1">
            Balance: <span className="font-medium">{balance}</span>
          </div>
        )}
      </div>

      {/* Status History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{getTypeLabel()} Status History</DialogTitle>
            <DialogDescription>
              View the history of status changes for this {type}.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[300px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStatusHistory.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getBadgeStyle(history.status)}`}
                      >
                        {history.status.charAt(0).toUpperCase() + history.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(history.changedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs">
                      {history.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={showStatusChange} onOpenChange={setShowStatusChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change {getTypeLabel()} Status</DialogTitle>
            <DialogDescription>
              Update the status and provide a reason for the change.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">New Status</Label>
              <Select defaultValue={status} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableStatuses().map((statusOption) => (
                    <SelectItem key={statusOption} value={statusOption}>
                      {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Change</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for this status change"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusChange(false)}>Cancel</Button>
            <Button onClick={handleStatusChange}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CustomerDetailsView({ customerId }: { customerId: string }) {
  const searchParams = useSearchParams()
  const [customer, setCustomer] = useState<CustomerData>(mockCustomer)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  
  // Status management states
  const [showAccountHistory, setShowAccountHistory] = useState(false)
  const [showKycHistory, setShowKycHistory] = useState(false)
  const [showWalletHistory, setShowWalletHistory] = useState(false)
  const [showAccountChange, setShowAccountChange] = useState(false)
  const [showKycChange, setShowKycChange] = useState(false)
  const [showWalletChange, setShowWalletChange] = useState(false)
  const [newAccountStatus, setNewAccountStatus] = useState(customer.accountStatus)
  const [newKycStatus, setNewKycStatus] = useState(customer.kycStatus)
  const [newWalletStatus, setNewWalletStatus] = useState(customer.walletStatus)
  const [statusChangeReason, setStatusChangeReason] = useState("")
  
  // Generate avatar color based on initials
  const getAvatarColor = (initials: string) => {
    const colors = [
      'bg-blue-600',
      'bg-purple-600',
      'bg-green-600',
      'bg-yellow-600',
      'bg-red-600',
      'bg-pink-600',
      'bg-indigo-600',
      'bg-teal-600',
      'bg-orange-600',
      'bg-cyan-600'
    ];
    
    // Sum the character codes to get a consistent number
    const charCodes = initials.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    // Use modulo to get an index in the colors array
    return colors[charCodes % colors.length];
  };

  useEffect(() => {
    // In a real implementation, we would fetch the customer data based on the ID
    // For now, we'll just simulate a loading state
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [customerId])

  // Set active tab based on URL query parameter
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["overview", "kyc", "wallet", "prepaidcards", "transactions", "loginhistory", "adminlogs"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Helper function to get badge style for header (dark background)
  const getHeaderStatusBadgeStyle = (status?: "active" | "suspended" | "closed" | "verified" | "pending" | "rejected" | "limited" | "blocked") => {
    switch (status) {
      case "active":
      case "verified":
        return "bg-green-500/20 text-green-300 border-green-600";
      case "suspended":
      case "pending":
      case "limited":
        return "bg-amber-500/20 text-amber-300 border-amber-600";
      case "closed":
      case "rejected":
      case "blocked":
        return "bg-red-500/20 text-red-300 border-red-600";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-600";
    }
  };

  // Helper function to get badge style based on status
  const getStatusBadgeStyle = (status?: "active" | "suspended" | "closed" | "verified" | "pending" | "rejected" | "limited" | "blocked") => {
    switch (status) {
      case "active":
      case "verified":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "suspended":
      case "pending":
      case "limited":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400";
      case "closed":
      case "rejected":
      case "blocked":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status?: "active" | "suspended" | "closed" | "verified" | "pending" | "rejected" | "limited" | "blocked") => {
    switch (status) {
      case "active":
      case "verified":
        return <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      case "suspended":
      case "pending":
      case "limited":
        return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
      case "closed":
      case "rejected":
      case "blocked":
        return <XCircle className="h-3.5 w-3.5 mr-1" />;
      default:
        return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/customers">Customers</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Customer Details</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button variant="outline" size="sm" asChild>
          <Link href="/customers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Link>
        </Button>
      </div>

      {/* New Customer Header */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and basic info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 flex-shrink-0">
                <AvatarFallback className={`text-xl text-white ${getAvatarColor(customer.initials)}`}>
                  {customer.initials}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-2xl font-bold">{customer.name}</h1>
                <div className="flex flex-col space-y-1 mt-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {customer.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="mr-1">{countryFlags[customer.countryCode]}</span>
                    +{customer.countryCode === 'TR' ? '90' : '1'} {customer.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 md:mt-0">
              {/* Account Status */}
              <div>
                <div className="text-xs text-muted-foreground mb-1">ACCOUNT STATUS</div>
                <div className="flex flex-col">
                  <Button 
                    variant="outline" 
                    className={`justify-start h-auto py-2 px-3 ${getStatusBadgeStyle(customer.accountStatus)}`}
                    onClick={() => setShowAccountHistory(true)}
                  >
                    {getStatusIcon(customer.accountStatus)}
                    <span className="ml-1">{customer.accountStatus?.charAt(0).toUpperCase() + customer.accountStatus?.slice(1) || 'Unknown'}</span>
                  </Button>
                  <div className="text-xs text-muted-foreground mt-2">
                    ID: <span className="font-mono">{customer.accountId}</span>
                  </div>
                </div>
              </div>

              {/* KYC Status */}
              <div>
                <div className="text-xs text-muted-foreground mb-1">KYC STATUS</div>
                <div className="flex flex-col">
                  <Button 
                    variant="outline" 
                    className={`justify-start h-auto py-2 px-3 ${getStatusBadgeStyle(customer.kycStatus)}`}
                    onClick={() => setShowKycHistory(true)}
                  >
                    {getStatusIcon(customer.kycStatus)}
                    <span className="ml-1">{customer.kycStatus?.charAt(0).toUpperCase() + customer.kycStatus?.slice(1) || 'Unknown'}</span>
                  </Button>
                  <div className="text-xs text-muted-foreground mt-2 flex justify-between">
                    <span>ID: <span className="font-mono">{customer.kycId}</span></span>
                    <span>Level: <span className="font-medium">{customer.kycLevel.toUpperCase()}</span></span>
                  </div>
                </div>
              </div>

              {/* Wallet Status */}
              <div>
                <div className="text-xs text-muted-foreground mb-1">WALLET STATUS</div>
                <div className="flex flex-col">
                  <Button 
                    variant="outline" 
                    className={`justify-start h-auto py-2 px-3 ${getStatusBadgeStyle(customer.walletStatus)}`}
                    onClick={() => setShowWalletHistory(true)}
                  >
                    {getStatusIcon(customer.walletStatus)}
                    <span className="ml-1">{customer.walletStatus?.charAt(0).toUpperCase() + customer.walletStatus?.slice(1) || 'Unknown'}</span>
                  </Button>
                  <div className="text-xs text-muted-foreground mt-2 flex justify-between">
                    <span>ID: <span className="font-mono">{customer.walletId}</span></span>
                    <span>Balance: <span className="font-medium">{customer.balance}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History and Status Change Dialogs */}
      {/* Account History Dialog */}
      <Dialog open={showAccountHistory} onOpenChange={setShowAccountHistory}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Account Status History</DialogTitle>
            <DialogDescription>
              View the history of status changes for this account.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[300px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStatusHistory.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusBadgeStyle(history.status as any)}`}
                      >
                        {history.status.charAt(0).toUpperCase() + history.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(history.changedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs">
                      {history.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="default" onClick={() => {
              setShowAccountHistory(false);
              setShowAccountChange(true);
            }}>
              <Edit className="mr-2 h-4 w-4" />
              Change Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Account Status Change Dialog */}
      <Dialog open={showAccountChange} onOpenChange={setShowAccountChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Account Status</DialogTitle>
            <DialogDescription>
              Update the status and provide a reason for the change.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="account-status">New Status</Label>
              <Select 
                defaultValue={customer.accountStatus} 
                onValueChange={(value) => setNewAccountStatus(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Change</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for this status change"
                value={statusChangeReason}
                onChange={(e) => setStatusChangeReason(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAccountChange(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!statusChangeReason) {
                alert("Please provide a reason for the status change");
                return;
              }
              alert("Account status updated successfully");
              setShowAccountChange(false);
              setStatusChangeReason("");
            }}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* KYC History Dialog */}
      <Dialog open={showKycHistory} onOpenChange={setShowKycHistory}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>KYC Status History</DialogTitle>
            <DialogDescription>
              View the history of status changes for KYC verification.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[300px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStatusHistory.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusBadgeStyle(history.status as any)}`}
                      >
                        {history.status.charAt(0).toUpperCase() + history.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(history.changedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs">
                      {history.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="default" onClick={() => {
              setShowKycHistory(false);
              setShowKycChange(true);
            }}>
              <Edit className="mr-2 h-4 w-4" />
              Change Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* KYC Status Change Dialog */}
      <Dialog open={showKycChange} onOpenChange={setShowKycChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change KYC Status</DialogTitle>
            <DialogDescription>
              Update the status and provide a reason for the change.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="kyc-status">New Status</Label>
              <Select 
                defaultValue={customer.kycStatus} 
                onValueChange={(value) => setNewKycStatus(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Change</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for this status change"
                value={statusChangeReason}
                onChange={(e) => setStatusChangeReason(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowKycChange(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!statusChangeReason) {
                alert("Please provide a reason for the status change");
                return;
              }
              alert("KYC status updated successfully");
              setShowKycChange(false);
              setStatusChangeReason("");
            }}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Wallet History Dialog */}
      <Dialog open={showWalletHistory} onOpenChange={setShowWalletHistory}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Wallet Status History</DialogTitle>
            <DialogDescription>
              View the history of status changes for this wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[300px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStatusHistory.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusBadgeStyle(history.status as any)}`}
                      >
                        {history.status.charAt(0).toUpperCase() + history.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(history.changedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs">
                      {history.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="default" onClick={() => {
              setShowWalletHistory(false);
              setShowWalletChange(true);
            }}>
              <Edit className="mr-2 h-4 w-4" />
              Change Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Wallet Status Change Dialog */}
      <Dialog open={showWalletChange} onOpenChange={setShowWalletChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Wallet Status</DialogTitle>
            <DialogDescription>
              Update the status and provide a reason for the change.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="wallet-status">New Status</Label>
              <Select 
                defaultValue={customer.walletStatus} 
                onValueChange={(value) => setNewWalletStatus(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="limited">Limited</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Change</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for this status change"
                value={statusChangeReason}
                onChange={(e) => setStatusChangeReason(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWalletChange(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!statusChangeReason) {
                alert("Please provide a reason for the status change");
                return;
              }
              alert("Wallet status updated successfully");
              setShowWalletChange(false);
              setStatusChangeReason("");
            }}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex overflow-x-auto bg-muted">
          <TabsTrigger value="overview" className="flex-1">
            Overview
          </TabsTrigger>
          <TabsTrigger value="kyc" className="flex-1">
            KYC & Documents
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex-1">
            Wallet
          </TabsTrigger>
          <TabsTrigger value="prepaidcards" className="flex-1">
            Prepaid Cards
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex-1">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="chargebacks" className="flex-1">
            Chargebacks
          </TabsTrigger>
          <TabsTrigger value="loginhistory" className="flex-1">
            Login History
          </TabsTrigger>
          <TabsTrigger value="adminlogs" className="flex-1">
            Admin Logs
          </TabsTrigger>
          <TabsTrigger value="limits" className="flex-1">
            Limits
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex-1">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <CustomerOverview customer={customer} />
        </TabsContent>

        <TabsContent value="kyc" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <CustomerKYC customer={customer} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <CustomerWallet customer={customer} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prepaidcards" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <CustomerPrepaidCards customer={customer} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <CustomerTransactions customerId={customer.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chargebacks" className="mt-6">
          <CustomerChargebacks customerId={customer.id} />
        </TabsContent>

        <TabsContent value="loginhistory" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <CustomerLoginHistory customerId={customer.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adminlogs" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <CustomerAdminLogs customerId={customer.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <CustomerLimits customer={customer} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>User Event Log</CardTitle>
                  <CardDescription>System events and user interactions analytics</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                      <span className="font-medium">User ID:</span> {customer.id}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Total events:</span> {mockActivityEvents.length}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter Events
                  </Button>
                  <Button variant="outline" size="sm">
                    Export Data
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
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
                      {mockActivityEvents.map((activity) => (
                        <TableRow key={activity.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getActivityIcon(activity.type, activity.event)}
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
                    Showing <span className="font-medium">10</span> of <span className="font-medium">254</span> events
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
    </div>
  )
}

