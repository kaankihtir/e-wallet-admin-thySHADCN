"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UploadCloud } from "lucide-react"

// Mock user data
const userData = {
  name: "Admin User",
  email: "admin@example.com",
  phone: "+90 555 123 4567",
  jobTitle: "System Administrator",
  department: "IT",
  company: "Turkish Airlines",
  location: "Istanbul, Turkey",
  bio: "Experienced administrator with expertise in payment systems and e-wallet solutions.",
  avatar: null,
  initials: "AU"
}

export default function ProfileSettingsPage() {
  const [user, setUser] = useState(userData)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0])
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, you would call an API to update the user profile
    console.log("User data updated:", user)
    setIsEditing(false)
    
    // Show success message
    alert("Profile updated successfully")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>View and update your personal information</CardDescription>
      </CardHeader>

      <form onSubmit={handleFormSubmit}>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
            <div className="relative group">
              <Avatar className="h-24 w-24">
                {avatarFile ? (
                  <AvatarImage src={URL.createObjectURL(avatarFile)} alt={user.name} />
                ) : (
                  <AvatarFallback className="text-xl">{user.initials}</AvatarFallback>
                )}
              </Avatar>
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <UploadCloud className="h-6 w-6 text-white" />
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
              {isEditing && (
                <div className="text-sm text-muted-foreground">
                  <p>Click on the avatar to change your profile picture</p>
                </div>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Your full name" 
                  value={user.name} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Your email address" 
                  value={user.email} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  placeholder="Your phone number" 
                  value={user.phone} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  placeholder="Your location" 
                  value={user.location} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Professional Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input 
                  id="jobTitle" 
                  name="jobTitle" 
                  placeholder="Your job title" 
                  value={user.jobTitle} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input 
                  id="department" 
                  name="department" 
                  placeholder="Your department" 
                  value={user.department} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  name="company" 
                  placeholder="Your company" 
                  value={user.company} 
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              placeholder="Write a short bio about yourself" 
              value={user.bio} 
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="resize-none h-24"
            />
          </div>
        </CardContent>

        <CardFooter className="border-t px-6 py-4 flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
} 