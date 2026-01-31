'use client'

import { useEffect, useState } from 'react'
import { BarChart3, TrendingUp, Users, Eye, DollarSign, Megaphone, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalViews: number
    viewsChange: number
    totalEngagement: number
    engagementChange: number
    totalSpend: number
    spendChange: number
    activeCampaigns: number
    campaignsChange: number
  }
  topCampaigns: {
    id: string
    name: string
    views: number
    engagement: number
    spend: number
  }[]
  topCreators: {
    id: string
    name: string
    handle: string
    views: number
    engagement: number
    videos: number
  }[]
  monthlyData: {
    month: string
    views: number
    spend: number
  }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch(`/api/analytics?range=${dateRange}`)
        if (res.ok) {
          const analyticsData = await res.json()
          setData(analyticsData)
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [dateRange])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Track performance across campaigns and creators</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                dateRange === range
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-blue-50 p-2.5 rounded-lg">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${(data?.overview.viewsChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(data?.overview.viewsChange || 0) >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(data?.overview.viewsChange || 0)}%
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-gray-900">{formatNumber(data?.overview.totalViews || 0)}</p>
            <p className="text-sm text-gray-500">Total Views</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-purple-50 p-2.5 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${(data?.overview.engagementChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(data?.overview.engagementChange || 0) >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(data?.overview.engagementChange || 0)}%
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-gray-900">{(data?.overview.totalEngagement || 0).toFixed(1)}%</p>
            <p className="text-sm text-gray-500">Avg Engagement</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-green-50 p-2.5 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${(data?.overview.spendChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(data?.overview.spendChange || 0) >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(data?.overview.spendChange || 0)}%
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(data?.overview.totalSpend || 0)}</p>
            <p className="text-sm text-gray-500">Total Spend</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-amber-50 p-2.5 rounded-lg">
              <Megaphone className="h-5 w-5 text-amber-600" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${(data?.overview.campaignsChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(data?.overview.campaignsChange || 0) >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(data?.overview.campaignsChange || 0)}%
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-gray-900">{data?.overview.activeCampaigns || 0}</p>
            <p className="text-sm text-gray-500">Active Campaigns</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {data?.monthlyData.map((month, index) => {
              const maxViews = Math.max(...(data?.monthlyData.map(m => m.views) || [1]))
              const height = (month.views / maxViews) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">{formatNumber(month.views)}</span>
                    <div
                      className="w-full bg-primary-500 rounded-t-md transition-all hover:bg-primary-600"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{month.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Campaigns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Campaigns</h3>
          <div className="space-y-4">
            {data?.topCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{campaign.name}</p>
                  <p className="text-sm text-gray-500">{formatNumber(campaign.views)} views</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{campaign.engagement.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">engagement</p>
                </div>
              </div>
            ))}
            {(!data?.topCampaigns || data.topCampaigns.length === 0) && (
              <p className="text-center text-gray-500 py-8">No campaign data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Top Creators */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Creators</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Rank</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Creator</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Views</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Engagement</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Videos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.topCreators.map((creator, index) => (
                <tr key={creator.id} className="hover:bg-gray-50">
                  <td className="py-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-3">
                    <p className="font-medium text-gray-900">{creator.name}</p>
                    <p className="text-sm text-gray-500">@{creator.handle}</p>
                  </td>
                  <td className="py-3 text-right font-medium text-gray-900">{formatNumber(creator.views)}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      creator.engagement >= 5 ? 'bg-green-100 text-green-700' :
                      creator.engagement >= 3 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {creator.engagement.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 text-right text-gray-700">{creator.videos}</td>
                </tr>
              ))}
              {(!data?.topCreators || data.topCreators.length === 0) && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">No creator data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
