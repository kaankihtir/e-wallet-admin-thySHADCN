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

interface CustomerDemographicsProps {
  dateRange: DateRange | undefined
}

// Mock data - replace with actual API call
const mockData = {
  ageGroups: [
    { name: "18-24", domestic: 5000, foreign: 1200 },
    { name: "25-34", domestic: 8000, foreign: 2000 },
    { name: "35-44", domestic: 6000, foreign: 1500 },
    { name: "45-54", domestic: 4000, foreign: 1000 },
    { name: "55+", domestic: 2000, foreign: 500 },
  ],
  gender: [
    { name: "Male", domestic: 15000, foreign: 3500 },
    { name: "Female", domestic: 10000, foreign: 2700 },
  ],
  occupation: [
    { name: "Professional", domestic: 8000, foreign: 2000 },
    { name: "Student", domestic: 5000, foreign: 1200 },
    { name: "Business", domestic: 6000, foreign: 1500 },
    { name: "Other", domestic: 6000, foreign: 1500 },
  ],
  topCities: [
    { name: "Istanbul", domestic: 10000, foreign: 2500 },
    { name: "Ankara", domestic: 5000, foreign: 1200 },
    { name: "Izmir", domestic: 4000, foreign: 1000 },
    { name: "Antalya", domestic: 3000, foreign: 800 },
    { name: "Other", domestic: 3000, foreign: 700 },
  ],
}

const COLORS = ["#0ea5e9", "#adfa1d", "#f43f5e", "#a855f7", "#ec4899"]

export function CustomerDemographics({ dateRange }: CustomerDemographicsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.ageGroups}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="domestic" name="Domestic" fill="#0ea5e9" />
              <Bar dataKey="foreign" name="Foreign" fill="#adfa1d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData.gender}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="domestic"
                name="Domestic"
              >
                {mockData.gender.map((_, index) => (
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
        <h3 className="text-lg font-semibold mb-4">Occupation Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData.occupation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="domestic"
                name="Domestic"
              >
                {mockData.occupation.map((_, index) => (
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
        <h3 className="text-lg font-semibold mb-4">Top Cities</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.topCities}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="domestic" name="Domestic" fill="#0ea5e9" />
              <Bar dataKey="foreign" name="Foreign" fill="#adfa1d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
} 