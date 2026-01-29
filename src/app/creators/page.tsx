import { CreatorsGrid } from '@/components/creators/CreatorsGrid'
import { CreatorFilters } from '@/components/creators/CreatorFilters'
import { CreatorStats } from '@/components/creators/CreatorStats'
import { UserPlus } from 'lucide-react'

export default function CreatorsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Creators</h1>
          <p className="text-gray-500 mt-1">Manage your creator pool and track performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm">
          <UserPlus className="h-4 w-4" />
          Add Creator
        </button>
      </div>

      {/* Stats */}
      <CreatorStats />

      {/* Filters */}
      <CreatorFilters />

      {/* Creators Grid */}
      <CreatorsGrid />
    </div>
  )
}
