import { CampaignDetailPage } from "@/components/campaigns/campaign-detail-page"

export default function Page({ params }: { params: { id: string } }) {
  return <CampaignDetailPage id={params.id} />
} 