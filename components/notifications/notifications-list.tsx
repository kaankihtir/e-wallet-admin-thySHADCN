"use client"

import { useState } from "react"
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  MoreHorizontal, 
  Edit, 
  Copy, 
  Trash, 
  CheckCircle2, 
  XCircle, 
  Globe,
  Plus,
  Megaphone,
  Users,
  Eye
} from "lucide-react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

// Notification status type
type NotificationStatus = "Active" | "Draft" | "Scheduled" | "Inactive"

// Mock notification data
interface NotificationType {
  id: string
  name: string
  type: "SMS" | "Email" | "Push" | "Announcement" | "Campaign"
  subtype?: "SMS" | "Email" | "Push"
  transaction?: string
  status: NotificationStatus
  languages: string[]
  lastUpdated: string
  dateSent?: string
  templates?: string
  recipients?: {
    success: number
    failed: number
  }
}

const mockNotifications: NotificationType[] = [
  {
    id: "NOT-001",
    name: "Payment Confirmation",
    type: "SMS",
    transaction: "payment",
    status: "Active",
    languages: ["English", "Turkish"],
    lastUpdated: "2023-10-05",
  },
  {
    id: "NOT-002",
    name: "Account Statement",
    type: "Email",
    transaction: "account",
    status: "Active",
    languages: ["English"],
    lastUpdated: "2023-09-20",
    templates: "EMAIL-STATEMENT-01",
  },
  {
    id: "NOT-003",
    name: "Security Alert",
    type: "Push",
    transaction: "authentication",
    status: "Active",
    languages: ["English", "Turkish"],
    lastUpdated: "2023-10-12",
    templates: "PUSH-AUTH-01",
  },
  {
    id: "NOT-004",
    name: "Low Balance Warning",
    type: "SMS",
    transaction: "account",
    status: "Inactive",
    languages: ["English"],
    lastUpdated: "2023-08-15",
  },
  {
    id: "NOT-005",
    name: "Welcome Email",
    type: "Email",
    transaction: "account",
    status: "Active",
    languages: ["English", "Turkish"],
    lastUpdated: "2023-07-10",
    templates: "EMAIL-WELCOME-01",
  },
  {
    id: "NOT-006",
    name: "Withdrawal Confirmation",
    type: "Push",
    transaction: "withdrawal",
    status: "Active",
    languages: ["English"],
    lastUpdated: "2023-09-05",
    templates: "PUSH-TRANSACTION-01",
  },
  {
    id: "NOT-007",
    name: "Service Maintenance",
    type: "Announcement",
    subtype: "SMS",
    status: "Active",
    languages: ["English", "Turkish"],
    lastUpdated: "2023-08-15",
    dateSent: "2023-08-20 14:30",
    recipients: {
      success: 8432,
      failed: 28
    }
  },
  {
    id: "NOT-008",
    name: "New Feature Launch",
    type: "Announcement",
    subtype: "Email",
    status: "Scheduled",
    languages: ["English", "Turkish"],
    lastUpdated: "2023-09-01",
    dateSent: "Scheduled for 2023-10-05",
    recipients: {
      success: 0,
      failed: 0
    }
  },
  {
    id: "NOT-009",
    name: "Holiday Discount",
    type: "Announcement",
    subtype: "Push",
    status: "Active",
    languages: ["English", "Turkish"],
    lastUpdated: "2023-10-15",
    dateSent: "2023-10-18 09:15",
    recipients: {
      success: 7500,
      failed: 42
    }
  },
  {
    id: "NOT-010",
    name: "Summer Promotion",
    type: "Campaign",
    subtype: "SMS",
    status: "Active",
    languages: ["English", "Turkish"],
    lastUpdated: "2023-06-10",
    dateSent: "2023-06-15 10:00",
    recipients: {
      success: 3250,
      failed: 15
    }
  },
  {
    id: "NOT-011",
    name: "New App Features",
    type: "Campaign",
    subtype: "Push",
    status: "Active",
    languages: ["English"],
    lastUpdated: "2023-07-22",
    dateSent: "2023-07-25 09:30",
    recipients: {
      success: 5421,
      failed: 38
    }
  },
]

// Type definitions for notification type
type NotificationType = "SMS" | "Email" | "Push" | "Announcement" | "Campaign";
type NotificationSubtype = "SMS" | "Email" | "Push";

// Define a union type that includes all notification types plus "All" for showing all notifications
type NotificationFilterType = "All" | "SMS" | "Email" | "Push" | "Announcement" | "Campaign"

interface NotificationsListProps {
  type: NotificationFilterType
  subtype?: "SMS" | "Email" | "Push"
  searchQuery: string
}

export function NotificationsList({ type, subtype, searchQuery }: NotificationsListProps) {
  // Filter notifications by type, subtype, and search query
  const filteredNotifications = mockNotifications
    .filter(notification => {
      // If type is "All", show all notifications
      if (type === "All") return true;
      
      // For announcements and campaigns, check both type and subtype if provided
      if (type === "Announcement" || type === "Campaign") {
        return notification.type === type && 
               (!subtype || notification.subtype === subtype);
      }
      // For regular notifications, just check the type
      return notification.type === type;
    })
    .filter(notification => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        notification.name.toLowerCase().includes(query) ||
        notification.transaction?.toLowerCase().includes(query) ||
        notification.id.toLowerCase().includes(query)
      );
    });

  // Icon mapping for notification types
  const getNotificationIcon = (notificationType: "SMS" | "Email" | "Push" | "Announcement" | "Campaign") => {
    switch (notificationType) {
      case "SMS":
        return <MessageSquare className="h-4 w-4" />;
      case "Email":
        return <Mail className="h-4 w-4" />;
      case "Push":
        return <Bell className="h-4 w-4" />;
      case "Announcement":
        return <Megaphone className="h-4 w-4" />;
      case "Campaign":
        return <Users className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  // Status badge color mapping
  const getStatusBadgeVariant = (status: NotificationStatus) => {
    switch (status) {
      case "Active":
        return "default" // green
      case "Draft":
        return "secondary" // gray
      case "Scheduled":
        return "outline" // outlined
      case "Inactive":
        return "destructive" // red
      default:
        return "default"
    }
  }

  // Check if the type is special (not a regular notification)
  const isSpecialType = type === "Announcement" || type === "Campaign"
  
  // Get card styling based on type
  const getCardClassName = () => {
    if (type === "Announcement") return "border-0 shadow-none bg-transparent"
    if (type === "Campaign") return "border-0 shadow-none bg-transparent"
    return undefined
  }
  
  // Get empty state background color
  const getEmptyStateBackgroundColor = () => {
    if (type === "Announcement") return "bg-amber-100"
    if (type === "Campaign") return "bg-indigo-100"
    return "bg-muted"
  }
  
  // Get create button styling
  const getCreateButtonClassName = () => {
    if (type === "Announcement") return "bg-amber-600 hover:bg-amber-700"
    if (type === "Campaign") return "bg-indigo-600 hover:bg-indigo-700"
    return undefined
  }
  
  // Get table row hover style
  const getTableRowHoverClassName = () => {
    if (type === "Announcement") return "hover:bg-amber-50/80"
    if (type === "Campaign") return "hover:bg-indigo-50/80"
    return undefined
  }
  
  // Get icon background color
  const getIconBackgroundClassName = () => {
    if (type === "Announcement") return "bg-amber-100 text-amber-600"
    if (type === "Campaign") return "bg-indigo-100 text-indigo-600"
    return "bg-primary/10"
  }

  // Empty state message based on notification type
  const getEmptyStateMessage = () => {
    if (!type) return "No notifications found";
    
    return `No ${type} notifications found`;
  };

  return (
    <Card className={getCardClassName()}>
      {!isSpecialType && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getNotificationIcon(type as NotificationType)}
            {type} Rules
          </CardTitle>
          <CardDescription>
            Configure notification rules based on user actions and events
          </CardDescription>
        </CardHeader>
      )}
      <CardContent>
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className={`rounded-full p-3 mb-4 ${getEmptyStateBackgroundColor()}`}>
              {getNotificationIcon(type as NotificationType)}
            </div>
            <h3 className="text-lg font-medium mb-1">
              {getEmptyStateMessage()}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              {searchQuery 
                ? `No results found for "${searchQuery}". Try a different search term.`
                : type === "Announcement"
                  ? "You haven't created any announcements yet. Announcements are sent to all users."
                  : type === "Campaign"
                    ? "You haven't created any targeted campaigns yet. Campaigns are sent to specific user segments."
                    : `You haven't created any notifications yet.`}
            </p>
            <Button asChild className={getCreateButtonClassName()}>
              <Link href={
                type === "Announcement" 
                  ? `/notifications/announcement${subtype ? `?type=${subtype}` : ''}` 
                  : type === "Campaign"
                    ? "#" // Dialog component handles this
                    : `/notifications/new${type !== "SMS" ? `?type=${type}` : ''}`
              }>
                <Plus className="mr-2 h-4 w-4" />
                {type === "Announcement" 
                  ? "Create Announcement" 
                  : type === "Campaign"
                    ? "Create Campaign"
                    : "Create Notification"}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={type === "Announcement" ? "bg-amber-50/50" : type === "Campaign" ? "bg-indigo-50/50" : undefined}>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead className="w-[150px]">
                    {!isSpecialType ? "Transaction Type" : ""}
                  </TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[150px]">Languages</TableHead>
                  <TableHead className="w-[150px]">
                    {type !== "SMS" && !isSpecialType
                      ? "Template" 
                      : isSpecialType
                        ? "Recipients"
                        : ""}
                  </TableHead>
                  {isSpecialType && (
                    <TableHead className="w-[150px]">Date Sent</TableHead>
                  )}
                  <TableHead className="w-[150px]">Last Updated</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification) => (
                  <TableRow key={notification.id} className={getTableRowHoverClassName()}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-1 ${getIconBackgroundClassName()}`}>
                          {getNotificationIcon(notification.type as NotificationType)}
                        </div>
                        <div>
                          {isSpecialType ? (
                            <Link 
                              href={`/notifications/details/${notification.id}`}
                              className="hover:underline text-blue-600 font-medium"
                            >
                              {notification.name}
                            </Link>
                          ) : (
                            <div>{notification.name}</div>
                          )}
                          <div className="text-xs text-muted-foreground">{notification.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {!isSpecialType ? notification.transaction : ""}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(notification.status)}>
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {notification.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {type !== "SMS" && !isSpecialType && notification.templates && (
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                          {notification.templates}
                        </code>
                      )}
                      {isSpecialType && notification.recipients && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>{notification.recipients.success}</span>
                          </div>
                          <div className="flex items-center gap-1 text-red-600">
                            <XCircle className="h-3 w-3" />
                            <span>{notification.recipients.failed}</span>
                          </div>
                        </div>
                      )}
                    </TableCell>
                    {isSpecialType && (
                      <TableCell>
                        {notification.dateSent}
                      </TableCell>
                    )}
                    <TableCell>{notification.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          asChild
                        >
                          <Link href={`/notifications/details/${notification.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          asChild
                        >
                          <Link href={`/notifications/edit/${notification.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredNotifications.length} {
            type === "Announcement" ? "announcement" : 
            type === "Campaign" ? "campaign" : 
            type.toLowerCase()
          }{filteredNotifications.length !== 1 ? 's' : ''}
        </div>
      </CardFooter>
    </Card>
  )
}