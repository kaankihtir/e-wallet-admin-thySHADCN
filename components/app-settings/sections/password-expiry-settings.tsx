"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function PasswordExpirySettings() {
  const [expiryOptions, setExpiryOptions] = useState(["3", "6", "9", "12"])
  const [newOption, setNewOption] = useState("")

  const handleAddOption = () => {
    if (newOption && !expiryOptions.includes(newOption)) {
      setExpiryOptions([...expiryOptions, newOption])
      setNewOption("")
    }
  }

  const handleRemoveOption = (option: string) => {
    setExpiryOptions(expiryOptions.filter((o) => o !== option))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Expiry Options</CardTitle>
        <CardDescription>
          Define password expiry options in months for users to select in the mobile app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Enter months (e.g., 3)"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            className="max-w-[200px]"
          />
          <Button onClick={handleAddOption}>Add Option</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {expiryOptions.map((option) => (
            <Badge key={option} variant="outline" className="px-3 py-1">
              {option} months
              <button
                onClick={() => handleRemoveOption(option)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        <Button className="mt-4">Save Changes</Button>
      </CardContent>
    </Card>
  )
} 