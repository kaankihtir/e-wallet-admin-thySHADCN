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

interface BusinessMetricsProps {
  dateRange: DateRange | undefined
}

// Mock data - replace with actual API call
const mockData = {
  merchantTypes: [
    { name: "Retail", transactions: 15000, volume: 7500000 },
    { name: "Restaurant", transactions: 12000, volume: 4800000 },
    { name: "Travel", transactions: 8000, volume: 6400000 },
    { name: "Entertainment", transactions: 6000, volume: 2400000 },
    { name: "Other", transactions: 4000, volume: 1600000 },
  ],
  mccCodes: [
    { code: "5411", name: "Grocery Stores", transactions: 8000, volume: 3200000 },
    { code: "5812", name: "Restaurants", transactions: 7000, volume: 2800000 },
    { code: "5999", name: "Retail Stores", transactions: 6000, volume: 2400000 },
    { code: "7011", name: "Hotels", transactions: 5000, volume: 4000000 },
    { code: "4111", name: "Transportation", transactions: 4000, volume: 1600000 },
  ],
  transactionStats: {
    minAmount: 10,
    maxAmount: 50000,
    avgAmount: 400,
  },
  dailyVolume: [
    {
      date: "2024-03-01",
      volume: 2500000,
      transactions: 5000,
    },
    {
      date: "2024-03-02",
      volume: 2800000,
      transactions: 5500,
    },
    {
      date: "2024-03-03",
      volume: 2300000,
      transactions: 4800,
    },
    {
      date: "2024-03-04",
      volume: 3000000,
      transactions: 6000,
    },
    {
      date: "2024-03-05",
      volume: 2700000,
      transactions: 5200,
    },
  ],
}

const COLORS = ["#0ea5e9", "#adfa1d", "#f43f5e", "#a855f7", "#ec4899"]

export function BusinessMetrics({ dateRange }: BusinessMetricsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction Statistics</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Minimum Amount</dt>
              <dd className="text-2xl font-bold">
                ₺{mockData.transactionStats.minAmount.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Maximum Amount</dt>
              <dd className="text-2xl font-bold">
                ₺{mockData.transactionStats.maxAmount.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Average Amount</dt>
              <dd className="text-2xl font-bold">
                ₺{mockData.transactionStats.avgAmount.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Daily Business Volume</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.dailyVolume}>
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="volume"
                  name="Volume (₺)"
                  fill="#0ea5e9"
                />
                <Bar
                  yAxisId="right"
                  dataKey="transactions"
                  name="Transactions"
                  fill="#adfa1d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Merchant Types</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.merchantTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="volume"
                >
                  {mockData.merchantTypes.map((_, index) => (
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
          <h3 className="text-lg font-semibold mb-4">Top MCC Codes</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData.mccCodes}
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 100 }}
              >
                <XAxis type="number" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" name="Volume (₺)" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
} 