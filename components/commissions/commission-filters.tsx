"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { useState } from "react"

export function CommissionFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [commissionType, setCommissionType] = useState("all")
  const [currency, setCurrency] = useState("all")

  const handleReset = () => {
    setSearchTerm("")
    setCommissionType("all")
    setCurrency("all")
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search commissions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={commissionType} onValueChange={setCommissionType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Commission Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="account_usage">Account Usage</SelectItem>
            <SelectItem value="money_transfer">Money Transfer</SelectItem>
            <SelectItem value="topup">Topup</SelectItem>
            <SelectItem value="prepaid_card">Prepaid Card</SelectItem>
          </SelectContent>
        </Select>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Currencies</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="TRY">TRY</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleReset} className="w-full md:w-auto">
          <X className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  )
}

