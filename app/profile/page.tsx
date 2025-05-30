"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin,
  Shield, 
  UploadCloud, 
  AlertTriangle, 
  Clock,
  Eye
} from "lucide-react"

// Mock user data
const userData = {
  id: "USR001",
  name: "Admin User",
  email: "admin@example.com",
  phone: "+90 555 123 4567",
  role: "Administrator",
  avatar: null,
  initials: "AU",
  location: "Istanbul, Turkey",
  timezone: "(GMT+3) Turkey Time",
  lastLogin: "Today at 10:23",
  joinDate: "January 15, 2023",
  twoFactorEnabled: true,
  loginHistory: [
    { date: "April 10, 2023 10:23", ip: "192.168.1.1", device: "Chrome / Windows", location: "Istanbul, Turkey", status: "success" },
    { date: "April 9, 2023 15:45", ip: "192.168.1.1", device: "Chrome / Windows", location: "Istanbul, Turkey", status: "success" },
    { date: "April 8, 2023 09:12", ip: "192.168.22.14", device: "Safari / iOS", location: "Ankara, Turkey", status: "success" },
    { date: "April 7, 2023 18:30", ip: "192.168.1.1", device: "Chrome / Windows", location: "Istanbul, Turkey", status: "success" },
    { date: "April 6, 2023 14:15", ip: "195.142.65.21", device: "Firefox / Mac", location: "Unknown", status: "failed" },
  ],
  activities: [
    { date: "April 10, 2023 14:32", action: "Updated user settings", details: "Changed email notification preferences" },
    { date: "April 10, 2023 11:15", action: "Approved transaction", details: "Transaction #TR123456 for Customer ID CUS001" },
    { date: "April 9, 2023 16:45", action: "Modified limits", details: "Updated transfer limits for premium users" },
    { date: "April 8, 2023 10:23", action: "Added new campaign", details: "Created Spring Promotion campaign" },
    { date: "April 7, 2023 09:15", action: "System login", details: "Logged in from Istanbul, Turkey" },
  ]
}

export default function ProfilePage() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0])
    }
  }

  return (
    <div className="container max-w-screen-xl mx-auto py-6">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">View and manage your profile information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal information and photo</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-2 pb-6">
              <div className="relative mb-6 group">
                <Avatar className="h-24 w-24">
                  {avatarFile ? (
                    <AvatarImage src={URL.createObjectURL(avatarFile)} alt={userData.name} />
                  ) : (
                    <AvatarFallback className="text-xl">{userData.initials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <UploadCloud className="h-6 w-6 text-white" />
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <Badge className="mt-1 mb-3">{userData.role}</Badge>
              
              <div className="grid grid-cols-1 gap-3 w-full text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{userData.timezone}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Member since {userData.joinDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-2" />
                <span>2FA {userData.twoFactorEnabled ? "Enabled" : "Disabled"}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Last login: {userData.lastLogin}</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activity">Activity History</TabsTrigger>
              <TabsTrigger value="login">Login History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your recent actions in the admin panel</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {userData.activities.map((activity, index) => (
                        <div key={index} className="pb-4">
                          <div className="flex justify-between">
                            <div className="font-medium">{activity.action}</div>
                            <div className="text-sm text-muted-foreground">{activity.date}</div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{activity.details}</div>
                          {index < userData.activities.length - 1 && <Separator className="mt-4" />}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activities
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="login" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>Recent logins to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.loginHistory.map((login, index) => (
                        <TableRow key={index}>
                          <TableCell>{login.date}</TableCell>
                          <TableCell>{login.ip}</TableCell>
                          <TableCell>{login.device}</TableCell>
                          <TableCell>{login.location}</TableCell>
                          <TableCell>
                            {login.status === 'success' ? (
                              <Badge variant="outline" className="border-green-500 text-green-500">Success</Badge>
                            ) : (
                              <Badge variant="outline" className="border-red-500 text-red-500">Failed</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Logins
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 