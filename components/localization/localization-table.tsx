"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock translation data
const mockTranslations = [
  {
    id: "key-001",
    key: "common.welcome",
    context: "Common",
    en: "Welcome",
    tr: "Hoş Geldiniz",
    lastUpdated: "2023-09-15T12:30:00Z",
  },
  {
    id: "key-002",
    key: "common.signin",
    context: "Auth",
    en: "Sign In",
    tr: "Giriş Yap",
    lastUpdated: "2023-09-14T10:15:00Z",
  },
  {
    id: "key-003",
    key: "common.signup",
    context: "Auth",
    en: "Sign Up",
    tr: "Kayıt Ol",
    lastUpdated: "2023-09-14T10:20:00Z",
  },
  {
    id: "key-004",
    key: "dashboard.greeting",
    context: "Dashboard",
    en: "Hello, {name}!",
    tr: "Merhaba, {name}!",
    lastUpdated: "2023-09-10T08:45:00Z",
  },
  {
    id: "key-005",
    key: "dashboard.summary",
    context: "Dashboard",
    en: "Here's your account summary",
    tr: "İşte hesap özetiniz",
    lastUpdated: "2023-09-10T08:50:00Z",
  },
  {
    id: "key-006",
    key: "transactions.title",
    context: "Transactions",
    en: "Transactions",
    tr: "İşlemler",
    lastUpdated: "2023-09-08T14:20:00Z",
  },
  {
    id: "key-007",
    key: "transactions.nodata",
    context: "Transactions",
    en: "No transactions found",
    tr: "İşlem bulunamadı",
    lastUpdated: "2023-09-08T14:25:00Z",
  },
  {
    id: "key-008",
    key: "auth.email",
    context: "Auth",
    en: "Email",
    tr: "E-posta",
    lastUpdated: "2023-09-05T11:10:00Z",
  },
  {
    id: "key-009",
    key: "auth.password",
    context: "Auth",
    en: "Password",
    tr: "Şifre",
    lastUpdated: "2023-09-05T11:12:00Z",
  },
  {
    id: "key-010",
    key: "common.cancel",
    context: "Common",
    en: "Cancel",
    tr: "İptal",
    lastUpdated: "2023-09-01T09:30:00Z",
  },
]

export function LocalizationTable({ searchQuery = "" }: { searchQuery?: string }) {
  // Filter translations based on search query
  const filteredTranslations = mockTranslations.filter((translation) =>
    translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.context.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Format date to local date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Context</TableHead>
            <TableHead className="w-[250px]">Key</TableHead>
            <TableHead>English</TableHead>
            <TableHead>Turkish</TableHead>
            <TableHead className="w-[180px]">Last Updated</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTranslations.map((translation) => (
            <TableRow key={translation.id}>
              <TableCell>
                <Badge variant="outline">{translation.context}</Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">{translation.key}</TableCell>
              <TableCell>{translation.en}</TableCell>
              <TableCell>{translation.tr}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatDate(translation.lastUpdated)}
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {filteredTranslations.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No translations found for "{searchQuery}".
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 