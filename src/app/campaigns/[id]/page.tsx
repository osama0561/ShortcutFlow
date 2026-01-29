import { CampaignHeader } from '@/components/campaigns/detail/CampaignHeader'
import { CampaignPipeline } from '@/components/campaigns/detail/CampaignPipeline'
import { CreatorList } from '@/components/campaigns/detail/CreatorList'
import { CampaignStats } from '@/components/campaigns/detail/CampaignStats'

export default function CampaignDetailPage() {
  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <CampaignHeader />

      {/* Stats Cards */}
      <CampaignStats />

      {/* Pipeline Progress */}
      <CampaignPipeline />

      {/* Creator List */}
      <CreatorList />
    </div>
  )
}
