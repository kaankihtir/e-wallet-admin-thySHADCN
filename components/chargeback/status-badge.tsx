"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "pending_at_tkpay":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700">Pending at TKPAY</Badge>
    case "pending_at_bank":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700">Pending at Bank</Badge>
    case "pending_info":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700">Info Needed</Badge>
    case "approved":
      return <Badge variant="outline" className="bg-green-50 text-green-700">Approved</Badge>
    case "rejected":
      return <Badge variant="outline" className="bg-red-50 text-red-700">Rejected</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
} 