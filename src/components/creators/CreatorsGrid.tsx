'use client'

import { useEffect, useState } from 'react'
import { Star, MoreHorizontal, MapPin, CheckCircle, Loader2 } from 'lucide-react'

interface Creator {
  id: string
  name: string
  email: string
  handle: string | null
  location: string | null
  niche: string | null
  followers: number
  engagement: number
  rating: number
  completed_jobs: number
  status: string
  verified: boolean
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

const nicheColors: Record<string, string> = {
  Beauty: 'bg-pink-100 text-pink-700',
  Lifestyle: 'bg-purple-100 text-purple-700',
  Tech: 'bg-blue-100 text-blue-700',
  Fashion: 'bg-amber-100 text-amber-700',
  Fitness: 'bg-green-100 text-green-700',
  Food: 'bg-orange-100 text-orange-700',
  Travel: 'bg-cyan-100 text-cyan-700',
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function CreatorsGrid() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCreators() {
      try {
        const res = await fetch('/api/creators')
        if (res.ok) {
          const data = await res.json()
          setCreators(data)
        }
      } catch (error) {
        console.error('Failed to fetch creators:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCreators()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (creators.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500 mb-4">No creators yet</p>
        <p className="text-sm text-gray-400">Add your first creator to get started</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-medium">
                      {getInitials(creator.name)}
                    </div>
                    {creator.verified && (
                      <CheckCircle className="absolute -bottom-0.5 -right-0.5 h-4 w-4 text-primary-500 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{creator.name}</p>
                    <p className="text-sm text-gray-500">{creator.handle || creator.email}</p>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mt-3">
                {creator.niche && (
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      nicheColors[creator.niche] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {creator.niche}
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    statusColors[creator.status] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {statusLabels[creator.status] || creator.status}
                </span>
              </div>

              {/* Location */}
              {creator.location && (
                <div className="flex items-center gap-1 mt-3 text-sm text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {creator.location}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatNumber(creator.followers)}
                  </p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{creator.engagement}%</p>
                  <p className="text-xs text-gray-500">Engagement</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <p className="text-sm font-semibold text-gray-900">{creator.rating}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {creator.completed_jobs} campaigns completed
              </span>
              <button className="px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing {creators.length} creators</p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 text-sm text-white bg-primary-500 rounded-lg hover:bg-primary-600">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
