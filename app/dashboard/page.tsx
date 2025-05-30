"use client"

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/date-range-picker"
import { AccessStats } from "@/components/dashboard/access-stats"
import { WalletUsers } from "@/components/dashboard/wallet-users"
import { CustomerDemographics } from "@/components/dashboard/customer-demographics"
import { TransactionStats } from "@/components/dashboard/transaction-stats"
import { FinancialMetrics } from "@/components/dashboard/financial-metrics"
import { BusinessMetrics } from "@/components/dashboard/business-metrics"
import { SystemMetrics } from "@/components/dashboard/system-metrics"
import { ExportButton } from "@/components/dashboard/export-button"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker date={dateRange} setDate={setDateRange} />
          <ExportButton />
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="access">Access Statistics</TabsTrigger>
          <TabsTrigger value="users">Wallet Users</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="tcmb">TCMB Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <AccessStats dateRange={dateRange} view="summary" />
            <WalletUsers dateRange={dateRange} view="summary" />
            <TransactionStats dateRange={dateRange} view="summary" />
            <SystemMetrics dateRange={dateRange} view="summary" />
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <AccessStats dateRange={dateRange} view="detailed" />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <WalletUsers dateRange={dateRange} view="detailed" />
          <CustomerDemographics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <TransactionStats dateRange={dateRange} view="detailed" />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <FinancialMetrics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <BusinessMetrics dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <SystemMetrics dateRange={dateRange} view="detailed" />
        </TabsContent>

        <TabsContent value="tcmb" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">TCMB Reports</h3>
            {/* TCMB report download options will be added here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 