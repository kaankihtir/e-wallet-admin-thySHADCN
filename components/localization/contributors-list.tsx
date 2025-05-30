"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Info, Edit, MoreHorizontal, Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Contributor {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  languages: string[]
  translationCount: number
  lastActive: string
}

interface Contribution {
  id: string
  contributorId: string
  contributorName: string
  contributorAvatar: string
  languageCode: string
  languageName: string
  key: string
  timestamp: string
  before?: string
  after: string
}

interface ContributorsListProps {
  referenceLanguage: string
}

// Mock contributors
const mockContributors: Contributor[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png",
    role: "Admin",
    languages: ["en_US", "es_ES"],
    translationCount: 450,
    lastActive: "2024-03-15T10:30:00"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?u=jane",
    role: "Translator",
    languages: ["fr_FR"],
    translationCount: 128,
    lastActive: "2023-12-10T14:30:00"
  },
  {
    id: "3",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    avatar: "https://i.pravatar.cc/150?u=emily",
    role: "Translator",
    languages: ["es_ES"],
    translationCount: 76,
    lastActive: "2023-12-05T11:45:00"
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "m.brown@example.com",
    avatar: "https://i.pravatar.cc/150?u=michael",
    role: "Translator",
    languages: ["it_IT"],
    translationCount: 52,
    lastActive: "2023-12-01T16:20:00"
  },
  {
    id: "5",
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    role: "Translator",
    languages: ["nl_NL"],
    translationCount: 41,
    lastActive: "2023-11-28T10:10:00"
  },
  {
    id: "6",
    name: "Thomas Müller",
    email: "t.mueller@example.com",
    avatar: "https://i.pravatar.cc/150?u=thomas",
    role: "Translator",
    languages: ["de_DE"],
    translationCount: 37,
    lastActive: "2023-11-25T08:30:00"
  },
  {
    id: "7",
    name: "Marie Dupont",
    email: "marie.d@example.com",
    avatar: "https://i.pravatar.cc/150?u=marie",
    role: "Translator",
    languages: ["fr_FR"],
    translationCount: 29,
    lastActive: "2023-11-20T14:45:00"
  }
]

const mockContributions: Contribution[] = [
  {
    id: "c1",
    contributorId: "1",
    contributorName: "Jane Smith",
    contributorAvatar: "https://i.pravatar.cc/150?u=jane",
    languageCode: "fr_FR",
    languageName: "French",
    key: "common.submit",
    timestamp: "2023-12-10T14:30:00Z",
    before: "Soumettre",
    after: "Envoyer"
  },
  {
    id: "c2",
    contributorId: "2",
    contributorName: "John Doe",
    contributorAvatar: "https://i.pravatar.cc/150?u=john",
    languageCode: "de_DE",
    languageName: "German",
    key: "common.cancel",
    timestamp: "2023-12-08T09:15:00Z",
    before: "Stornieren",
    after: "Abbrechen"
  },
  {
    id: "c3",
    contributorId: "3",
    contributorName: "Emily Johnson",
    contributorAvatar: "https://i.pravatar.cc/150?u=emily",
    languageCode: "es_ES",
    languageName: "Spanish",
    key: "auth.login",
    timestamp: "2023-12-05T11:45:00Z",
    before: "Iniciar sesión",
    after: "Acceder"
  },
  {
    id: "c4",
    contributorId: "4",
    contributorName: "Michael Brown",
    contributorAvatar: "https://i.pravatar.cc/150?u=michael",
    languageCode: "it_IT",
    languageName: "Italian",
    key: "dashboard.welcome",
    timestamp: "2023-12-01T16:20:00Z",
    before: undefined,
    after: "Benvenuto nel tuo pannello di controllo"
  },
  {
    id: "c5",
    contributorId: "5",
    contributorName: "Sarah Wilson",
    contributorAvatar: "https://i.pravatar.cc/150?u=sarah",
    languageCode: "nl_NL",
    languageName: "Dutch",
    key: "common.edit",
    timestamp: "2023-11-28T10:10:00Z",
    before: "Wijzigen",
    after: "Bewerken"
  },
  {
    id: "c6",
    contributorId: "6",
    contributorName: "Thomas Müller",
    contributorAvatar: "https://i.pravatar.cc/150?u=thomas",
    languageCode: "de_DE",
    languageName: "German",
    key: "transactions.details",
    timestamp: "2023-11-25T08:30:00Z",
    before: "Transaktionsdetails",
    after: "Transaktionseinzelheiten"
  },
  {
    id: "c7",
    contributorId: "7",
    contributorName: "Marie Dupont",
    contributorAvatar: "https://i.pravatar.cc/150?u=marie",
    languageCode: "fr_FR",
    languageName: "French",
    key: "customers.details",
    timestamp: "2023-11-20T14:45:00Z",
    before: "Détails du client",
    after: "Informations sur le client"
  },
  {
    id: "c8",
    contributorId: "1",
    contributorName: "Jane Smith",
    contributorAvatar: "https://i.pravatar.cc/150?u=jane",
    languageCode: "es_ES",
    languageName: "Spanish",
    key: "errors.notFound",
    timestamp: "2023-11-18T11:20:00Z",
    before: undefined,
    after: "Página no encontrada"
  },
  {
    id: "c9",
    contributorId: "2",
    contributorName: "John Doe",
    contributorAvatar: "https://i.pravatar.cc/150?u=john",
    languageCode: "fr_FR",
    languageName: "French",
    key: "auth.register",
    timestamp: "2023-11-15T09:30:00Z",
    before: "Enregistrer",
    after: "S'inscrire"
  },
  {
    id: "c10",
    contributorId: "3",
    contributorName: "Emily Johnson",
    contributorAvatar: "https://i.pravatar.cc/150?u=emily",
    languageCode: "it_IT",
    languageName: "Italian",
    key: "common.save",
    timestamp: "2023-11-12T15:45:00Z",
    before: "Conservare",
    after: "Salvare"
  }
]

export function ContributorsList({ referenceLanguage }: ContributorsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [contributors, setContributors] = useState<Contributor[]>(mockContributors)

  // Filter function
  const filteredContributors = contributors.filter(
    (contributor) =>
      contributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contributor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contributor.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search contributors..."
          className="pl-8 max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contributor</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Translations</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContributors.map((contributor) => (
              <TableRow key={contributor.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.avatar} />
                      <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{contributor.name}</span>
                      <span className="text-xs text-muted-foreground">{contributor.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{contributor.role}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{contributor.languages.length}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span>{contributor.translationCount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(contributor.lastActive)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit permissions</span>
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