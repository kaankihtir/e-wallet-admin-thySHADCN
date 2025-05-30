"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CreditCard,
  Smartphone,
  Globe,
  AlertTriangle,
  Eye,
  PauseCircle,
  PlayCircle,
  XCircle,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCardIcon as CardIcon,
  ArrowUpCircle,
  ArrowDownCircle,
  ArrowLeftRight,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Shield,
  Wifi
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

// Card schemes
const cardSchemes = {
  visa: "Visa",
  mastercard: "Mastercard",
  troy: "Troy",
  amex: "American Express",
}

// Delivery statuses
const deliveryStatuses = {
  ordered: "Ordered",
  processing: "Processing",
  printed: "Printed",
  shipped: "Shipped",
  delivered: "Delivered",
  activated: "Activated",
  failed: "Failed",
}

// Update the mock card data type to include settings
interface PrepaidCardSettings {
  ecommerce: boolean;
  atm: boolean;
  international: boolean;
  contactless: boolean;
}

interface PrepaidCard {
  id: string;
  type: string;
  status: string;
  name: string;
  number: string;
  expiryDate: string;
  cvv: string;
  scheme: string;
  connectedAccount: {
    id: string;
    currency: string;
    balance: number;
  };
  issueDate: string;
  lastUsed: string;
  transactions: number;
  frozen: boolean;
  delivery?: {
    status: string;
    orderedDate: string;
    estimatedDelivery: string;
    actualDelivery?: string;
    address: string;
    trackingNumber: string;
    carrier: string;
    history: Array<{
      status: string;
      date: string;
      location: string;
    }>;
  };
  settings: PrepaidCardSettings;
}

// Define the mockPrepaidCards array with the correct type
const mockPrepaidCards: PrepaidCard[] = [
  {
    id: "CARD-001",
    type: "physical",
    status: "active",
    name: "THY Miles&Smiles Platinum",
    number: "5412 7534 9821 7890",
    expiryDate: "12/25",
    cvv: "123",
    scheme: "mastercard",
    connectedAccount: {
      id: "ACC-001",
      currency: "TRY",
      balance: 2450.75
    },
    issueDate: "2023-01-15",
    lastUsed: "2023-06-12",
    transactions: 42,
    frozen: false,
    delivery: {
      status: "delivered",
      orderedDate: "2023-01-10",
      estimatedDelivery: "2023-01-20",
      actualDelivery: "2023-01-18",
      address: "123 Main St, Istanbul, Turkey",
      trackingNumber: "TRK123456789",
      carrier: "Fast Delivery",
      history: [
        {
          status: "ordered",
          date: "2023-01-10",
          location: "Payment Processing Center"
        },
        {
          status: "processing",
          date: "2023-01-12",
          location: "Card Production Facility"
        },
        {
          status: "printed",
          date: "2023-01-14",
          location: "Card Production Facility"
        },
        {
          status: "shipped",
          date: "2023-01-15",
          location: "Distribution Center"
        },
        {
          status: "delivered",
          date: "2023-01-18",
          location: "Istanbul, Turkey"
        },
        {
          status: "activated",
          date: "2023-01-20",
          location: "Customer Location"
        }
      ]
    },
    settings: {
      ecommerce: true,
      atm: true,
      international: false,
      contactless: true
    }
  },
  // Update the other card objects with settings property
  {
    id: "CARD-002",
    type: "physical",
    status: "active",
    name: "THY Miles&Smiles Standard",
    number: "4532 8821 4567 1234",
    expiryDate: "10/24",
    cvv: "456",
    scheme: "visa",
    connectedAccount: {
      id: "ACC-002",
      currency: "TRY",
      balance: 750.00
    },
    issueDate: "2022-10-05",
    lastUsed: "2023-06-10",
    transactions: 28,
    frozen: true,
    delivery: {
      status: "delivered",
      orderedDate: "2022-09-30",
      estimatedDelivery: "2022-10-10",
      actualDelivery: "2022-10-08",
      address: "456 Oak St, Ankara, Turkey",
      trackingNumber: "TRK987654321",
      carrier: "Fast Delivery",
      history: [
        {
          status: "ordered",
          date: "2022-09-30",
          location: "Payment Processing Center"
        },
        {
          status: "processing",
          date: "2022-10-02",
          location: "Card Production Facility"
        },
        {
          status: "printed",
          date: "2022-10-04",
          location: "Card Production Facility"
        },
        {
          status: "shipped",
          date: "2022-10-05",
          location: "Distribution Center"
        },
        {
          status: "delivered",
          date: "2022-10-08",
          location: "Ankara, Turkey"
        },
        {
          status: "activated",
          date: "2022-10-12",
          location: "Customer Location"
        }
      ]
    },
    settings: {
      ecommerce: false,
      atm: false,
      international: false,
      contactless: false
    }
  },
  {
    id: "CARD-003",
    type: "virtual",
    status: "active",
    name: "THY Virtual Payment Card",
    number: "5412 8761 2345 6789",
    expiryDate: "05/26",
    cvv: "789",
    scheme: "mastercard",
    connectedAccount: {
      id: "ACC-003",
      currency: "USD",
      balance: 350.25
    },
    issueDate: "2023-05-15",
    lastUsed: "2023-06-11",
    transactions: 15,
    frozen: false,
    settings: {
      ecommerce: true,
      atm: false,
      international: true,
      contactless: false
    }
  },
  {
    id: "CARD-004",
    type: "physical",
    status: "processing",
    name: "THY Miles&Smiles Business",
    number: "4532 9876 5432 1098",
    expiryDate: "02/27",
    cvv: "321",
    scheme: "visa",
    connectedAccount: {
      id: "ACC-004",
      currency: "EUR",
      balance: 0.00
    },
    issueDate: "2023-06-05",
    lastUsed: "",
    transactions: 0,
    frozen: false,
    delivery: {
      status: "processing",
      orderedDate: "2023-06-05",
      estimatedDelivery: "2023-06-15",
      address: "789 Pine St, Istanbul, Turkey",
      trackingNumber: "TRK234567890",
      carrier: "Fast Delivery",
      history: [
        {
          status: "ordered",
          date: "2023-06-05",
          location: "Payment Processing Center"
        },
        {
          status: "processing",
          date: "2023-06-07",
          location: "Card Production Facility"
        }
      ]
    },
    settings: {
      ecommerce: false,
      atm: false,
      international: false,
      contactless: false
    }
  }
];

// Remove the forEach loop as we've now explicitly defined settings in each card object
// mockPrepaidCards.forEach(card => {
//   if (!card.settings) {
//     card.settings = {
//       ecommerce: card.status === "active",
//       atm: card.status === "active",
//       international: false,
//       contactless: card.status === "active" && card.type === "physical"
//     };
//   }
// });

// Add state for confirmation dialog
// const [showSettingConfirmDialog, setShowSettingConfirmDialog] = useState(false);
// const [pendingSettingChange, setPendingSettingChange] = useState<{
//   cardId: string;
//   setting: keyof PrepaidCardSettings;
//   value: boolean;
// } | null>(null);

// Modify the handleSettingToggle function to show confirmation dialog first
// const handleSettingToggle = (cardId: string, setting: keyof PrepaidCardSettings, value: boolean) => {
//   setPendingSettingChange({
//     cardId,
//     setting,
//     value
//   });
//   setShowSettingConfirmDialog(true);
// };

// Add a function to apply the setting change after confirmation
// const confirmSettingChange = () => {
//   if (!pendingSettingChange) return;
  
//   const { cardId, setting, value } = pendingSettingChange;
//   const cardIndex = mockPrepaidCards.findIndex(card => card.id === cardId);
  
//   if (cardIndex !== -1) {
//     mockPrepaidCards[cardIndex].settings[setting] = value;
//     // In a real app, you would call an API here to update the setting
//     console.log(`Card ${cardId}: ${setting} set to ${value}`);
//   }
  
//   setShowSettingConfirmDialog(false);
//   setPendingSettingChange(null);
// };

// Get a friendly name for the setting
// const getSettingName = (setting: keyof PrepaidCardSettings): string => {
//   switch (setting) {
//     case 'ecommerce': return 'Ecommerce Payments';
//     case 'atm': return 'ATM Withdrawals';
//     case 'international': return 'International Transactions';
//     case 'contactless': return 'Contactless Payments';
//     default: return setting;
//   }
// };

// Update the TextSwitch component to have stronger colors
const TextSwitch = ({ 
  checked, 
  onCheckedChange, 
  disabled 
}: { 
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void; 
  disabled: boolean 
}) => {
  return (
    <div className="relative inline-flex">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`${checked ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} transition-colors duration-200`}
      />
      <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold pointer-events-none">
        {checked ? 'ON' : 'OFF'}
      </span>
    </div>
  );
};

// Visual Card component to display prepaid card in a visually appealing way
function PrepaidCardVisual({ 
  card, 
  onAction, 
  onViewDetails, 
  onViewTracking 
}: { 
  card: any; 
  onAction: (card: any, action: string) => void;
  onViewDetails: (card: any) => void;
  onViewTracking: (card: any) => void;
}) {
  // Get card scheme logo and color
  const getCardSchemeColor = (scheme: string) => {
    switch (scheme) {
      case "visa": return "#1434CB";
      case "mastercard": return "#EB001B";
      case "troy": return "#00A6D6";
      case "amex": return "#016FD0";
      default: return "#333333";
    }
  };

  const getCardTypeBackground = (type: string) => {
    switch (type) {
      case "physical": return "bg-gradient-to-br from-blue-600 to-violet-600";
      case "virtual": return "bg-gradient-to-br from-purple-600 to-pink-600";
      case "digital": return "bg-gradient-to-br from-emerald-600 to-sky-600";
      default: return "bg-gradient-to-br from-gray-700 to-gray-900";
    }
  };

  const getCardSchemeComponent = (scheme: string) => {
    switch (scheme) {
      case "visa":
        return (
          <div className="text-white font-bold italic text-lg tracking-wider">VISA</div>
        );
      case "mastercard":
        return (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-500 rounded-full opacity-70 -mr-4"></div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-70"></div>
          </div>
        );
      case "troy":
        return (
          <div className="text-white font-bold text-lg tracking-wider">TROY</div>
        );
      case "amex":
        return (
          <div className="text-white font-semibold text-lg tracking-wider">AMERICAN EXPRESS</div>
        );
      default:
        return null;
    }
  };

  // Apply styling based on card status
  const isDisabled = card.status !== 'active' || card.frozen;
  const statusOverlay = isDisabled ? 'opacity-60' : 'opacity-100';
  
  return (
    <div className="relative group">
      <div 
        className={`w-full aspect-[1.58/1] ${getCardTypeBackground(card.type)} rounded-xl p-4 flex flex-col justify-between ${statusOverlay} transition duration-300 shadow-lg group-hover:shadow-xl`}
      >
        {/* Card Chip & Type Indicator */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-1">
            <div className="w-8 h-6 bg-yellow-200/80 rounded-md flex items-center justify-center">
              <div className="w-6 h-4 bg-yellow-400/90 rounded-sm grid grid-cols-3 grid-rows-3 gap-px">
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} className="bg-yellow-600/90 rounded-sm"></div>
                ))}
              </div>
            </div>
            <Wifi className="h-5 w-5 text-white/70" />
          </div>
          <Badge 
            variant="outline" 
            className="border-white/40 text-white/90 bg-white/10 uppercase text-xs px-2"
          >
            {card.type}
          </Badge>
        </div>
        
        {/* Card Number */}
        <div className="text-white/90 text-lg font-mono tracking-widest mt-3 mb-6">
          {card.number}
        </div>
        
        {/* Cardholder Name & Expiry */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-white/70 text-xs mb-1">CARDHOLDER NAME</span>
            <span className="text-white font-medium uppercase tracking-wider">{card.name}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-white/70 text-xs mb-1">VALID THRU</span>
            <span className="text-white font-medium">{card.expiryDate}</span>
          </div>
        </div>
        
        {/* Card Scheme Logo */}
        <div className="absolute top-4 right-4">
          {getCardSchemeComponent(card.scheme)}
        </div>
        
        {/* Status Overlays */}
        {card.frozen && (
          <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
            <Badge variant="outline" className="bg-blue-500/20 border-blue-400 text-blue-100 px-3 py-1">
              <PauseCircle className="h-4 w-4 mr-1" />
              FROZEN
            </Badge>
          </div>
        )}
        
        {card.status !== 'active' && (
          <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
            <Badge variant="outline" className="bg-red-500/20 border-red-400 text-red-100 px-3 py-1">
              <XCircle className="h-4 w-4 mr-1" />
              {card.status.toUpperCase()}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Card Actions */}
      <div className="mt-2 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {card.connectedAccount.currency} {card.connectedAccount.balance.toFixed(2)}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onViewDetails(card)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            {card.type === 'physical' && card.delivery && (
              <DropdownMenuItem onClick={() => onViewTracking(card)}>
                <Truck className="h-4 w-4 mr-2" />
                View Tracking
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {card.frozen ? (
              <DropdownMenuItem onClick={() => onAction(card, 'unfreeze')}>
                <PlayCircle className="h-4 w-4 mr-2" />
                Unfreeze Card
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onAction(card, 'freeze')}>
                <PauseCircle className="h-4 w-4 mr-2" />
                Freeze Card
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              onClick={() => onAction(card, 'cancel')}
              className="text-red-500 hover:text-red-500 focus:text-red-500"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Card
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Add back the mockCardTransactions array
interface CardTransaction {
  id: string;
  type: string;
  amount: string;
  date: string;
  merchant: string;
  status: string;
  description: string;
}

// Mock transactions for a specific card
const mockCardTransactions: CardTransaction[] = [
  {
    id: "TR123456",
    type: "purchase",
    amount: "₺250.00",
    date: "2023-03-12 14:32",
    merchant: "Amazon Turkey",
    status: "completed",
    description: "Online purchase",
  },
  {
    id: "TR123457",
    type: "purchase",
    amount: "₺120.50",
    date: "2023-03-10 13:45",
    merchant: "Migros Supermarket",
    status: "completed",
    description: "Grocery shopping",
  },
  {
    id: "TR123458",
    type: "refund",
    amount: "₺75.00",
    date: "2023-03-08 12:30",
    merchant: "Trendyol",
    status: "completed",
    description: "Item return refund",
  },
  {
    id: "TR123459",
    type: "purchase",
    amount: "₺350.25",
    date: "2023-03-05 11:15",
    merchant: "MediaMarkt",
    status: "completed",
    description: "Electronics purchase",
  },
  {
    id: "TR123460",
    type: "withdrawal",
    amount: "₺200.00",
    date: "2023-03-01 10:22",
    merchant: "ATM Withdrawal",
    status: "completed",
    description: "Cash withdrawal",
  },
];

export function CustomerPrepaidCards({ customer }: { customer: any }) {
  const [selectedTab, setSelectedTab] = useState("active")
  const [activeCard, setActiveCard] = useState<any>(null)
  const [actionType, setActionType] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [showTrackingDetails, setShowTrackingDetails] = useState(false)
  
  // Add the state hooks that were previously at the top level
  const [showSettingConfirmDialog, setShowSettingConfirmDialog] = useState(false);
  const [pendingSettingChange, setPendingSettingChange] = useState<{
    cardId: string;
    setting: keyof PrepaidCardSettings;
    value: boolean;
  } | null>(null);
  
  // Move the functions inside the component
  const handleSettingToggle = (cardId: string, setting: keyof PrepaidCardSettings, value: boolean) => {
    setPendingSettingChange({
      cardId,
      setting,
      value
    });
    setShowSettingConfirmDialog(true);
  };
  
  const confirmSettingChange = () => {
    if (!pendingSettingChange) return;
    
    const { cardId, setting, value } = pendingSettingChange;
    const cardIndex = mockPrepaidCards.findIndex(card => card.id === cardId);
    
    if (cardIndex !== -1) {
      mockPrepaidCards[cardIndex].settings[setting] = value;
      // In a real app, you would call an API here to update the setting
      console.log(`Card ${cardId}: ${setting} set to ${value}`);
    }
    
    setShowSettingConfirmDialog(false);
    setPendingSettingChange(null);
  };
  
  const getSettingName = (setting: keyof PrepaidCardSettings): string => {
    switch (setting) {
      case 'ecommerce': return 'Ecommerce Payments';
      case 'atm': return 'ATM Withdrawals';
      case 'international': return 'International Transactions';
      case 'contactless': return 'Contactless Payments';
      default: return setting;
    }
  };

  // Filter cards based on selected tab and status
  const getFilteredCards = () => {
    switch (selectedTab) {
      case "active":
        return mockPrepaidCards.filter(card => card.status === "active");
      case "orders":
        return mockPrepaidCards.filter(card => 
          card.type === "physical" && 
          card.delivery && 
          ["ordered", "processing", "printed", "shipped"].includes(card.delivery.status)
        );
      case "closed":
        return mockPrepaidCards.filter(card => card.status === "closed" || card.status === "cancelled");
      default:
        return mockPrepaidCards;
    }
  };

  const filteredCards = getFilteredCards();

  // Handle card action
  const handleCardAction = (card: any, action: string) => {
    setActiveCard(card)
    setActionType(action)
    setShowConfirmDialog(true)
  }

  // Confirm card action
  const confirmCardAction = () => {
    // In a real app, call API to perform the action
    console.log(`Performing ${actionType} on card ${activeCard.id}`)
    
    // Show success message
    alert(`Card ${actionType}d successfully`)
    setShowConfirmDialog(false)
  }

  // View card details
  const viewCardDetails = (card: any) => {
    setActiveCard(card)
    setShowCardDetails(true)
  }

  // View card tracking
  const viewCardTracking = (card: any) => {
    setActiveCard(card)
    setShowTrackingDetails(true)
  }

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  // Get card type icon
  const getCardTypeIcon = (type: string) => {
    switch (type) {
      case "physical":
        return <CreditCard className="h-4 w-4 mr-2" />;
      case "virtual":
        return <Globe className="h-4 w-4 mr-2" />;
      case "digital":
        return <Smartphone className="h-4 w-4 mr-2" />;
      default:
        return <CreditCard className="h-4 w-4 mr-2" />;
    }
  };

  // Get card type label
  const getCardTypeLabel = (type: string) => {
    switch (type) {
      case "physical":
        return "Physical";
      case "virtual":
        return "Virtual";
      case "digital":
        return "Digital";
      default:
        return type;
    }
  };

  // Get delivery status icon
  const getDeliveryStatusIcon = (status: string) => {
    switch (status) {
      case "ordered":
        return <Clock className="h-4 w-4 mr-2" />;
      case "processing":
        return <ArrowLeftRight className="h-4 w-4 mr-2" />;
      case "printed":
        return <Package className="h-4 w-4 mr-2" />;
      case "shipped":
        return <Truck className="h-4 w-4 mr-2" />;
      case "delivered":
        return <CheckCircle2 className="h-4 w-4 mr-2" />;
      case "activated":
        return <CheckCircle2 className="h-4 w-4 mr-2" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 mr-2" />;
      default:
        return <Clock className="h-4 w-4 mr-2" />;
    }
  };

  // Get delivery status color
  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "ordered":
      case "processing":
      case "printed":
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
      case "activated":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get delivery progress percentage
  const getDeliveryProgress = (status: string) => {
    switch (status) {
      case "ordered":
        return 20;
      case "processing":
        return 40;
      case "printed":
        return 60;
      case "shipped":
        return 80;
      case "delivered":
      case "activated":
        return 100;
      case "failed":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Prepaid Cards</h2>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New Card
        </Button>
      </div>

      <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="active">Active Cards</TabsTrigger>
          <TabsTrigger value="orders">Card Orders</TabsTrigger>
          <TabsTrigger value="closed">Closed Cards</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          {filteredCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
              <CreditCard className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No Cards Found</h3>
              <p className="text-muted-foreground text-center mt-1">
                There are no {selectedTab === 'active' ? 'active' : selectedTab === 'orders' ? 'pending order' : 'closed'} cards available for this customer.
              </p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Card Name</TableHead>
                    <TableHead>Card Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Scheme</TableHead>
                    {selectedTab === "orders" ? (
                      <>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Tracking</TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead>Expiry</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Ecommerce</TableHead>
                        <TableHead className="text-center">ATM</TableHead>
                        <TableHead className="text-center">International</TableHead>
                        <TableHead className="text-center">Contactless</TableHead>
                      </>
                    )}
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell>
                        <div 
                          className="font-semibold cursor-pointer hover:text-primary hover:underline" 
                          onClick={() => viewCardDetails(card)}
                        >
                          {card.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">{card.number}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getCardTypeIcon(card.type)}
                          <span>{getCardTypeLabel(card.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {cardSchemes[card.scheme as keyof typeof cardSchemes]}
                        </Badge>
                      </TableCell>
                      {selectedTab === "orders" ? (
                        <>
                          <TableCell>
                            <div className="flex items-center">
                              {getDeliveryStatusIcon(card.delivery?.status || "")}
                              <span>{deliveryStatuses[card.delivery?.status as keyof typeof deliveryStatuses]}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Ordered: {formatDate(card.delivery?.orderedDate || null)}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Est. Delivery: {formatDate(card.delivery?.estimatedDelivery || null)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {card.delivery?.trackingNumber && (
                              <div className="flex flex-col">
                                <div className="text-sm font-mono">{card.delivery.trackingNumber}</div>
                                <div className="text-xs text-muted-foreground">{card.delivery.carrier}</div>
                              </div>
                            )}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{card.expiryDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={card.status === "active" ? "default" : "secondary"}
                              className={card.frozen ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : ""}
                            >
                              {card.frozen ? "Frozen" : card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <TextSwitch
                              checked={card.settings?.ecommerce || false}
                              onCheckedChange={(checked) => handleSettingToggle(card.id, "ecommerce", checked)}
                              disabled={card.status !== "active" || card.frozen}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <TextSwitch
                              checked={card.settings?.atm || false}
                              onCheckedChange={(checked) => handleSettingToggle(card.id, "atm", checked)}
                              disabled={card.status !== "active" || card.frozen}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <TextSwitch
                              checked={card.settings?.international || false}
                              onCheckedChange={(checked) => handleSettingToggle(card.id, "international", checked)}
                              disabled={card.status !== "active" || card.frozen}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <TextSwitch
                              checked={card.settings?.contactless || false}
                              onCheckedChange={(checked) => handleSettingToggle(card.id, "contactless", checked)}
                              disabled={card.status !== "active" || card.frozen || card.type !== "physical"}
                            />
                          </TableCell>
                        </>
                      )}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => viewCardDetails(card)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            
                            {card.type === "physical" && card.delivery && (
                              <DropdownMenuItem onClick={() => viewCardTracking(card)}>
                                <Truck className="h-4 w-4 mr-2" />
                                Track Shipment
                              </DropdownMenuItem>
                            )}
                            
                            {selectedTab === "active" && (
                              <>
                                <DropdownMenuSeparator />
                                {card.frozen ? (
                                  <DropdownMenuItem onClick={() => handleCardAction(card, "unfreeze")}>
                                    <PlayCircle className="h-4 w-4 mr-2" />
                                    Unfreeze Card
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => handleCardAction(card, "freeze")}>
                                    <PauseCircle className="h-4 w-4 mr-2" />
                                    Freeze Card
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem 
                                  onClick={() => handleCardAction(card, "cancel")}
                                  className="text-red-500 hover:text-red-500 focus:text-red-500"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel Card
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Confirm Action Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'freeze' && 'Freeze Card'}
              {actionType === 'unfreeze' && 'Unfreeze Card'}
              {actionType === 'cancel' && 'Cancel Card'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'freeze' && 'This will temporarily suspend the card from being used for any transactions.'}
              {actionType === 'unfreeze' && 'This will allow the card to be used for transactions again.'}
              {actionType === 'cancel' && 'This will permanently cancel the card. This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          {actionType === 'cancel' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Cancelling a card is permanent and cannot be reversed. The customer will need to order a new card if needed.
              </AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button 
              variant={actionType === 'cancel' ? 'destructive' : 'default'}
              onClick={confirmCardAction}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Card Details Dialog */}
      {activeCard && (
        <Dialog open={showCardDetails} onOpenChange={setShowCardDetails}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Card Details
              </DialogTitle>
              <DialogDescription>
                Details for {activeCard.name}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Card Details</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                {/* Card Details Table */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-sm font-medium">Card ID</div>
                  <div className="text-sm">{activeCard.id}</div>
                  
                  <div className="text-sm font-medium">Type</div>
                  <div className="text-sm flex items-center">
                    {getCardTypeIcon(activeCard.type)}
                    <span className="ml-1">{getCardTypeLabel(activeCard.type)}</span>
                  </div>
                  
                  <div className="text-sm font-medium">Status</div>
                  <div className="text-sm">
                    <Badge variant={activeCard.status === 'active' ? 'default' : 'destructive'}>
                      {activeCard.status}
                    </Badge>
                    {activeCard.frozen && (
                      <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        Frozen
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm font-medium">Card Number</div>
                  <div className="text-sm font-mono">{activeCard.number}</div>
                  
                  <div className="text-sm font-medium">Expiry Date</div>
                  <div className="text-sm">{activeCard.expiryDate}</div>
                  
                  <div className="text-sm font-medium">Connected Account</div>
                  <div className="text-sm">{activeCard.connectedAccount.id}</div>
                  
                  <div className="text-sm font-medium">Currency</div>
                  <div className="text-sm">{activeCard.connectedAccount.currency}</div>
                  
                  <div className="text-sm font-medium">Current Balance</div>
                  <div className="text-sm font-semibold">
                    {formatCurrency(activeCard.connectedAccount.balance, activeCard.connectedAccount.currency)}
                  </div>
                  
                  <div className="text-sm font-medium">Issue Date</div>
                  <div className="text-sm">{activeCard.issueDate ? formatDate(activeCard.issueDate) : 'N/A'}</div>
                  
                  <div className="text-sm font-medium">Last Used</div>
                  <div className="text-sm">{activeCard.lastUsed ? formatDate(activeCard.lastUsed) : 'Never used'}</div>
                  
                  <div className="text-sm font-medium">Transactions</div>
                  <div className="text-sm">{activeCard.transactions}</div>
                  
                  {activeCard.type === "physical" && activeCard.delivery && (
                    <>
                      <div className="text-sm font-medium">Delivery Address</div>
                      <div className="text-sm">{activeCard.delivery.address || 'N/A'}</div>
                    </>
                  )}
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-3">Card Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Ecommerce Payments</div>
                        <div className="text-xs text-muted-foreground">Allow online and in-app purchases</div>
                      </div>
                      <TextSwitch
                        checked={activeCard.settings?.ecommerce || false}
                        onCheckedChange={(checked) => handleSettingToggle(activeCard.id, "ecommerce", checked)}
                        disabled={activeCard.status !== "active" || activeCard.frozen}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">ATM Withdrawals</div>
                        <div className="text-xs text-muted-foreground">Allow cash withdrawals at ATMs</div>
                      </div>
                      <TextSwitch
                        checked={activeCard.settings?.atm || false}
                        onCheckedChange={(checked) => handleSettingToggle(activeCard.id, "atm", checked)}
                        disabled={activeCard.status !== "active" || activeCard.frozen}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">International Transactions</div>
                        <div className="text-xs text-muted-foreground">Allow payments outside home country</div>
                      </div>
                      <TextSwitch
                        checked={activeCard.settings?.international || false}
                        onCheckedChange={(checked) => handleSettingToggle(activeCard.id, "international", checked)}
                        disabled={activeCard.status !== "active" || activeCard.frozen}
                      />
                    </div>
                    
                    {activeCard.type === "physical" && (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Contactless Payments</div>
                          <div className="text-xs text-muted-foreground">Allow tap-to-pay at terminals</div>
                        </div>
                        <TextSwitch
                          checked={activeCard.settings?.contactless || false}
                          onCheckedChange={(checked) => handleSettingToggle(activeCard.id, "contactless", checked)}
                          disabled={activeCard.status !== "active" || activeCard.frozen}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="transactions" className="space-y-4 pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Merchant</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(mockCardTransactions.length > 0) ? (
                      mockCardTransactions.map(transaction => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {transaction.type === "purchase" && <ArrowUpCircle className="h-4 w-4 text-destructive mr-2" />}
                              {transaction.type === "refund" && <ArrowDownCircle className="h-4 w-4 text-green-500 mr-2" />}
                              {transaction.type === "withdrawal" && <ArrowUpCircle className="h-4 w-4 text-destructive mr-2" />}
                              <span>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span>
                            </div>
                          </TableCell>
                          <TableCell className={transaction.type === "refund" ? "text-green-500" : "text-destructive"}>
                            {transaction.type === "refund" ? "+" : "-"}{transaction.amount}
                          </TableCell>
                          <TableCell>{transaction.merchant}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              transaction.status === "completed" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            }>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <ArrowLeftRight className="h-10 w-10 mb-2" />
                            <p>No transactions found for this card</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Card Tracking Dialog */}
      {activeCard && activeCard.delivery && (
        <Dialog open={showTrackingDetails} onOpenChange={setShowTrackingDetails}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Card Delivery Status
              </DialogTitle>
              <DialogDescription>
                Tracking details for {activeCard.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Status Overview */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <div className="text-muted-foreground">Current Status</div>
                    <div className="flex items-center mt-1">
                      {getDeliveryStatusIcon(activeCard.delivery.status)}
                      <span className="font-medium ml-1">
                        {deliveryStatuses[activeCard.delivery.status as keyof typeof deliveryStatuses]}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getDeliveryStatusColor(activeCard.delivery.status)}
                  >
                    {activeCard.delivery.status === 'delivered' || activeCard.delivery.status === 'activated' 
                      ? 'Complete' 
                      : activeCard.delivery.status === 'failed' 
                        ? 'Failed' 
                        : 'In Progress'}
                  </Badge>
                </div>
                <Progress value={getDeliveryProgress(activeCard.delivery.status)} className="h-2" />
              </div>
              
              {/* Tracking Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-sm font-medium">Tracking Number</div>
                <div className="text-sm font-mono">{activeCard.delivery.trackingNumber}</div>
                
                <div className="text-sm font-medium">Carrier</div>
                <div className="text-sm">{activeCard.delivery.carrier}</div>
                
                <div className="text-sm font-medium">Order Date</div>
                <div className="text-sm">{formatDate(activeCard.delivery.orderedDate)}</div>
                
                <div className="text-sm font-medium">Estimated Delivery</div>
                <div className="text-sm">{formatDate(activeCard.delivery.estimatedDelivery)}</div>
                
                {activeCard.delivery.actualDelivery && (
                  <>
                    <div className="text-sm font-medium">Actual Delivery</div>
                    <div className="text-sm">{formatDate(activeCard.delivery.actualDelivery)}</div>
                  </>
                )}
                
                <div className="text-sm font-medium">Delivery Address</div>
                <div className="text-sm">{activeCard.delivery.address}</div>
              </div>
              
              {/* Tracking History */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Delivery Timeline</h4>
                <div className="space-y-3 mt-3">
                  {activeCard.delivery.history.map((event: any, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className={`mt-1 h-4 w-4 rounded-full ${
                        index === 0 ? "bg-primary" : "bg-primary/30"
                      }`} />
                      <div className="ml-3 space-y-1">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">
                            {deliveryStatuses[event.status as keyof typeof deliveryStatuses]}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {formatDate(event.date)}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Settings Change Confirmation Dialog */}
      <Dialog open={showSettingConfirmDialog} onOpenChange={setShowSettingConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingSettingChange?.value 
                ? `Enable ${getSettingName(pendingSettingChange.setting)}` 
                : `Disable ${getSettingName(pendingSettingChange?.setting as keyof PrepaidCardSettings)}`}
            </DialogTitle>
            <DialogDescription>
              {pendingSettingChange?.value 
                ? `Are you sure you want to enable ${getSettingName(pendingSettingChange.setting)}?` 
                : `Are you sure you want to disable ${getSettingName(pendingSettingChange?.setting as keyof PrepaidCardSettings)}?`}
            </DialogDescription>
          </DialogHeader>
          {pendingSettingChange && !pendingSettingChange.value && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                {pendingSettingChange.setting === "ecommerce" && "Disabling ecommerce payments will prevent the card from being used for online purchases."}
                {pendingSettingChange.setting === "atm" && "Disabling ATM withdrawals will prevent the card from being used at ATMs."}
                {pendingSettingChange.setting === "international" && "Disabling international transactions will prevent the card from being used outside the home country."}
                {pendingSettingChange.setting === "contactless" && "Disabling contactless payments will require the card to be inserted into the terminal."}
              </AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingConfirmDialog(false)}>Cancel</Button>
            <Button 
              variant={pendingSettingChange?.value ? "default" : "destructive"}
              onClick={confirmSettingChange}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

