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

interface FinancialMetricsProps {
  dateRange: DateRange | undefined
}

// Mock data - replace with actual API call
const mockData = {
  accountLoading: {
    domestic: {
      users: 8000,
      transactions: 12000,
      volume: {
        TRY: 5000000,
        USD: 250000,
        EUR: 200000,
        GBP: 150000,
      },
    },
    foreign: {
      users: 2000,
      transactions: 3000,
      volume: {
        TRY: 1500000,
        USD: 100000,
        EUR: 80000,
        GBP: 60000,
      },
    },
  },
  highValueTransactions: {
    loading: {
      domestic: {
        users: 1000,
        transactions: 1500,
      },
      foreign: {
        users: 300,
        transactions: 450,
      },
    },
    spending: {
      domestic: {
        users: 800,
        transactions: 1200,
      },
      foreign: {
        users: 200,
        transactions: 300,
      },
    },
  },
  qrSpending: {
    domestic: {
      users: 5000,
      transactions: 7500,
      volume: {
        TRY: 2500000,
        USD: 150000,
        EUR: 120000,
        GBP: 90000,
      },
    },
    foreign: {
      users: 1500,
      transactions: 2250,
      volume: {
        TRY: 750000,
        USD: 45000,
        EUR: 36000,
        GBP: 27000,
      },
    },
  },
  moneySending: {
    domestic: {
      users: 6000,
      transactions: 9000,
      volume: {
        TRY: 3000000,
        USD: 180000,
        EUR: 144000,
        GBP: 108000,
      },
    },
    foreign: {
      users: 1800,
      transactions: 2700,
      volume: {
        TRY: 900000,
        USD: 54000,
        EUR: 43200,
        GBP: 32400,
      },
    },
  },
  bankTransfers: {
    ownAccount: {
      domestic: {
        users: 4000,
        transactions: 6000,
        volume: {
          TRY: 2000000,
          USD: 120000,
          EUR: 96000,
          GBP: 72000,
        },
      },
      foreign: {
        users: 1200,
        transactions: 1800,
        volume: {
          TRY: 600000,
          USD: 36000,
          EUR: 28800,
          GBP: 21600,
        },
      },
    },
    otherAccount: {
      domestic: {
        users: 3000,
        transactions: 4500,
        volume: {
          TRY: 1500000,
          USD: 90000,
          EUR: 72000,
          GBP: 54000,
        },
      },
      foreign: {
        users: 900,
        transactions: 1350,
        volume: {
          TRY: 450000,
          USD: 27000,
          EUR: 21600,
          GBP: 16200,
        },
      },
    },
  },
  dailyVolume: [
    {
      date: "2024-03-01",
      TRY: 1000000,
      USD: 60000,
      EUR: 48000,
      GBP: 36000,
    },
    {
      date: "2024-03-02",
      TRY: 1200000,
      USD: 72000,
      EUR: 57600,
      GBP: 43200,
    },
    {
      date: "2024-03-03",
      TRY: 900000,
      USD: 54000,
      EUR: 43200,
      GBP: 32400,
    },
    {
      date: "2024-03-04",
      TRY: 1500000,
      USD: 90000,
      EUR: 72000,
      GBP: 54000,
    },
    {
      date: "2024-03-05",
      TRY: 1300000,
      USD: 78000,
      EUR: 62400,
      GBP: 46800,
    },
  ],
}

export function FinancialMetrics({ dateRange }: FinancialMetricsProps) {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Transaction Volume</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.dailyVolume}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="TRY" name="TRY" fill="#0ea5e9" stackId="a" />
              <Bar dataKey="USD" name="USD" fill="#adfa1d" stackId="a" />
              <Bar dataKey="EUR" name="EUR" fill="#f43f5e" stackId="a" />
              <Bar dataKey="GBP" name="GBP" fill="#a855f7" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Account Loading</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Domestic Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.accountLoading.domestic.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Domestic Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.accountLoading.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Foreign Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.accountLoading.foreign.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Foreign Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.accountLoading.foreign.transactions.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">QR Spending</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Domestic Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.qrSpending.domestic.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Domestic Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.qrSpending.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Foreign Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.qrSpending.foreign.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Foreign Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.qrSpending.foreign.transactions.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Money Sending</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Domestic Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.moneySending.domestic.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Domestic Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.moneySending.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Foreign Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.moneySending.foreign.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Foreign Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.moneySending.foreign.transactions.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Bank Transfers (Own)</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Domestic Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.bankTransfers.ownAccount.domestic.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Domestic Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.bankTransfers.ownAccount.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Foreign Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.bankTransfers.ownAccount.foreign.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Foreign Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.bankTransfers.ownAccount.foreign.transactions.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Bank Transfers (Other)</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Domestic Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.bankTransfers.otherAccount.domestic.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Domestic Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.bankTransfers.otherAccount.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Foreign Users</dt>
              <dd className="text-2xl font-bold">
                {mockData.bankTransfers.otherAccount.foreign.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Foreign Transactions
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.bankTransfers.otherAccount.foreign.transactions.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">High Value Transactions</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">
                High Value Loading (Domestic)
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.highValueTransactions.loading.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                High Value Loading (Foreign)
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.highValueTransactions.loading.foreign.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                High Value Spending (Domestic)
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.highValueTransactions.spending.domestic.transactions.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                High Value Spending (Foreign)
              </dt>
              <dd className="text-2xl font-bold">
                {mockData.highValueTransactions.spending.foreign.transactions.toLocaleString()}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
} 