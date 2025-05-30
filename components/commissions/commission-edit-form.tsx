"use client"
import { useRouter } from "next/navigation"
import { CommissionForm } from "./commission-form"
import { type Commission, getCommissionById } from "@/lib/commission-data"

export function CommissionEditForm({ id }: { id: string }) {
  const router = useRouter()
  const commission = getCommissionById(id)

  if (!commission) {
    return <div>Commission not found</div>
  }

  const handleSubmit = (data: Partial<Commission>) => {
    // Here you would typically send the data to your API
    console.log("Updating commission:", data)

    // For demo purposes, just redirect back to the commission detail
    router.push(`/commissions/${id}`)
  }

  return <CommissionForm initialData={commission} onSubmit={handleSubmit} />
}

