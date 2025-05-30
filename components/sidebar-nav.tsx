import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  CircleDollarSign,
  CreditCard,
  Home,
  Package,
  Settings,
  Users,
  Gift,
  BadgeDollarSign
} from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start gap-2"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export function getNavigationConfig() {
  return [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Customers",
      href: "/customers",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Opportunities",
      href: "/opportunities",
      icon: <Gift className="h-4 w-4" />,
    },
    {
      title: "Campaigns",
      href: "/campaigns",
      icon: <BadgeDollarSign className="h-4 w-4" />,
    },
    {
      title: "Transactions",
      href: "/transactions",
      icon: <CircleDollarSign className="h-4 w-4" />,
    },
    {
      title: "Card Management",
      href: "/cards",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      title: "Products",
      href: "/products",
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]
} 