"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LoginDurationSettings() {
  const [duration, setDuration] = useState(30)
  const [unit, setUnit] = useState<"minutes" | "hours" | "days">("minutes")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login Session Duration</CardTitle>
        <CardDescription>
          Set how long users remain logged in before requiring re-authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Session Duration</Label>
            <div className="flex items-center gap-2">
              <Input
                id="duration"
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                className="max-w-[120px]"
              />
              <Select value={unit} onValueChange={(value) => setUnit(value as "minutes" | "hours" | "days")}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Button className="mt-4">Save Changes</Button>
      </CardContent>
    </Card>
  )
} 