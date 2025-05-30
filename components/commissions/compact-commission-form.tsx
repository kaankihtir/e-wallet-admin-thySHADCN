"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, ChevronRight, CreditCard, DollarSign, Percent, Wallet } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState, type ReactNode } from "react"
import type { Commission, CommissionType, Currency, CalculationType } from "@/lib/commission-data"

interface CompactCommissionFormProps {
  initialData?: Partial<Commission>
  onSubmit: (data: Partial<Commission>) => void
  isSubmitting?: boolean
  submitButton?: ReactNode
}

export function CompactCommissionForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  submitButton,
}: CompactCommissionFormProps) {
  const [activeStep, setActiveStep] = useState(0)
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

  const steps = [
    { title: "Basic Info", isValid: !!formData.name && !!formData.currency },
    { title: "Commission Type", isValid: !!formData.type && !!formData.subType },
    {
      title: "Fee Structure",
      isValid:
        (formData.calculationType === "fixed" && !!formData.fixedAmount) ||
        (formData.calculationType === "percentage" && !!formData.percentageRate) ||
        (formData.calculationType === "mixed" && !!formData.fixedAmount && !!formData.percentageRate),
    },
    { title: "Limits & Dates", isValid: true },
  ]

  const nextStep = () => {
    if (activeStep < steps.length - 1 && steps[activeStep].isValid) {
      setActiveStep(activeStep + 1)
    }
  }

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="divide-y">
      {/* Stepper */}
      <div className="px-6 py-4 bg-muted/30">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                  activeStep === index
                    ? "bg-primary text-primary-foreground"
                    : activeStep > index
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                )}
                onClick={() => index < activeStep && setActiveStep(index)}
                style={{ cursor: index < activeStep ? "pointer" : "default" }}
              >
                {index + 1}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm font-medium hidden sm:inline",
                  activeStep === index ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {/* Step 1: Basic Information */}
        {activeStep === 0 && (
          <div className="space-y-4">
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
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="TRY">TRY (₺)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <Label htmlFor="status" className="text-sm">
                  Commission Status
                </Label>
                <p className="text-xs text-muted-foreground mt-1">Enable or disable this commission</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => handleInputChange("status", checked ? "active" : "inactive")}
                />
                <Label htmlFor="status" className="text-sm">
                  {formData.status === "active" ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Commission Type */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={formData.type === "account_usage" ? "default" : "outline"}
                className={cn(
                  "h-auto py-4 justify-start",
                  formData.type === "account_usage" ? "ring-2 ring-primary" : "",
                )}
                onClick={() => {
                  handleInputChange("type", "account_usage")
                  handleInputChange("subType", "")
                }}
              >
                <Wallet className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Account Usage</div>
                  <div className="text-xs text-muted-foreground mt-1">Fees for account maintenance</div>
                </div>
              </Button>

              <Button
                type="button"
                variant={formData.type === "money_transfer" ? "default" : "outline"}
                className={cn(
                  "h-auto py-4 justify-start",
                  formData.type === "money_transfer" ? "ring-2 ring-primary" : "",
                )}
                onClick={() => {
                  handleInputChange("type", "money_transfer")
                  handleInputChange("subType", "")
                }}
              >
                <DollarSign className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Money Transfer</div>
                  <div className="text-xs text-muted-foreground mt-1">Fees for transferring money</div>
                </div>
              </Button>

              <Button
                type="button"
                variant={formData.type === "topup" ? "default" : "outline"}
                className={cn("h-auto py-4 justify-start", formData.type === "topup" ? "ring-2 ring-primary" : "")}
                onClick={() => {
                  handleInputChange("type", "topup")
                  handleInputChange("subType", "")
                }}
              >
                <Percent className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Topup</div>
                  <div className="text-xs text-muted-foreground mt-1">Fees for adding funds</div>
                </div>
              </Button>

              <Button
                type="button"
                variant={formData.type === "prepaid_card" ? "default" : "outline"}
                className={cn(
                  "h-auto py-4 justify-start",
                  formData.type === "prepaid_card" ? "ring-2 ring-primary" : "",
                )}
                onClick={() => {
                  handleInputChange("type", "prepaid_card")
                  handleInputChange("subType", "")
                  handleInputChange("atmType", "")
                }}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Prepaid Card</div>
                  <div className="text-xs text-muted-foreground mt-1">Fees for card operations</div>
                </div>
              </Button>
            </div>

            <div className="space-y-2 mt-6">
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
        )}

        {/* Step 3: Fee Structure */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={formData.calculationType === "fixed" ? "default" : "outline"}
                className={cn("h-auto py-3", formData.calculationType === "fixed" ? "ring-2 ring-primary" : "")}
                onClick={() => handleInputChange("calculationType", "fixed")}
              >
                <div className="text-center">
                  <div className="font-medium">Fixed</div>
                </div>
              </Button>

              <Button
                type="button"
                variant={formData.calculationType === "percentage" ? "default" : "outline"}
                className={cn("h-auto py-3", formData.calculationType === "percentage" ? "ring-2 ring-primary" : "")}
                onClick={() => handleInputChange("calculationType", "percentage")}
              >
                <div className="text-center">
                  <div className="font-medium">Percentage</div>
                </div>
              </Button>

              <Button
                type="button"
                variant={formData.calculationType === "mixed" ? "default" : "outline"}
                className={cn("h-auto py-3", formData.calculationType === "mixed" ? "ring-2 ring-primary" : "")}
                onClick={() => handleInputChange("calculationType", "mixed")}
              >
                <div className="text-center">
                  <div className="font-medium">Mixed</div>
                </div>
              </Button>
            </div>

            <div className="pt-4">
              {(formData.calculationType === "fixed" || formData.calculationType === "mixed") && (
                <div className="space-y-2 mb-4">
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
        )}

        {/* Step 4: Limits & Dates */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Transaction Amount Limits</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasMaxAmount"
                    checked={formData.hasMaxAmount}
                    onCheckedChange={(checked) => handleInputChange("hasMaxAmount", checked)}
                  />
                  <Label htmlFor="hasMaxAmount" className="text-xs text-muted-foreground">
                    Max amount
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAmount" className="text-xs">
                    Minimum
                  </Label>
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
                  <Label htmlFor="maxAmount" className="text-xs">
                    Maximum
                  </Label>
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
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Transaction Count Limits</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasMaxTransactions"
                    checked={formData.hasMaxTransactions}
                    onCheckedChange={(checked) => handleInputChange("hasMaxTransactions", checked)}
                  />
                  <Label htmlFor="hasMaxTransactions" className="text-xs text-muted-foreground">
                    Max count
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minTransactions" className="text-xs">
                    Minimum
                  </Label>
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
                  <Label htmlFor="maxTransactions" className="text-xs">
                    Maximum
                  </Label>
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Date Range</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasEndDate"
                    checked={formData.hasEndDate}
                    onCheckedChange={(checked) => handleInputChange("hasEndDate", checked)}
                  />
                  <Label htmlFor="hasEndDate" className="text-xs text-muted-foreground">
                    End date
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Start Date</Label>
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
                  <Label className="text-xs">End Date</Label>
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
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 bg-muted/20 flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep} disabled={activeStep === 0}>
          Previous
        </Button>

        {activeStep < steps.length - 1 ? (
          <Button type="button" onClick={nextStep} disabled={!steps[activeStep].isValid}>
            Next
          </Button>
        ) : (
          submitButton || (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Commission"}
            </Button>
          )
        )}
      </div>
    </form>
  )
}

