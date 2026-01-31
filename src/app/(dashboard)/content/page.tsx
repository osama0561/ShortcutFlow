import { ContentGrid } from '@/components/content/ContentGrid'
import { ContentFilters } from '@/components/content/ContentFilters'
import { ContentStats } from '@/components/content/ContentStats'

export default function ContentPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Review</h1>
        <p className="text-gray-500 mt-1">Review and approve creator submissions</p>
      </div>

      {/* Stats */}
      <ContentStats />

      {/* Filters */}
      <ContentFilters />

      {/* Content Grid */}
      <ContentGrid />
    </div>
  )
}
