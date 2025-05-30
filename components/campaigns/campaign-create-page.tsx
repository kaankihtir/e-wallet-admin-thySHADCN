"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { CampaignForm } from "@/components/campaigns/campaign-form"
import { useToast } from "@/components/ui/use-toast"

export function CampaignCreatePage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (formData: any) => {
    console.log("New campaign data:", formData)

    toast({
      title: "Campaign created",
      description: `Campaign "${formData.name}" has been created successfully.`,
    })

    // Navigate back to campaigns list
    router.push("/campaigns")
  }

  const handleCancel = () => {
    router.push("/campaigns")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleCancel} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Campaign</h1>
          <p className="text-muted-foreground">Set up a new marketing campaign with cashback rewards</p>
        </div>
      </div>

      <CampaignForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
} 