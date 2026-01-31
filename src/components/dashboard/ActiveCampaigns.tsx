'use client'

import { useEffect, useState } from 'react'
import { MoreHorizontal, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Campaign {
  id: string
  name: string
  client: string
  status: string
  statusLabel: string
  targetCreators: number
  currentCreators: number
}

const statusColors: Record<string, string> = {
  review: 'bg-yellow-100 text-yellow-700',
  live: 'bg-green-100 text-green-700',
  filming: 'bg-blue-100 text-blue-700',
  recruiting: 'bg-orange-100 text-orange-700',
  shipping: 'bg-indigo-100 text-indigo-700',
  scripting: 'bg-pink-100 text-pink-700',
  draft: 'bg-gray-100 text-gray-700',
  completed: 'bg-emerald-100 text-emerald-700',
}

export function ActiveCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch('/api/campaigns')
        if (res.ok) {
          const data = await res.json()
          setCampaigns(data.slice(0, 5)) // Show first 5
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="p-5 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
        <Link
          href="/campaigns"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      {campaigns.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-gray-500">No campaigns yet</p>
          <Link
            href="/campaigns"
            className="mt-2 inline-block text-primary-600 hover:text-primary-700 font-medium"
          >
            Create your first campaign
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                  Campaign
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                  Creators
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                  Progress
                </th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign) => {
                const progress = getProgress(campaign.currentCreators, campaign.targetCreators)
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <Link href={`/campaigns/${campaign.id}`} className="block">
                        <p className="font-medium text-gray-900 hover:text-primary-600">
                          {campaign.name}
                        </p>
                        <p className="text-sm text-gray-500">{campaign.client}</p>
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-900">
                        {campaign.currentCreators}/{campaign.targetCreators}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[campaign.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {campaign.statusLabel}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
