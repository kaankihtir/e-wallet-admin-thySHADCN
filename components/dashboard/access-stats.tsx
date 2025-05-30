"use client"

import { Card } from "@/components/ui/card"
import { DateRange } from "react-day-picker"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface AccessStatsProps {
  dateRange: DateRange | undefined
  view: "summary" | "detailed"
}

// Mock data - replace with actual API call
const mockData = [
  { date: "2024-03-01", totalAccess: 2500, uniqueAccess: 1800 },
  { date: "2024-03-02", totalAccess: 2300, uniqueAccess: 1600 },
  { date: "2024-03-03", totalAccess: 2100, uniqueAccess: 1500 },
  { date: "2024-03-04", totalAccess: 2800, uniqueAccess: 2000 },
  { date: "2024-03-05", totalAccess: 3000, uniqueAccess: 2200 },
  { date: "2024-03-06", totalAccess: 2700, uniqueAccess: 1900 },
  { date: "2024-03-07", totalAccess: 2400, uniqueAccess: 1700 },
]

export function AccessStats({ dateRange, view }: AccessStatsProps) {
  if (view === "summary") {
    const totalAccess = mockData.reduce((sum, day) => sum + day.totalAccess, 0)
    const uniqueAccess = mockData.reduce((sum, day) => sum + day.uniqueAccess, 0)

    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="text-2xl font-bold">{totalAccess.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Total Access Count</p>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold">
            {uniqueAccess.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Unique Access Count</p>
        </Card>
      </div>
    )
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Access Statistics</h3>
        <p className="text-sm text-muted-foreground">
          Total and unique access counts over time
        </p>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Bar
              dataKey="totalAccess"
              fill="#adfa1d"
              radius={[4, 4, 0, 0]}
              name="Total Access"
            />
            <Bar
              dataKey="uniqueAccess"
              fill="#0ea5e9"
              radius={[4, 4, 0, 0]}
              name="Unique Access"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
} 