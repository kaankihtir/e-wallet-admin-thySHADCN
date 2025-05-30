"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Commission } from "@/lib/commission-data"
import { SinglePageCommissionForm } from "./single-page-commission-form"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function CommissionCreateForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: Partial<Commission>) => {
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Creating commission:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Commission created",
        description: `${data.name} has been successfully created.`,
      })

      // Redirect back to the commissions list
      router.push("/commissions")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create commission. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <SinglePageCommissionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Card>
  )
}

