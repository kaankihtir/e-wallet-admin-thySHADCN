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
import { Edit, Eye, MoreHorizontal, Trash2, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Mock agreements data
const mockAgreements = [
  {
    id: "AGR-001",
    title: "Terms of Service",
    version: "3.1",
    status: "active",
    lastUpdated: "2023-09-01T10:30:00Z",
    language: "English",
    documentType: "Legal",
    publishDate: "2023-09-01T12:00:00Z",
    author: "Legal Team"
  },
  {
    id: "AGR-002",
    title: "Privacy Policy",
    version: "2.5",
    status: "active",
    lastUpdated: "2023-08-15T14:45:00Z",
    language: "English",
    documentType: "Legal",
    publishDate: "2023-08-16T09:00:00Z",
    author: "Legal Team"
  },
  {
    id: "AGR-003",
    title: "Cookies Policy",
    version: "1.2",
    status: "active",
    lastUpdated: "2023-07-20T11:15:00Z",
    language: "English",
    documentType: "Legal",
    publishDate: "2023-07-22T10:00:00Z",
    author: "Legal Team"
  },
  {
    id: "AGR-004",
    title: "Terms of Service",
    version: "3.0",
    status: "archived",
    lastUpdated: "2023-05-10T09:20:00Z",
    language: "English",
    documentType: "Legal",
    publishDate: "2023-05-12T08:30:00Z",
    author: "Legal Team"
  },
  {
    id: "AGR-005",
    title: "Data Processing Agreement",
    version: "1.0",
    status: "draft",
    lastUpdated: "2023-09-05T15:50:00Z",
    language: "English",
    documentType: "Legal",
    publishDate: null,
    author: "Legal Team"
  },
  {
    id: "AGR-006",
    title: "Security Policy",
    version: "1.1",
    status: "draft",
    lastUpdated: "2023-09-02T13:40:00Z",
    language: "English",
    documentType: "Technical",
    publishDate: null,
    author: "Security Team"
  },
  {
    id: "AGR-007",
    title: "Privacy Policy",
    version: "2.4",
    status: "archived",
    lastUpdated: "2023-06-18T10:30:00Z",
    language: "English",
    documentType: "Legal",
    publishDate: "2023-06-20T09:15:00Z",
    author: "Legal Team"
  }
]

interface AgreementsListProps {
  status: "active" | "archived" | "draft";
  searchQuery?: string;
}

export function AgreementsList({ status, searchQuery = "" }: AgreementsListProps) {
  // Filter agreements based on status and search query
  const filteredAgreements = mockAgreements.filter(agreement => 
    agreement.status === status && 
    (
      agreement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.documentType.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  // Get badge style based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge>Active</Badge>;
      case "archived":
        return <Badge variant="secondary">Archived</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgreements.length > 0 ? (
                filteredAgreements.map(agreement => (
                  <TableRow key={agreement.id}>
                    <TableCell className="font-mono text-sm">{agreement.id}</TableCell>
                    <TableCell className="font-medium">{agreement.title}</TableCell>
                    <TableCell>{agreement.version}</TableCell>
                    <TableCell>{getStatusBadge(agreement.status)}</TableCell>
                    <TableCell>{agreement.documentType}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(agreement.lastUpdated)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(agreement.publishDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No {status} agreements found {searchQuery ? `for "${searchQuery}"` : ""}.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
} 