"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, ArrowUpDown, MoreHorizontal, ImageIcon, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define an interface for opportunities
interface Opportunity {
  id: string;
  key: string;
  homePriority: number;
  imageSrc: string | null;
  endDate: string | null;
  cardScheme: string;
  status: string;
}

// Mock data for opportunities
const mockOpportunities: Opportunity[] = [
  {
    id: "OPP-001",
    key: "SUMMER_SALE",
    homePriority: 1,
    imageSrc: "/opportunities/summer-sale.jpg",
    endDate: "2023-09-30",
    cardScheme: "Visa, Mastercard",
    status: "active"
  },
  {
    id: "OPP-002",
    key: "NEW_CUSTOMER",
    homePriority: 2,
    imageSrc: "/opportunities/new-customer.jpg",
    endDate: "2023-12-31",
    cardScheme: "All",
    status: "active"
  },
  {
    id: "OPP-003",
    key: "HOLIDAY_SPECIAL",
    homePriority: 3,
    imageSrc: "/opportunities/holiday.jpg",
    endDate: "2023-12-25",
    cardScheme: "Visa",
    status: "scheduled"
  },
  {
    id: "OPP-004",
    key: "WEEKEND_BONUS",
    homePriority: 4,
    imageSrc: null,
    endDate: null,
    cardScheme: "Mastercard, American Express",
    status: "active"
  },
  {
    id: "OPP-005",
    key: "BLACK_FRIDAY",
    homePriority: 5,
    imageSrc: "/opportunities/black-friday.jpg",
    endDate: "2023-11-24",
    cardScheme: "All",
    status: "draft"
  },
]

export function OpportunitiesPage() {
  const router = useRouter()
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // For create dialog
  const [key, setKey] = useState("")
  const [priority, setPriority] = useState<number>(1)
  const [cardScheme, setCardScheme] = useState("All")
  const [endDate, setEndDate] = useState("")
  const [status, setStatus] = useState("draft")
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleCreate = () => {
    if (!key.trim()) {
      alert("Please enter a key for the opportunity")
      return
    }

    // Reorder priorities if needed
    const newOpportunities = [...opportunities].map(opp => {
      if (opp.homePriority >= priority) {
        return { ...opp, homePriority: opp.homePriority + 1 }
      }
      return opp
    })

    // Add new opportunity
    const newOpportunity: Opportunity = {
      id: `OPP-${String(opportunities.length + 1).padStart(3, '0')}`,
      key: key.toUpperCase(),
      homePriority: priority,
      imageSrc: null,
      endDate: endDate || null,
      cardScheme: cardScheme,
      status: status
    }

    setOpportunities([...newOpportunities, newOpportunity])
    
    // Reset form
    setKey("")
    setPriority(1)
    setCardScheme("All")
    setEndDate("")
    setStatus("draft")
    
    // Close dialog
    setShowCreateDialog(false)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-6 w-6 text-white" />
            <h1 className="text-3xl font-bold text-white">Opportunities</h1>
          </div>
          <p className="text-rose-100">
            Manage promotional opportunities for customers
          </p>
        </div>
        
        <div className="flex justify-end">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Opportunity</DialogTitle>
                <DialogDescription>
                  Add a new promotional opportunity for customers
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="key" className="text-right">
                    Key
                  </label>
                  <input
                    id="key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="col-span-3 p-2 border rounded-md"
                    placeholder="e.g. SUMMER_SALE"
                  />
                </div>
                {key && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="title-key" className="text-right">
                        Title Key
                      </label>
                      <input
                        id="title-key"
                        value={`${key.toUpperCase()}_TITLE`}
                        className="col-span-3 p-2 border rounded-md bg-gray-100"
                        readOnly
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="description-key" className="text-right">
                        Description Key
                      </label>
                      <input
                        id="description-key"
                        value={`${key.toUpperCase()}_DESCRIPTION`}
                        className="col-span-3 p-2 border rounded-md bg-gray-100"
                        readOnly
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="reward-key" className="text-right">
                        Reward Key
                      </label>
                      <input
                        id="reward-key"
                        value={`${key.toUpperCase()}_REWARD`}
                        className="col-span-3 p-2 border rounded-md bg-gray-100"
                        readOnly
                      />
                    </div>
                  </>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="priority" className="text-right">
                    Home Priority
                  </label>
                  <input
                    id="priority"
                    type="number"
                    min="1"
                    value={priority}
                    onChange={(e) => setPriority(parseInt(e.target.value))}
                    className="col-span-3 p-2 border rounded-md"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="card-scheme" className="text-right">
                    Card Scheme
                  </label>
                  <select
                    id="card-scheme"
                    value={cardScheme}
                    onChange={(e) => setCardScheme(e.target.value)}
                    className="col-span-3 p-2 border rounded-md"
                  >
                    <option value="All">All</option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="American Express">American Express</option>
                    <option value="Visa, Mastercard">Visa, Mastercard</option>
                    <option value="Mastercard, American Express">Mastercard, American Express</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="end-date" className="text-right">
                    End Date
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="col-span-3 p-2 border rounded-md"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="col-span-3 p-2 border rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Priority</TableHead>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Card Scheme</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities
                .sort((a, b) => a.homePriority - b.homePriority)
                .map((opportunity) => (
                  <TableRow key={opportunity.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{opportunity.homePriority}</TableCell>
                    <TableCell>
                      {opportunity.imageSrc ? (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={opportunity.imageSrc} alt={opportunity.key} />
                          <AvatarFallback>{opportunity.key.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{opportunity.key}</div>
                      <div className="text-xs text-muted-foreground">{opportunity.id}</div>
                    </TableCell>
                    <TableCell>
                      {opportunity.endDate ? (
                        <div>{new Date(opportunity.endDate).toLocaleDateString()}</div>
                      ) : (
                        <div className="text-muted-foreground">No end date</div>
                      )}
                    </TableCell>
                    <TableCell>{opportunity.cardScheme}</TableCell>
                    <TableCell>{getStatusBadge(opportunity.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => router.push(`/opportunities/${opportunity.id}`)}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 