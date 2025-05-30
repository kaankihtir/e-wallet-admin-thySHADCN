"use client"

import { Card } from "@/components/ui/card"
import { DateRange } from "react-day-picker"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface TransactionStatsProps {
  dateRange: DateRange | undefined
  view: "summary" | "detailed"
}

// Mock data - replace with actual API call
const mockData = {
  closedWallet: {
    totalTransactions: 25000,
    uniqueUsers: 8000,
    uniqueTransactions: 20000,
    domestic: {
      transactions: 18000,
      users: 6000,
    },
    foreign: {
      transactions: 7000,
      users: 2000,
    },
  },
  openWallet: {
    totalTransactions: 35000,
    uniqueUsers: 12000,
    uniqueTransactions: 30000,
    domestic: {
      transactions: 25000,
      users: 9000,
    },
    foreign: {
      transactions: 10000,
      users: 3000,
    },
  },
  cardTransactions: {
    totalTransactions: 45000,
    uniqueUsers: 15000,
    uniqueTransactions: 40000,
    domestic: {
      transactions: 35000,
      users: 12000,
    },
    foreign: {
      transactions: 10000,
      users: 3000,
    },
  },
  dailyStats: [
    {
      date: "2024-03-01",
      closedWallet: 2500,
      openWallet: 3500,
      cardTransactions: 4500,
    },
    {
      date: "2024-03-02",
      closedWallet: 2300,
      openWallet: 3300,
      cardTransactions: 4300,
    },
    {
      date: "2024-03-03",
      closedWallet: 2100,
      openWallet: 3100,
      cardTransactions: 4100,
    },
    {
      date: "2024-03-04",
      closedWallet: 2800,
      openWallet: 3800,
      cardTransactions: 4800,
    },
    {
      date: "2024-03-05",
      closedWallet: 3000,
      openWallet: 4000,
      cardTransactions: 5000,
    },
  ],
}

export function TransactionStats({ dateRange, view }: TransactionStatsProps) {
  if (view === "summary") {
    const totalTransactions =
      mockData.closedWallet.totalTransactions +
      mockData.openWallet.totalTransactions +
      mockData.cardTransactions.totalTransactions

    const totalUniqueUsers =
      mockData.closedWallet.uniqueUsers +
      mockData.openWallet.uniqueUsers +
      mockData.cardTransactions.uniqueUsers

    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="text-2xl font-bold">
            {totalTransactions.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total Transactions</p>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold">
            {totalUniqueUsers.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total Unique Users</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Transaction Volume</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.dailyStats}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="closedWallet"
                name="Closed Wallet"
                fill="#0ea5e9"
                stackId="a"
              />
              <Bar
                dataKey="openWallet"
                name="Open Wallet"
                fill="#adfa1d"
                stackId="a"
              />
              <Bar
                dataKey="cardTransactions"
                name="Card Transactions"
                fill="#f43f5e"
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Closed Wallet Stats</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Total Transactions</dt>
              <dd className="text-2xl font-bold">
                {mockData.closedWallet.totalTransactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Unique Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.closedWallet.uniqueUsers.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Domestic Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.closedWallet.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Foreign Transactions</dt>
              <dd className="text-2xl font-bold">
                {mockData.closedWallet.foreign.transactions.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Open Wallet Stats</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Total Transactions</dt>
              <dd className="text-2xl font-bold">
                {mockData.openWallet.totalTransactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Unique Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.openWallet.uniqueUsers.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Domestic Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.openWallet.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Foreign Transactions</dt>
              <dd className="text-2xl font-bold">
                {mockData.openWallet.foreign.transactions.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Card Transaction Stats</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Total Transactions</dt>
              <dd className="text-2xl font-bold">
                {mockData.cardTransactions.totalTransactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Unique Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.cardTransactions.uniqueUsers.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Domestic Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.cardTransactions.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Foreign Transactions</dt>
              <dd className="text-2xl font-bold">
                {mockData.cardTransactions.foreign.transactions.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
} 