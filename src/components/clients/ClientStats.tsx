'use client'

import { Building2, Megaphone, CreditCard, TrendingUp } from 'lucide-react'

const stats = [
  {
    label: 'Total Clients',
    value: '15',
    change: '+3 this quarter',
    icon: Building2,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    label: 'Active Campaigns',
    value: '8',
    change: 'Across all clients',
    icon: Megaphone,
    color: 'text-green-500 bg-green-50',
  },
  {
    label: 'Total Revenue',
    value: 'SAR 485K',
    change: 'This quarter',
    icon: CreditCard,
    color: 'text-amber-500 bg-amber-50',
  },
  {
    label: 'Avg. Campaign Size',
    value: '120',
    change: 'Creators per campaign',
    icon: TrendingUp,
    color: 'text-purple-500 bg-purple-50',
  },
]

export function ClientStats() {
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
