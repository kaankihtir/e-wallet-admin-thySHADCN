"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    "Top-up": 580000,
    Withdrawal: 400000,
    Transfer: 240000,
  },
  {
    name: "Feb",
    "Top-up": 620000,
    Withdrawal: 380000,
    Transfer: 221000,
  },
  {
    name: "Mar",
    "Top-up": 750000,
    Withdrawal: 510000,
    Transfer: 280000,
  },
  {
    name: "Apr",
    "Top-up": 890000,
    Withdrawal: 610000,
    Transfer: 320000,
  },
  {
    name: "May",
    "Top-up": 1020000,
    Withdrawal: 680000,
    Transfer: 370000,
  },
  {
    name: "Jun",
    "Top-up": 1250000,
    Withdrawal: 780000,
    Transfer: 390000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
          labelFormatter={(label) => `${label} 2023`}
        />
        <Legend />
        <Bar dataKey="Top-up" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Withdrawal" fill="#f97316" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Transfer" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

