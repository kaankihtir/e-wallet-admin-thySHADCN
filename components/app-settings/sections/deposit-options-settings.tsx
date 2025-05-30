"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

type Currency = "TRY" | "USD" | "GBP" | "EUR"

export function DepositOptionsSettings() {
  const [activeTab, setActiveTab] = useState<Currency>("TRY")
  const [depositOptions, setDepositOptions] = useState<Record<Currency, string[]>>({
    "TRY": ["100", "250", "500", "1000", "2000"],
    "USD": ["10", "25", "50", "100", "200"],
    "GBP": ["10", "25", "50", "100", "200"],
    "EUR": ["10", "25", "50", "100", "200"]
  })
  const [newOption, setNewOption] = useState("")

  const handleAddOption = () => {
    if (newOption && !depositOptions[activeTab].includes(newOption) && depositOptions[activeTab].length < 5) {
      const updatedOptions = { ...depositOptions }
      updatedOptions[activeTab] = [...updatedOptions[activeTab], newOption]
      setDepositOptions(updatedOptions)
      setNewOption("")
    }
  }

  const handleRemoveOption = (option: string) => {
    const updatedOptions = { ...depositOptions }
    updatedOptions[activeTab] = updatedOptions[activeTab].filter(o => o !== option)
    setDepositOptions(updatedOptions)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Card Deposit Amount Options</CardTitle>
        <CardDescription>
          Configure quick deposit options for each currency (limit 5 per currency)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Currency)}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="TRY">TRY</TabsTrigger>
            <TabsTrigger value="USD">USD</TabsTrigger>
            <TabsTrigger value="GBP">GBP</TabsTrigger>
            <TabsTrigger value="EUR">EUR</TabsTrigger>
          </TabsList>
          
          {(["TRY", "USD", "GBP", "EUR"] as Currency[]).map(currency => (
            <TabsContent key={currency} value={currency} className="space-y-6">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder={`Enter amount in ${currency}`}
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  className="max-w-[200px]"
                  disabled={depositOptions[currency].length >= 5}
                />
                <Button 
                  onClick={handleAddOption}
                  disabled={depositOptions[currency].length >= 5}
                >
                  Add Option
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {depositOptions[currency].map((option) => (
                  <Badge key={option} variant="outline" className="px-3 py-1">
                    {option} {currency}
                    <button
                      onClick={() => handleRemoveOption(option)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              {depositOptions[currency].length >= 5 && (
                <p className="text-sm text-muted-foreground">
                  Maximum 5 options reached for {currency}
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
} 