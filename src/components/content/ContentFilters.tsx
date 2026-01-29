'use client'

import { Search, Filter } from 'lucide-react'

const statuses = ['All', 'Pending', 'Approved', 'Revision Needed', 'Rejected']
const campaigns = ['All Campaigns', 'Safe Gallery', 'Florina Coffee', 'Beauty Launch', 'Tech Gadget']

export function ContentFilters() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by creator name..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Campaign Filter */}
        <select className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
          {campaigns.map((campaign) => (
            <option key={campaign} value={campaign}>{campaign}</option>
          ))}
        </select>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {statuses.map((status, index) => (
            <button
              key={status}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                index === 1
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
