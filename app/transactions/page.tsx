import { TransactionsHeader } from "@/components/transactions/transactions-header"
import { TransactionsTable } from "@/components/transactions/transactions-table"

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <TransactionsHeader />
      <TransactionsTable />
    </div>
  )
}

