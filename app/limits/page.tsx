"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { LimitsTable } from "@/components/limits/limits-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Users, User, UserPlus, UserCog, X } from "lucide-react"
import { AddLimitDialog } from "@/components/limits/add-limit-dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Checkbox,
} from "@/components/ui/checkbox"
import {
  ArrowLeft,
  MoreHorizontal,
  Settings,
  Trash2,
} from "lucide-react"

// Mock data for limit groups
const mockLimitGroups = [
  { id: "g1", name: "Premium Users", description: "Higher limits for premium customers", memberCount: 154 },
  { id: "g2", name: "Corporate", description: "Limits for corporate accounts", memberCount: 37 },
  { id: "g3", name: "New Users", description: "Restricted limits for new accounts", memberCount: 892 },
]

// Mock data for individual custom limits
const mockIndividualLimits = [
  { id: "c1", name: "John Doe", email: "john.doe@example.com", customerType: "VIP" },
  { id: "c2", name: "Jane Smith", email: "jane.smith@company.com", customerType: "Corporate" },
]

export default function LimitsPage() {
  const [addLimitOpen, setAddLimitOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState("TRY")
  const [selectedLimitType, setSelectedLimitType] = useState<string | null>(null)
  const [selectedView, setSelectedView] = useState<"system" | "groups" | "individuals">("system")
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [selectedIndividual, setSelectedIndividual] = useState<string | null>(null)
  
  // State for new group dialog
  const [newGroupOpen, setNewGroupOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")
  const [newGroupLoading, setNewGroupLoading] = useState(false)
  
  // State for new individual limit dialog
  const [newIndividualOpen, setNewIndividualOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  
  // User options for search (mock data)
  const userOptions = [
    { id: "u1", name: "Robert Johnson", email: "robert.johnson@example.com", customerType: "Standard" },
    { id: "u2", name: "Emily Williams", email: "emily.williams@company.org", customerType: "Standard" },
    { id: "u3", name: "Michael Brown", email: "michael.brown@example.net", customerType: "Standard" },
    { id: "u4", name: "Sarah Davis", email: "sarah.davis@company.com", customerType: "Standard" },
  ]
  
  // Limit groups state management
  const [limitGroups, setLimitGroups] = useState(mockLimitGroups)
  const [individualLimits, setIndividualLimits] = useState(mockIndividualLimits)

  const currencies = ["TRY", "GBP", "USD", "EUR"]
  const transactionTypes = [
    { id: "topup", name: "Top-up", description: "Limits for adding money to wallet" },
    { id: "payment", name: "Payment", description: "Limits for payments to merchants" },
    { id: "refund", name: "Refund", description: "Limits for refunds from merchants" },
    { id: "withdraw", name: "Withdraw", description: "Limits for withdrawing money" },
    { id: "transfer", name: "Transfer", description: "Limits for transferring money to other users" },
  ]

  const handleAddLimit = (currency: string, limitType: string) => {
    setSelectedCurrency(currency)
    setSelectedLimitType(limitType)
    setAddLimitOpen(true)
  }
  
  // Handle creating a new limit group
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a group name",
        variant: "destructive"
      })
      return
    }
    
    setNewGroupLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const newGroup = {
        id: `g${Date.now()}`,
        name: newGroupName,
        description: newGroupDescription,
        memberCount: 0
      }
      
      setLimitGroups([...limitGroups, newGroup])
      setSelectedGroup(newGroup.id)
      setNewGroupOpen(false)
      setNewGroupLoading(false)
      setNewGroupName("")
      setNewGroupDescription("")
      
      toast({
        title: "Success",
        description: `Group "${newGroupName}" has been created`
      })
    }, 1000)
  }
  
  // Handle search for users
  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    setSearchLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const results = userOptions.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setSearchResults(results)
      setSearchLoading(false)
    }, 800)
  }
  
  // Handle adding a new individual limit
  const handleAddIndividualLimit = (user: any) => {
    // Check if user already exists in individual limits
    if (individualLimits.some(limit => limit.id === user.id)) {
      toast({
        title: "User already has custom limits",
        description: "This user already has custom limits defined",
        variant: "destructive"
      })
      return
    }
    
    // Add user to individual limits
    const newIndividual = {
      id: user.id,
      name: user.name,
      email: user.email,
      customerType: user.customerType
    }
    
    setIndividualLimits([...individualLimits, newIndividual])
    setSelectedIndividual(user.id)
    setNewIndividualOpen(false)
    setSearchQuery("")
    setSearchResults([])
    
    toast({
      title: "Success",
      description: `Custom limits for "${user.name}" can now be defined`
    })
  }
  
  // Handle removing individual limit
  const handleRemoveIndividual = (id: string) => {
    setIndividualLimits(individualLimits.filter(item => item.id !== id))
    
    if (selectedIndividual === id) {
      setSelectedIndividual(null)
    }
    
    toast({
      title: "Removed",
      description: "Custom limits have been removed"
    })
  }

  // Handle adding a member to group
  const handleAddMemberToGroup = (groupId: string, user: any) => {
    // Find the group
    const groupIndex = limitGroups.findIndex(g => g.id === groupId)
    if (groupIndex === -1) return
    
    // Clone the groups array
    const updatedGroups = [...limitGroups]
    
    // Increment member count
    updatedGroups[groupIndex] = {
      ...updatedGroups[groupIndex],
      memberCount: updatedGroups[groupIndex].memberCount + 1
    }
    
    // Update state
    setLimitGroups(updatedGroups)
    
    toast({
      title: "Member added",
      description: `${user.name} has been added to ${updatedGroups[groupIndex].name}`,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transaction Limits</h1>
          <p className="text-muted-foreground">
            Manage transaction limits for different currencies and transaction types.
          </p>
        </div>
      </div>

      <Tabs defaultValue="system" className="space-y-4" onValueChange={(value) => setSelectedView(value as any)}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="system">
              System Limits
            </TabsTrigger>
            <TabsTrigger value="groups">
              Group Limits
            </TabsTrigger>
            <TabsTrigger value="individuals">
              Individual Limits
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="system" className="space-y-4">
          <Tabs defaultValue={currencies[0]} className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                {currencies.map((currency) => (
                  <TabsTrigger 
                    key={currency} 
                    value={currency}
                    onClick={() => setSelectedCurrency(currency)}
                  >
                    {currency}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {currencies.map((currency) => (
              <TabsContent key={currency} value={currency} className="space-y-4">
                {transactionTypes.map((type) => (
                  <Card key={type.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-xl">{type.name} Limits</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <LimitsTable 
                        currency={currency}
                        transactionType={type.id}
                      />
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <Select 
                value={selectedGroup || ""} 
                onValueChange={setSelectedGroup}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select a limit group" />
                </SelectTrigger>
                <SelectContent>
                  {limitGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Dialog open={newGroupOpen} onOpenChange={setNewGroupOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    New Group
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Limit Group</DialogTitle>
                    <DialogDescription>
                      Create a new group for users with specific limit settings
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Group Name</Label>
                      <Input 
                        id="name" 
                        placeholder="e.g. Premium Users" 
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe the purpose of this group"
                        value={newGroupDescription}
                        onChange={(e) => setNewGroupDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={handleCreateGroup} 
                      disabled={newGroupLoading}
                    >
                      {newGroupLoading ? "Creating..." : "Create Group"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {selectedGroup ? (
            <div className="space-y-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">
                        {limitGroups.find(g => g.id === selectedGroup)?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {limitGroups.find(g => g.id === selectedGroup)?.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {limitGroups.find(g => g.id === selectedGroup)?.memberCount} members
                        </span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Members
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Add Members to Group</DialogTitle>
                            <DialogDescription>
                              Add customers to "{limitGroups.find(g => g.id === selectedGroup)?.name}" group
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex gap-2">
                              <Input 
                                placeholder="Search by name or email" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyUp={(e) => e.key === "Enter" && handleSearch()}
                              />
                              <Button 
                                onClick={handleSearch} 
                                disabled={searchLoading || !searchQuery.trim()}
                              >
                                {searchLoading ? "Searching..." : "Search"}
                              </Button>
                            </div>
                            
                            {searchResults.length > 0 ? (
                              <div className="border rounded-md max-h-[250px] overflow-y-auto">
                                {searchResults.map((user) => (
                                  <div 
                                    key={user.id}
                                    className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50"
                                  >
                                    <div>
                                      <div className="font-medium">{user.name}</div>
                                      <div className="text-sm text-muted-foreground">{user.email}</div>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() => handleAddMemberToGroup(selectedGroup!, user)}
                                    >
                                      <UserPlus className="h-4 w-4 mr-1" />
                                      Add
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            ) : searchQuery && !searchLoading ? (
                              <div className="text-center py-4 text-muted-foreground">
                                No customers found matching "{searchQuery}"
                              </div>
                            ) : null}
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline"
                              onClick={() => setSearchQuery("")}
                            >
                              Done
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue={currencies[0]} className="space-y-4">
                <div className="flex items-center justify-between">
                  <TabsList>
                    {currencies.map((currency) => (
                      <TabsTrigger 
                        key={currency} 
                        value={currency}
                      >
                        {currency}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {currencies.map((currency) => (
                  <TabsContent key={currency} value={currency} className="space-y-4">
                    {transactionTypes.map((type) => (
                      <Card key={type.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div>
                            <CardTitle className="text-xl">{type.name} Limits</CardTitle>
                            <CardDescription>{type.description}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <LimitsTable 
                            currency={currency}
                            transactionType={type.id}
                            groupId={selectedGroup}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          ) : (
            <Card>
              <CardContent className="h-40 flex items-center justify-center">
                <p className="text-muted-foreground">Select a group or create a new one to manage its limits</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="individuals" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <Select 
                value={selectedIndividual || ""} 
                onValueChange={setSelectedIndividual}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {individualLimits.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Dialog open={newIndividualOpen} onOpenChange={setNewIndividualOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Custom Limit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Customer Custom Limit</DialogTitle>
                    <DialogDescription>
                      Search for a customer to add custom transaction limits
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Search by name or email" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
                      />
                      <Button 
                        onClick={handleSearch} 
                        disabled={searchLoading || !searchQuery.trim()}
                      >
                        {searchLoading ? "Searching..." : "Search"}
                      </Button>
                    </div>
                    
                    {searchResults.length > 0 ? (
                      <div className="border rounded-md">
                        {searchResults.map((user) => (
                          <div 
                            key={user.id}
                            className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50"
                          >
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleAddIndividualLimit(user)}
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : searchQuery && !searchLoading ? (
                      <div className="text-center py-4 text-muted-foreground">
                        No customers found matching "{searchQuery}"
                      </div>
                    ) : null}
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline"
                      onClick={() => setNewIndividualOpen(false)}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {selectedIndividual ? (
            <div className="space-y-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">
                        {individualLimits.find(c => c.id === selectedIndividual)?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {individualLimits.find(c => c.id === selectedIndividual)?.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {individualLimits.find(c => c.id === selectedIndividual)?.customerType}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleRemoveIndividual(selectedIndividual)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue={currencies[0]} className="space-y-4">
                <div className="flex items-center justify-between">
                  <TabsList>
                    {currencies.map((currency) => (
                      <TabsTrigger 
                        key={currency} 
                        value={currency}
                      >
                        {currency}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {currencies.map((currency) => (
                  <TabsContent key={currency} value={currency} className="space-y-4">
                    {transactionTypes.map((type) => (
                      <Card key={type.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div>
                            <CardTitle className="text-xl">{type.name} Limits</CardTitle>
                            <CardDescription>{type.description}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <LimitsTable 
                            currency={currency}
                            transactionType={type.id}
                            customerId={selectedIndividual}
                            isCustomView={true}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          ) : (
            <Card>
              <CardContent className="h-40 flex items-center justify-center">
                <p className="text-muted-foreground">Select a customer or add a new one to manage individual limits</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <AddLimitDialog
        open={addLimitOpen}
        onOpenChange={setAddLimitOpen}
        currency={selectedCurrency}
        transactionType={selectedLimitType}
        groupId={selectedView === "groups" ? selectedGroup : null}
        customerId={selectedView === "individuals" ? selectedIndividual : null}
      />
    </div>
  )
}

