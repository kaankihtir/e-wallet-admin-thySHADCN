"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Check, FolderPlus, Plus, Search, Settings2, Tag, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type FlagCategory = string

type FlagWord = {
  word: string
  category: FlagCategory
  severity: "low" | "medium" | "high"
}

export function TransactionFlagSettings() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newWord, setNewWord] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<FlagCategory>("custom")
  const [selectedSeverity, setSelectedSeverity] = useState<"low" | "medium" | "high">("medium")
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")
  
  const [categories, setCategories] = useState<{ id: FlagCategory; label: string; icon: React.ReactNode }[]>([
    { id: "gambling", label: "Gambling", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "crypto", label: "Cryptocurrency", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "fraud", label: "Fraud", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "custom", label: "Custom", icon: <Tag className="h-4 w-4" /> },
  ])
  
  const [flagWords, setFlagWords] = useState<FlagWord[]>([
    { word: "gambling", category: "gambling", severity: "high" },
    { word: "bet", category: "gambling", severity: "high" },
    { word: "casino", category: "gambling", severity: "high" },
    { word: "lottery", category: "gambling", severity: "medium" },
    { word: "forex", category: "crypto", severity: "medium" },
    { word: "binance", category: "crypto", severity: "high" },
    { word: "bitcoin", category: "crypto", severity: "medium" },
    { word: "crypto", category: "crypto", severity: "medium" },
    { word: "fraud", category: "fraud", severity: "high" },
    { word: "scam", category: "fraud", severity: "high" },
  ])

  const handleAddCategory = () => {
    if (newCategoryName && !categories.some(c => c.id === newCategoryName.toLowerCase())) {
      const newCategoryId = newCategoryName.toLowerCase().replace(/\s+/g, '-')
      setCategories([
        ...categories,
        {
          id: newCategoryId,
          label: newCategoryName,
          icon: <Tag className="h-4 w-4" />
        }
      ])
      setSelectedCategory(newCategoryId)
      setNewCategoryName("")
      setIsAddingCategory(false)
    }
  }

  const handleAddWord = () => {
    if (newWord && !flagWords.some(fw => fw.word.toLowerCase() === newWord.toLowerCase())) {
      setFlagWords([
        ...flagWords, 
        { 
          word: newWord.toLowerCase(),
          category: selectedCategory,
          severity: selectedSeverity
        }
      ])
      setNewWord("")
    }
  }

  const handleRemoveWord = (word: string) => {
    setFlagWords(flagWords.filter((fw) => fw.word !== word))
  }

  const filteredWords = flagWords.filter(fw => 
    fw.word.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getSeverityColor = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800 hover:bg-green-200"
      case "medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "high": return "bg-red-100 text-red-800 hover:bg-red-200"
    }
  }

  const getSeverityLabel = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "low": return "Low"
      case "medium": return "Medium"
      case "high": return "High"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Flag Settings</CardTitle>
        <CardDescription>
          Define words that will flag transactions for review when found in transaction descriptions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Flag Word</label>
                <Input
                  placeholder="Enter a word to flag"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Category</label>
                  <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7">
                        <FolderPlus className="h-3.5 w-3.5 mr-1" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>
                          Create a new category for flagged transaction terms
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <label htmlFor="category-name" className="text-sm font-medium">
                            Category Name
                          </label>
                          <Input
                            id="category-name"
                            placeholder="e.g., Money Laundering"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingCategory(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddCategory} disabled={!newCategoryName}>
                          Add Category
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge
                      key={category.id}
                      variant="outline"
                      className={cn(
                        "cursor-pointer",
                        selectedCategory === category.id && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.icon}
                      <span className="ml-1">{category.label}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "cursor-pointer",
                    selectedSeverity === "low" && getSeverityColor("low")
                  )}
                  onClick={() => setSelectedSeverity("low")}
                >
                  Low
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "cursor-pointer",
                    selectedSeverity === "medium" && getSeverityColor("medium")
                  )}
                  onClick={() => setSelectedSeverity("medium")}
                >
                  Medium
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "cursor-pointer",
                    selectedSeverity === "high" && getSeverityColor("high")
                  )}
                  onClick={() => setSelectedSeverity("high")}
                >
                  High
                </Badge>
              </div>
            </div>
          </div>
          <Button 
            className="sm:self-end"
            onClick={handleAddWord}
            disabled={!newWord}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Flag Word
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search flag words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={cn(viewMode === "grid" && "bg-muted")}
            >
              <Tag className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("table")}
              className={cn(viewMode === "table" && "bg-muted")}
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            {viewMode === "grid" ? (
              <FlagWordGrid 
                words={filteredWords} 
                onRemove={handleRemoveWord}
                getSeverityColor={getSeverityColor}
              />
            ) : (
              <FlagWordTable 
                words={filteredWords}
                onRemove={handleRemoveWord}
                getSeverityColor={getSeverityColor}
                getSeverityLabel={getSeverityLabel}
                categories={categories}
              />
            )}
          </TabsContent>

          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              {viewMode === "grid" ? (
                <FlagWordGrid 
                  words={filteredWords.filter(fw => fw.category === category.id)} 
                  onRemove={handleRemoveWord}
                  getSeverityColor={getSeverityColor}
                />
              ) : (
                <FlagWordTable 
                  words={filteredWords.filter(fw => fw.category === category.id)}
                  onRemove={handleRemoveWord}
                  getSeverityColor={getSeverityColor}
                  getSeverityLabel={getSeverityLabel}
                  categories={categories}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <Button className="mt-4">
          <Check className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardContent>
    </Card>
  )
}

function FlagWordGrid({ 
  words, 
  onRemove,
  getSeverityColor
}: { 
  words: FlagWord[];
  onRemove: (word: string) => void;
  getSeverityColor: (severity: "low" | "medium" | "high") => string;
}) {
  if (words.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No flag words found
      </div>
    )
  }

  return (
    <ScrollArea className="h-[350px] border rounded-md p-4">
      <div className="flex flex-wrap gap-2">
        {words.map((flagWord) => (
          <Badge 
            key={flagWord.word} 
            variant="outline" 
            className={cn("px-3 py-1.5", getSeverityColor(flagWord.severity))}
          >
            {flagWord.word}
            <button
              onClick={() => onRemove(flagWord.word)}
              className="ml-2 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </ScrollArea>
  )
}

function FlagWordTable({
  words,
  onRemove,
  getSeverityColor,
  getSeverityLabel,
  categories
}: {
  words: FlagWord[];
  onRemove: (word: string) => void;
  getSeverityColor: (severity: "low" | "medium" | "high") => string;
  getSeverityLabel: (severity: "low" | "medium" | "high") => string;
  categories: { id: string; label: string; icon: React.ReactNode }[];
}) {
  if (words.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No flag words found
      </div>
    )
  }

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.label : categoryId
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Flag Word</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((flagWord) => (
            <TableRow key={flagWord.word}>
              <TableCell className="font-medium">{flagWord.word}</TableCell>
              <TableCell>{getCategoryLabel(flagWord.category)}</TableCell>
              <TableCell>
                <Badge className={cn(getSeverityColor(flagWord.severity))}>
                  {getSeverityLabel(flagWord.severity)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(flagWord.word)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 