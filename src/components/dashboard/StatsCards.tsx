'use client'

import { useEffect, useState } from 'react'
import { Megaphone, Users, Building2, Eye, TrendingUp } from 'lucide-react'

interface Stats {
  activeCampaigns: number
  totalCreators: number
  availableCreators: number
  totalClients: number
  totalViews: number
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/dashboard/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const statCards = [
    {
      name: 'Active Campaigns',
      value: stats?.activeCampaigns ?? '-',
      icon: Megaphone,
      color: 'bg-blue-500',
    },
    {
      name: 'Creator Pool',
      value: stats ? formatNumber(stats.totalCreators) : '-',
      subtext: stats ? `${stats.availableCreators} available` : '',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: 'Active Clients',
      value: stats?.totalClients ?? '-',
      icon: Building2,
      color: 'bg-green-500',
    },
    {
      name: 'Total Views',
      value: stats ? formatNumber(stats.totalViews) : '-',
      subtext: 'All time',
      icon: Eye,
      color: 'bg-amber-500',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-lg" />
            <div className="mt-4 space-y-2">
              <div className="h-6 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className={`${stat.color} p-2.5 rounded-lg`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="h-3 w-3" />
              Live
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{stat.name}</p>
            {stat.subtext && (
              <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
