import { CampaignsList } from '@/components/campaigns/CampaignsList'
import { CampaignFilters } from '@/components/campaigns/CampaignFilters'
import { Plus } from 'lucide-react'

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500 mt-1">Manage all your UGC and influencer campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm">
          <Plus className="h-4 w-4" />
          New Campaign
        </button>
      </div>

      {/* Filters */}
      <CampaignFilters />

      {/* Campaigns List */}
      <CampaignsList />
    </div>
  )
}
