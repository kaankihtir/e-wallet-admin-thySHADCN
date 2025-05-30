"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockChargebacks } from "@/lib/mock-data"
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  Clock, 
  CreditCard, 
  AlertTriangle,
  FileCheck, 
  CheckCircle,
  XCircle
} from "lucide-react"

export function ChargebackDashboard() {
  // Calculate statistics
  const totalChargebacks = mockChargebacks.length
  
  const pendingAtTKPAY = mockChargebacks.filter(c => c.status === "pending_at_tkpay").length
  const pendingAtBank = mockChargebacks.filter(c => c.status === "pending_at_bank").length
  const pendingInfo = mockChargebacks.filter(c => c.status === "pending_info").length
  
  const approvedChargebacks = mockChargebacks.filter(c => c.status === "approved").length
  const rejectedChargebacks = mockChargebacks.filter(c => c.status === "rejected").length
  
  const posChargebacks = mockChargebacks.filter(c => c.type === "POS").length
  const atmChargebacks = mockChargebacks.filter(c => c.type === "ATM").length
  
  const totalAmount = mockChargebacks.reduce((sum, chargeback) => sum + chargeback.amount, 0)
  const approvedAmount = mockChargebacks
    .filter(c => c.status === "approved")
    .reduce((sum, chargeback) => sum + chargeback.amount, 0)
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-rose-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending at TKPAY</CardTitle>
          <Clock className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingAtTKPAY}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting initial review and assignment
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending at Bank</CardTitle>
          <FileCheck className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingAtBank}</div>
          <p className="text-xs text-muted-foreground">
            Under review at Ziraat Bank
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-amber-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Needs Additional Info</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingInfo}</div>
          <p className="text-xs text-muted-foreground">
            Waiting for customer documentation
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
          <div className="flex space-x-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <XCircle className="h-4 w-4 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">
              {totalChargebacks ? Math.round(((approvedChargebacks + rejectedChargebacks) / totalChargebacks) * 100) : 0}%
            </div>
            <div className="text-xs text-muted-foreground">
              {approvedChargebacks} approved · {rejectedChargebacks} rejected
            </div>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div 
              className="h-2 rounded-full bg-green-500" 
              style={{ 
                width: `${totalChargebacks ? (approvedChargebacks / totalChargebacks) * 100 : 0}%` 
              }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 