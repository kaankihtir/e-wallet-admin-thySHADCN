"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

interface CustomerTransactionsListProps {
  customerId: string;
}

export function CustomerTransactionsList({ customerId }: CustomerTransactionsListProps) {
  // This would typically fetch transactions from an API
  // Using placeholder data for now
  const mockTransactions = [
    {
      id: "TRX-9876",
      type: "payment",
      amount: 1250.50,
      date: "2023-06-15",
      description: "Electronics Store Purchase",
      status: "completed"
    },
    {
      id: "TRX-5432",
      type: "withdrawal",
      amount: 500.00,
      date: "2023-06-10",
      description: "ATM Withdrawal",
      status: "completed"
    },
    {
      id: "TRX-2468",
      type: "payment",
      amount: 349.50,
      date: "2023-05-28",
      description: "Online Shopping",
      status: "completed"
    }
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: '15%' }}>Transaction ID</TableHead>
            <TableHead style={{ width: '15%' }}>Type</TableHead>
            <TableHead style={{ width: '15%' }}>Amount</TableHead>
            <TableHead style={{ width: '20%' }}>
              <div className="flex items-center">
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead style={{ width: '25%' }}>Description</TableHead>
            <TableHead style={{ width: '10%' }}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>
                {transaction.type === "payment" ? (
                  <div className="flex items-center">
                    <ArrowUpIcon className="mr-1 h-4 w-4 text-red-500" />
                    <span>Payment</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ArrowDownIcon className="mr-1 h-4 w-4 text-green-500" />
                    <span>Withdrawal</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <span className={transaction.type === "payment" ? "text-red-600" : "text-green-600"}>
                  {transaction.type === "payment" ? "-" : "+"}{transaction.amount.toFixed(2)} TL
                </span>
              </TableCell>
              <TableCell>{format(new Date(transaction.date), "dd MMM yyyy")}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 