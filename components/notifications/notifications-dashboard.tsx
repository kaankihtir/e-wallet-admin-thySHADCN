"use client"

import { useState } from "react"
import { Bell, Search, Filter, Plus, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { NotificationsList } from "@/components/notifications/notifications-list"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function NotificationsDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  
  // Get the notification type based on the active tab
  const getNotificationListType = () => {
    switch (activeTab) {
      case "SMS": return "SMS";
      case "Email": return "Email";
      case "Push": return "Push";
      case "Announcement": return "Announcement";
      case "Campaign": return "Campaign";
      default: return "All";
    }
  };
  
  return (
    <div className="w-full">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="space-y-1 w-full sm:w-auto">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">
            Manage and send notifications to your users
          </p>
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notifications..."
              className="pl-8 w-full sm:w-[240px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Dashboard Actions */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Create and manage different types of notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            
            <Button variant="outline" asChild>
              <Link href="/notifications/announcement">
                <Megaphone className="mr-2 h-4 w-4" />
                Create Announcement
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link href="/notifications/campaign">
                <Megaphone className="mr-2 h-4 w-4" />
                Create Campaign
              </Link>
            </Button>
            
            <Button asChild>
              <Link href="/notifications/new">
                <Plus className="mr-2 h-4 w-4" />
                New Notification
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="SMS">SMS</TabsTrigger>
          <TabsTrigger value="Email">Email</TabsTrigger>
          <TabsTrigger value="Push">Push</TabsTrigger>
          <TabsTrigger value="Announcement">Announcements</TabsTrigger>
          <TabsTrigger value="Campaign">Campaigns</TabsTrigger>
        </TabsList>
        
        {/* All Notifications */}
        <TabsContent value="all">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">All Notifications</h3>
            <p className="text-muted-foreground text-sm">
              View all notifications across all channels
            </p>
          </div>
          {/* We'll handle the All type in the component */}
          {activeTab === "all" && (
            <AllNotifications searchQuery={searchQuery} />
          )}
        </TabsContent>
        
        {/* SMS Notifications */}
        <TabsContent value="SMS">
          {activeTab === "SMS" && (
            <NotificationsList type="SMS" searchQuery={searchQuery} />
          )}
        </TabsContent>
        
        {/* Email Notifications */}
        <TabsContent value="Email">
          {activeTab === "Email" && (
            <NotificationsList type="Email" searchQuery={searchQuery} />
          )}
        </TabsContent>
        
        {/* Push Notifications */}
        <TabsContent value="Push">
          {activeTab === "Push" && (
            <NotificationsList type="Push" searchQuery={searchQuery} />
          )}
        </TabsContent>
        
        {/* Announcements */}
        <TabsContent value="Announcement">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">Announcements</h3>
            <p className="text-muted-foreground text-sm">
              Announcements are broadcast messages sent to all users through various channels
            </p>
          </div>
          {activeTab === "Announcement" && (
            <NotificationsList type="Announcement" searchQuery={searchQuery} />
          )}
        </TabsContent>
        
        {/* Campaigns */}
        <TabsContent value="Campaign">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">Campaigns</h3>
            <p className="text-muted-foreground text-sm">
              Campaigns are targeted notifications sent to specific user segments
            </p>
          </div>
          {activeTab === "Campaign" && (
            <NotificationsList type="Campaign" searchQuery={searchQuery} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper component to display all notifications
function AllNotifications({ searchQuery }: { searchQuery: string }) {
  // Filter directly in the component
  return (
    <div>
      {/* We'll filter for all types within the component */}
      <NotificationsList 
        type="SMS" 
        searchQuery={searchQuery} 
      />
      <NotificationsList 
        type="Email" 
        searchQuery={searchQuery} 
      />
      <NotificationsList 
        type="Push" 
        searchQuery={searchQuery} 
      />
      <NotificationsList 
        type="Announcement" 
        searchQuery={searchQuery} 
      />
      <NotificationsList 
        type="Campaign" 
        searchQuery={searchQuery} 
      />
    </div>
  );
} 