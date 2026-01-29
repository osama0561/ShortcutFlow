'use client'

import { Bell, Search, ChevronDown, Plus } from 'lucide-react'

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns, creators, clients..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* New Campaign Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm">
          <Plus className="h-4 w-4" />
          New Campaign
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            AM
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-700">Account Manager</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </header>
  )
}
