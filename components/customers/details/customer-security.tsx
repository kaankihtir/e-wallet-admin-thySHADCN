"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Lock, Smartphone, Globe, RefreshCw, UserX, KeyRound, Settings, Users, UserCog } from "lucide-react"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ShieldAlert, Clock, ShieldCheck, ShieldX, Eye, Key } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Eye as EyeIcon, Users as UsersIcon } from "lucide-react"

export function CustomerSecurity({ customer }: { customer: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Account security and access settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Additional security for account access</p>
                </div>
              </div>
              <Badge variant="outline" className="border-green-500 text-green-500">
                Enabled
              </Badge>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Enabled on January 20, 2023. Using authenticator app.
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Login Attempts</h3>
                  <p className="text-sm text-muted-foreground">Recent account access attempts</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Log
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Last successful login:</span>
                <span>Mar 10, 2023 at 14:32 (New York, USA)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Failed login attempts:</span>
                <span>1 in the last 30 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Devices:</span>
                <span>2 active devices</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Account Restrictions</h3>
                  <p className="text-sm text-muted-foreground">Limits and restrictions on this account</p>
                </div>
              </div>
              <Badge variant={customer.status === "suspended" ? "destructive" : "outline"}>
                {customer.status === "suspended" ? "Restricted" : "No Restrictions"}
              </Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Transaction limits:</span>
                <span>Standard ($10,000 daily)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>International transfers:</span>
                <span>Enabled</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>High-risk countries:</span>
                <span>Blocked</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Management</CardTitle>
          <CardDescription>Devices that have accessed this account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">iPhone 13 Pro</h3>
                  <p className="text-sm text-muted-foreground">iOS 16.5.1</p>
                </div>
              </div>
              <Badge variant="default">Current Device</Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Last active:</span>
                <span>Now</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Location:</span>
                <span>New York, USA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IP Address:</span>
                <span>192.168.1.1</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Chrome on Windows</h3>
                  <p className="text-sm text-muted-foreground">Windows 11</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Lock className="h-4 w-4 mr-2" />
                Revoke
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Last active:</span>
                <span>2 days ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Location:</span>
                <span>New York, USA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IP Address:</span>
                <span>192.168.1.2</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Actions</CardTitle>
          <CardDescription>Manage account security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Password
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Manage 2FA Settings
            </Button>
            <Button variant="outline" className="justify-start">
              <KeyRound className="mr-2 h-4 w-4" />
              Generate API Keys
            </Button>
            <Button variant="destructive" className="justify-start">
              <Lock className="mr-2 h-4 w-4" />
              Lock Account
            </Button>
            <Button variant="destructive" className="justify-start">
              <UserX className="mr-2 h-4 w-4" />
              Suspend Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function CustomerLimits({ customer }: { customer: any }) {
  // Mock data for customer limit profile
  const limitProfile = {
    type: "system", // can be "system", "group", or "custom"
    groupId: null,
    groupName: null,
    appliedOn: "2023-05-15T10:30:00Z"
  }
  
  return (
    <TabsContent value="limits" className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Transaction Limits</h3>
        <p className="text-sm text-muted-foreground">
          View and manage transaction limits for this customer
        </p>
      </div>

      <div className="space-y-6">
        {/* Limit Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Limit Profile</CardTitle>
            <CardDescription>Current limit settings applied to this customer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg flex-1">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">
                    {limitProfile.type === "system" && "System Default"}
                    {limitProfile.type === "group" && `Group: ${limitProfile.groupName}`}
                    {limitProfile.type === "custom" && "Custom Limits"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {limitProfile.type === "system" && "Default platform limits are applied"}
                    {limitProfile.type === "group" && "Limits from a specific user group"}
                    {limitProfile.type === "custom" && "Customized limits for this user"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Applied on {new Date(limitProfile.appliedOn).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="ml-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Change Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Change Limit Profile</DialogTitle>
                      <DialogDescription>
                        Choose which limit profile to apply to this customer
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Profile Type</Label>
                        <Select defaultValue={limitProfile.type}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="system">System Default</SelectItem>
                            <SelectItem value="group">Group Limits</SelectItem>
                            <SelectItem value="custom">Custom Limits</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Select Group</Label>
                        <Select disabled={limitProfile.type !== "group"}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="premium">Premium Users</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="new">New Users</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">Only available when Group Limits is selected</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>Cancel</Button>
                      <Button>Apply Profile</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Limit Details */}
        <Card>
          <CardHeader>
            <CardTitle>Limit Details</CardTitle>
            <CardDescription>Transaction limits currently applied</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Tabs defaultValue="topup" className="space-y-4">
                <TabsList className="w-full justify-start mb-4">
                  <TabsTrigger value="topup">Top-up</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="refund">Refund</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                  <TabsTrigger value="transfer">Transfer</TabsTrigger>
                </TabsList>
                
                <div className="mb-4">
                  <Label>Currency</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Currencies</SelectItem>
                      <SelectItem value="TRY">TRY</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <TabsContent value="topup" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Period</TableHead>
                        <TableHead>KYC Verified (Min-Max)</TableHead>
                        <TableHead>Unverified (Min-Max)</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>₺0 - ₺10,000</TableCell>
                        <TableCell>₺0 - ₺2,000</TableCell>
                        <TableCell>TRY</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Weekly</TableCell>
                        <TableCell>₺0 - ₺50,000</TableCell>
                        <TableCell>₺0 - ₺10,000</TableCell>
                        <TableCell>TRY</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Monthly</TableCell>
                        <TableCell>₺0 - ₺150,000</TableCell>
                        <TableCell>₺0 - ₺20,000</TableCell>
                        <TableCell>TRY</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>$0 - $1,000</TableCell>
                        <TableCell>$0 - $200</TableCell>
                        <TableCell>USD</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>€0 - €950</TableCell>
                        <TableCell>€0 - €180</TableCell>
                        <TableCell>EUR</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>£0 - £800</TableCell>
                        <TableCell>£0 - £150</TableCell>
                        <TableCell>GBP</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="payment" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Period</TableHead>
                        <TableHead>KYC Verified (Min-Max)</TableHead>
                        <TableHead>Unverified (Min-Max)</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>₺10 - ₺5,000</TableCell>
                        <TableCell>₺10 - ₺1,000</TableCell>
                        <TableCell>TRY</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">One Time</TableCell>
                        <TableCell>₺10 - ₺2,000</TableCell>
                        <TableCell>₺10 - ₺500</TableCell>
                        <TableCell>TRY</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>$10 - $500</TableCell>
                        <TableCell>$10 - $100</TableCell>
                        <TableCell>USD</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>€10 - €450</TableCell>
                        <TableCell>€10 - €90</TableCell>
                        <TableCell>EUR</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>£10 - £400</TableCell>
                        <TableCell>£10 - £80</TableCell>
                        <TableCell>GBP</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="withdraw" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Period</TableHead>
                        <TableHead>KYC Verified (Min-Max)</TableHead>
                        <TableHead>Unverified (Min-Max)</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>₺10 - ₺5,000</TableCell>
                        <TableCell>₺10 - ₺1,000</TableCell>
                        <TableCell>TRY</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>$10 - $500</TableCell>
                        <TableCell>$10 - $100</TableCell>
                        <TableCell>USD</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>€10 - €450</TableCell>
                        <TableCell>€10 - €90</TableCell>
                        <TableCell>EUR</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>£10 - £400</TableCell>
                        <TableCell>£10 - £80</TableCell>
                        <TableCell>GBP</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="refund" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Period</TableHead>
                        <TableHead>KYC Verified (Min-Max)</TableHead>
                        <TableHead>Unverified (Min-Max)</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>₺0 - ₺25,000</TableCell>
                        <TableCell>₺0 - ₺5,000</TableCell>
                        <TableCell>TRY</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>$0 - $2,500</TableCell>
                        <TableCell>$0 - $500</TableCell>
                        <TableCell>USD</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>€0 - €2,250</TableCell>
                        <TableCell>€0 - €450</TableCell>
                        <TableCell>EUR</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>£0 - £2,000</TableCell>
                        <TableCell>£0 - £400</TableCell>
                        <TableCell>GBP</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="transfer" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Period</TableHead>
                        <TableHead>KYC Verified (Min-Max)</TableHead>
                        <TableHead>Unverified (Min-Max)</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>₺10 - ₺7,500</TableCell>
                        <TableCell>₺10 - ₺1,500</TableCell>
                        <TableCell>TRY</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>$10 - $750</TableCell>
                        <TableCell>$10 - $150</TableCell>
                        <TableCell>USD</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>€10 - €675</TableCell>
                        <TableCell>€10 - €135</TableCell>
                        <TableCell>EUR</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>£10 - £600</TableCell>
                        <TableCell>£10 - £120</TableCell>
                        <TableCell>GBP</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  )
}

