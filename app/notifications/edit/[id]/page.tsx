"use client"

import { useRouter } from "next/navigation"
import { NotificationForm } from "@/components/notifications/notification-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Mock data fetch function (would be replaced with real API call)
const fetchNotification = async (id: string) => {
  // This is mock data - in a real app, you would fetch from an API
  return {
    id,
    name: `Notification ${id}`,
    transaction: "payment",
    type: "SMS",
    smsContent: {
      en: "Your payment of {amount} was successful. Reference: {transactionType}.",
      tr: "Ödemeniz {amount} başarıyla gerçekleşti. Referans: {transactionType}."
    },
    targets: [
      { key: "transaction_type", operator: "EQUALS", value: "payment" }
    ]
  };
};

export default function EditNotificationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [notification, setNotification] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNotification = async () => {
      try {
        const data = await fetchNotification(params.id)
        setNotification(data)
      } catch (error) {
        console.error("Error loading notification:", error)
      } finally {
        setLoading(false)
      }
    }

    loadNotification()
  }, [params.id])

  const handleSubmit = (data: any) => {
    // In a real application, you would send this data to your API
    console.log("Updating notification:", data)
    
    // Redirect back to the notifications list
    router.push("/notifications")
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Loading notification...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/notifications">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Notification</h1>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-lg shadow-md mb-6">
        <p className="text-blue-100">
          Edit notification details, content, and targeting rules.
        </p>
      </div>
      
      {notification && (
        <NotificationForm 
          initialData={notification}
          onSubmit={handleSubmit} 
          onCancel={() => router.push("/notifications")} 
        />
      )}
    </div>
  )
} 