"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { Commission, CommissionType, Currency, CalculationType } from "@/lib/commission-data"

interface CommissionFormProps {
  initialData?: Partial<Commission>
  onSubmit: (data: Partial<Commission>) => void
}

export function CommissionForm({ initialData, onSubmit }: CommissionFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || ("account_usage" as CommissionType),
    subType: initialData?.subType || "",
    atmType: initialData?.atmType || "",
    currency: initialData?.currency || ("USD" as Currency),
    calculationType: initialData?.calculationType || ("fixed" as CalculationType),
    fixedAmount: initialData?.fixedAmount?.toString() || "",
    percentageRate: initialData?.percentageRate?.toString() || "",
    minAmount: initialData?.minAmount?.toString() || "0",
    maxAmount: initialData?.maxAmount?.toString() || "",
    minTransactions: initialData?.minTransactions?.toString() || "1",
    maxTransactions: initialData?.maxTransactions?.toString() || "",
    startDate: initialData?.startDate || new Date(),
    endDate: initialData?.endDate || undefined,
    hasEndDate: !!initialData?.endDate,
    hasMaxAmount: !!initialData?.maxAmount,
    hasMaxTransactions: !!initialData?.maxTransactions,
    status: initialData?.status || "active",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const submissionData: Partial<Commission> = {
      name: formData.name,
      type: formData.type as CommissionType,
      subType: formData.subType as any,
      ...(formData.type === "prepaid_card" && formData.atmType ? { atmType: formData.atmType as any } : {}),
      currency: formData.currency as Currency,
      calculationType: formData.calculationType as CalculationType,
      fixedAmount:
        formData.calculationType === "fixed" || formData.calculationType === "mixed"
          ? Number.parseFloat(formData.fixedAmount) || null
          : null,
      percentageRate:
        formData.calculationType === "percentage" || formData.calculationType === "mixed"
          ? Number.parseFloat(formData.percentageRate) || null
          : null,
      minAmount: Number.parseFloat(formData.minAmount) || 0,
      maxAmount: formData.hasMaxAmount ? Number.parseFloat(formData.maxAmount) || null : null,
      minTransactions: Number.parseInt(formData.minTransactions) || 1,
      maxTransactions: formData.hasMaxTransactions ? Number.parseInt(formData.maxTransactions) || null : null,
      startDate: formData.startDate,
      endDate: formData.hasEndDate ? formData.endDate : null,
      status: formData.status as any,
    }

    onSubmit(submissionData)
  }

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "USD":
        return "$"
      case "EUR":
        return "€"
      case "TRY":
        return "₺"
      case "GBP":
        return "£"
      default:
        return "$"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Commission Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter commission name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="TRY">TRY</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commission Type */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label>Commission Type</Label>
            <Tabs
              value={formData.type}
              onValueChange={(value) => {
                handleInputChange("type", value)
                handleInputChange("subType", "")
                handleInputChange("atmType", "")
              }}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="account_usage">Account Usage</TabsTrigger>
                <TabsTrigger value="money_transfer">Money Transfer</TabsTrigger>
                <TabsTrigger value="topup">Topup</TabsTrigger>
                <TabsTrigger value="prepaid_card">Prepaid Card</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2 mt-4">
              <Label htmlFor="subtype">Subtype</Label>
              <Select value={formData.subType} onValueChange={(value) => handleInputChange("subType", value)} required>
                <SelectTrigger id="subtype">
                  <SelectValue placeholder="Select subtype" />
                </SelectTrigger>
                <SelectContent>
                  {formData.type === "account_usage" && (
                    <>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </>
                  )}
                  {formData.type === "money_transfer" && (
                    <>
                      <SelectItem value="bank_account">Bank Account</SelectItem>
                      <SelectItem value="wallet_account">Wallet Account</SelectItem>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                    </>
                  )}
                  {formData.type === "topup" && (
                    <>
                      <SelectItem value="iban">IBAN Topup</SelectItem>
                      <SelectItem value="credit_card">Credit Card Topup</SelectItem>
                    </>
                  )}
                  {formData.type === "prepaid_card" && (
                    <>
                      <SelectItem value="atm_withdraw">ATM Withdraw</SelectItem>
                      <SelectItem value="atm_balance">ATM Balance Check</SelectItem>
                      <SelectItem value="atm_deposit">ATM Deposit</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {formData.type === "prepaid_card" && formData.subType && (
              <div className="space-y-2">
                <Label htmlFor="atmType">ATM Type</Label>
                <Select
                  value={formData.atmType}
                  onValueChange={(value) => handleInputChange("atmType", value)}
                  required
                >
                  <SelectTrigger id="atmType">
                    <SelectValue placeholder="Select ATM type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ONUS">ONUS</SelectItem>
                    <SelectItem value="NOTONUS">NOTONUS</SelectItem>
                    <SelectItem value="TAM">TAM</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fee Structure */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label>Fee Structure</Label>
            <Tabs
              value={formData.calculationType}
              onValueChange={(value) => handleInputChange("calculationType", value)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
                <TabsTrigger value="percentage">Percentage</TabsTrigger>
                <TabsTrigger value="mixed">Mixed</TabsTrigger>
              </TabsList>

              <TabsContent value="fixed" className="pt-4">
                <div className="space-y-2">
                  <Label htmlFor="fixedAmount">Fixed Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">
                      {getCurrencySymbol(formData.currency)}
                    </span>
                    <Input
                      id="fixedAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-8"
                      value={formData.fixedAmount}
                      onChange={(e) => handleInputChange("fixedAmount", e.target.value)}
                      required={formData.calculationType === "fixed"}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="percentage" className="pt-4">
                <div className="space-y-2">
                  <Label htmlFor="percentageRate">Percentage Rate</Label>
                  <div className="relative">
                    <Input
                      id="percentageRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.percentageRate}
                      onChange={(e) => handleInputChange("percentageRate", e.target.value)}
                      required={formData.calculationType === "percentage"}
                    />
                    <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mixed" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fixedAmount">Fixed Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">
                        {getCurrencySymbol(formData.currency)}
                      </span>
                      <Input
                        id="fixedAmount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-8"
                        value={formData.fixedAmount}
                        onChange={(e) => handleInputChange("fixedAmount", e.target.value)}
                        required={formData.calculationType === "mixed"}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="percentageRate">Percentage Rate</Label>
                    <div className="relative">
                      <Input
                        id="percentageRate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.percentageRate}
                        onChange={(e) => handleInputChange("percentageRate", e.target.value)}
                        required={formData.calculationType === "mixed"}
                      />
                      <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Limits */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Transaction Amount Limits</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasMaxAmount"
                  checked={formData.hasMaxAmount}
                  onCheckedChange={(checked) => handleInputChange("hasMaxAmount", checked)}
                />
                <Label htmlFor="hasMaxAmount" className="text-sm text-muted-foreground">
                  Set maximum amount
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minAmount">Minimum Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">
                    {getCurrencySymbol(formData.currency)}
                  </span>
                  <Input
                    id="minAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-8"
                    value={formData.minAmount}
                    onChange={(e) => handleInputChange("minAmount", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAmount">Maximum Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">
                    {getCurrencySymbol(formData.currency)}
                  </span>
                  <Input
                    id="maxAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="No limit"
                    disabled={!formData.hasMaxAmount}
                    className="pl-8"
                    value={formData.maxAmount}
                    onChange={(e) => handleInputChange("maxAmount", e.target.value)}
                    required={formData.hasMaxAmount}
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <Label>Transaction Count Limits</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasMaxTransactions"
                  checked={formData.hasMaxTransactions}
                  onCheckedChange={(checked) => handleInputChange("hasMaxTransactions", checked)}
                />
                <Label htmlFor="hasMaxTransactions" className="text-sm text-muted-foreground">
                  Set maximum transactions
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minTransactions">Minimum Transactions</Label>
                <Input
                  id="minTransactions"
                  type="number"
                  min="0"
                  placeholder="1"
                  value={formData.minTransactions}
                  onChange={(e) => handleInputChange("minTransactions", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxTransactions">Maximum Transactions</Label>
                <Input
                  id="maxTransactions"
                  type="number"
                  min="0"
                  placeholder="No limit"
                  disabled={!formData.hasMaxTransactions}
                  value={formData.maxTransactions}
                  onChange={(e) => handleInputChange("maxTransactions", e.target.value)}
                  required={formData.hasMaxTransactions}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Range */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Date Range</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasEndDate"
                  checked={formData.hasEndDate}
                  onCheckedChange={(checked) => handleInputChange("hasEndDate", checked)}
                />
                <Label htmlFor="hasEndDate" className="text-sm text-muted-foreground">
                  Set end date
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => handleInputChange("startDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground",
                      )}
                      disabled={!formData.hasEndDate}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : "No end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => handleInputChange("endDate", date)}
                      initialFocus
                      disabled={(date) => (formData.startDate ? date < formData.startDate : false)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="status" className="text-base">
                Commission Status
              </Label>
              <p className="text-sm text-muted-foreground mt-1">Enable or disable this commission</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status === "active"}
                onCheckedChange={(checked) => handleInputChange("status", checked ? "active" : "inactive")}
              />
              <Label htmlFor="status">{formData.status === "active" ? "Active" : "Inactive"}</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button type="submit">Save Commission</Button>
      </div>
    </form>
  )
}

