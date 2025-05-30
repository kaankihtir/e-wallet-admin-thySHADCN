"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type LockRule = {
  attempts: number
  duration: number
  unit: "minutes" | "hours" | "permanent"
}

export function AccountLockSettings() {
  const [lockRules, setLockRules] = useState<LockRule[]>([
    { attempts: 3, duration: 5, unit: "minutes" },
    { attempts: 4, duration: 10, unit: "minutes" },
    { attempts: 5, duration: 0, unit: "permanent" }
  ])
  
  const [newRule, setNewRule] = useState<LockRule>({
    attempts: 0,
    duration: 0,
    unit: "minutes"
  })

  const handleAddRule = () => {
    if (newRule.attempts > 0) {
      setLockRules([...lockRules, newRule])
      setNewRule({ attempts: 0, duration: 0, unit: "minutes" })
    }
  }

  const handleDeleteRule = (index: number) => {
    const updatedRules = [...lockRules]
    updatedRules.splice(index, 1)
    setLockRules(updatedRules)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Lock Duration Options</CardTitle>
        <CardDescription>
          Configure wrong password attempt limits and lockout durations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Failed Attempts</TableHead>
              <TableHead>Lockout Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lockRules.map((rule, index) => (
              <TableRow key={index}>
                <TableCell>{rule.attempts}</TableCell>
                <TableCell>
                  {rule.unit === "permanent" 
                    ? "Permanent block (Contact support)" 
                    : `${rule.duration} ${rule.unit}`}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteRule(index)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="grid grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="attempts">Failed Attempts</Label>
            <Input 
              id="attempts" 
              type="number" 
              value={newRule.attempts || ''} 
              onChange={(e) => setNewRule({...newRule, attempts: parseInt(e.target.value) || 0})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input 
              id="duration" 
              type="number" 
              value={newRule.unit === "permanent" ? 0 : newRule.duration || ''} 
              onChange={(e) => setNewRule({...newRule, duration: parseInt(e.target.value) || 0})}
              disabled={newRule.unit === "permanent"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <select 
              id="unit"
              className="w-full h-10 px-3 rounded-md border border-input"
              value={newRule.unit}
              onChange={(e) => setNewRule({
                ...newRule, 
                unit: e.target.value as "minutes" | "hours" | "permanent",
                duration: e.target.value === "permanent" ? 0 : newRule.duration
              })}
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="permanent">Permanent</option>
            </select>
          </div>
          <Button onClick={handleAddRule}>Add Rule</Button>
        </div>
      </CardContent>
    </Card>
  )
} 