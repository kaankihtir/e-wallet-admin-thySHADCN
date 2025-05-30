"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ExternalLink, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/chargeback/status-badge";
import { mockChargebacks } from "@/lib/mock-data";
import { getCurrentStage } from "@/components/chargeback/utils";

interface CustomerChargebacksProps {
  customerId: string;
}

export function CustomerChargebacks({ customerId }: CustomerChargebacksProps) {
  // Filter chargebacks for this customer
  const customerChargebacks = mockChargebacks.filter(c => c.customerId === customerId);

  // Calculate statistics
  const totalAmount = customerChargebacks.reduce((sum, cb) => sum + cb.amount, 0);
  const approvedAmount = customerChargebacks
    .filter(cb => cb.status === "approved")
    .reduce((sum, cb) => sum + cb.amount, 0);
  const pendingAmount = customerChargebacks
    .filter(cb => cb.status.startsWith("pending"))
    .reduce((sum, cb) => sum + cb.amount, 0);
  const rejectedAmount = customerChargebacks
    .filter(cb => cb.status === "rejected")
    .reduce((sum, cb) => sum + cb.amount, 0);

  const stats = [
    {
      title: "Total Disputes",
      value: customerChargebacks.length,
      subValue: `${totalAmount.toFixed(2)} TL Total Amount`,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Approved",
      value: customerChargebacks.filter(cb => cb.status === "approved").length,
      subValue: `${approvedAmount.toFixed(2)} TL Refunded`,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Pending",
      value: customerChargebacks.filter(cb => cb.status.startsWith("pending")).length,
      subValue: `${pendingAmount.toFixed(2)} TL in Review`,
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Rejected",
      value: customerChargebacks.filter(cb => cb.status === "rejected").length,
      subValue: `${rejectedAmount.toFixed(2)} TL Rejected`,
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-3xl font-bold">{stat.value}</h2>
                      <p className="text-xs text-muted-foreground">{stat.subValue}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chargebacks List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Chargeback Requests</CardTitle>
              <CardDescription>View all chargeback requests made by this customer</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {customerChargebacks.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-medium">No Chargeback Requests</h3>
              <p className="text-muted-foreground text-center mt-1">
                This customer has not made any chargeback requests yet.
              </p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Current Stage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerChargebacks.map((chargeback) => (
                    <TableRow key={chargeback.id}>
                      <TableCell className="font-medium">{chargeback.id}</TableCell>
                      <TableCell>{chargeback.type}</TableCell>
                      <TableCell>{chargeback.amount.toFixed(2)} TL</TableCell>
                      <TableCell>{format(new Date(chargeback.date), "dd MMM yyyy")}</TableCell>
                      <TableCell>{getCurrentStage(chargeback)}</TableCell>
                      <TableCell>
                        <StatusBadge status={chargeback.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/chargeback/${chargeback.id}`}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 