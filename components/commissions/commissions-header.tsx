import { Button } from "@/components/ui/button"
import { Percent, Plus } from "lucide-react"
import Link from "next/link"

export function CommissionsHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Percent className="h-6 w-6 text-white" />
          <h1 className="text-3xl font-bold text-white">Commissions</h1>
        </div>
        <p className="text-violet-100">
          Manage your e-wallet commission settings
        </p>
      </div>
      
      <div className="flex justify-end">
        <Link href="/commissions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Commission
          </Button>
        </Link>
      </div>
    </div>
  )
}

