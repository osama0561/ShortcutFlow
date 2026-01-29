'use client'

import { Users, UserCheck, Star, TrendingUp } from 'lucide-react'

const stats = [
  {
    label: 'Total Creators',
    value: '7,200+',
    change: '+150 this month',
    icon: Users,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    label: 'Available Now',
    value: '2,100',
    change: 'Ready for campaigns',
    icon: UserCheck,
    color: 'text-green-500 bg-green-50',
  },
  {
    label: 'Top Rated',
    value: '450',
    change: '4.5+ star rating',
    icon: Star,
    color: 'text-amber-500 bg-amber-50',
  },
  {
    label: 'Avg Performance',
    value: '4.2%',
    change: 'Engagement rate',
    icon: TrendingUp,
    color: 'text-purple-500 bg-purple-50',
  },
]

export function CreatorStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
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
