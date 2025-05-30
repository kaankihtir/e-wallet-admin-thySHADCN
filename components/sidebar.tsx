"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  ArrowLeftRight,
  Sliders,
  Percent,
  FileText,
  Globe,
  Gift,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Cog,
  Scale,
  BanknoteIcon,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  isCollapsed: boolean;
}

interface SubMenuItem {
  href: string;
  title: string;
}

interface NavItem {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  submenu?: {
    key: string;
    items: SubMenuItem[];
  } | null;
  badge?: React.ReactNode | null;
  variant?: "default" | "ghost";
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    appParams: false,
  })

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Update menu items to English
  const navItems: NavItem[] = [
    { href: "/", icon: BarChart3, title: "Dashboard" },
    { href: "/dashboards", icon: BarChart3, title: "Dashboards" },
    { href: "/customers", icon: Users, title: "Customers" },
    { href: "/opportunities", icon: Gift, title: "Opportunities" },
    { href: "/transactions", icon: ArrowLeftRight, title: "Transactions" },
    { href: "/limits", icon: Scale, title: "Limits" },
    { href: "/commissions", icon: Percent, title: "Commissions" },
    { href: "/agreements", icon: FileText, title: "Agreements" },
    { href: "/notifications", icon: Bell, title: "Notifications" },
    { href: "/localization", icon: Globe, title: "Localization" },
    { href: "/campaigns", icon: Gift, title: "Campaigns" },
    { href: "/application-settings", icon: Cog, title: "Application Settings" },
    {
      title: "Chargeback",
      href: "/chargeback",
      icon: BanknoteIcon,
      variant: pathname === "/chargeback" ? "default" : "ghost",
    },
  ]

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden",
          isMobileMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="fixed inset-y-0 left-0 w-72 bg-background shadow-lg">
          <div className="flex h-16 items-center px-4 border-b">
            <h2 className="text-lg font-semibold">E-Wallet Admin</h2>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] py-4 px-3">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.href} className="mb-1">
                  <Link
                    href={item.submenu ? "#" : item.href}
                    onClick={
                      item.submenu
                        ? (e) => {
                            e.preventDefault();
                            if (item.submenu) {
                              toggleSubmenu(item.submenu.key);
                            }
                          }
                        : undefined
                    }
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 truncate">{item.title}</span>
                    {item.submenu && (
                      openSubmenus[item.submenu.key] ? (
                        <ChevronDown className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )
                    )}
                  </Link>
                  {item.submenu && openSubmenus[item.submenu.key] && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenu.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm transition-all",
                            pathname === subItem.href
                              ? "bg-muted font-medium text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>

      <aside
        className={cn(
          "hidden md:block border-r bg-background transition-all duration-300 ease-in-out h-[calc(100vh-4rem)]",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-12 items-center px-4">
          {!isCollapsed && <div className="text-sm font-medium">Navigation</div>}
        </div>
        <ScrollArea className="h-[calc(100vh-7rem)] py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <div key={item.href} className="mb-1">
                <Link
                  href={item.submenu ? "#" : item.href}
                  onClick={
                    item.submenu
                      ? (e) => {
                          e.preventDefault();
                          if (item.submenu) {
                            toggleSubmenu(item.submenu.key);
                          }
                        }
                      : undefined
                  }
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    (pathname === item.href ||
                    (item.submenu && item.submenu.items.some((subItem) => pathname === subItem.href)))
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 truncate">{item.title}</span>
                      {item.submenu && (
                        openSubmenus[item.submenu.key] ? (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )
                      )}
                    </>
                  )}
                </Link>
                {item.submenu && openSubmenus[item.submenu.key] && !isCollapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm transition-all",
                          pathname === subItem.href
                            ? "bg-muted font-medium text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  )
}

