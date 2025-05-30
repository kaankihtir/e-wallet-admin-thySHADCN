"use client"

import { useState } from "react"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LanguagesList } from "@/components/localization/languages-list"
import { TranslationKeysList } from "@/components/localization/translation-keys-list"
import { TranslationEditor } from "@/components/localization/translation-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, FileText, Plus, Users, FolderKanban, ChevronRight, Search, Filter } from "lucide-react"
import { AddLanguageDialog } from "@/components/localization/add-language-dialog"
import { AddKeyDialog } from "@/components/localization/add-key-dialog"
import { ContributorsList } from "@/components/localization/contributors-list"
import { ProjectsList } from "@/components/localization/projects-list"
import { AddProjectDialog } from "@/components/localization/add-project-dialog"
import { Input } from "@/components/ui/input"
import { LocalizationTable } from "./localization-table"

// Mock project data
const mockProjects = [
  {
    id: "web",
    name: "Web Application",
    description: "Main web application interface",
    languages: 16,
    keys: 1250,
    completion: 78
  },
  {
    id: "mobile",
    name: "Mobile Application",
    description: "iOS and Android mobile apps",
    languages: 12,
    keys: 980,
    completion: 65
  }
]

export function LocalizationDashboard() {
  const [activeView, setActiveView] = useState<"projects" | "languages" | "keys" | "contributors">("projects")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [referenceLanguage, setReferenceLanguage] = useState<string>("en_US")
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false)
  const [isAddKeyOpen, setIsAddKeyOpen] = useState(false)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [projects, setProjects] = useState(mockProjects)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectProject = (projectId: string) => {
    setSelectedProject(projectId)
    setActiveView("languages")
  }

  const handleSelectLanguage = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    if (activeView === "keys") {
      setActiveView("languages")
    }
  }

  const handleSelectKey = (key: string) => {
    setSelectedKey(key)
    if (activeView === "languages") {
      setActiveView("keys")
    }
  }

  const handleSetReference = (languageCode: string) => {
    setReferenceLanguage(languageCode)
  }

  const handleBackToList = () => {
    setSelectedLanguage(null)
    setSelectedKey(null)
  }

  const handleBackToProjects = () => {
    setSelectedProject(null)
    setSelectedLanguage(null)
    setSelectedKey(null)
    setActiveView("projects")
  }

  const handleAddProject = (project: typeof mockProjects[0]) => {
    setProjects([...projects, project])
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-6 w-6 text-white" />
            <h1 className="text-3xl font-bold text-white">Localization</h1>
          </div>
          <p className="text-cyan-100">
            Manage your application's translations and language settings
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search translation keys..."
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
            
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Translation
            </Button>
          </div>
        </div>
      </div>

      {!selectedProject ? (
        <ProjectsList 
          projects={projects}
          onSelectProject={handleSelectProject}
        />
      ) : !selectedLanguage && !selectedKey ? (
        <div className="border rounded-lg">
          <Tabs defaultValue="languages" onValueChange={(value) => setActiveView(value as "languages" | "keys" | "contributors")}>
            <TabsList className="p-2 border-b">
              <TabsTrigger value="languages" className="flex gap-2 items-center">
                <Globe className="h-4 w-4" />
                Languages
              </TabsTrigger>
              <TabsTrigger value="keys" className="flex gap-2 items-center">
                <FileText className="h-4 w-4" />
                Translation Keys
              </TabsTrigger>
              <TabsTrigger value="contributors" className="flex gap-2 items-center">
                <Users className="h-4 w-4" />
                Contributors
              </TabsTrigger>
            </TabsList>
            <TabsContent value="languages" className="p-4">
              <LanguagesList 
                onSelectLanguage={handleSelectLanguage} 
                onSetReference={handleSetReference}
                referenceLanguage={referenceLanguage}
              />
            </TabsContent>
            <TabsContent value="keys" className="p-4">
              <TranslationKeysList 
                onSelectKey={handleSelectKey}
                referenceLanguage={referenceLanguage}
              />
            </TabsContent>
            <TabsContent value="contributors" className="p-4">
              <ContributorsList 
                referenceLanguage={referenceLanguage}
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : selectedLanguage ? (
        <TranslationEditor 
          languageCode={selectedLanguage}
          referenceLanguage={referenceLanguage}
          onBack={handleBackToList}
        />
      ) : selectedKey ? (
        <TranslationEditor 
          translationKey={selectedKey}
          referenceLanguage={referenceLanguage}
          onBack={handleBackToList}
        />
      ) : null}

      <AddLanguageDialog 
        open={isAddLanguageOpen}
        onOpenChange={setIsAddLanguageOpen}
      />

      <AddKeyDialog 
        open={isAddKeyOpen}
        onOpenChange={setIsAddKeyOpen}
      />

      <AddProjectDialog
        open={isAddProjectOpen}
        onOpenChange={setIsAddProjectOpen}
        onAddProject={handleAddProject}
      />
    </div>
  )
} 