import { CommissionCreateForm } from "@/components/commissions/commission-create-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CommissionCreatePage() {
  return (
    <div className="container max-w-3xl mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/commissions">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">New Commission</h1>
        </div>
      </div>
      <CommissionCreateForm />
    </div>
  )
}

