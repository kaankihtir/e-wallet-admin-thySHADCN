import { CustomerDetailsView } from "@/components/customers/details/customer-details-view"

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  // In a real implementation, we would fetch the customer data based on the ID
  // For now, we'll use mock data
  const customerId = params.id.toUpperCase() // Convert to uppercase to match "CUS001" format

  return (
    <div className="container mx-auto py-6">
      <CustomerDetailsView customerId={customerId} />
    </div>
  )
}

