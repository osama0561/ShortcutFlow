'use client'

import { Upload, CheckCircle, UserPlus, Package } from 'lucide-react'

const activities = [
  {
    id: 1,
    user: 'Sara Ahmed',
    action: 'uploaded video #47',
    campaign: 'Safe Gallery',
    time: '5 min ago',
    icon: Upload,
    iconColor: 'text-blue-500 bg-blue-50',
  },
  {
    id: 2,
    user: 'Client',
    action: 'approved 5 videos',
    campaign: 'Florina Coffee',
    time: '12 min ago',
    icon: CheckCircle,
    iconColor: 'text-green-500 bg-green-50',
  },
  {
    id: 3,
    user: '12 creators',
    action: 'joined campaign',
    campaign: 'Beauty Launch',
    time: '1 hour ago',
    icon: UserPlus,
    iconColor: 'text-purple-500 bg-purple-50',
  },
  {
    id: 4,
    user: 'Courier',
    action: 'delivered to Noura',
    campaign: 'Tech Gadget',
    time: '2 hours ago',
    icon: Package,
    iconColor: 'text-amber-500 bg-amber-50',
  },
]

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-3">
              <div className={`p-2 rounded-lg ${activity.iconColor} h-fit`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>{' '}
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {activity.campaign} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium hover:bg-gray-50 rounded-lg transition-colors">
          View all activity
        </button>
      </div>
    </div>
  )
}
