"use client"

import { useState } from "react"
import { FileText, Download, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AgreementsList } from "@/components/agreements/agreements-list"

export function AgreementsDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-6 w-6 text-white" />
            <h1 className="text-3xl font-bold text-white">Agreements</h1>
          </div>
          <p className="text-indigo-100">
            Manage your application's legal documents and user agreements
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search agreements..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Agreement
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <AgreementsList status="active" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="archived">
          <AgreementsList status="archived" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="drafts">
          <AgreementsList status="draft" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 