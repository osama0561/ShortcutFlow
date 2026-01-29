'use client'

import { Search, Filter, Calendar } from 'lucide-react'

const statuses = ['All', 'Planning', 'Recruiting', 'Filming', 'Review', 'Live', 'Completed']

export function CampaignFilters() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {statuses.map((status, index) => (
            <button
              key={status}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                index === 0
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* More Filters */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
            Date Range
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>
    </div>
  )
}
