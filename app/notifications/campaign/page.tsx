"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, HelpCircle, Plus, Megaphone, Trash2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Form schema
const campaignSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  type: z.enum(["SMS", "Push"], { required_error: "Channel is required" }),
  status: z.enum(["Draft", "Active", "Scheduled", "Inactive"]).default("Draft"),
  
  // Scheduling options
  schedulingOption: z.enum(["immediate", "scheduled"], { required_error: "Scheduling option is required" }),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
  
  // SMS fields
  smsContent: z.object({
    en: z.string().optional(),
    tr: z.string().optional(),
  }).optional(),
  
  // Push fields
  pushTemplate: z.string().optional(),
  
  // Selected dynamic fields
  selectedFields: z.array(z.string()).default([]),
  
  // Target file
  targetFile: z.any().optional(),
}).refine(data => {
  // If scheduled, both date and time are required
  if (data.schedulingOption === "scheduled") {
    return !!data.scheduledDate && !!data.scheduledTime;
  }
  return true;
}, {
  message: "Scheduled date and time are required for scheduled campaigns",
  path: ["scheduledDate"]
});

type CampaignFormValues = z.infer<typeof campaignSchema>

export default function CampaignPage() {
  const router = useRouter()
  const [isSending, setIsSending] = useState(false)
  const [targetFile, setTargetFile] = useState<File | null>(null)
  const [result, setResult] = useState<{ 
    success: number; 
    failed: number; 
    isScheduled?: boolean;
    scheduledDate?: string;
    scheduledTime?: string;
  } | null>(null)
  
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      type: "SMS",
      status: "Draft",
      schedulingOption: "immediate",
      scheduledDate: "",
      scheduledTime: "",
      smsContent: { en: "", tr: "" },
      pushTemplate: "",
      selectedFields: [],
    },
  })

  const watchType = form.watch("type")
  const watchSchedulingOption = form.watch("schedulingOption")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTargetFile(e.target.files[0]);
      form.setValue('targetFile', e.target.files[0]);
    }
  };

  const handleSubmit = async (data: CampaignFormValues) => {
    setIsSending(true)
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create result object
    const resultData = {
      success: Math.floor(Math.random() * 10000) + 5000,
      failed: Math.floor(Math.random() * 100)
    };
    
    // If it's scheduled, add scheduling information
    if (data.schedulingOption === "scheduled") {
      Object.assign(resultData, {
        isScheduled: true,
        scheduledDate: data.scheduledDate,
        scheduledTime: data.scheduledTime
      });
      console.log(`Scheduled for: ${data.scheduledDate} at ${data.scheduledTime}`);
    }
    
    // Set the result and finish
    setResult(resultData);
    setIsSending(false);
    
    // In a real app, you would send the data to your API
    console.log("Campaign data:", data);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/notifications">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create {watchType} Campaign</h1>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Megaphone className="h-6 w-6 text-white" />
          <h2 className="text-xl font-bold text-white">Targeted {watchType} Campaign</h2>
        </div>
        <p className="text-purple-100">
          Create a campaign to be sent to specific users based on the uploaded file. Campaigns allow you to target 
          specific user segments with personalized notifications.
        </p>
      </div>
      
      {result ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {result.isScheduled ? "Campaign Scheduled" : "Campaign Sent"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className={`rounded-full ${result.isScheduled ? "bg-blue-100" : "bg-green-100"} p-3 mb-4`}>
                <Megaphone className={`h-6 w-6 ${result.isScheduled ? "text-blue-600" : "text-green-600"}`} />
              </div>
              <h3 className="text-lg font-medium mb-1">
                {result.isScheduled 
                  ? "Your campaign has been scheduled successfully" 
                  : "Your campaign has been sent successfully"
                }
              </h3>
              {result.isScheduled && (
                <p className="text-sm text-muted-foreground mb-4">
                  Scheduled for {result.scheduledDate} at {result.scheduledTime}
                </p>
              )}
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{result.success.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Successful</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{result.failed.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Failed</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={() => router.push("/notifications")}>
                Return to Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter campaign name" {...field} />
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
                              <SelectItem value="Push">Push</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Alert>
                    <HelpCircle className="h-4 w-4" />
                    <AlertTitle>Email Campaigns</AlertTitle>
                    <AlertDescription>
                      Email campaign notifications are handled through DEngage platform and are not available in this interface.
                      Please contact the marketing team to set up email campaigns.
                    </AlertDescription>
                  </Alert>
                  
                  {/* Scheduling Options */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="schedulingOption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>When to Send</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select when to send" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immediate">Send Immediately</SelectItem>
                              <SelectItem value="scheduled">Schedule for Later</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose when this campaign should be sent
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {watchSchedulingOption === "scheduled" && (
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="scheduledDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="scheduledTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  {/* Target File Upload */}
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
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove file
                        </Button>
                      )}
                    </div>
                    <FormDescription>
                      Upload an Excel or CSV file containing the target recipients for this campaign.
                      The file should include columns for recipient IDs or phone numbers.
                    </FormDescription>
                  </div>
                </CardContent>
              </Card>

              {/* Content Section based on channel type */}
              {watchType && (
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {watchType === "SMS" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">SMS Content</h3>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="smsContent.en"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SMS Message (English)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter SMS message in English..." 
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
                        
                        <FormField
                          control={form.control}
                          name="smsContent.tr"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SMS Message (Turkish)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter SMS message in Turkish..." 
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
                        
                        <Alert>
                          <HelpCircle className="h-4 w-4" />
                          <AlertTitle>SMS Variables</AlertTitle>
                          <AlertDescription>
                            You can use variables like {"{firstName}"}, {"{lastName}"}, {"{accountId}"} in your SMS content.
                            These will be replaced with actual user data when the campaign is sent.
                          </AlertDescription>
                        </Alert>
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

                        <Alert>
                          <HelpCircle className="h-4 w-4" />
                          <AlertTitle>Push Notification Variables</AlertTitle>
                          <AlertDescription>
                            Push notifications will use the template specified above. You can configure dynamic fields
                            in the push notification template from the template management section.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => router.push("/notifications")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSending}>
                {isSending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    Sending Campaign...
                  </>
                ) : (
                  <>
                    {watchSchedulingOption === "immediate" 
                      ? `Send ${watchType} Campaign Now`
                      : `Schedule ${watchType} Campaign for Later`
                    }
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
} 