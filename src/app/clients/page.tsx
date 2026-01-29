import { ClientsList } from '@/components/clients/ClientsList'
import { ClientStats } from '@/components/clients/ClientStats'
import { Building2 } from 'lucide-react'

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1">Manage your client relationships and campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm">
          <Building2 className="h-4 w-4" />
          Add Client
        </button>
      </div>

      {/* Stats */}
      <ClientStats />

      {/* Clients List */}
      <ClientsList />
    </div>
  )
}
