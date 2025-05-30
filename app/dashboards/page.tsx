"use client"

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/date-range-picker"
import { ExportButton } from "@/components/dashboard/export-button"
import { AccessStats } from "@/components/dashboard/access-stats"
import { WalletUsers } from "@/components/dashboard/wallet-users"
import { CustomerDemographics } from "@/components/dashboard/customer-demographics"
import { TransactionStats } from "@/components/dashboard/transaction-stats"
import { FinancialMetrics } from "@/components/dashboard/financial-metrics"
import { BusinessMetrics } from "@/components/dashboard/business-metrics"
import { SystemMetrics } from "@/components/dashboard/system-metrics"
import { TCMBReports } from "@/components/dashboard/tcmb-reports"
import { Separator } from "@/components/ui/separator"

export default function DashboardsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboards</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker date={dateRange} setDate={setDateRange} />
          <ExportButton />
        </div>
      </div>
      <Separator />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
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
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Access Statistics</h3>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
              </div>
              <AccessStats dateRange={dateRange} view="summary" />
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Wallet Users</h3>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                    <path d="M21 12V7H5a2 2 0 0 0 0 4h14v1" />
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                </div>
              </div>
              <WalletUsers dateRange={dateRange} view="summary" />
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Transaction Stats</h3>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
              </div>
              <TransactionStats dateRange={dateRange} view="summary" />
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">System Status</h3>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="m4.93 4.93 2.83 2.83" />
                    <path d="m16.24 16.24 2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="m4.93 19.07 2.83-2.83" />
                    <path d="m16.24 7.76 2.83-2.83" />
                  </svg>
                </div>
              </div>
              <SystemMetrics dateRange={dateRange} view="summary" />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Access Statistics</h3>
            <AccessStats dateRange={dateRange} view="detailed" />
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Wallet Users</h3>
              <WalletUsers dateRange={dateRange} view="detailed" />
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Demographics</h3>
              <CustomerDemographics dateRange={dateRange} />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Transaction Statistics</h3>
            <TransactionStats dateRange={dateRange} view="detailed" />
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Financial Metrics</h3>
            <FinancialMetrics dateRange={dateRange} />
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Business Metrics</h3>
            <BusinessMetrics dateRange={dateRange} />
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">System Metrics</h3>
            <SystemMetrics dateRange={dateRange} view="detailed" />
          </Card>
        </TabsContent>

        <TabsContent value="tcmb" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">TCMB Reports</h3>
            <TCMBReports dateRange={dateRange} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 