"use client"

import { useState, useMemo } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Plus, Trash2, Languages, HelpCircle, Megaphone, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Constants
const TRANSACTIONS = [
  { label: "Payment", value: "payment" },
  { label: "Withdrawal", value: "withdrawal" },
  { label: "Deposit", value: "deposit" },
  { label: "Transfer", value: "transfer" },
  { label: "Authentication", value: "authentication" },
  { label: "Account", value: "account" },
  { label: "Marketing", value: "marketing" },
]

// Keep only English and Turkish
const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Turkish", value: "tr" },
]

const EMAIL_TEMPLATES = [
  { label: "Transaction Receipt (EMAIL-RECEIPT-01)", value: "EMAIL-RECEIPT-01" },
  { label: "Account Statement (EMAIL-STATEMENT-01)", value: "EMAIL-STATEMENT-01" },
  { label: "Verification (EMAIL-VERIFY-01)", value: "EMAIL-VERIFY-01" },
  { label: "Welcome (EMAIL-WELCOME-01)", value: "EMAIL-WELCOME-01" },
]

const PUSH_TEMPLATES = [
  { label: "Authentication Alert (PUSH-AUTH-01)", value: "PUSH-AUTH-01" },
  { label: "Promotional (PUSH-PROMO-01)", value: "PUSH-PROMO-01" },
  { label: "Transaction Alert (PUSH-TRANSACTION-01)", value: "PUSH-TRANSACTION-01" },
]

const TARGET_KEYS = [
  { label: "Customer ID", value: "customer_id" },
  { label: "Transaction Type", value: "transaction_type" },
  { label: "User Segment", value: "user_segment" },
  { label: "Account Type", value: "account_type" },
  { label: "Location", value: "location" },
]

const TARGET_OPERATORS = [
  { label: "Equals", value: "EQUALS" },
  { label: "Not Equals", value: "NOT_EQUALS" },
  { label: "Contains", value: "CONTAINS" },
  { label: "In", value: "IN" },
  { label: "Greater Than", value: "GREATER_THAN" },
  { label: "Less Than", value: "LESS_THAN" },
]

// Define dynamic fields based on transaction type
const TRANSACTION_DYNAMIC_FIELDS = {
  // Common fields available for all transaction types
  common: [
    { label: "User Name", value: "{userName}" },
    { label: "User Last Name", value: "{userLastName}" },
    { label: "Date", value: "{date}" },
    { label: "Account Number", value: "{accountNumber}" },
  ],
  // Payment specific fields
  payment: [
    { label: "Merchant Name", value: "{merchantName}" },
    { label: "Payment Amount", value: "{paymentAmount}" },
    { label: "Payment Method", value: "{paymentMethod}" },
    { label: "Transaction ID", value: "{transactionId}" },
    { label: "Payment Status", value: "{paymentStatus}" },
  ],
  // Withdrawal specific fields
  withdrawal: [
    { label: "Withdrawal Amount", value: "{withdrawalAmount}" },
    { label: "Withdrawal Method", value: "{withdrawalMethod}" },
    { label: "Fee", value: "{withdrawalFee}" },
    { label: "Transaction ID", value: "{transactionId}" },
    { label: "Withdrawal Status", value: "{withdrawalStatus}" },
  ],
  // Deposit specific fields
  deposit: [
    { label: "Deposit Amount", value: "{depositAmount}" },
    { label: "Deposit Method", value: "{depositMethod}" },
    { label: "Transaction ID", value: "{transactionId}" },
    { label: "Deposit Status", value: "{depositStatus}" },
  ],
  // Transfer specific fields
  transfer: [
    { label: "Transfer Amount", value: "{transferAmount}" },
    { label: "Recipient Name", value: "{recipientName}" },
    { label: "Recipient Account", value: "{recipientAccount}" },
    { label: "Transaction ID", value: "{transactionId}" },
    { label: "Transfer Status", value: "{transferStatus}" },
    { label: "Transfer Fee", value: "{transferFee}" },
  ],
  // Authentication specific fields
  authentication: [
    { label: "Authentication Code", value: "{authCode}" },
    { label: "Device", value: "{deviceName}" },
    { label: "IP Address", value: "{ipAddress}" },
    { label: "Location", value: "{authLocation}" },
    { label: "Authentication Type", value: "{authType}" },
  ],
  // Account specific fields
  account: [
    { label: "Account Type", value: "{accountType}" },
    { label: "Account Status", value: "{accountStatus}" },
    { label: "Balance", value: "{accountBalance}" },
    { label: "KYC Status", value: "{kycStatus}" },
  ],
  // Marketing specific fields
  marketing: [
    { label: "Promotion Name", value: "{promotionName}" },
    { label: "Discount Amount", value: "{discountAmount}" },
    { label: "Promotion Code", value: "{promoCode}" },
    { label: "Expiry Date", value: "{expiryDate}" },
    { label: "Category", value: "{category}" },
  ],
}

// Form schema
const notificationFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  transaction: z.string().min(1, { message: "Notification type is required" }).optional(),
  type: z.enum(["", "SMS", "Email", "Push"]).refine(val => val !== "" || !val, {
    message: "Channel is required"
  }),
  status: z.enum(["Draft", "Active", "Scheduled", "Inactive"]),
  languages: z.array(z.string()).min(1, {
    message: "At least one language must be selected.",
  }),
  
  // SMS fields
  smsContent: z.record(z.string().optional()).optional(),
  
  // Email fields
  emailTemplate: z.string().optional(),
  emailSubject: z.record(z.string().optional()).optional(),
  emailBody: z.record(z.string().optional()).optional(),
  
  // Push fields
  pushTemplate: z.string().optional(),
  
  // Campaign fields
  targetFile: z.any().optional(),
  
  // Selected dynamic fields
  selectedFields: z.array(z.string()).default([]),
})

// Type for form values
type NotificationFormValues = z.infer<typeof notificationFormSchema>

interface NotificationFormProps {
  initialData?: Partial<NotificationFormValues>
  onSubmit: (data: NotificationFormValues) => void
  onCancel: () => void
  isCampaign?: boolean
}

export function NotificationForm({ initialData, onSubmit, onCancel, isCampaign = false }: NotificationFormProps) {
  const [activeLanguage, setActiveLanguage] = useState<string>("en")
  const [targetFile, setTargetFile] = useState<File | null>(null)
  
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      transaction: initialData?.transaction || "",
      type: initialData?.type || "",
      status: initialData?.status || "Draft",
      languages: initialData?.languages || [],
      smsContent: initialData?.smsContent || { en: "", tr: "" },
      emailTemplate: initialData?.emailTemplate || "",
      emailSubject: initialData?.emailSubject || { en: "", tr: "" },
      emailBody: initialData?.emailBody || { en: "", tr: "" },
      pushTemplate: initialData?.pushTemplate || "",
      selectedFields: initialData?.selectedFields || [],
    },
  } as const)

  const watchType = form.watch("type")
  const watchTransaction = form.watch("transaction")
  const watchSelectedFields = form.watch("selectedFields")

  // Get dynamic fields based on transaction type
  const dynamicFields = useMemo(() => {
    const transactionType = watchTransaction as keyof typeof TRANSACTION_DYNAMIC_FIELDS || 'common';
    
    // If the transaction type exists in our mapping, return common fields + transaction specific fields
    if (transactionType && TRANSACTION_DYNAMIC_FIELDS[transactionType]) {
      // Use map with index to add unique id to each field object
      return [
        ...TRANSACTION_DYNAMIC_FIELDS.common.map((field, idx) => ({
          ...field,
          id: `common-${idx}-${field.value}`
        })),
        ...TRANSACTION_DYNAMIC_FIELDS[transactionType].map((field, idx) => ({
          ...field,
          id: `${transactionType}-${idx}-${field.value}`
        })),
      ];
    }
    
    // Default to just common fields if no transaction type is selected
    return TRANSACTION_DYNAMIC_FIELDS.common.map((field, idx) => ({
      ...field,
      id: `common-${idx}-${field.value}`
    }));
  }, [watchTransaction]);

  // Insert dynamic field at cursor position
  const insertDynamicField = (fieldValue: string, formField: string, language: string) => {
    try {
      // Use type assertion to handle dynamic paths
      const fieldPath = `${formField}.${language}` as const;
      const currentValue = form.getValues(fieldPath as any) || '';
      form.setValue(fieldPath as any, `${currentValue}${fieldValue}`);
    } catch (error) {
      console.error("Error inserting dynamic field:", error);
    }
  }

  // Toggle field selection for notification
  const toggleFieldSelection = (fieldValue: string) => {
    const currentSelectedFields = [...form.getValues("selectedFields")];
    
    if (currentSelectedFields.includes(fieldValue)) {
      // Remove field if already selected
      form.setValue(
        "selectedFields", 
        currentSelectedFields.filter(field => field !== fieldValue)
      );
    } else {
      // Add field if not selected
      form.setValue("selectedFields", [...currentSelectedFields, fieldValue]);
    }
  }

  // Check if a field is selected
  const isFieldSelected = (fieldValue: string) => {
    return watchSelectedFields.includes(fieldValue);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTargetFile(e.target.files[0]);
      form.setValue('targetFile', e.target.files[0]);
    }
  };

  const onSubmitForm = (data: NotificationFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isCampaign ? "Campaign Notification Information" : "Notification Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter notification name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Channel</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select channel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SMS">SMS</SelectItem>
                          {!isCampaign && <SelectItem value="Email">Email</SelectItem>}
                          <SelectItem value="Push">Push</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isCampaign && (
                <Alert>
                  <HelpCircle className="h-4 w-4" />
                  <AlertTitle>Email Campaigns</AlertTitle>
                  <AlertDescription>
                    Email campaign notifications are handled through DEngage platform and are not available in this interface.
                    Please contact the marketing team to set up email campaigns.
                  </AlertDescription>
                </Alert>
              )}

              {!isCampaign && (
                <FormField
                  control={form.control}
                  name="transaction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select notification type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TRANSACTIONS.map((transaction) => (
                            <SelectItem key={transaction.value} value={transaction.value}>
                              {transaction.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isCampaign && (
                <div className="space-y-4">
                  <Label>Upload Target Recipients</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-muted/30">
                    <input
                      type="file"
                      id="targetFile"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".xlsx,.xls,.csv"
                    />
                    <label 
                      htmlFor="targetFile" 
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="mb-2 p-3 rounded-full bg-primary/10">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium mb-1">
                        {targetFile ? targetFile.name : "Click to upload file"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Excel or CSV (max 5MB)
                      </span>
                    </label>
                    {targetFile && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setTargetFile(null);
                          form.setValue('targetFile', undefined);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove file
                      </Button>
                    )}
                  </div>
                  <FormDescription>
                    Upload an Excel or CSV file containing the target recipients for this campaign.
                    The file should include columns for recipient IDs or phone numbers.
                  </FormDescription>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Section based on notification type - only shown after type is selected */}
          {watchType && (isCampaign || watchTransaction) && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {watchType === "SMS" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">SMS Content</h3>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>SMS messages are limited to 160 characters</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    
                    <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
                      <TabsList className="mb-4">
                        {LANGUAGES.map(lang => (
                          <TabsTrigger key={lang.value} value={lang.value}>
                            {lang.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {LANGUAGES.map(lang => (
                        <TabsContent key={lang.value} value={lang.value}>
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name={`smsContent.${lang.value}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea 
                                      placeholder={`Enter SMS message in ${lang.label}...`} 
                                      className="min-h-[120px]"
                                      maxLength={160}
                                      {...field} 
                                    />
                                  </FormControl>
                                  <div className="flex justify-between">
                                    <FormMessage />
                                    <p className="text-xs text-muted-foreground">
                                      {field.value?.toString().length || 0}/160 characters
                                    </p>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            <div className="space-y-2">
                              <Label>Dynamic Fields</Label>
                              <div className="flex flex-wrap gap-2">
                                {dynamicFields.map((field) => (
                                  <Button
                                    key={field.id}
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => insertDynamicField(field.value, "smsContent", lang.value)}
                                  >
                                    {field.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}

                {watchType === "Email" && !isCampaign && (
                  <div className="space-y-6">
                    {/* Email Template Selection */}
                    <FormField
                      control={form.control}
                      name="emailTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Template ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email template ID" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the unique ID for the email template
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />
                    
                    {/* Dynamic Fields Selection for Email */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Dynamic Fields for Email</Label>
                        <p className="text-sm text-muted-foreground">
                          {watchSelectedFields.length} field(s) selected
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {dynamicFields.map((field, index) => (
                          <div 
                            key={`${field.id}-${index}`}
                            className={`p-3 border rounded-md flex items-center justify-between cursor-pointer ${
                              isFieldSelected(field.value) ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                            }`}
                            onClick={() => toggleFieldSelection(field.value)}
                          >
                            <div>
                              <p className="font-medium">{field.label}</p>
                              <p className="text-xs text-muted-foreground">{field.value}</p>
                            </div>
                            {isFieldSelected(field.value) && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="selectedFields"
                        render={() => (
                          <FormItem>
                            <FormDescription>
                              Select the dynamic fields that will be included in this email template.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {watchSelectedFields.length > 0 && (
                        <div className="mt-4">
                          <Label>Selected Fields</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {watchSelectedFields.map((fieldValue, index) => {
                              const fieldDef = dynamicFields.find(f => f.value === fieldValue);
                              return (
                                <Badge 
                                  key={fieldDef?.id || `selected-${fieldValue}-${index}`} 
                                  className="px-3 py-1 cursor-pointer"
                                  onClick={() => toggleFieldSelection(fieldValue)}
                                >
                                  {fieldDef?.label || fieldValue}
                                  <button 
                                    className="ml-1 text-xs" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFieldSelection(fieldValue);
                                    }}
                                  >
                                    ×
                                  </button>
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {watchType === "Push" && (
                  <div className="space-y-6">
                    {/* Push Template Selection */}
                    <FormField
                      control={form.control}
                      name="pushTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Push Template ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter push template ID" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the unique ID for the push template
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    {/* Dynamic Fields Selection for Push */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Dynamic Fields for Push Notification</Label>
                        <p className="text-sm text-muted-foreground">
                          {watchSelectedFields.length} field(s) selected
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {dynamicFields.map((field, index) => (
                          <div 
                            key={`${field.id}-${index}`}
                            className={`p-3 border rounded-md flex items-center justify-between cursor-pointer ${
                              isFieldSelected(field.value) ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                            }`}
                            onClick={() => toggleFieldSelection(field.value)}
                          >
                            <div>
                              <p className="font-medium">{field.label}</p>
                              <p className="text-xs text-muted-foreground">{field.value}</p>
                            </div>
                            {isFieldSelected(field.value) && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="selectedFields"
                        render={() => (
                          <FormItem>
                            <FormDescription>
                              Select the dynamic fields that will be included in this push notification.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {watchSelectedFields.length > 0 && (
                        <div className="mt-4">
                          <Label>Selected Fields</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {watchSelectedFields.map((fieldValue, index) => {
                              const fieldDef = dynamicFields.find(f => f.value === fieldValue);
                              return (
                                <Badge 
                                  key={fieldDef?.id || `selected-${fieldValue}-${index}`} 
                                  className="px-3 py-1 cursor-pointer"
                                  onClick={() => toggleFieldSelection(fieldValue)}
                                >
                                  {fieldDef?.label || fieldValue}
                                  <button 
                                    className="ml-1 text-xs" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFieldSelection(fieldValue);
                                    }}
                                  >
                                    ×
                                  </button>
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData?.name ? "Save Changes" : isCampaign ? "Create Campaign" : "Create Notification"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 