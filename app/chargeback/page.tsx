import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChargebackList } from "@/components/chargeback/chargeback-list"
import { ChargebackDashboard } from "@/components/chargeback/chargeback-dashboard"
import { BanknoteIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Chargeback Management",
  description: "Manage customer chargeback requests for prepaid cards and ATM transactions",
}

export default function ChargebackPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="rounded-lg bg-gradient-to-r from-rose-500 to-red-600 p-8 shadow-md">
        <div className="flex items-center gap-4 text-white">
          <BanknoteIcon className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Chargeback Management</h1>
            <p className="text-slate-100">
              Process and manage customer chargeback requests for POS transactions and ATM withdrawals
            </p>
          </div>
        </div>
      </div>
      
      <ChargebackDashboard />
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending_tkpay">Pending at TKPAY</TabsTrigger>
          <TabsTrigger value="pending_bank">Pending at Bank</TabsTrigger>
          <TabsTrigger value="pending_info">Additional Info Needed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <ChargebackList filter="all" />
        </TabsContent>
        
        <TabsContent value="pending_tkpay" className="mt-0">
          <ChargebackList filter="pending_tkpay" />
        </TabsContent>
        
        <TabsContent value="pending_bank" className="mt-0">
          <ChargebackList filter="pending_bank" />
        </TabsContent>
        
        <TabsContent value="pending_info" className="mt-0">
          <ChargebackList filter="pending_info" />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <ChargebackList filter="completed" />
        </TabsContent>
      </Tabs>
    </div>
  )
} 