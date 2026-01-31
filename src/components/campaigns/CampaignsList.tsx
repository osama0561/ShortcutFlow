'use client'

import { useEffect, useState } from 'react'
import { MoreHorizontal, Users, ChevronRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Campaign {
  id: string
  name: string
  client: string
  description: string | null
  status: string
  statusLabel: string
  targetCreators: number
  currentCreators: number
  budget: number | null
}

const statusColors: Record<string, string> = {
  review: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  live: 'bg-green-100 text-green-700 border-green-200',
  filming: 'bg-blue-100 text-blue-700 border-blue-200',
  recruiting: 'bg-orange-100 text-orange-700 border-orange-200',
  shipping: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  scripting: 'bg-pink-100 text-pink-700 border-pink-200',
  draft: 'bg-gray-100 text-gray-700 border-gray-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

const statusStages: Record<string, number> = {
  draft: 0,
  recruiting: 1,
  scripting: 2,
  shipping: 3,
  filming: 4,
  review: 5,
  live: 6,
  completed: 7,
}

const stageLabels = ['Draft', 'Recruit', 'Script', 'Ship', 'Film', 'Review', 'Live', 'Done']

export function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch('/api/campaigns')
        if (res.ok) {
          const data = await res.json()
          setCampaigns(data)
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaigns()
  }, [])

  const getProgress = (current: number, total: number) => {
    if (total === 0) return 0
    return Math.round((current / total) * 100)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500 mb-4">No campaigns yet</p>
        <p className="text-sm text-gray-400">Create your first campaign to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => {
        const currentStage = statusStages[campaign.status] || 0
        const progress = getProgress(campaign.currentCreators, campaign.targetCreators)

        return (
          <Link
            key={campaign.id}
            href={`/campaigns/${campaign.id}`}
            className="block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all"
          >
            <div className="p-5">
              <div className="flex items-start justify-between">
                {/* Campaign Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                        statusColors[campaign.status] || 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      {campaign.statusLabel}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {campaign.client}
                    {campaign.description && ` • ${campaign.description}`}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>
                        {campaign.currentCreators}/{campaign.targetCreators} creators
                      </span>
                    </div>
                    {campaign.budget && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">
                          ${campaign.budget.toLocaleString()}
                        </span>{' '}
                        budget
                      </div>
                    )}
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{progress}%</span> filled
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      // TODO: Show dropdown menu
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Pipeline Stages */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  {stageLabels.map((label, index) => (
                    <div key={label} className="flex-1 flex items-center">
                      <div className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full h-2 rounded-full ${
                            index <= currentStage ? 'bg-primary-500' : 'bg-gray-200'
                          }`}
                        />
                        <span className="text-xs text-gray-500 mt-1">{label}</span>
                      </div>
                      {index < stageLabels.length - 1 && <div className="w-2" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
