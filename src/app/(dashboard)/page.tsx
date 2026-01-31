import { StatsCards } from '@/components/dashboard/StatsCards'
import { ActiveCampaigns } from '@/components/dashboard/ActiveCampaigns'
import { PendingApprovals } from '@/components/dashboard/PendingApprovals'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { QuickActions } from '@/components/dashboard/QuickActions'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your campaigns.</p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ActiveCampaigns />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PendingApprovals />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
