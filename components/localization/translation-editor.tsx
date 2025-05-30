"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Copy, Save, ExternalLink, AlertCircle, Eye, Check, Clock, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Language } from "@/components/localization/languages-list"
import { TranslationKey } from "@/components/localization/translation-keys-list"
import Image from "next/image"

interface Translation {
  key: string
  value: string
  language: string
  lastUpdatedBy?: {
    name: string
    avatar: string
    time: string
  }
}

interface TranslationEditorProps {
  languageCode?: string
  translationKey?: string
  referenceLanguage: string
  onBack: () => void
}

// Mock data for language view
const mockLanguageTranslations = [
  {
    key: "common.welcome",
    referenceText: "Welcome to our application",
    translatedText: "Willkommen in unserer Anwendung",
    lastUpdatedBy: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
      time: "2024-03-15T10:30:00"
    }
  },
  // ... diğer çeviriler
]

// Mock data for key view
const mockKeyTranslations = [
  {
    languageCode: "en_US",
    languageName: "English (US)",
    flagIcon: "https://flagcdn.com/w80/us.png",
    translatedText: "Welcome to our application",
    lastUpdatedBy: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
      time: "2024-03-15T10:30:00"
    }
  },
  // ... diğer diller
]

export function TranslationEditor({ languageCode, translationKey, referenceLanguage, onBack }: TranslationEditorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Determine what kind of view we need
  const isLanguageView = !!languageCode
  const isKeyView = !!translationKey
  
  // Get appropriate mock data
  const translations = isLanguageView 
    ? mockLanguageTranslations
    : mockKeyTranslations

  // Filter translations
  const filteredTranslations = translations.filter(
    (translation) => {
      if (isLanguageView) {
        const item = translation as typeof mockLanguageTranslations[0]
        return (
          item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.referenceText.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.translatedText.toLowerCase().includes(searchQuery.toLowerCase())
        )
      } else {
        const item = translation as typeof mockKeyTranslations[0]
        return (
          item.languageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.translatedText.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
    }
  )
  
  // Selected item details (for demo UI)
  const selectedDetails = isLanguageView
    ? { title: `${translations.length} translation keys for ${languageCode}` }
    : { title: `Translations for "${translationKey}" across languages` }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-lg font-medium">{selectedDetails.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={isLanguageView ? "Search translation keys..." : "Search languages..."}
          className="pl-8 max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {isLanguageView ? (
                <>
                  <TableHead>Key</TableHead>
                  <TableHead>Reference Text</TableHead>
                  <TableHead>Translation</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Translation</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTranslations.map((translation, index) => {
              if (isLanguageView) {
                const item = translation as typeof mockLanguageTranslations[0]
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.key}</TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {item.referenceText}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <Textarea
                        defaultValue={item.translatedText}
                        className="min-h-[60px] resize-none"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.lastUpdatedBy.avatar} />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.lastUpdatedBy.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.lastUpdatedBy.time)}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              } else {
                const item = translation as typeof mockKeyTranslations[0]
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Image 
                        src={item.flagIcon} 
                        alt={item.languageName} 
                        width={24} 
                        height={16}
                        className="rounded-sm"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.languageName}</TableCell>
                    <TableCell className="max-w-[400px]">
                      <Textarea
                        defaultValue={item.translatedText}
                        className="min-h-[60px] resize-none"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.lastUpdatedBy.avatar} />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.lastUpdatedBy.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.lastUpdatedBy.time)}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              }
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 