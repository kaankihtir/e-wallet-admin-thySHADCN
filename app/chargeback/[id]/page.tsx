import { Metadata } from "next"
import ChargebackDetailClient from "@/components/chargeback/chargeback-detail-client"
import { mockChargebacks } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Chargeback Details",
  description: "View and manage chargeback details",
}

export default function ChargebackDetailPage({ params }: { params: { id: string } }) {
  // Server component that renders the client component
  return <ChargebackDetailClient id={params.id} />;
} 