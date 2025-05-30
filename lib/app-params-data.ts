export interface Parameter {
  id: string
  name: string
  value: string
  unit: string
  description: string
  category: "otp" | "password" | "security"
  active: boolean
  lastUpdated?: string
}

export interface MerchantCashback {
  id: string
  merchantId: string
  merchantName: string
  expiryDays: string
  cashbackRate: string
  minTransaction: string
  active: boolean
}

const parameters: Parameter[] = [
  {
    id: "otp-1",
    name: "OTP Validity Duration",
    value: "3",
    unit: "minutes",
    description: "The time period for which an OTP remains valid after generation",
    category: "otp",
    active: true,
    lastUpdated: "2023-10-15",
  },
  {
    id: "otp-2",
    name: "OTP Length",
    value: "6",
    unit: "digits",
    description: "The number of digits in the OTP",
    category: "otp",
    active: true,
    lastUpdated: "2023-09-20",
  },
  {
    id: "otp-3",
    name: "OTP Retry Limit",
    value: "3",
    unit: "attempts",
    description: "Maximum number of invalid OTP attempts before account is locked",
    category: "otp",
    active: true,
    lastUpdated: "2023-11-05",
  },
  {
    id: "pwd-1",
    name: "Password Expiry",
    value: "90",
    unit: "days",
    description: "Number of days after which a password expires and must be changed",
    category: "password",
    active: true,
    lastUpdated: "2023-10-10",
  },
  {
    id: "pwd-2",
    name: "Password History",
    value: "5",
    unit: "passwords",
    description: "Number of previous passwords that cannot be reused",
    category: "password",
    active: true,
    lastUpdated: "2023-08-15",
  },
  {
    id: "pwd-3",
    name: "Minimum Password Length",
    value: "8",
    unit: "characters",
    description: "Minimum number of characters required for a valid password",
    category: "password",
    active: true,
    lastUpdated: "2023-09-01",
  },
  {
    id: "sec-1",
    name: "Session Timeout",
    value: "15",
    unit: "minutes",
    description: "Period of inactivity after which a user session expires",
    category: "security",
    active: true,
    lastUpdated: "2023-11-10",
  },
  {
    id: "sec-2",
    name: "Login Attempts",
    value: "5",
    unit: "attempts",
    description: "Maximum number of failed login attempts before account is locked",
    category: "security",
    active: true,
    lastUpdated: "2023-10-25",
  },
  {
    id: "sec-3",
    name: "Account Lockout Duration",
    value: "30",
    unit: "minutes",
    description: "Duration for which an account remains locked after exceeding login attempts",
    category: "security",
    active: true,
    lastUpdated: "2023-09-15",
  },
]

const merchantCashbackSettings: MerchantCashback[] = [
  {
    id: "cb-1",
    merchantId: "MIG001",
    merchantName: "Migros",
    expiryDays: "60",
    cashbackRate: "2.5",
    minTransaction: "100",
    active: true,
  },
  {
    id: "cb-2",
    merchantId: "CAR002",
    merchantName: "Carrefour",
    expiryDays: "45",
    cashbackRate: "2.0",
    minTransaction: "75",
    active: true,
  },
  {
    id: "cb-3",
    merchantId: "A101003",
    merchantName: "A101",
    expiryDays: "30",
    cashbackRate: "1.5",
    minTransaction: "50",
    active: true,
  },
  {
    id: "cb-4",
    merchantId: "BIM004",
    merchantName: "BIM",
    expiryDays: "30",
    cashbackRate: "1.0",
    minTransaction: "25",
    active: false,
  },
  {
    id: "cb-5",
    merchantId: "TEK005",
    merchantName: "Teknosa",
    expiryDays: "60",
    cashbackRate: "3.0",
    minTransaction: "250",
    active: true,
  },
  {
    id: "cb-6",
    merchantId: "MAC006",
    merchantName: "Macrocenter",
    expiryDays: "90",
    cashbackRate: "4.0",
    minTransaction: "200",
    active: true,
  },
  {
    id: "cb-7",
    merchantId: "MED007",
    merchantName: "MediaMarkt",
    expiryDays: "45",
    cashbackRate: "2.5",
    minTransaction: "300",
    active: true,
  },
  {
    id: "cb-8",
    merchantId: "WAT008",
    merchantName: "Watsons",
    expiryDays: "30",
    cashbackRate: "1.5",
    minTransaction: "50",
    active: true,
  },
]

export function getParametersByCategory(category: string): Parameter[] {
  if (category === "all") {
    return parameters
  }
  return parameters.filter((param) => param.category === category)
}

export function getMerchantCashbackSettings(): MerchantCashback[] {
  return merchantCashbackSettings
}

