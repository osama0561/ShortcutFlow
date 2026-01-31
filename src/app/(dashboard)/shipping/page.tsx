'use client'

import { useEffect, useState } from 'react'
import { Truck, Package, Search, Filter, Plus, MapPin, Calendar, ChevronRight, MoreHorizontal, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Shipment {
  id: string
  creatorName: string
  creatorHandle: string
  campaignName: string
  trackingNumber: string | null
  carrier: string | null
  status: string
  statusLabel: string
  address: string
  items: string
  createdAt: string
  estimatedDelivery: string | null
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-blue-100 text-blue-700',
  in_transit: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
}

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  shipped: Package,
  in_transit: Truck,
  delivered: CheckCircle,
  failed: AlertCircle,
}

export default function ShippingPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchShipments() {
      try {
        const res = await fetch('/api/shipping')
        if (res.ok) {
          const data = await res.json()
          setShipments(data)
        }
      } catch (error) {
        console.error('Failed to fetch shipments:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchShipments()
  }, [])

  const filteredShipments = shipments.filter(shipment => {
    const matchesFilter = filter === 'all' || shipment.status === filter
    const matchesSearch = searchQuery === '' ||
      shipment.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'pending').length,
    inTransit: shipments.filter(s => s.status === 'in_transit' || s.status === 'shipped').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipping</h1>
          <p className="text-gray-500 mt-1">Track product shipments to creators</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm">
          <Plus className="h-4 w-4" />
          New Shipment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2.5 rounded-lg">
              <Package className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Shipments</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-50 p-2.5 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-lg">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.inTransit}</p>
              <p className="text-sm text-gray-500">In Transit</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-2.5 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
              <p className="text-sm text-gray-500">Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by creator, campaign, or tracking number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'shipped', 'in_transit', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === status
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status === 'all' ? 'All' : status === 'in_transit' ? 'In Transit' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shipments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredShipments.length === 0 ? (
          <div className="p-10 text-center">
            <Truck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No shipments found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredShipments.map((shipment) => {
              const StatusIcon = statusIcons[shipment.status] || Package
              return (
                <div key={shipment.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${statusColors[shipment.status]?.replace('text-', 'bg-').replace('700', '100') || 'bg-gray-100'}`}>
                      <StatusIcon className={`h-5 w-5 ${statusColors[shipment.status]?.split(' ')[1] || 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{shipment.creatorName}</p>
                        <span className="text-gray-400">@{shipment.creatorHandle}</span>
                      </div>
                      <p className="text-sm text-gray-500">{shipment.campaignName}</p>
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-medium text-gray-900">{shipment.items}</p>
                      <p className="text-xs text-gray-500">{shipment.carrier || 'No carrier'}</p>
                    </div>
                    <div className="hidden md:block text-right">
                      {shipment.trackingNumber ? (
                        <p className="text-sm font-mono text-gray-700">{shipment.trackingNumber}</p>
                      ) : (
                        <p className="text-sm text-gray-400">No tracking</p>
                      )}
                      {shipment.estimatedDelivery && (
                        <p className="text-xs text-gray-500">Est. {new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                      )}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[shipment.status] || 'bg-gray-100 text-gray-700'}`}>
                      {shipment.statusLabel}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
