"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type OTPType = {
  id: string
  name: string
  durationSeconds: number
}

export function OTPSettings() {
  const [otpTypes, setOtpTypes] = useState<OTPType[]>([
    { id: "signup", name: "Sign Up", durationSeconds: 180 },
    { id: "new-device", name: "New Device First Login", durationSeconds: 300 },
    { id: "account-migration", name: "Account Migration", durationSeconds: 600 }
  ])

  const handleDurationChange = (id: string, seconds: number) => {
    setOtpTypes(otpTypes.map(otp => 
      otp.id === id ? { ...otp, durationSeconds: seconds } : otp
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>OTP Timer Settings</CardTitle>
        <CardDescription>
          Configure one-time password duration for different operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {otpTypes.map((otp) => (
          <div key={otp.id} className="grid grid-cols-2 gap-4">
            <div>
              <Label>{otp.name}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="30"
                value={otp.durationSeconds}
                onChange={(e) => handleDurationChange(otp.id, parseInt(e.target.value) || 0)}
                className="max-w-[120px]"
              />
              <span>Seconds</span>
            </div>
          </div>
        ))}
        
        <Button className="mt-4">Save Changes</Button>
      </CardContent>
    </Card>
  )
} 