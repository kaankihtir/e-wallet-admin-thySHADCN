"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface AddProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddProject: (project: any) => void
}

export function AddProjectDialog({ open, onOpenChange, onAddProject }: AddProjectDialogProps) {
  const [projectName, setProjectName] = useState("")
  const [projectId, setProjectId] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Generate a unique ID if not provided
    const id = projectId || projectName.toLowerCase().replace(/\s+/g, '-')
    
    // Create a new project object
    const newProject = {
      id,
      name: projectName,
      description: projectDescription,
      languages: 0,
      keys: 0,
      completion: 0
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Call the callback with the new project
      onAddProject(newProject)
      
      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false)
        setProjectName("")
        setProjectId("")
        setProjectDescription("")
        onOpenChange(false)
      }, 1500)
    }, 1000)
  }
  
  const isFormValid = projectName.trim().length > 0
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Create a new localization project to manage translations for a specific application or feature.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name" className="required">Project Name</Label>
              <Input
                id="project-name"
                placeholder="e.g. Web Application"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="project-id">Project ID</Label>
              <Input
                id="project-id"
                placeholder="e.g. web-app (leave empty for auto-generation)"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Unique identifier for the project. If left empty, it will be generated from the name.
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe the purpose of this localization project"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting || isSuccess}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid || isSubmitting || isSuccess}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : isSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Created
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 