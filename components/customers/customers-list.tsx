"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Lock, 
  AlertTriangle, 
  Wallet, 
  Settings, 
  ChevronDown, 
  User, 
  FileCheck,
  Phone,
  GlobeIcon,
  Calendar
} from "lucide-react"

// Mock data
const customers = [
  {
    id: "CUS001",
    name: "John Smith",
    initials: "JS",
    email: "john.smith@example.com",
    phone: "+1 532 123 4567",
    status: "verified",
    accountStatus: "active",
    kycStatus: "verified",
    kycLevel: "full",
    balance: "$12,450.75",
    joinDate: "01.15.2023",
    nationality: "United States",
    address: "123 Main St, New York, NY",
    dob: "12.05.1985",
    milesAndSmilesId: "TK123456789"
  },
  {
    id: "CUS002",
    name: "Emily Johnson",
    initials: "EJ",
    email: "emily.johnson@example.com",
    phone: "+1 533 234 5678",
    status: "verified",
    accountStatus: "active",
    kycStatus: "verified",
    kycLevel: "full",
    balance: "$8,320.50",
    joinDate: "01.22.2023",
    nationality: "Canada",
    address: "456 Oak Ave, Toronto, ON",
    dob: "03.17.1990",
    milesAndSmilesId: "TK234567890"
  },
  {
    id: "CUS003",
    name: "Michael Brown",
    initials: "MB",
    email: "michael.brown@example.com",
    phone: "+1 535 345 6789",
    status: "unverified",
    accountStatus: "suspended",
    kycStatus: "pending",
    kycLevel: "basic",
    balance: "$2,150.25",
    joinDate: "02.05.2023",
    nationality: "United Kingdom",
    address: "27 Baker St, London",
    dob: "08.22.1988",
    milesAndSmilesId: "TK345678901"
  },
  {
    id: "CUS004",
    name: "Sarah Wilson",
    initials: "SW",
    email: "sarah.wilson@example.com",
    phone: "+1 536 456 7890",
    status: "verified",
    accountStatus: "active",
    kycStatus: "verified",
    kycLevel: "medium",
    balance: "$5,780.00",
    joinDate: "02.12.2023",
    nationality: "Australia",
    address: "89 George St, Sydney, NSW",
    dob: "05.30.1993",
    milesAndSmilesId: "TK456789012"
  },
  {
    id: "CUS005",
    name: "David Taylor",
    initials: "DT",
    email: "david.taylor@example.com",
    phone: "+1 537 567 8901",
    status: "suspended",
    accountStatus: "suspended",
    kycStatus: "rejected",
    kycLevel: "full",
    balance: "$0.00",
    joinDate: "02.20.2023",
    nationality: "Germany",
    address: "123 Berliner Str, Berlin",
    dob: "11.12.1981",
    milesAndSmilesId: "TK567890123"
  },
  {
    id: "CUS006",
    name: "Jessica Miller",
    initials: "JM",
    email: "jessica.miller@example.com",
    phone: "+1 538 678 9012",
    status: "verified",
    accountStatus: "active",
    kycStatus: "verified",
    kycLevel: "full",
    balance: "$15,620.30",
    joinDate: "03.01.2023",
    nationality: "France",
    address: "5 Rue de Rivoli, Paris",
    dob: "07.19.1992",
    milesAndSmilesId: "TK678901234"
  },
  {
    id: "CUS007",
    name: "Robert Davis",
    initials: "RD",
    email: "robert.davis@example.com",
    phone: "+1 539 789 0123",
    status: "unverified",
    accountStatus: "active",
    kycStatus: "pending",
    kycLevel: "basic",
    balance: "$1,250.00",
    joinDate: "03.10.2023",
    nationality: "Italy",
    address: "42 Via Roma, Rome",
    dob: "02.25.1987",
    milesAndSmilesId: "TK789012345"
  },
  {
    id: "CUS008",
    name: "Jennifer Garcia",
    initials: "JG",
    email: "jennifer.garcia@example.com",
    phone: "+1 530 890 1234",
    status: "verified",
    accountStatus: "active",
    kycStatus: "verified",
    kycLevel: "medium",
    balance: "$7,430.60",
    joinDate: "03.18.2023",
    nationality: "Spain",
    address: "7 Gran Via, Madrid",
    dob: "09.14.1986",
    milesAndSmilesId: "TK890123456"
  },
]

// Available column definitions
const availableColumns = [
  { id: "name", label: "Name", required: true },
  { id: "milesAndSmilesId", label: "Miles & Smiles ID", required: true },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone Number" },
  { id: "accountStatus", label: "Account Status" },
  { id: "kycStatus", label: "KYC Status" },
  { id: "joinDate", label: "Join Date" },
  { id: "nationality", label: "Nationality" },
  { id: "address", label: "Address" },
  { id: "dob", label: "Date of Birth" },
]

export function CustomersList() {
  const [page, setPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.ceil(customers.length / pageSize)
  
  // State for column visibility
  const [visibleColumns, setVisibleColumns] = useState([
    "name",
    "milesAndSmilesId",
    "email",
    "phone",
    "accountStatus",
    "kycStatus",
    "joinDate",
  ])

  // Toggle column visibility
  const toggleColumn = (columnId: string) => {
    if (columnId === "name" || columnId === "milesAndSmilesId") return; // Can't toggle required columns
    
    setVisibleColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    )
  }

  const paginatedCustomers = customers.slice((page - 1) * pageSize, page * pageSize)

  // Function to render account status badge
  const renderAccountStatus = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Suspended
          </Badge>
        );
      case "closed":
        return (
          <Badge variant="destructive">
            Closed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  // Function to render KYC status badge
  const renderKycStatus = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="default" className="bg-green-500">
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  // Navigate to customer details
  const navigateToCustomerDetails = (id: string) => {
    window.location.href = `/customers/${id}`;
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Columns
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableColumns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={visibleColumns.includes(column.id)}
                onCheckedChange={() => toggleColumn(column.id)}
                disabled={column.required}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.includes("name") && (
                <TableHead>Name</TableHead>
              )}
              {visibleColumns.includes("milesAndSmilesId") && (
                <TableHead>Miles & Smiles ID</TableHead>
              )}
              {visibleColumns.includes("email") && (
                <TableHead>Email</TableHead>
              )}
              {visibleColumns.includes("phone") && (
                <TableHead>Phone Number</TableHead>
              )}
              {visibleColumns.includes("accountStatus") && (
                <TableHead>Account Status</TableHead>
              )}
              {visibleColumns.includes("kycStatus") && (
                <TableHead>KYC Status</TableHead>
              )}
              {visibleColumns.includes("joinDate") && (
                <TableHead>Join Date</TableHead>
              )}
              {visibleColumns.includes("nationality") && (
                <TableHead>Nationality</TableHead>
              )}
              {visibleColumns.includes("address") && (
                <TableHead>Address</TableHead>
              )}
              {visibleColumns.includes("dob") && (
                <TableHead>Date of Birth</TableHead>
              )}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow 
                key={customer.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigateToCustomerDetails(customer.id)}
              >
                {visibleColumns.includes("name") && (
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{customer.initials}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{customer.name}</div>
                    </div>
                  </TableCell>
                )}
                {visibleColumns.includes("milesAndSmilesId") && (
                  <TableCell>
                    <div className="font-mono text-sm">{customer.milesAndSmilesId}</div>
                  </TableCell>
                )}
                {visibleColumns.includes("email") && (
                  <TableCell>{customer.email}</TableCell>
                )}
                {visibleColumns.includes("phone") && (
                  <TableCell>{customer.phone}</TableCell>
                )}
                {visibleColumns.includes("accountStatus") && (
                  <TableCell>{renderAccountStatus(customer.accountStatus)}</TableCell>
                )}
                {visibleColumns.includes("kycStatus") && (
                  <TableCell>{renderKycStatus(customer.kycStatus)}</TableCell>
                )}
                {visibleColumns.includes("joinDate") && (
                  <TableCell>{customer.joinDate}</TableCell>
                )}
                {visibleColumns.includes("nationality") && (
                  <TableCell>{customer.nationality}</TableCell>
                )}
                {visibleColumns.includes("address") && (
                  <TableCell className="max-w-[200px] truncate">{customer.address}</TableCell>
                )}
                {visibleColumns.includes("dob") && (
                  <TableCell>{customer.dob}</TableCell>
                )}
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/customers/${customer.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Lock className="mr-2 h-4 w-4" />
                        Lock Account
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Report Suspicious Activity
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
          <Button variant="outline" size="sm" onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>
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
      </div>
    </>
  )
}

