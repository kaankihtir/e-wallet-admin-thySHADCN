"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Info, Edit, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Language } from "@/components/localization/languages-list"

export interface TranslationKey {
  key: string
  group: string
  description?: string
  completionPercentage: number
  translatedCount: number
  totalLanguages: number
}

interface TranslationKeysListProps {
  onSelectKey: (key: string) => void
  referenceLanguage: string
}

// Key groups constant definitions
const KEY_GROUPS = [
  "common",
  "auth",
  "dashboard",
  "settings",
  "errors",
  "validations"
]

// Mock translation keys
const mockTranslationKeys: TranslationKey[] = [
  {
    key: "common.welcome",
    group: "common",
    description: "Welcome message shown on homepage",
    completionPercentage: 100,
    translatedCount: 16,
    totalLanguages: 16
  },
  {
    key: "common.submit",
    group: "common",
    description: "Submit button text",
    completionPercentage: 100,
    translatedCount: 16,
    totalLanguages: 16
  },
  {
    key: "common.cancel",
    group: "common",
    description: "Cancel button text",
    completionPercentage: 100,
    translatedCount: 16,
    totalLanguages: 16
  },
  {
    key: "common.save",
    group: "common",
    description: "Save button text",
    completionPercentage: 94,
    translatedCount: 15,
    totalLanguages: 16
  },
  {
    key: "common.edit",
    group: "common",
    description: "Edit button text",
    completionPercentage: 100,
    translatedCount: 16,
    totalLanguages: 16
  },
  {
    key: "common.delete",
    group: "common",
    description: "Delete button text",
    completionPercentage: 100,
    translatedCount: 16,
    totalLanguages: 16
  },
  {
    key: "common.back",
    group: "common",
    description: "Back button text",
    completionPercentage: 94,
    translatedCount: 15,
    totalLanguages: 16
  },
  {
    key: "auth.login",
    group: "auth",
    description: "Login button text",
    completionPercentage: 88,
    translatedCount: 14,
    totalLanguages: 16
  },
  {
    key: "auth.logout",
    group: "auth",
    description: "Logout button text",
    completionPercentage: 88,
    translatedCount: 14,
    totalLanguages: 16
  },
  {
    key: "auth.register",
    group: "auth",
    description: "Register button text",
    completionPercentage: 75,
    translatedCount: 12,
    totalLanguages: 16
  },
  {
    key: "auth.forgotPassword",
    group: "auth",
    description: "Forgot password button text",
    completionPercentage: 69,
    translatedCount: 11,
    totalLanguages: 16
  },
  {
    key: "auth.resetPassword",
    group: "auth",
    description: "Reset password button text",
    completionPercentage: 69,
    translatedCount: 11,
    totalLanguages: 16
  },
  {
    key: "dashboard.welcome",
    group: "dashboard",
    description: "Welcome message on dashboard",
    completionPercentage: 63,
    translatedCount: 10,
    totalLanguages: 16
  },
  {
    key: "dashboard.summary",
    group: "dashboard",
    description: "Dashboard summary section title",
    completionPercentage: 56,
    translatedCount: 9,
    totalLanguages: 16
  },
  {
    key: "transactions.details",
    group: "transactions",
    description: "Transaction details title",
    completionPercentage: 75,
    translatedCount: 12,
    totalLanguages: 16
  },
  {
    key: "transactions.amount",
    group: "transactions",
    description: "Transaction amount label",
    completionPercentage: 88,
    translatedCount: 14,
    totalLanguages: 16
  },
  {
    key: "transactions.date",
    group: "transactions",
    description: "Transaction date label",
    completionPercentage: 88,
    translatedCount: 14,
    totalLanguages: 16
  },
  {
    key: "customers.details",
    group: "customers",
    description: "Customer details title",
    completionPercentage: 69,
    translatedCount: 11,
    totalLanguages: 16
  },
  {
    key: "errors.notFound",
    group: "errors",
    description: "404 not found error message",
    completionPercentage: 63,
    translatedCount: 10,
    totalLanguages: 16
  },
  {
    key: "errors.serverError",
    group: "errors",
    description: "500 server error message",
    completionPercentage: 56,
    translatedCount: 9,
    totalLanguages: 16
  },
  {
    key: "validations.required",
    group: "validations",
    description: "Required field validation message",
    completionPercentage: 81,
    translatedCount: 13,
    totalLanguages: 16
  }
]

export function TranslationKeysList({ onSelectKey, referenceLanguage }: TranslationKeysListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>(mockTranslationKeys)

  // Search function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Filter function
  const filteredKeys = translationKeys.filter(
    (key) => {
      // Filter by group
      if (selectedGroup && key.group !== selectedGroup) {
        return false
      }
      
      // Filter by search query
      if (searchQuery && 
          !key.key.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !(key.description && key.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false
      }
      
      return true
    }
  )

  // Get unique groups and count them
  const groups = KEY_GROUPS.map(group => {
    const count = translationKeys.filter(key => key.group === group).length
    return { name: group, count }
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search keys..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedGroup ? (
            <Button
              variant="outline"
              onClick={() => setSelectedGroup(null)}
              className="h-9"
            >
              All Groups
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setSelectedGroup(null)}
              className="h-9"
            >
              All Groups
            </Button>
          )}

          {groups.map((group) => (
            selectedGroup === group.name ? (
              <Button
                key={group.name}
                variant="secondary"
                onClick={() => setSelectedGroup(null)}
                className="h-9"
              >
                {group.name} ({group.count})
              </Button>
            ) : (
              <Button
                key={group.name}
                variant="outline"
                onClick={() => setSelectedGroup(group.name)}
                className="h-9"
              >
                {group.name} ({group.count})
              </Button>
            )
          ))}
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredKeys.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No keys found.
                </TableCell>
              </TableRow>
            ) : (
              filteredKeys.map((key) => (
                <TableRow 
                  key={key.key} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSelectKey(key.key)}
                >
                  <TableCell className="font-medium">{key.key}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {key.group}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {key.description || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Progress value={key.completionPercentage} className="h-2" />
                        <span className="text-xs font-medium">{key.completionPercentage}%</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {key.translatedCount} / {key.totalLanguages} languages
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation()
                          onSelectKey(key.key)
                        }}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit translations</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 