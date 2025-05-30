import { GroupedCommissionsList } from "@/components/commissions/grouped-commissions-list"
import { CommissionsHeader } from "@/components/commissions/commissions-header"

export default function CommissionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <CommissionsHeader />
      <GroupedCommissionsList />
    </div>
  )
}

