'use client'

import { Users, Video, CheckCircle, Eye, Clock, Package } from 'lucide-react'

const stats = [
  {
    label: 'Creators Assigned',
    value: '200/200',
    icon: Users,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    label: 'Videos Submitted',
    value: '156',
    icon: Video,
    color: 'text-purple-500 bg-purple-50',
  },
  {
    label: 'Videos Approved',
    value: '89',
    icon: CheckCircle,
    color: 'text-green-500 bg-green-50',
  },
  {
    label: 'Total Views',
    value: '1.2M',
    icon: Eye,
    color: 'text-amber-500 bg-amber-50',
  },
  {
    label: 'Products Shipped',
    value: '195/200',
    icon: Package,
    color: 'text-cyan-500 bg-cyan-50',
  },
  {
    label: 'Days Remaining',
    value: '12',
    icon: Clock,
    color: 'text-red-500 bg-red-50',
  },
]

export function CampaignStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
