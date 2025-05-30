import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerDetails } from "./customer-details"
import { CustomerActivity } from "./customer-activity"
import { CustomerSecurity } from "./customer-security"
import { CustomerLimits } from "./customer-security"

interface CustomerTabsProps {
  customer: any;
}

export function CustomerTabs({ customer }: CustomerTabsProps) {
  return (
    <Tabs defaultValue="details" className="space-y-4">
      <TabsList>
        <TabsTrigger value="details">
          Details
        </TabsTrigger>
        <TabsTrigger value="activity">
          Activity
        </TabsTrigger>
        <TabsTrigger value="security">
          Security
        </TabsTrigger>
        <TabsTrigger value="limits">
          Limits
        </TabsTrigger>
      </TabsList>
      <CustomerDetails customer={customer} />
      <CustomerActivity customer={customer} />
      <CustomerSecurity customer={customer} />
      <CustomerLimits customer={customer} />
    </Tabs>
  )
} 