import { CommissionEditForm } from "@/components/commissions/commission-edit-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CommissionEditPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center space-x-2">
        <Link href={`/commissions/${params.id}`}>
          <Button variant="ghost" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Commission Details
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Commission</h1>
      </div>
      <CommissionEditForm id={params.id} />
    </div>
  )
}

