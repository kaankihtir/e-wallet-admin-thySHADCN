"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { 
  ShieldCheck, 
  User, 
  Bell,
  Globe, 
  KeyRound
} from "lucide-react"

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname()
  
  const navItems = [
    {
      title: "Security",
      href: "/settings/security",
      icon: ShieldCheck,
      active: pathname === "/settings/security"
    },
    {
      title: "Profile",
      href: "/settings/profile",
      icon: User,
      active: pathname === "/settings/profile"
    },
    {
      title: "Notifications",
      href: "/settings/notifications",
      icon: Bell,
      active: pathname === "/settings/notifications"
    },
    {
      title: "Language & Region",
      href: "/settings/language",
      icon: Globe,
      active: pathname === "/settings/language"
    },
    {
      title: "API Keys",
      href: "/settings/api-keys",
      icon: KeyRound,
      active: pathname === "/settings/api-keys"
    }
  ]

  return (
    <div className="container max-w-screen-xl mx-auto py-6">
      <div className="flex flex-col space-y-4 md:space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-accent",
                      item.active ? "bg-accent font-medium" : ""
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </Card>
          </div>
          <div className="md:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 