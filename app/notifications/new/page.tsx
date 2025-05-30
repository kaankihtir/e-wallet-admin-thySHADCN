"use client"

import { useRouter } from "next/navigation"
import { NotificationForm } from "@/components/notifications/notification-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewNotificationPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // In a real application, you would send this data to your API
    console.log("Creating new notification:", data)
    
    // Redirect back to the notifications list
    router.push("/notifications")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/notifications">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create New Notification</h1>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-lg shadow-md mb-6">
        <p className="text-blue-100">
          Create a notification for SMS, Email, or Push. Define the content, targeting rules, and languages.
        </p>
      </div>
      
      <NotificationForm 
        onSubmit={handleSubmit} 
        onCancel={() => router.push("/notifications")} 
      />
    </div>
  )
} 