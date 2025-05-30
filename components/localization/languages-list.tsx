"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, StarOff, Info, Check, PlusCircle, MoreHorizontal, Edit } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

export interface Language {
  code: string
  name: string
  nativeName: string
  flagIcon: string
  completionPercentage: number
  translatedCount: number
  totalCount: number
}

interface LanguagesListProps {
  onSelectLanguage: (languageCode: string) => void
  onSetReference: (languageCode: string) => void
  referenceLanguage: string
}

// Mock languages
const mockLanguages: Language[] = [
  {
    code: "en_US",
    name: "English (US)",
    nativeName: "English (US)",
    flagIcon: "https://flagcdn.com/w80/us.png",
    completionPercentage: 100,
    translatedCount: 1250,
    totalCount: 1250
  },
  {
    code: "en_GB",
    name: "English (UK)",
    nativeName: "English (UK)",
    flagIcon: "https://flagcdn.com/w80/gb.png",
    completionPercentage: 96,
    translatedCount: 1200,
    totalCount: 1250
  },
  {
    code: "tr_TR",
    name: "Turkish",
    nativeName: "Türkçe",
    flagIcon: "https://flagcdn.com/w80/tr.png",
    completionPercentage: 92,
    translatedCount: 1150,
    totalCount: 1250
  },
  {
    code: "de_DE",
    name: "German",
    nativeName: "Deutsch",
    flagIcon: "https://flagcdn.com/w80/de.png",
    completionPercentage: 78,
    translatedCount: 975,
    totalCount: 1250
  },
  {
    code: "es_ES",
    name: "Spanish",
    nativeName: "Español",
    flagIcon: "https://flagcdn.com/w80/es.png",
    completionPercentage: 65,
    translatedCount: 812,
    totalCount: 1250
  },
  {
    code: "fr_FR",
    name: "French",
    nativeName: "Français",
    flagIcon: "https://flagcdn.com/w80/fr.png",
    completionPercentage: 84,
    translatedCount: 1050,
    totalCount: 1250
  },
  {
    code: "it_IT",
    name: "Italian",
    nativeName: "Italiano",
    flagIcon: "https://flagcdn.com/w80/it.png",
    completionPercentage: 56,
    translatedCount: 700,
    totalCount: 1250
  },
  {
    code: "ja_JP",
    name: "Japanese",
    nativeName: "日本語",
    flagIcon: "https://flagcdn.com/w80/jp.png",
    completionPercentage: 45,
    translatedCount: 562,
    totalCount: 1250
  },
  {
    code: "zh_CN",
    name: "Chinese (Simplified)",
    nativeName: "中文 (简体)",
    flagIcon: "https://flagcdn.com/w80/cn.png",
    completionPercentage: 62,
    translatedCount: 775,
    totalCount: 1250
  },
  {
    code: "ru_RU",
    name: "Russian",
    nativeName: "Русский",
    flagIcon: "https://flagcdn.com/w80/ru.png",
    completionPercentage: 38,
    translatedCount: 475,
    totalCount: 1250
  },
  {
    code: "pt_BR",
    name: "Portuguese (Brazil)",
    nativeName: "Português (Brasil)",
    flagIcon: "https://flagcdn.com/w80/br.png",
    completionPercentage: 52,
    translatedCount: 650,
    totalCount: 1250
  },
  {
    code: "ar_SA",
    name: "Arabic",
    nativeName: "العربية",
    flagIcon: "https://flagcdn.com/w80/sa.png",
    completionPercentage: 28,
    translatedCount: 350,
    totalCount: 1250
  },
  {
    code: "hi_IN",
    name: "Hindi",
    nativeName: "हिन्दी",
    flagIcon: "https://flagcdn.com/w80/in.png",
    completionPercentage: 18,
    translatedCount: 225,
    totalCount: 1250
  },
  {
    code: "nl_NL",
    name: "Dutch",
    nativeName: "Nederlands",
    flagIcon: "https://flagcdn.com/w80/nl.png",
    completionPercentage: 72,
    translatedCount: 900,
    totalCount: 1250
  },
  {
    code: "ko_KR",
    name: "Korean",
    nativeName: "한국어",
    flagIcon: "https://flagcdn.com/w80/kr.png",
    completionPercentage: 34,
    translatedCount: 425,
    totalCount: 1250
  },
  {
    code: "sv_SE",
    name: "Swedish",
    nativeName: "Svenska",
    flagIcon: "https://flagcdn.com/w80/se.png",
    completionPercentage: 48,
    translatedCount: 600,
    totalCount: 1250
  },
  {
    code: "pl_PL",
    name: "Polish",
    nativeName: "Polski",
    flagIcon: "https://flagcdn.com/w80/pl.png",
    completionPercentage: 42,
    translatedCount: 525,
    totalCount: 1250
  }
]

export function LanguagesList({ onSelectLanguage, onSetReference, referenceLanguage }: LanguagesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [languages, setLanguages] = useState<Language[]>(mockLanguages)

  // Filter function
  const filteredLanguages = languages.filter(
    (language) =>
      language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      language.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      language.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sorting function: Reference language at the top, then by completion percentage
  const sortedLanguages = [...filteredLanguages].sort((a, b) => {
    if (a.code === referenceLanguage) return -1
    if (b.code === referenceLanguage) return 1
    return b.completionPercentage - a.completionPercentage
  })

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLanguages.map((language) => (
              <TableRow 
                key={language.code} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onSelectLanguage(language.code)}
              >
                <TableCell>
                  <div className="flex items-center justify-center">
                    {language.code === referenceLanguage ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="relative">
                              <Star className="h-5 w-5 text-amber-500" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reference Language</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Image 
                        src={language.flagIcon} 
                        alt={language.name} 
                        width={24} 
                        height={16}
                        className="rounded-sm"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-xs text-muted-foreground">{language.nativeName}</span>
                  </div>
                </TableCell>
                <TableCell>{language.code}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Progress value={language.completionPercentage} className="h-2" />
                      <span className="text-xs font-medium">{language.completionPercentage}%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {language.translatedCount} / {language.totalCount} keys
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation()
                        onSetReference(language.code)
                      }}>
                        <Star className="mr-2 h-4 w-4" />
                        <span>Set as reference</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation()
                        onSelectLanguage(language.code)
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit translations</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 