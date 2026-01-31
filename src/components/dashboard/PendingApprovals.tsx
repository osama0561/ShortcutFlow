'use client'

import { useEffect, useState } from 'react'
import { Video, Megaphone, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Approvals {
  videos: number
  campaigns: number
}

export function PendingApprovals() {
  const [approvals, setApprovals] = useState<Approvals | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchApprovals() {
      try {
        const res = await fetch('/api/dashboard/approvals')
        if (res.ok) {
          const data = await res.json()
          setApprovals(data)
        }
      } catch (error) {
        console.error('Failed to fetch approvals:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchApprovals()
  }, [])

  const totalPending = (approvals?.videos || 0) + (approvals?.campaigns || 0)

  const approvalItems = [
    {
      id: 'videos',
      type: 'video',
      count: approvals?.videos || 0,
      label: 'videos await review',
      icon: Video,
      color: 'text-blue-500 bg-blue-50',
      href: '/content',
    },
    {
      id: 'campaigns',
      type: 'campaign',
      count: approvals?.campaigns || 0,
      label: 'campaigns in review',
      icon: Megaphone,
      color: 'text-amber-500 bg-amber-50',
      href: '/campaigns',
    },
  ].filter(item => item.count > 0)

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="p-5 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
          {totalPending > 0 && (
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              {totalPending}
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        {approvalItems.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No pending approvals</p>
        ) : (
          <div className="space-y-3">
            {approvalItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{item.count}</span> {item.label}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
