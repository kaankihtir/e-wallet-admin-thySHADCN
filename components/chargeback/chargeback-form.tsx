import { CalendarIcon } from "@/components/icons/calendar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Textarea
} from "@/components/ui/textarea"
import {
  Label
} from "@/components/ui/label"
import {
  Input
} from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  format
} from "date-fns"

export function ChargebackForm() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [atmReasonType, setAtmReasonType] = useState<string | null>(null)

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="item-1" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="item-1">POS</TabsTrigger>
            <TabsTrigger value="item-2">ATM</TabsTrigger>
          </TabsList>
          <TabsContent value="item-1">
            {/* POS content */}
          </TabsContent>
          <TabsContent value="item-2">
            <form>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="atm_date">Date</Label>
                    <div className="flex items-center space-x-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "From date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "To date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You can dispute ATM transactions within the last 120 days
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="atm_transaction">Select Transaction</Label>
                    <Select>
                      <SelectTrigger id="atm_transaction">
                        <SelectValue placeholder="Select transaction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="atm1">Ziraat Bankası ATM - 500 TL - June 10, 2023</SelectItem>
                        <SelectItem value="atm2">İş Bankası ATM - 1000 TL - May 20, 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep} disabled={!atmReasonType}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="atm_description">Detailed Description</Label>
                    <Textarea 
                      id="atm_description" 
                      placeholder="Please provide details about your dispute"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transaction_amount">Transaction Amount</Label>
                      <div className="relative">
                        <Input 
                          id="transaction_amount" 
                          type="number" 
                          placeholder="Amount" 
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
                          TL
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="disputed_amount">
                        {atmReasonType === "cash_not_dispensed" 
                          ? "Amount Not Received" 
                          : "Amount Not Credited"}
                      </Label>
                      <div className="relative">
                        <Input 
                          id="disputed_amount" 
                          type="number" 
                          placeholder="Amount" 
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
                          TL
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone_atm">Contact Phone Number</Label>
                    <Input 
                      id="contact_phone_atm" 
                      type="tel" 
                      placeholder="+90 5XX XXX XXXX" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact_email_atm">Contact Email</Label>
                    <Input 
                      id="contact_email_atm" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      required
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Review Request
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Review Your ATM Dispute Request</h3>
                  
                  <div className="rounded-md border p-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Card:</div>
                      <div className="text-sm">TKPAY Prepaid Card ****1234</div>
                      
                      <div className="text-sm font-medium">Transaction:</div>
                      <div className="text-sm">Ziraat Bankası ATM - 500 TL - June 10, 2023</div>
                      
                      <div className="text-sm font-medium">Dispute Type:</div>
                      <div className="text-sm">
                        {atmReasonType === "cash_not_dispensed" && "Cash Not Dispensed / Partially Dispensed"}
                        {atmReasonType === "cash_deposit_problem" && "Cash Deposit Problem"}
                      </div>
                      
                      <div className="text-sm font-medium">Transaction Amount:</div>
                      <div className="text-sm">500 TL</div>
                      
                      <div className="text-sm font-medium">
                        {atmReasonType === "cash_not_dispensed" ? "Amount Not Received:" : "Amount Not Credited:"}
                      </div>
                      <div className="text-sm">500 TL</div>
                      
                      <div className="text-sm font-medium">Description:</div>
                      <div className="text-sm">The ATM did not dispense any cash but my account was debited.</div>
                      
                      <div className="text-sm font-medium">Contact Phone:</div>
                      <div className="text-sm">+90 532 123 4567</div>
                      
                      <div className="text-sm font-medium">Contact Email:</div>
                      <div className="text-sm">user@example.com</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="rounded-md bg-muted p-4 text-sm">
                      <p className="mb-4">
                        ATM dispute requests are processed according to National and International Card Payment System Rules. 
                        Resolution times may vary depending on the ATM bank's investigation procedures.
                      </p>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="atm_agreement" className="h-4 w-4 rounded border-gray-300" required />
                        <label htmlFor="atm_agreement" className="text-sm font-medium">
                          I confirm that all information provided is accurate and complete. I understand that providing 
                          false information may result in rejection of my claim and TKPAY assumes no responsibility for 
                          incorrect or inconsistent information.
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="submit">
                      Submit Dispute Request
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 