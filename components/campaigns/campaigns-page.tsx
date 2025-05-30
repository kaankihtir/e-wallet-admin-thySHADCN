"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Gift, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { differenceInDays } from "date-fns"

// Mock campaign data
const mockCampaigns = [
  {
    id: "CAM-001",
    name: "Holiday Special",
    startDate: "2023-12-01",
    endDate: "2024-12-31",
    status: "Active",
    type: "Percentage",
    value: "5%",
    totalUsage: 245,
    totalCashback: 3456.78,
    currency: "USD",
    maximumCashback: "10000"
  },
  {
    id: "CAM-002",
    name: "New User Bonus",
    startDate: "2023-11-15",
    endDate: null,
    status: "Active",
    type: "Fixed Amount",
    value: "10 USD",
    totalUsage: 127,
    totalCashback: 1270.00,
    currency: "USD",
    maximumCashback: ""
  },
  {
    id: "CAM-003",
    name: "Spring Sale",
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    status: "Scheduled",
    type: "Percentage",
    value: "3%",
    totalUsage: 0,
    totalCashback: 0,
    currency: "TRY",
    maximumCashback: "5000"
  },
  {
    id: "CAM-004",
    name: "Partner Promotion",
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    status: "Expired",
    type: "Fixed Amount",
    value: "5 EUR",
    totalUsage: 345,
    totalCashback: 1725.00,
    currency: "EUR",
    maximumCashback: ""
  },
]

export function CampaignsPage() {
  const router = useRouter()
  const [campaigns] = useState(mockCampaigns)

  // Calculate days remaining for a campaign
  const getDaysRemaining = (endDate: string | null) => {
    if (!endDate) return "Ongoing";
    
    const today = new Date();
    const end = new Date(endDate);
    
    if (end <= today) return "Expired";
    
    const daysLeft = differenceInDays(end, today);
    return `${daysLeft} days left`;
  }

  // Calculate remaining cashback for campaigns with max limit
  const getRemainingCashback = (campaign: any) => {
    if (!campaign.maximumCashback) return "N/A";
    
    const maxCashback = parseFloat(campaign.maximumCashback);
    const usedCashback = campaign.totalCashback;
    const remaining = maxCashback - usedCashback;
    
    return remaining > 0 ? `${remaining.toFixed(2)} ${campaign.currency}` : "Limit reached";
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-6 w-6 text-white" />
            <h1 className="text-3xl font-bold text-white">Campaigns</h1>
          </div>
          <p className="text-amber-100">
            Manage your cashback campaigns and track their performance
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => router.push("/campaigns/new")}>
            <Plus className="mr-2 h-4 w-4" /> Create Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Gift className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              {campaigns.filter(c => c.status === "Active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Usages</CardTitle>
            <Gift className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((acc, c) => acc + c.totalUsage, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Cashback</CardTitle>
            <Gift className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${campaigns.reduce((acc, c) => acc + c.totalCashback, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Max Cashback</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow 
                  key={campaign.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(`/campaigns/${campaign.id}`)}
                >
                  <TableCell className="font-medium">{campaign.id}</TableCell>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>
                    {campaign.startDate} - {campaign.endDate || "Ongoing"}
                    {campaign.endDate && campaign.status === "Active" && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {getDaysRemaining(campaign.endDate)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        campaign.status === "Active" ? "default" : 
                        campaign.status === "Scheduled" ? "outline" : 
                        "secondary"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.type}</TableCell>
                  <TableCell>{campaign.type === "Percentage" ? `${campaign.value.replace('%', '')}%` : campaign.value.split(' ')[0]}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{campaign.currency}</Badge>
                  </TableCell>
                  <TableCell>
                    {campaign.maximumCashback ? (
                      <div>
                        <div>{campaign.maximumCashback} {campaign.currency}</div>
                        <div className="text-xs text-green-600 mt-1">
                          {getRemainingCashback(campaign)}
                        </div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{campaign.totalUsage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 