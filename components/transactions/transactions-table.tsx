"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeftRight,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransactionDetails } from "@/components/transactions/transaction-details";

// Update the Transaction type to include flagged properties
export interface Transaction {
  id: string;
  customer: string;
  email: string;
  type: "topup" | "withdraw" | "transfer";
  amount: string;
  fee: string;
  status: "completed" | "processing" | "failed";
  date: string;
  method: string;
  flagged?: boolean;
  flagReason?: string;
}

// Update mock data to include flagged transactions
const transactions: Transaction[] = [
  {
    id: "TR123456",
    customer: "John Smith",
    email: "john.smith@example.com",
    type: "topup" as const,
    amount: "$2,500.00",
    fee: "$0.00",
    status: "completed" as const,
    date: "03.12.2023 14:32",
    method: "Bank Transfer",
  },
  {
    id: "TR123457",
    customer: "Emily Johnson",
    email: "emily.johnson@example.com",
    type: "withdraw" as const,
    amount: "$1,200.00",
    fee: "$3.50",
    status: "completed" as const,
    date: "03.12.2023 13:45",
    method: "Bank Transfer",
    flagged: true,
    flagReason: "Contains suspicious term 'crypto' in description",
  },
  {
    id: "TR123458",
    customer: "Michael Brown",
    email: "michael.brown@example.com",
    type: "transfer" as const,
    amount: "$500.00",
    fee: "$1.50",
    status: "processing" as const,
    date: "03.12.2023 12:30",
    method: "Wallet Transfer",
  },
  {
    id: "TR123459",
    customer: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    type: "topup" as const,
    amount: "$3,000.00",
    fee: "$0.00",
    status: "completed" as const,
    date: "03.12.2023 11:15",
    method: "Credit Card",
  },
  {
    id: "TR123460",
    customer: "David Taylor",
    email: "david.taylor@example.com",
    type: "withdraw" as const,
    amount: "$750.00",
    fee: "$2.25",
    status: "failed" as const,
    date: "03.12.2023 10:22",
    method: "Bank Transfer",
    flagged: true,
    flagReason: "Contains suspicious term 'gambling' in description",
  },
  {
    id: "TR123461",
    customer: "Jessica Miller",
    email: "jessica.miller@example.com",
    type: "transfer" as const,
    amount: "$1,500.00",
    fee: "$4.50",
    status: "completed" as const,
    date: "03.11.2023 16:45",
    method: "Wallet Transfer",
  },
  {
    id: "TR123462",
    customer: "Robert Davis",
    email: "robert.davis@example.com",
    type: "topup" as const,
    amount: "$1,000.00",
    fee: "$0.00",
    status: "completed" as const,
    date: "03.11.2023 14:20",
    method: "Credit Card",
  },
  {
    id: "TR123463",
    customer: "Jennifer Garcia",
    email: "jennifer.garcia@example.com",
    type: "withdraw" as const,
    amount: "$2,000.00",
    fee: "$6.00",
    status: "processing" as const,
    date: "03.11.2023 11:10",
    method: "Bank Transfer",
    flagged: true,
    flagReason: "Contains suspicious term 'bet' in description",
  },
];

export function TransactionsTable() {
  const [page, setPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const pageSize = 5;
  const totalPages = Math.ceil(transactions.length / pageSize);

  const paginatedTransactions = transactions.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const getTypeIcon = (type: "topup" | "withdraw" | "transfer") => {
    switch (type) {
      case "topup":
        return <ArrowDownCircle className="h-4 w-4 text-green-500" />;
      case "withdraw":
        return <ArrowUpCircle className="h-4 w-4 text-red-500" />;
      case "transfer":
        return <ArrowLeftRight className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTypeText = (type: "topup" | "withdraw" | "transfer") => {
    switch (type) {
      case "topup":
        return "Top-up";
      case "withdraw":
        return "Withdrawal";
      case "transfer":
        return "Transfer";
      default:
        return type;
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Transaction ID</TableHead>
              <TableHead className="w-[200px]">Customer</TableHead>
              <TableHead>Transaction Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id} className={transaction.flagged ? "bg-amber-50" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-1">
                    {transaction.flagged && <AlertTriangle className="h-4 w-4 text-amber-600" />}
                    {transaction.id}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{transaction.customer}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(transaction.type)}
                    <span>{getTypeText(transaction.type)}</span>
                  </div>
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.fee}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "default"
                        : transaction.status === "processing"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {transaction.status === "completed"
                      ? "Completed"
                      : transaction.status === "processing"
                      ? "Processing"
                      : "Failed"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setDetailsOpen(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {transaction.flagged ? (
                        <DropdownMenuItem className="text-amber-600">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Review Flag
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-destructive">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Flag Transaction
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="sticky top-0 z-10 bg-background px-6 pt-6 pb-4 border-b shadow-sm flex flex-row items-center justify-between">
            <DialogTitle>Transaction Details</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDetailsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          <div className="overflow-y-auto p-6 flex-1">
            {selectedTransaction && (
              <TransactionDetails transaction={selectedTransaction} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
