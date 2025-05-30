"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, MapPin, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

// Define customer type for TypeScript
type CustomerData = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  countryCode: string;
  milesAndSmilesNumber: string;
  accountId: string;
  accountStatus: "active" | "suspended" | "closed";
  kycId: string;
  kycStatus: "verified" | "pending" | "rejected";
  kycLevel: string;
  walletId: string;
  walletStatus: "active" | "limited" | "blocked";
  balance: string;
  joinDate: string;
  address: string;
  nationality: string;
  citizenshipId: string;
  dateOfBirth: string;
  occupation: string;
  educationalBackground: string;
  sourceOfIncome: string;
  monthlyNetIncome: string;
  yearlyMoneyTransferVolume: string;
  yearlyMoneyTransferCount: string;
  documentNumber: string;
  documentType: string;
  documentExpiryDate: string;
  kycVerificationDate: string;
  kycNextVerificationDate: string;
  kycVerificationReason: string;
  kycNextVerificationReason: string;
};

// Mock ID card images
const idCardFront = "/placeholder.svg?height=200&width=320"
const idCardBack = "/placeholder.svg?height=200&width=320"
const selfieImage = "/placeholder.svg?height=150&width=150"
const biometricImage = "/placeholder.svg?height=150&width=150"

export function CustomerKYC({ customer }: { customer: CustomerData }) {
  const [openSections, setOpenSections] = useState({
    personal: true,
    financial: true,
    documents: true,
    address: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <Collapsible open={openSections.personal} onOpenChange={() => toggleSection("personal")}>
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => toggleSection("personal")}>
            <div className="flex justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
              {openSections.personal ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <span>{customer.name}</span>
                        <Badge className="ml-auto bg-green-500">
                          <Check className="h-3 w-3" />
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Previously: {customer.name}</div>
                    </div>

                    <div className="space-y-2">
                      <Label>Surname</Label>
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <span>Smith</span>
                        <Badge className="ml-auto bg-green-500">
                          <Check className="h-3 w-3" />
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Previously: Smith</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Nationality</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>{customer.nationality}</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: {customer.nationality}</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Citizenship ID Number</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>{customer.citizenshipId}</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: {customer.citizenshipId}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>{customer.dateOfBirth}</span>
                      <Badge className="ml-auto bg-red-500">
                        <AlertCircle className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: 05.10.1985</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>Male</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: Male</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Document Number</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>{customer.documentNumber}</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: {customer.documentNumber}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* KYC Summary Section */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-medium">KYC Status Summary</h3>
              <div className="text-sm text-muted-foreground mt-1">
                ID: <span className="font-mono">{customer.kycId}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex flex-col items-center md:items-start gap-1 border rounded-md p-2">
                <span className="text-xs text-muted-foreground">Status</span>
                <Badge variant="outline" className={
                  customer.kycStatus === "verified" 
                    ? "border-green-500 text-green-500"
                    : customer.kycStatus === "pending"
                      ? "border-amber-500 text-amber-500" 
                      : "border-red-500 text-red-500"
                }>
                  {customer.kycStatus?.charAt(0).toUpperCase() + customer.kycStatus?.slice(1) || 'Unknown'}
                </Badge>
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-1 border rounded-md p-2">
                <span className="text-xs text-muted-foreground">Level</span>
                <Badge variant="outline" className={
                  customer.kycLevel === "full" 
                    ? "border-green-500 text-green-500"
                    : customer.kycLevel === "medium"
                      ? "border-amber-500 text-amber-500" 
                      : "border-gray-500 text-gray-500"
                }>
                  {customer.kycLevel?.charAt(0).toUpperCase() + customer.kycLevel?.slice(1) || 'Basic'}
                </Badge>
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-1 border rounded-md p-2">
                <span className="text-xs text-muted-foreground">Last Verified</span>
                <span className="text-sm font-medium">{customer.kycVerificationDate}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information Section */}
      <Collapsible open={openSections.financial} onOpenChange={() => toggleSection("financial")}>
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => toggleSection("financial")}>
            <div className="flex justify-between items-center">
              <CardTitle>Financial Information</CardTitle>
              {openSections.financial ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Educational Background</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>{customer.educationalBackground}</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: {customer.educationalBackground}</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Occupation</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>{customer.occupation}</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: Student</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Sources of Income</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>{customer.sourceOfIncome}</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: {customer.sourceOfIncome}</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Monthly Net Income</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>{customer.monthlyNetIncome}</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: {customer.monthlyNetIncome}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* ID Documents Section */}
      <Collapsible open={openSections.documents} onOpenChange={() => toggleSection("documents")}>
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => toggleSection("documents")}>
            <div className="flex justify-between items-center">
              <CardTitle>ID Documents</CardTitle>
              {openSections.documents ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-6">
                {/* ID Card Front and Back */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="border rounded-md p-4">
                      <img
                        src={idCardFront || "/placeholder.svg?height=200&width=320"}
                        alt="ID Card Front"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">ID Card Front</span>
                        <div className="text-xs text-muted-foreground">Uploaded: 01/15/2023 - 12:01:22</div>
                      </div>
                      <Button size="sm">
                        <span className="text-xs">LABEL</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="border rounded-md p-4">
                      <img
                        src={idCardBack || "/placeholder.svg?height=200&width=320"}
                        alt="ID Card Rear"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">ID Card Rear</span>
                        <div className="text-xs text-muted-foreground">Uploaded: 01/15/2023 - 12:01:22</div>
                      </div>
                      <Button size="sm">
                        <span className="text-xs">LABEL</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Portrait and Selfie with Likeness Score */}
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-3">ID Portrait & Selfie Comparison</h3>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-1/4">
                      <div className="border rounded-md p-2">
                        <img
                          src="/placeholder.svg?height=150&width=150"
                          alt="ID Portrait"
                          className="w-full h-auto rounded-md"
                        />
                      </div>
                      <div className="text-center mt-2 text-sm">ID Portrait</div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Likeness Score:</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: "92%" }}></div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Facial recognition analysis between selfie and ID document portrait
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/4">
                      <div className="border rounded-md p-2">
                        <img
                          src="/placeholder.svg?height=150&width=150"
                          alt="Selfie"
                          className="w-full h-auto rounded-md"
                        />
                      </div>
                      <div className="text-center mt-2 text-sm">Selfie</div>
                    </div>
                  </div>
                </div>

                {/* Additional Verification Images */}
                <h3 className="font-medium">Additional Verification Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="border rounded-md p-4">
                      <img src="/placeholder.svg?height=120&width=120" alt="Biometric" className="w-full h-auto" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Biometric</span>
                        <div className="text-xs text-muted-foreground">Uploaded: 01/15/2023</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="border rounded-md p-4">
                      <img src="/placeholder.svg?height=120&width=120" alt="Selfie Front" className="w-full h-auto" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Selfie Front</span>
                        <div className="text-xs text-muted-foreground">Uploaded: 01/15/2023</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="border rounded-md p-4">
                      <img src="/placeholder.svg?height=120&width=120" alt="Selfie Left" className="w-full h-auto" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Selfie Left</span>
                        <div className="text-xs text-muted-foreground">Uploaded: 01/15/2023</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="border rounded-md p-4">
                      <img src="/placeholder.svg?height=120&width=120" alt="Selfie Right" className="w-full h-auto" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Selfie Right</span>
                        <div className="text-xs text-muted-foreground">Uploaded: 01/15/2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Documents
              </Button>
            </CardFooter>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Address Information Section */}
      <Collapsible open={openSections.address} onOpenChange={() => toggleSection("address")}>
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => toggleSection("address")}>
            <div className="flex justify-between items-center">
              <CardTitle>Address Information</CardTitle>
              {openSections.address ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>KYC Address Code</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>123456789</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: 123456789</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Full Address</Label>
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <span>Küçük Çamlıca Mah. Üsküdar Cad. Turkish Technology Binası No:76 Üsküdar / Istanbul</span>
                      <Badge className="ml-auto bg-green-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Previously: Same address</div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button>
                    <MapPin className="mr-2 h-4 w-4" />
                    Update Address Information
                  </Button>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  )
}

// Helper component for the check icon
function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

