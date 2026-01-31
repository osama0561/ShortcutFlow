'use client'

import { useEffect, useState } from 'react'
import { Building2, Megaphone, CreditCard, TrendingUp } from 'lucide-react'

interface ClientStatsData {
  totalClients: number
  activeCampaigns: number
  totalRevenue: number
  avgCampaignSize: number
}

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `SAR ${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `SAR ${(amount / 1000).toFixed(0)}K`
  return `SAR ${amount}`
}

export function ClientStats() {
  const [stats, setStats] = useState<ClientStatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/clients/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch client stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statItems = [
    {
      label: 'Total Clients',
      value: stats?.totalClients ?? 0,
      change: 'All time',
      icon: Building2,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      label: 'Active Campaigns',
      value: stats?.activeCampaigns ?? 0,
      change: 'Across all clients',
      icon: Megaphone,
      color: 'text-green-500 bg-green-50',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue ?? 0),
      change: 'Total budget',
      icon: CreditCard,
      color: 'text-amber-500 bg-amber-50',
      isFormatted: true,
    },
    {
      label: 'Avg. Campaign Size',
      value: stats?.avgCampaignSize ?? 0,
      change: 'Creators per campaign',
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
          <p className="text-2xl font-bold text-gray-900">
            {stat.isFormatted ? stat.value : stat.value.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
          <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
  )
}
