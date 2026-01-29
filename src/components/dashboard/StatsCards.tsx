'use client'

import { Megaphone, Users, Building2, Eye, TrendingUp, TrendingDown } from 'lucide-react'

const stats = [
  {
    name: 'Active Campaigns',
    value: '8',
    change: '+2',
    changeType: 'increase',
    icon: Megaphone,
    color: 'bg-blue-500',
  },
  {
    name: 'Creator Pool',
    value: '7,200+',
    subtext: '2,100 available',
    change: '+150',
    changeType: 'increase',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    name: 'Active Clients',
    value: '15',
    subtext: '3 onboarding',
    change: '+3',
    changeType: 'increase',
    icon: Building2,
    color: 'bg-green-500',
  },
  {
    name: 'Total Views',
    value: '4.2M',
    subtext: 'This month',
    change: '+18%',
    changeType: 'increase',
    icon: Eye,
    color: 'bg-amber-500',
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className={`${stat.color} p-2.5 rounded-lg`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${
              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.changeType === 'increase' ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {stat.change}
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
