'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, MoreHorizontal, Check, X, Upload, Package, FileText, Eye, Loader2 } from 'lucide-react'

interface Creator {
  id: string
  name: string
  followers: number
  status: string
}

interface CreatorListProps {
  campaignId: string
}

function formatFollowers(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const statusColors: Record<string, string> = {
  AVAILABLE: 'bg-green-100 text-green-700',
  ON_CAMPAIGN: 'bg-blue-100 text-blue-700',
  BUSY: 'bg-gray-100 text-gray-700',
  INACTIVE: 'bg-red-100 text-red-700',
}

const statusLabels: Record<string, string> = {
  AVAILABLE: 'Available',
  ON_CAMPAIGN: 'On Campaign',
  BUSY: 'Busy',
  INACTIVE: 'Inactive',
}

export function CreatorList({ campaignId }: CreatorListProps) {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCreators() {
      try {
        // For now, we fetch all creators. In production, this would filter by campaign_creators table
        const res = await fetch('/api/creators')
        if (res.ok) {
          const data = await res.json()
          // Limit to first 10 for display purposes
          setCreators(data.slice(0, 10))
        }
      } catch (error) {
        console.error('Failed to fetch creators:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCreators()
  }, [campaignId])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Creators ({creators.length})</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search creators..."
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {creators.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-500">No creators assigned to this campaign yet</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    Creator
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    Status
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    <span title="Shipped"><Package className="h-4 w-4 inline" /></span>
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    <span title="Script Read"><FileText className="h-4 w-4 inline" /></span>
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    <span title="Video Submitted"><Upload className="h-4 w-4 inline" /></span>
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    <span title="Approved"><Check className="h-4 w-4 inline" /></span>
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    Paid
                  </th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {creators.map((creator) => (
                  <tr key={creator.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {getInitials(creator.name)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{creator.name}</p>
                          <p className="text-sm text-gray-500">{formatFollowers(creator.followers)} followers</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[creator.status] || 'bg-gray-100 text-gray-700'}`}>
                        {statusLabels[creator.status] || creator.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 inline" />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 inline" />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button className="p-1 text-primary-500 hover:text-primary-600 hover:bg-primary-50 rounded">
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 text-green-500 hover:bg-green-50 rounded">
                          <Check className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="text-gray-300">-</span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing {creators.length} creators</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm text-white bg-primary-500 rounded-lg hover:bg-primary-600">
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
