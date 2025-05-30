"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, FileText, BarChart } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Project {
  id: string
  name: string
  description: string
  languages: number
  keys: number
  completion: number
}

interface ProjectsListProps {
  projects: Project[]
  onSelectProject: (projectId: string) => void
}

export function ProjectsList({ projects, onSelectProject }: ProjectsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filter projects based on search
  const filteredProjects = projects.filter(
    project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Keys</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-sm text-muted-foreground">{project.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{project.languages}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{project.keys}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Progress value={project.completion} className="h-2" />
                      <span className="text-xs font-medium">{project.completion}%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" onClick={() => onSelectProject(project.id)}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 