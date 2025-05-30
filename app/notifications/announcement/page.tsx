"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, HelpCircle, Megaphone } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Turkish", value: "tr" },
]

// Form schema
const announcementSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  type: z.enum(["SMS", "Email", "Push"], { required_error: "Notification type is required" }),
  
  // Scheduling options
  schedulingOption: z.enum(["immediate", "scheduled"], { required_error: "Scheduling option is required" }),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
  
  // SMS fields
  smsContent: z.object({
    en: z.string().optional(),
    tr: z.string().optional(),
  }).optional(),
  
  // Email fields
  emailTemplate: z.string().optional(),
  emailSubject: z.object({
    en: z.string().optional(),
    tr: z.string().optional(),
  }).optional(),
  emailBody: z.object({
    en: z.string().optional(),
    tr: z.string().optional(),
  }).optional(),
  
  // Push fields
  pushTemplate: z.string().optional(),
  pushTitle: z.object({
    en: z.string().optional(),
    tr: z.string().optional(),
  }).optional(),
  pushBody: z.object({
    en: z.string().optional(),
    tr: z.string().optional(),
  }).optional(),
}).refine(data => {
  // If scheduled, both date and time are required
  if (data.schedulingOption === "scheduled") {
    return !!data.scheduledDate && !!data.scheduledTime;
  }
  return true;
}, {
  message: "Scheduled date and time are required for scheduled announcements",
  path: ["scheduledDate"]
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>

export default function AnnouncementPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeLanguage, setActiveLanguage] = useState<string>("en")
  const [isSending, setIsSending] = useState(false)
  const [result, setResult] = useState<{ 
    success: number; 
    failed: number; 
    isScheduled?: boolean;
    scheduledDate?: string;
    scheduledTime?: string;
  } | null>(null)
  
  // Get notification type from URL query parameter
  const typeFromUrl = searchParams.get('type') as "SMS" | "Email" | "Push" | null
  
  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      name: "",
      type: typeFromUrl || "SMS",
      schedulingOption: "immediate",
      scheduledDate: "",
      scheduledTime: "",
      smsContent: { en: "", tr: "" },
      emailTemplate: "",
      emailSubject: { en: "", tr: "" },
      emailBody: { en: "", tr: "" },
      pushTemplate: "",
      pushTitle: { en: "", tr: "" },
      pushBody: { en: "", tr: "" },
    },
  })

  // Update form type value when URL parameter changes
  useEffect(() => {
    if (typeFromUrl) {
      form.setValue('type', typeFromUrl);
    }
  }, [typeFromUrl, form]);

  const watchType = form.watch("type")

  const handleSubmit = async (data: AnnouncementFormValues) => {
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
    console.log("Announcement data:", data);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/notifications">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create {watchType} Announcement</h1>
      </div>
      
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Megaphone className="h-6 w-6 text-white" />
          <h2 className="text-xl font-bold text-white">Mass {watchType} Announcement</h2>
        </div>
        <p className="text-amber-100">
          Create an announcement to be sent to all users. This notification will be delivered to all users without targeting rules.
        </p>
      </div>
      
      {result ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {result.isScheduled ? "Announcement Scheduled" : "Announcement Sent"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className={`rounded-full ${result.isScheduled ? "bg-blue-100" : "bg-green-100"} p-3 mb-4`}>
                <Megaphone className={`h-6 w-6 ${result.isScheduled ? "text-blue-600" : "text-green-600"}`} />
              </div>
              <h3 className="text-lg font-medium mb-1">
                {result.isScheduled 
                  ? "Announcement Successfully Scheduled" 
                  : "Announcement Successfully Sent"
                }
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mb-4">
                {result.isScheduled
                  ? `Your announcement has been scheduled for ${result.scheduledDate} at ${result.scheduledTime}.`
                  : "Your announcement has been sent to all users."
                }
              </p>
              
              {!result.isScheduled && (
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Successful</p>
                    <p className="text-2xl font-bold text-green-600">{result.success}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Failed</p>
                    <p className="text-2xl font-bold text-red-600">{result.failed}</p>
                  </Card>
                </div>
              )}
              
              {result.isScheduled && (
                <div className="w-full max-w-md bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Date:</span>
                      <span className="text-sm font-medium">{result.scheduledDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Time:</span>
                      <span className="text-sm font-medium">{result.scheduledTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Estimated Recipients:</span>
                      <span className="text-sm font-medium">{result.success + result.failed}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <Button onClick={() => router.push("/notifications")}>
                  Return to Notifications
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This will send a {watchType} notification to ALL users of your application. Please review carefully before sending.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Announcement Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Announcement Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter announcement name" {...field} />
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
                              <SelectItem value="SMS">SMS</SelectItem>
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="Push">Push</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Scheduling Section */}
                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">Scheduling</h3>
                    <FormField
                      control={form.control}
                      name="schedulingOption"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="radio"
                                  id="immediate"
                                  checked={field.value === "immediate"}
                                  onChange={() => field.onChange("immediate")}
                                  className="w-4 h-4 accent-primary"
                                />
                              </FormControl>
                              <Label htmlFor="immediate">Send immediately</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="radio"
                                  id="scheduled"
                                  checked={field.value === "scheduled"}
                                  onChange={() => field.onChange("scheduled")}
                                  className="w-4 h-4 accent-primary"
                                />
                              </FormControl>
                              <Label htmlFor="scheduled">Schedule for later</Label>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("schedulingOption") === "scheduled" && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="scheduledDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input 
                                  type="date" 
                                  {...field} 
                                  min={new Date().toISOString().split('T')[0]} 
                                />
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
                </CardContent>
              </Card>

              {/* Content Section based on notification type */}
              <Card>
                <CardHeader>
                  <CardTitle>Announcement Content</CardTitle>
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
                            <FormField
                              control={form.control}
                              name={`smsContent.${lang.value}` as any}
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
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>
                  )}

                  {watchType === "Email" && (
                    <div className="space-y-6">
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
                              {/* Subject */}
                              <FormField
                                control={form.control}
                                name={`emailSubject.${lang.value}` as any}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder={`Enter email subject in ${lang.label}...`} 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Body */}
                              <FormField
                                control={form.control}
                                name={`emailBody.${lang.value}` as any}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Body</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder={`Enter email body in ${lang.label}...`} 
                                        className="min-h-[200px]"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>
                  )}

                  {watchType === "Push" && (
                    <div className="space-y-6">
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
                              {/* Title */}
                              <FormField
                                control={form.control}
                                name={`pushTitle.${lang.value}` as any}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder={`Enter push title in ${lang.label}...`} 
                                        maxLength={50}
                                        {...field} 
                                      />
                                    </FormControl>
                                    <div className="flex justify-between">
                                      <FormMessage />
                                      <p className="text-xs text-muted-foreground">
                                        {field.value?.toString().length || 0}/50 characters
                                      </p>
                                    </div>
                                  </FormItem>
                                )}
                              />

                              {/* Body */}
                              <FormField
                                control={form.control}
                                name={`pushBody.${lang.value}` as any}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder={`Enter push description in ${lang.label}...`} 
                                        className="min-h-[120px]"
                                        maxLength={140}
                                        {...field} 
                                      />
                                    </FormControl>
                                    <div className="flex justify-between">
                                      <FormMessage />
                                      <p className="text-xs text-muted-foreground">
                                        {field.value?.toString().length || 0}/140 characters
                                      </p>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/notifications")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSending}>
                {isSending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    Sending Announcement...
                  </>
                ) : (
                  <>
                    {form.watch("schedulingOption") === "immediate" 
                      ? `Send ${watchType} Announcement to All Users Now`
                      : `Schedule ${watchType} Announcement for Later`
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