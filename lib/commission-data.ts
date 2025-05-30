export type CommissionType = "account_usage" | "money_transfer" | "topup" | "prepaid_card"
export type CommissionSubType =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly" // account_usage
  | "bank_account"
  | "wallet_account"
  | "credit_card" // money_transfer
  | "iban" // topup (credit_card is shared with money_transfer)
  | "atm_withdraw"
  | "atm_balance"
  | "atm_deposit" // prepaid_card

export type AtmType = "ONUS" | "NOTONUS" | "TAM" | "International"
export type Currency = "USD" | "EUR" | "TRY" | "GBP"
export type CalculationType = "fixed" | "percentage" | "mixed"
export type CommissionStatus = "active" | "inactive"

export interface Commission {
  id: string
  type: CommissionType
  subType: CommissionSubType
  atmType?: AtmType
  currency: Currency
  calculationType: CalculationType
  fixedAmount: number | null
  percentageRate: number | null
  minAmount: number
  maxAmount: number | null
  minTransactions: number
  maxTransactions: number | null
  startDate: Date
  endDate: Date | null
  status: CommissionStatus
}

// Mock data for commissions
export const commissions: Commission[] = [
  {
    id: "1",
    type: "account_usage",
    subType: "monthly",
    currency: "USD",
    calculationType: "fixed",
    fixedAmount: 2.99,
    percentageRate: null,
    minAmount: 0,
    maxAmount: null,
    minTransactions: 1,
    maxTransactions: null,
    startDate: new Date(2023, 0, 1),
    endDate: null,
    status: "active",
  },
  {
    id: "2",
    type: "money_transfer",
    subType: "bank_account",
    currency: "EUR",
    calculationType: "mixed",
    fixedAmount: 1.5,
    percentageRate: 0.5,
    minAmount: 10,
    maxAmount: 1000,
    minTransactions: 1,
    maxTransactions: null,
    startDate: new Date(2023, 1, 15),
    endDate: new Date(2023, 11, 31),
    status: "active",
  },
  {
    id: "3",
    type: "topup",
    subType: "credit_card",
    currency: "TRY",
    calculationType: "percentage",
    fixedAmount: null,
    percentageRate: 1.2,
    minAmount: 50,
    maxAmount: 5000,
    minTransactions: 1,
    maxTransactions: 10,
    startDate: new Date(2023, 2, 10),
    endDate: null,
    status: "active",
  },
  {
    id: "4",
    type: "prepaid_card",
    subType: "atm_withdraw",
    atmType: "NOTONUS",
    currency: "USD",
    calculationType: "fixed",
    fixedAmount: 3.5,
    percentageRate: null,
    minAmount: 20,
    maxAmount: 500,
    minTransactions: 1,
    maxTransactions: 5,
    startDate: new Date(2023, 3, 5),
    endDate: new Date(2023, 8, 30),
    status: "inactive",
  },
  {
    id: "5",
    type: "prepaid_card",
    subType: "atm_withdraw",
    atmType: "International",
    currency: "EUR",
    calculationType: "mixed",
    fixedAmount: 5,
    percentageRate: 2.5,
    minAmount: 50,
    maxAmount: 1000,
    minTransactions: 1,
    maxTransactions: null,
    startDate: new Date(2023, 4, 20),
    endDate: null,
    status: "active",
  },
  {
    id: "6",
    type: "account_usage",
    subType: "yearly",
    currency: "TRY",
    calculationType: "fixed",
    fixedAmount: 99.99,
    percentageRate: null,
    minAmount: 0,
    maxAmount: null,
    minTransactions: 1,
    maxTransactions: null,
    startDate: new Date(2023, 0, 1),
    endDate: null,
    status: "active",
  },
  {
    id: "7",
    type: "money_transfer",
    subType: "wallet_account",
    currency: "USD",
    calculationType: "percentage",
    fixedAmount: null,
    percentageRate: 0.25,
    minAmount: 5,
    maxAmount: 2000,
    minTransactions: 1,
    maxTransactions: null,
    startDate: new Date(2023, 1, 1),
    endDate: null,
    status: "active",
  },
]

export function getCommissionById(id: string): Commission | undefined {
  return commissions.find((commission) => commission.id === id)
}

export function getCommissionsByType(type: CommissionType): Commission[] {
  return commissions.filter((commission) => commission.type === type)
}

export function getCommissionTypeLabel(type: CommissionType): string {
  switch (type) {
    case "account_usage":
      return "Account Usage"
    case "money_transfer":
      return "Money Transfer"
    case "topup":
      return "Topup"
    case "prepaid_card":
      return "Prepaid Card"
  }
}

export function getCommissionSubTypeLabel(type: CommissionType, subType: CommissionSubType): string {
  switch (type) {
    case "account_usage":
      switch (subType) {
        case "daily":
          return "Daily"
        case "weekly":
          return "Weekly"
        case "monthly":
          return "Monthly"
        case "yearly":
          return "Yearly"
        default:
          return subType
      }
    case "money_transfer":
      switch (subType) {
        case "bank_account":
          return "Bank Account"
        case "wallet_account":
          return "Wallet Account"
        case "credit_card":
          return "Credit Card"
        default:
          return subType
      }
    case "topup":
      switch (subType) {
        case "iban":
          return "IBAN"
        case "credit_card":
          return "Credit Card"
        default:
          return subType
      }
    case "prepaid_card":
      switch (subType) {
        case "atm_withdraw":
          return "ATM Withdraw"
        case "atm_balance":
          return "ATM Balance Check"
        case "atm_deposit":
          return "ATM Deposit"
        default:
          return subType
      }
    default:
      return subType
  }
}

export function getCommissionDescription(commission: Commission): string {
  let description = `${getCommissionTypeLabel(commission.type)} - ${getCommissionSubTypeLabel(commission.type, commission.subType)}`

  if (commission.type === "prepaid_card" && commission.atmType) {
    description += ` (${commission.atmType})`
  }

  description += ` - ${commission.currency}`

  return description
}

export function getCurrencySymbol(currency: Currency): string {
  switch (currency) {
    case "USD":
      return "$"
    case "EUR":
      return "€"
    case "TRY":
      return "₺"
    case "GBP":
      return "£"
  }
}

export function formatFee(commission: Commission): string {
  const { fixedAmount, percentageRate, currency, calculationType } = commission
  const symbol = getCurrencySymbol(currency)

  if (calculationType === "mixed") {
    return `${symbol}${fixedAmount?.toFixed(2)} + ${percentageRate?.toFixed(2)}%`
  } else if (calculationType === "fixed") {
    return `${symbol}${fixedAmount?.toFixed(2)}`
  } else if (calculationType === "percentage") {
    return `${percentageRate?.toFixed(2)}%`
  }

  return "N/A"
}

