'use client'

import { ArrowLeft, MoreHorizontal, MessageSquare, FileDown, Settings } from 'lucide-react'
import Link from 'next/link'

interface Campaign {
  id: string
  name: string
  description: string | null
  status: string
  budget: number
  creator_count: number
  end_date: string | null
  client: {
    name: string
  } | null
}

interface CampaignHeaderProps {
  campaign: Campaign
}

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700 border-gray-200',
  ACTIVE: 'bg-green-100 text-green-700 border-green-200',
  IN_REVIEW: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  COMPLETED: 'bg-blue-100 text-blue-700 border-blue-200',
  PAUSED: 'bg-orange-100 text-orange-700 border-orange-200',
}

const statusLabels: Record<string, string> = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  IN_REVIEW: 'In Review',
  COMPLETED: 'Completed',
  PAUSED: 'Paused',
}

function formatCurrency(amount: number): string {
  return `SAR ${amount.toLocaleString()}`
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'TBD'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function CampaignHeader({ campaign }: CampaignHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link
            href="/campaigns"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColors[campaign.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {statusLabels[campaign.status] || campaign.status}
              </span>
            </div>
            <p className="text-gray-500 mt-1">
              {campaign.client?.name || 'No Client'} • {campaign.description || 'No description'}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">{campaign.creator_count}</span> creators
              </span>
              <span className="text-sm text-gray-500">
                Due <span className="font-medium text-gray-900">{formatDate(campaign.end_date)}</span>
              </span>
              <span className="text-sm text-gray-500">
                Budget <span className="font-medium text-gray-900">{formatCurrency(campaign.budget)}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <MessageSquare className="h-4 w-4" />
            Message All
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <FileDown className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
