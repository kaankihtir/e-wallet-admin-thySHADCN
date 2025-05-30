import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const transactions = [
  {
    id: "TR123456",
    customer: "John Smith",
    initials: "JS",
    amount: "$2,500.00",
    status: "completed",
    type: "Top-up",
    date: "March 12, 2023, 14:32",
  },
  {
    id: "TR123457",
    customer: "Emily Johnson",
    initials: "EJ",
    amount: "$1,200.00",
    status: "completed",
    type: "Withdrawal",
    date: "March 12, 2023, 13:45",
  },
  {
    id: "TR123458",
    customer: "Michael Brown",
    initials: "MB",
    amount: "$500.00",
    status: "processing",
    type: "Transfer",
    date: "March 12, 2023, 12:30",
  },
  {
    id: "TR123459",
    customer: "Sarah Wilson",
    initials: "SW",
    amount: "$3,000.00",
    status: "completed",
    type: "Top-up",
    date: "March 12, 2023, 11:15",
  },
  {
    id: "TR123460",
    customer: "David Taylor",
    initials: "DT",
    amount: "$750.00",
    status: "failed",
    type: "Withdrawal",
    date: "March 12, 2023, 10:22",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{transaction.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.customer}</p>
            <p className="text-sm text-muted-foreground">
              {transaction.type} • {transaction.date}
            </p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <p className="text-sm font-medium">{transaction.amount}</p>
            <Badge
              variant={
                transaction.status === "completed"
                  ? "default"
                  : transaction.status === "processing"
                    ? "outline"
                    : "destructive"
              }
              className="text-xs"
            >
              {transaction.status === "completed"
                ? "Completed"
                : transaction.status === "processing"
                  ? "Processing"
                  : "Failed"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

