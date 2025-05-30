"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  CalendarIcon, 
  CreditCard, 
  ImageIcon, 
  CheckCircle2, 
  AlertTriangle,
  ArrowLeft,
  Settings,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Interface for opportunity
interface Opportunity {
  id: string;
  key: string;
  homePriority: number;
  imageSrc: string | null;
  endDate: string | null;
  cardScheme: string;
  status: string;
  titleKey: string;
  descriptionKey: string;
  rewardKey: string;
  createdAt: string;
  lastModified: string;
  impression: number;
  clicks: number;
  conversionRate: number;
}

// Mock opportunity data
const mockOpportunity: Opportunity = {
  id: "OPP-001",
  key: "SUMMER_SALE",
  homePriority: 1,
  imageSrc: "/opportunities/summer-sale.jpg",
  endDate: "2023-09-30",
  cardScheme: "Visa, Mastercard",
  status: "active",
  titleKey: "SUMMER_SALE_TITLE",
  descriptionKey: "SUMMER_SALE_DESCRIPTION",
  rewardKey: "SUMMER_SALE_REWARD",
  createdAt: "2023-06-01",
  lastModified: "2023-06-15",
  impression: 12450,
  clicks: 3210,
  conversionRate: 25.8
}

export function OpportunityDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  
  // In a real app, you'd fetch the opportunity based on params.id
  const opportunity = mockOpportunity
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push("/opportunities")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Opportunities
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              {opportunity.imageSrc ? (
                <Avatar className="h-16 w-16">
                  <AvatarImage src={opportunity.imageSrc} alt={opportunity.key} />
                  <AvatarFallback>{opportunity.key.substring(0, 2)}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{opportunity.key}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">Priority: {opportunity.homePriority}</Badge>
                  {getStatusBadge(opportunity.status)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Edit</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Preview
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Set as Active
                    <CheckCircle2 className="h-4 w-4 ml-2" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impressions</span>
                    <span className="font-medium">{opportunity.impression.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clicks</span>
                    <span className="font-medium">{opportunity.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <span className="font-medium">{opportunity.conversionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Card Schemes</span>
                    <span className="font-medium">{opportunity.cardScheme}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium">
                      {opportunity.endDate ? new Date(opportunity.endDate).toLocaleDateString() : "No end date"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="font-medium">{new Date(opportunity.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Modified</span>
                    <span className="font-medium">{new Date(opportunity.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Translation Keys</CardTitle>
              <CardDescription>
                These keys are used for translations in the mobile app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Title Key</h3>
                  <div className="font-mono bg-muted p-2 rounded-md text-sm">
                    {opportunity.titleKey}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Description Key</h3>
                  <div className="font-mono bg-muted p-2 rounded-md text-sm">
                    {opportunity.descriptionKey}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Reward Key</h3>
                  <div className="font-mono bg-muted p-2 rounded-md text-sm">
                    {opportunity.rewardKey}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage opportunity settings and configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Display Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-muted-foreground">Home Priority</label>
                      <input 
                        type="number" 
                        className="p-2 border rounded-md w-20 text-right" 
                        defaultValue={opportunity.homePriority}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-muted-foreground">Status</label>
                      <select className="p-2 border rounded-md" defaultValue={opportunity.status}>
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="expired">Expired</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Image</h3>
                  <div className="mt-2 space-y-2">
                    {opportunity.imageSrc ? (
                      <div className="relative">
                        <img 
                          src={opportunity.imageSrc} 
                          alt={opportunity.key} 
                          className="h-48 w-full object-cover rounded-md"
                        />
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="absolute top-2 right-2"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="h-48 w-full rounded-md bg-muted flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto" />
                          <p className="text-muted-foreground">No image uploaded</p>
                        </div>
                      </div>
                    )}
                    <Button variant="outline" className="w-full">
                      Upload Image
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Danger Zone</h3>
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <h4 className="text-red-800 font-medium mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Delete this opportunity
                    </h4>
                    <p className="text-red-700 text-sm mb-4">
                      Once deleted, this opportunity cannot be recovered. This will remove all associated data.
                    </p>
                    <Button variant="destructive" size="sm">
                      Delete Opportunity
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