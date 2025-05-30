"use client"

import { useState } from "react"
import { PasswordExpirySettings } from "./sections/password-expiry-settings"
import { OTPSettings } from "./sections/otp-settings"
import { LoginDurationSettings } from "./sections/login-duration-settings"
import { DepositOptionsSettings } from "./sections/deposit-options-settings"
import { CashbackExpirySettings } from "./sections/cashback-expiry-settings"
import { AccountLockSettings } from "./sections/account-lock-settings"
import { TransactionFlagSettings } from "./sections/transaction-flag-settings"
import { 
  Clock, 
  Key, 
  LogIn, 
  CreditCard, 
  Gift, 
  Lock, 
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type SettingCategory = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  component: React.ReactNode
}

export function AppSettingsDashboard() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const settingCategories: SettingCategory[] = [
    {
      id: "password",
      title: "Password Expiry",
      description: "Manage password expiry options",
      icon: <Clock className="h-5 w-5" />,
      component: <PasswordExpirySettings />
    },
    {
      id: "otp",
      title: "OTP Timers",
      description: "Configure one-time password timers",
      icon: <Key className="h-5 w-5" />,
      component: <OTPSettings />
    },
    {
      id: "login",
      title: "Login Duration",
      description: "Set session timeout duration",
      icon: <LogIn className="h-5 w-5" />,
      component: <LoginDurationSettings />
    },
    {
      id: "deposit",
      title: "Deposit Options",
      description: "Configure credit card deposit amounts",
      icon: <CreditCard className="h-5 w-5" />,
      component: <DepositOptionsSettings />
    },
    {
      id: "cashback",
      title: "Cashback Expiry",
      description: "Set miles cashback expiry periods",
      icon: <Gift className="h-5 w-5" />,
      component: <CashbackExpirySettings />
    },
    {
      id: "lock",
      title: "Account Lock",
      description: "Manage account lockout rules",
      icon: <Lock className="h-5 w-5" />,
      component: <AccountLockSettings />
    },
    {
      id: "transactions",
      title: "Transaction Flags",
      description: "Configure transaction flagging rules",
      icon: <MessageSquare className="h-5 w-5" />,
      component: <TransactionFlagSettings />
    }
  ]

  const activeSettings = activeCategory ? settingCategories.find(category => category.id === activeCategory) : null

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-600 to-cyan-600 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="h-6 w-6 text-white" />
          <h1 className="text-3xl font-bold text-white">Application Settings</h1>
        </div>
        <p className="text-sky-100">
          Configure system-wide application settings
        </p>
      </div>

      {activeCategory && (
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setActiveCategory(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Settings
          </Button>
        </div>
      )}

      {!activeCategory ? (
        // Show settings categories list when no category is selected
        <div className="border rounded-lg overflow-hidden">
          <div className="flex flex-col divide-y">
            {settingCategories.map((category) => (
              <button
                key={category.id}
                className="flex items-center p-4 text-left hover:bg-muted/50 transition-colors"
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mr-4">
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{category.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{category.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Show active setting when category is selected
        <div>
          {activeSettings?.component}
        </div>
      )}
    </div>
  )
} 