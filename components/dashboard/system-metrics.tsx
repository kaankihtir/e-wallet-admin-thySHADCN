"use client"

import { Card } from "@/components/ui/card"
import { DateRange } from "react-day-picker"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts"

interface SystemMetricsProps {
  dateRange: DateRange | undefined
  view: "summary" | "detailed"
}

// Mock data - replace with actual API call
const mockData = {
  pendingApprovals: {
    kycUpgrade: 150,
    changeRequests: 80,
    total: 230,
  },
  kycStatus: {
    verified: 25000,
    unverified: 5000,
    pending: 1000,
  },
  walletActivity: {
    active: 20000,
    inactive: 8000,
  },
  dailyApprovals: [
    {
      date: "2024-03-01",
      kycUpgrade: 30,
      changeRequests: 15,
    },
    {
      date: "2024-03-02",
      kycUpgrade: 25,
      changeRequests: 20,
    },
    {
      date: "2024-03-03",
      kycUpgrade: 35,
      changeRequests: 18,
    },
    {
      date: "2024-03-04",
      kycUpgrade: 28,
      changeRequests: 22,
    },
    {
      date: "2024-03-05",
      kycUpgrade: 32,
      changeRequests: 25,
    },
  ],
}

const COLORS = ["#0ea5e9", "#adfa1d", "#f43f5e", "#a855f7"]

export function SystemMetrics({ dateRange, view }: SystemMetricsProps) {
  if (view === "summary") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="text-2xl font-bold">
            {mockData.pendingApprovals.total.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Pending Approvals</p>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold">
            {((mockData.walletActivity.active /
              (mockData.walletActivity.active +
                mockData.walletActivity.inactive)) *
              100).toFixed(1)}
            %
          </div>
          <p className="text-xs text-muted-foreground">Active Wallets</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">KYC Status Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Verified", value: mockData.kycStatus.verified },
                    { name: "Unverified", value: mockData.kycStatus.unverified },
                    { name: "Pending", value: mockData.kycStatus.pending },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {Object.keys(mockData.kycStatus).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Wallet Activity Status</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Active", value: mockData.walletActivity.active },
                    { name: "Inactive", value: mockData.walletActivity.inactive },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {Object.keys(mockData.walletActivity).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Approval Requests</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.dailyApprovals}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="kycUpgrade"
                name="KYC Upgrades"
                fill="#0ea5e9"
                stackId="a"
              />
              <Bar
                dataKey="changeRequests"
                name="Change Requests"
                fill="#adfa1d"
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Pending Approvals</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">KYC Upgrades</dt>
              <dd className="text-2xl font-bold">
                {mockData.pendingApprovals.kycUpgrade.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Change Requests</dt>
              <dd className="text-2xl font-bold">
                {mockData.pendingApprovals.changeRequests.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Total Pending</dt>
              <dd className="text-2xl font-bold">
                {mockData.pendingApprovals.total.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">KYC Status</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Verified Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.kycStatus.verified.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Unverified Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.kycStatus.unverified.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Pending Verification</dt>
              <dd className="text-2xl font-bold">
                {mockData.kycStatus.pending.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
} 