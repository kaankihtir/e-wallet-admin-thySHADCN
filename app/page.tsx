import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { UserStats } from "@/components/dashboard/user-stats"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,423,567</div>
                <p className="text-xs text-muted-foreground">+18.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32,594</div>
                <p className="text-xs text-muted-foreground">+12.3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commission Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$84,432</div>
                <p className="text-xs text-muted-foreground">+4.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Showing last 10 transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>User distribution and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <UserStats />
              </CardContent>
            </Card>

            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Financial Crimes Investigation Board compliance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Identity Verification Rate</p>
                      <div className="flex items-center">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[92%] rounded-full bg-primary"></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">92%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Suspicious Transaction Reports</p>
                      <div className="flex items-center">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[3%] rounded-full bg-destructive"></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">3%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Address Verification</p>
                      <div className="flex items-center">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[78%] rounded-full bg-amber-500"></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">78%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Limit Excess Alerts</p>
                      <div className="flex items-center">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[12%] rounded-full bg-amber-500"></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">12%</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <div className="font-medium">Regulatory Compliance Note</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      All transactions in the system are monitored in accordance with Anti-Money Laundering Law No. 5549
                      and related regulations.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

