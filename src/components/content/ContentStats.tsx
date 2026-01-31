'use client'

import { useEffect, useState } from 'react'
import { Video, Clock, CheckCircle, XCircle } from 'lucide-react'

interface VideoStats {
  total: number
  pending: number
  approved: number
  revision: number
}

export function ContentStats() {
  const [stats, setStats] = useState<VideoStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/videos')
        if (res.ok) {
          const videos = await res.json()
          setStats({
            total: videos.length,
            pending: videos.filter((v: any) => ['PENDING_UPLOAD', 'UPLOADED', 'INTERNAL_REVIEW', 'CLIENT_REVIEW'].includes(v.status)).length,
            approved: videos.filter((v: any) => ['APPROVED', 'POSTED'].includes(v.status)).length,
            revision: videos.filter((v: any) => ['REVISION_REQUESTED', 'REJECTED'].includes(v.status)).length,
          })
        }
      } catch (error) {
        console.error('Failed to fetch video stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statItems = [
    {
      label: 'Total Submissions',
      value: stats?.total ?? 0,
      icon: Video,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      label: 'Pending Review',
      value: stats?.pending ?? 0,
      icon: Clock,
      color: 'text-yellow-500 bg-yellow-50',
    },
    {
      label: 'Approved',
      value: stats?.approved ?? 0,
      icon: CheckCircle,
      color: 'text-green-500 bg-green-50',
    },
    {
      label: 'Revision Needed',
      value: stats?.revision ?? 0,
      icon: XCircle,
      color: 'text-red-500 bg-red-50',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              <div className="space-y-2">
                <div className="h-6 w-12 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
        >
          <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
