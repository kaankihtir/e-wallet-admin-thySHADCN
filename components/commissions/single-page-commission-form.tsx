"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CreditCard, DollarSign, Percent, Wallet } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { Commission, CommissionType, Currency, CalculationType } from "@/lib/commission-data"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface SinglePageCommissionFormProps {
  initialData?: Partial<Commission>
  onSubmit: (data: Partial<Commission>) => void
  isSubmitting?: boolean
}

export function SinglePageCommissionForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: SinglePageCommissionFormProps) {
  const [formData, setFormData] = useState({
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
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Commission Type */}
      <div className="space-y-4">
        <Label>Commission Type</Label>
        <RadioGroup
          value={formData.type}
          onValueChange={(value) => {
            handleInputChange("type", value)
            handleInputChange("subType", "")
            handleInputChange("atmType", "")
          }}
          className="grid grid-cols-2 gap-2"
        >
          <Label
            htmlFor="account_usage"
            className={cn(
              "flex items-center gap-2 rounded-md border p-3 cursor-pointer",
              formData.type === "account_usage" ? "border-primary bg-primary/5" : "border-muted",
            )}
          >
            <RadioGroupItem value="account_usage" id="account_usage" />
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span>Account Usage</span>
          </Label>

          <Label
            htmlFor="money_transfer"
            className={cn(
              "flex items-center gap-2 rounded-md border p-3 cursor-pointer",
              formData.type === "money_transfer" ? "border-primary bg-primary/5" : "border-muted",
            )}
          >
            <RadioGroupItem value="money_transfer" id="money_transfer" />
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>Money Transfer</span>
          </Label>

          <Label
            htmlFor="topup"
            className={cn(
              "flex items-center gap-2 rounded-md border p-3 cursor-pointer",
              formData.type === "topup" ? "border-primary bg-primary/5" : "border-muted",
            )}
          >
            <RadioGroupItem value="topup" id="topup" />
            <Percent className="h-4 w-4 text-muted-foreground" />
            <span>Topup</span>
          </Label>

          <Label
            htmlFor="prepaid_card"
            className={cn(
              "flex items-center gap-2 rounded-md border p-3 cursor-pointer",
              formData.type === "prepaid_card" ? "border-primary bg-primary/5" : "border-muted",
            )}
          >
            <RadioGroupItem value="prepaid_card" id="prepaid_card" />
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span>Prepaid Card</span>
          </Label>
        </RadioGroup>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
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

          {formData.type === "prepaid_card" && formData.subType ? (
            <div className="space-y-2">
              <Label htmlFor="atmType">ATM Type</Label>
              <Select value={formData.atmType} onValueChange={(value) => handleInputChange("atmType", value)} required>
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
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="TRY">TRY (₺)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Fee Structure */}
      <div className="space-y-4">
        <Label>Fee Structure</Label>
        <RadioGroup
          value={formData.calculationType}
          onValueChange={(value) => handleInputChange("calculationType", value)}
          className="grid grid-cols-3 gap-2"
        >
          <Label
            htmlFor="fixed"
            className={cn(
              "flex items-center justify-center gap-2 rounded-md border p-3 cursor-pointer",
              formData.calculationType === "fixed" ? "border-primary bg-primary/5" : "border-muted",
            )}
          >
            <RadioGroupItem value="fixed" id="fixed" />
            <span>Fixed Amount</span>
          </Label>

          <Label
            htmlFor="percentage"
            className={cn(
              "flex items-center justify-center gap-2 rounded-md border p-3 cursor-pointer",
              formData.calculationType === "percentage" ? "border-primary bg-primary/5" : "border-muted",
            )}
          >
            <RadioGroupItem value="percentage" id="percentage" />
            <span>Percentage</span>
          </Label>

          <Label
            htmlFor="mixed"
            className={cn(
              "flex items-center justify-center gap-2 rounded-md border p-3 cursor-pointer",
              formData.calculationType === "mixed" ? "border-primary bg-primary/5" : "border-muted",
            )}
          >
            <RadioGroupItem value="mixed" id="mixed" />
            <span>Mixed</span>
          </Label>
        </RadioGroup>

        <div className="grid grid-cols-2 gap-4">
          {(formData.calculationType === "fixed" || formData.calculationType === "mixed") && (
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
                  required={formData.calculationType === "fixed" || formData.calculationType === "mixed"}
                />
              </div>
            </div>
          )}

          {(formData.calculationType === "percentage" || formData.calculationType === "mixed") && (
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
                  required={formData.calculationType === "percentage" || formData.calculationType === "mixed"}
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Transaction Limits */}
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
              Set maximum
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
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

        <div className="flex items-center justify-between mt-4">
          <Label>Transaction Count Limits</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="hasMaxTransactions"
              checked={formData.hasMaxTransactions}
              onCheckedChange={(checked) => handleInputChange("hasMaxTransactions", checked)}
            />
            <Label htmlFor="hasMaxTransactions" className="text-sm text-muted-foreground">
              Set maximum
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
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

      <Separator />

      {/* Date Range */}
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? format(formData.startDate, "PP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
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
                  size="sm"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.endDate && "text-muted-foreground",
                  )}
                  disabled={!formData.hasEndDate}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? format(formData.endDate, "PP") : "No end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
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

      <Separator />

      {/* Status */}
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

      <div className="pt-4">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Commission"}
        </Button>
      </div>
    </form>
  )
}

