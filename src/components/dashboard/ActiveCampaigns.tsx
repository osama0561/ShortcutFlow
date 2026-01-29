'use client'

import { MoreHorizontal, ChevronRight } from 'lucide-react'

const campaigns = [
  {
    id: 1,
    name: 'Safe Gallery UGC',
    client: 'SG Corp',
    creators: { current: 200, total: 200 },
    status: 'review',
    statusLabel: 'In Review',
    dueDate: 'Feb 15',
    progress: 78,
  },
  {
    id: 2,
    name: 'Florina Coffee Launch',
    client: 'Florina',
    creators: { current: 50, total: 50 },
    status: 'live',
    statusLabel: 'Live',
    dueDate: 'Feb 20',
    progress: 100,
  },
  {
    id: 3,
    name: 'Beauty Product Launch',
    client: 'My Beauty',
    creators: { current: 87, total: 100 },
    status: 'filming',
    statusLabel: 'Filming',
    dueDate: 'Feb 28',
    progress: 62,
  },
  {
    id: 4,
    name: 'Tech Gadget Promo',
    client: 'TechCo',
    creators: { current: 45, total: 150 },
    status: 'recruiting',
    statusLabel: 'Recruiting',
    dueDate: 'Mar 5',
    progress: 30,
  },
  {
    id: 5,
    name: 'Fashion Week Special',
    client: 'Fashion House',
    creators: { current: 0, total: 80 },
    status: 'planning',
    statusLabel: 'Planning',
    dueDate: 'Mar 15',
    progress: 10,
  },
]

const statusColors: Record<string, string> = {
  review: 'bg-yellow-100 text-yellow-700',
  live: 'bg-green-100 text-green-700',
  filming: 'bg-blue-100 text-blue-700',
  recruiting: 'bg-orange-100 text-orange-700',
  planning: 'bg-gray-100 text-gray-700',
}

export function ActiveCampaigns() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Campaign
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Creators
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Progress
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Due
              </th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{campaign.name}</p>
                    <p className="text-sm text-gray-500">{campaign.client}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-900">
                    {campaign.creators.current}/{campaign.creators.total}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
                    {campaign.statusLabel}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full transition-all"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{campaign.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-500">{campaign.dueDate}</span>
                </td>
                <td className="px-5 py-4">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
