'use client'

import { Search, Filter, SlidersHorizontal } from 'lucide-react'

const niches = ['All', 'Beauty', 'Fashion', 'Tech', 'Food', 'Lifestyle', 'Fitness', 'Travel']
const availability = ['All', 'Available', 'Busy', 'On Campaign']

export function CreatorFilters() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, handle, or location..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Niche Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {niches.map((niche, index) => (
            <button
              key={niche}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                index === 0
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {niche}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
          <SlidersHorizontal className="h-4 w-4" />
          Advanced Filters
        </button>
      </div>

      {/* Quick Filters Row */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">Quick filters:</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
            Available Now
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors">
            Top Rated
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
            High Engagement
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
            Riyadh Based
          </button>
        </div>
      </div>
    </div>
  )
}
