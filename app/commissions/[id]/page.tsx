import { CommissionDetail } from "@/components/commissions/commission-detail"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Edit } from "lucide-react"
import Link from "next/link"

export default function CommissionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/commissions">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Commissions
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Commission Details</h1>
        </div>
        <Link href={`/commissions/${params.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Commission
          </Button>
        </Link>
      </div>
      <CommissionDetail id={params.id} />
    </div>
  )
}

