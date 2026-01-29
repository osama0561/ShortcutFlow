'use client'

import { Video, Clock, CheckCircle, XCircle } from 'lucide-react'

const stats = [
  {
    label: 'Total Submissions',
    value: '847',
    icon: Video,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    label: 'Pending Review',
    value: '67',
    icon: Clock,
    color: 'text-yellow-500 bg-yellow-50',
  },
  {
    label: 'Approved',
    value: '712',
    icon: CheckCircle,
    color: 'text-green-500 bg-green-50',
  },
  {
    label: 'Revision Needed',
    value: '68',
    icon: XCircle,
    color: 'text-red-500 bg-red-50',
  },
]

export function ContentStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
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
