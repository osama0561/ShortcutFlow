'use client'

import { useEffect, useState } from 'react'
import { Users, UserCheck, Star, TrendingUp } from 'lucide-react'

interface CreatorStatsData {
  totalCreators: number
  availableNow: number
  topRated: number
  avgEngagement: string
}

export function CreatorStats() {
  const [stats, setStats] = useState<CreatorStatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/creators/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch creator stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statItems = [
    {
      label: 'Total Creators',
      value: stats?.totalCreators ?? 0,
      change: 'In your network',
      icon: Users,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      label: 'Available Now',
      value: stats?.availableNow ?? 0,
      change: 'Ready for campaigns',
      icon: UserCheck,
      color: 'text-green-500 bg-green-50',
    },
    {
      label: 'Top Rated',
      value: stats?.topRated ?? 0,
      change: '4.5+ star rating',
      icon: Star,
      color: 'text-amber-500 bg-amber-50',
    },
    {
      label: 'Avg Performance',
      value: `${stats?.avgEngagement ?? '0'}%`,
      change: 'Engagement rate',
      icon: TrendingUp,
      color: 'text-purple-500 bg-purple-50',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-lg mb-3" />
            <div className="h-8 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
          <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
  )
}
