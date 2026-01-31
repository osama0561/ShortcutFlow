'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { CampaignHeader } from '@/components/campaigns/detail/CampaignHeader'
import { CampaignPipeline } from '@/components/campaigns/detail/CampaignPipeline'
import { CreatorList } from '@/components/campaigns/detail/CreatorList'
import { CampaignStats } from '@/components/campaigns/detail/CampaignStats'
import { Loader2 } from 'lucide-react'

export interface Campaign {
  id: string
  name: string
  description: string | null
  status: string
  start_date: string | null
  end_date: string | null
  budget: number
  creator_count: number
  products_shipped: number
  client: {
    id: string
    name: string
    industry: string | null
  } | null
  videos_submitted: number
  videos_approved: number
  total_views: number
}

export default function CampaignDetailPage() {
  const params = useParams()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const res = await fetch(`/api/campaigns/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setCampaign(data)
        }
      } catch (error) {
        console.error('Failed to fetch campaign:', error)
      } finally {
        setLoading(false)
      }
    }
    if (params.id) {
      fetchCampaign()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500 mb-4">Campaign not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <CampaignHeader campaign={campaign} />

      {/* Stats Cards */}
      <CampaignStats campaign={campaign} />

      {/* Pipeline Progress */}
      <CampaignPipeline campaign={campaign} />

      {/* Creator List */}
      <CreatorList campaignId={campaign.id} />
    </div>
  )
}
