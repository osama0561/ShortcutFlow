'use client'

import { useEffect, useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

interface Campaign {
  id: string
  name: string
}

const statuses = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'revision', label: 'Revision Needed' },
  { key: 'rejected', label: 'Rejected' },
]

export function ContentFilters() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [activeStatus, setActiveStatus] = useState('all')

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

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by creator name..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Campaign Filter */}
        <select className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white min-w-[180px]">
          <option value="">All Campaigns</option>
          {loading ? (
            <option disabled>Loading...</option>
          ) : (
            campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))
          )}
        </select>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {statuses.map((status) => (
            <button
              key={status.key}
              onClick={() => setActiveStatus(status.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeStatus === status.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
