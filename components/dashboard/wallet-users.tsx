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
} from "recharts"

interface WalletUsersProps {
  dateRange: DateRange | undefined
  view: "summary" | "detailed"
}

// Mock data - replace with actual API call
const mockData = {
  totalUsers: {
    closed: 15000,
    open: 25000,
  },
  closedWalletUsers: {
    domestic: 12000,
    foreign: 3000,
  },
  openWalletUsers: {
    domestic: 20000,
    foreign: 5000,
  },
}

const COLORS = ["#0ea5e9", "#adfa1d", "#f43f5e", "#a855f7"]

export function WalletUsers({ dateRange, view }: WalletUsersProps) {
  const walletTypeData = [
    { name: "Closed Wallet", value: mockData.totalUsers.closed },
    { name: "Open Wallet", value: mockData.totalUsers.open },
  ]

  const closedWalletData = [
    { name: "Domestic Users", value: mockData.closedWalletUsers.domestic },
    { name: "Foreign Users", value: mockData.closedWalletUsers.foreign },
  ]

  const openWalletData = [
    { name: "Domestic Users", value: mockData.openWalletUsers.domestic },
    { name: "Foreign Users", value: mockData.openWalletUsers.foreign },
  ]

  if (view === "summary") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="text-2xl font-bold">
            {(mockData.totalUsers.closed + mockData.totalUsers.open).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total Registered Users</p>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold">
            {(mockData.closedWalletUsers.domestic + mockData.openWalletUsers.domestic).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total Domestic Users</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Wallet Type Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={walletTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {walletTypeData.map((_, index) => (
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
        <h3 className="text-lg font-semibold mb-4">Closed Wallet Users</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={closedWalletData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {closedWalletData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index + 2]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Open Wallet Users</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={openWalletData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {openWalletData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index + 2]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
} 