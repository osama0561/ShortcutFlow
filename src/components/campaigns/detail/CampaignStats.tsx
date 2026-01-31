'use client'

import { Users, Video, CheckCircle, Eye, Clock, Package } from 'lucide-react'

interface Campaign {
  creator_count: number
  products_shipped: number
  videos_submitted: number
  videos_approved: number
  total_views: number
  end_date: string | null
}

interface CampaignStatsProps {
  campaign: Campaign
}

function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
  return views.toString()
}

function getDaysRemaining(endDate: string | null): number {
  if (!endDate) return 0
  const end = new Date(endDate)
  const now = new Date()
  const diffTime = end.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

export function CampaignStats({ campaign }: CampaignStatsProps) {
  const stats = [
    {
      label: 'Creators Assigned',
      value: `${campaign.creator_count}`,
      icon: Users,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      label: 'Videos Submitted',
      value: campaign.videos_submitted.toString(),
      icon: Video,
      color: 'text-purple-500 bg-purple-50',
    },
    {
      label: 'Videos Approved',
      value: campaign.videos_approved.toString(),
      icon: CheckCircle,
      color: 'text-green-500 bg-green-50',
    },
    {
      label: 'Total Views',
      value: formatViews(campaign.total_views),
      icon: Eye,
      color: 'text-amber-500 bg-amber-50',
    },
    {
      label: 'Products Shipped',
      value: `${campaign.products_shipped}/${campaign.creator_count}`,
      icon: Package,
      color: 'text-cyan-500 bg-cyan-50',
    },
    {
      label: 'Days Remaining',
      value: getDaysRemaining(campaign.end_date).toString(),
      icon: Clock,
      color: 'text-red-500 bg-red-50',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
