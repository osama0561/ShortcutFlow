'use client'

import { useEffect, useState } from 'react'
import { Upload, CheckCircle, UserPlus, Package, Activity } from 'lucide-react'

interface ActivityItem {
  id: string
  action: string
  description: string
  entityType: string | null
  time: string
}

const actionIcons: Record<string, { icon: typeof Upload; color: string }> = {
  uploaded_video: { icon: Upload, color: 'text-blue-500 bg-blue-50' },
  approved_video: { icon: CheckCircle, color: 'text-green-500 bg-green-50' },
  joined_campaign: { icon: UserPlus, color: 'text-purple-500 bg-purple-50' },
  delivered: { icon: Package, color: 'text-amber-500 bg-amber-50' },
  default: { icon: Activity, color: 'text-gray-500 bg-gray-50' },
}

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch('/api/activities')
        if (res.ok) {
          const data = await res.json()
          setActivities(data)
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchActivities()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="p-5 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-5">
        {activities.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const iconConfig = actionIcons[activity.action] || actionIcons.default
              const Icon = iconConfig.icon
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className={`p-2 rounded-lg ${iconConfig.color} h-fit`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <button className="w-full mt-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium hover:bg-gray-50 rounded-lg transition-colors">
          View all activity
        </button>
      </div>
    </div>
  )
}
