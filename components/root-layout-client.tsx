'use client'

import React, { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"

interface RootLayoutClientProps {
  children: React.ReactNode
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Try to get the collapsed state from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setIsCollapsed(saved === "true")
    }
  }, [])

  // Save collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", isCollapsed.toString())
  }, [isCollapsed])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex-1 p-8">{children}</div>
      </div>
      <Toaster />
    </div>
  )
} 