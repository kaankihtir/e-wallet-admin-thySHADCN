"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bell, CheckCircle2, Copy, Download, Globe, Megaphone, MessageSquare, Mail, XCircle } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data (would come from API in real app)
const mockNotifications = [
  {
    id: "NOT-007",
    name: "Service Maintenance",
    type: "Announcement",
    subtype: "SMS",
    content: {
      en: "Our services will be down for maintenance from 2AM to 4AM EST on August 20th. We apologize for any inconvenience.",
      tr: "Hizmetlerimiz 20 Ağustos'ta 09:00-11:00 saatleri arasında bakım nedeniyle kapalı olacaktır. Verdiğimiz rahatsızlık için özür dileriz."
    },
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
    content: {
      en: "We're excited to announce our new features launching next month! Stay tuned for more updates.",
      tr: "Önümüzdeki ay yeni özelliklerimizi piyasaya sürmekten heyecan duyuyoruz! Daha fazla güncelleme için bizi takip edin."
    },
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
    content: {
      en: "Enjoy 25% off on all transactions during the holiday season! Offer valid until January 5th.",
      tr: "Tatil sezonu boyunca tüm işlemlerde %25 indirim! Teklif 5 Ocak'a kadar geçerlidir."
    },
    status: "Active",
    languages: ["English", "Turkish"],
    lastUpdated: "2023-10-15",
    dateSent: "2023-10-18 09:15",
    recipients: {
      success: 7500,
      failed: 42
    }
  }
]

// Helper functions
function getNotificationIcon(type: string, subtype?: string) {
  if (type === "Announcement") {
    switch (subtype) {
      case "SMS":
        return <MessageSquare className="h-5 w-5" />
      case "Email":
        return <Mail className="h-5 w-5" />
      case "Push":
        return <Bell className="h-5 w-5" />
      default:
        return <Megaphone className="h-5 w-5" />
    }
  }
  
  switch (type) {
    case "SMS":
      return <MessageSquare className="h-5 w-5" />
    case "Email":
      return <Mail className="h-5 w-5" />
    case "Push":
      return <Bell className="h-5 w-5" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

function getStatusBadgeVariant(status: string) {
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

export default function NotificationDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [notification, setNotification] = useState<any>(null)
  const [activeLanguage, setActiveLanguage] = useState("en")
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // In a real app, fetch from API
    const notificationId = params.id as string
    const foundNotification = mockNotifications.find(n => n.id === notificationId)
    
    if (foundNotification) {
      setNotification(foundNotification)
    }
    
    setLoading(false)
  }, [params.id])
  
  if (loading) {
    return <div className="p-6">Loading notification details...</div>
  }
  
  if (!notification) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/notifications">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Notification Details</h1>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Notification not found</p>
            <Button className="mt-4" asChild>
              <Link href="/notifications">Back to Notifications</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  const isAnnouncement = notification.type === "Announcement"
  
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/notifications">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Notification Details</h1>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className={isAnnouncement ? "bg-amber-50/50 border-amber-200" : undefined}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isAnnouncement ? "bg-amber-100" : "bg-primary/10"}`}>
                  {getNotificationIcon(notification.type, notification.subtype)}
                </div>
                <div>
                  <CardTitle className="text-xl">{notification.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {notification.id} • {isAnnouncement ? `${notification.subtype} Announcement` : notification.type}
                  </CardDescription>
                </div>
              </div>
              <Badge variant={getStatusBadgeVariant(notification.status)}>
                {notification.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h3>
                <p>{notification.lastUpdated}</p>
              </div>
              
              {isAnnouncement && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Date Sent</h3>
                  <p>{notification.dateSent}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Languages</h3>
                <div className="flex gap-1 mt-1">
                  {notification.languages.map((lang: string, index: number) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {isAnnouncement && notification.recipients && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Recipients</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{notification.recipients.success} successful</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-600">
                      <XCircle className="h-4 w-4" />
                      <span>{notification.recipients.failed} failed</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Separator />
            
            {/* Content Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Content</h3>
              
              <Tabs value={activeLanguage} onValueChange={setActiveLanguage} className="mt-4">
                <TabsList className="mb-4">
                  {notification.languages.map((lang: string, index: number) => (
                    <TabsTrigger 
                      key={index} 
                      value={lang === "English" ? "en" : "tr"}
                    >
                      {lang}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="en" className="border rounded-md p-4 bg-white">
                  {notification.content?.en || "No content available"}
                </TabsContent>
                
                <TabsContent value="tr" className="border rounded-md p-4 bg-white">
                  {notification.content?.tr || "No content available"}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" asChild>
              <Link href="/notifications">
                Back to Notifications
              </Link>
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              
              {notification.status !== "Active" ? (
                <Button>Activate</Button>
              ) : (
                <Button variant="destructive">Deactivate</Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 