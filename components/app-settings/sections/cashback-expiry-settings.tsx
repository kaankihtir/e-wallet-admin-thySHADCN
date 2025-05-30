"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type CashbackType = {
  id: string
  name: string
  merchant: string
  expiryDays: number
}

export function CashbackExpirySettings() {
  const [cashbackTypes, setCashbackTypes] = useState<CashbackType[]>([
    { id: "tk-money", name: "TK Money", merchant: "Internal", expiryDays: 365 },
    { id: "thy", name: "Turkish Airlines", merchant: "Turkish Airlines", expiryDays: 180 }
  ])

  const handleExpiryChange = (id: string, days: number) => {
    setCashbackTypes(cashbackTypes.map(item => 
      item.id === id ? { ...item, expiryDays: days } : item
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Miles Cashback Expiry Duration</CardTitle>
        <CardDescription>
          Configure expiry durations for different cashback types
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {cashbackTypes.map((cashback) => (
          <div key={cashback.id} className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">{cashback.name}</h3>
              <p className="text-sm text-muted-foreground">Merchant: {cashback.merchant}</p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="1"
                value={cashback.expiryDays}
                onChange={(e) => handleExpiryChange(cashback.id, parseInt(e.target.value) || 0)}
                className="max-w-[120px]"
              />
              <span>Days</span>
            </div>
          </div>
        ))}
        
        <Button className="mt-4">Save Changes</Button>
      </CardContent>
    </Card>
  )
} 