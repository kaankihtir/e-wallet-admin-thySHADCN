import { CustomersList } from "@/components/customers/customers-list"
import { CustomersHeader } from "@/components/customers/customers-header"

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <CustomersHeader />
      <CustomersList />
    </div>
  )
}

