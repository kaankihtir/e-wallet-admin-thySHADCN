import React from "react";
import { Home } from "lucide-react";
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <Home className="h-6 w-6 text-white" />
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      </div>
      <p className="text-blue-100">
        Welcome to your e-wallet admin dashboard
      </p>
    </div>
  );
}

