'use client'

import { useEffect, useState } from 'react'
import { CreditCard, DollarSign, Search, Plus, CheckCircle, Clock, AlertCircle, XCircle, MoreHorizontal, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface Payment {
  id: string
  creatorName: string
  creatorHandle: string
  campaignName: string
  amount: number
  currency: string
  status: string
  statusLabel: string
  type: string
  method: string
  createdAt: string
  paidAt: string | null
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  paid: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-100 text-gray-700',
}

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  processing: CreditCard,
  paid: CheckCircle,
  failed: XCircle,
  cancelled: AlertCircle,
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch('/api/payments')
        if (res.ok) {
          const data = await res.json()
          setPayments(data)
        }
      } catch (error) {
        console.error('Failed to fetch payments:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPayments()
  }, [])

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter
    const matchesSearch = searchQuery === '' ||
      payment.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.campaignName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
  }

  const stats = {
    totalPaid: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    thisMonth: payments.filter(p => {
      const paidDate = p.paidAt ? new Date(p.paidAt) : null
      const now = new Date()
      return paidDate && paidDate.getMonth() === now.getMonth() && paidDate.getFullYear() === now.getFullYear()
    }).reduce((sum, p) => sum + p.amount, 0),
    count: payments.length,
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
              <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
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
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 mt-1">Manage creator payments and transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm">
          <Plus className="h-4 w-4" />
          New Payment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-green-50 p-2.5 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              +12%
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalPaid)}</p>
            <p className="text-sm text-gray-500">Total Paid</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-yellow-50 p-2.5 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.pending)}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-blue-50 p-2.5 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              +8%
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.thisMonth)}</p>
            <p className="text-sm text-gray-500">This Month</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-purple-50 p-2.5 rounded-lg">
              <CreditCard className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-gray-900">{stats.count}</p>
            <p className="text-sm text-gray-500">Total Transactions</p>
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
              placeholder="Search by creator or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'processing', 'paid', 'failed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === status
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredPayments.length === 0 ? (
          <div className="p-10 text-center">
            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No payments found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Creator</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Campaign</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Type</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Amount</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => {
                const StatusIcon = statusIcons[payment.status] || Clock
                return (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{payment.creatorName}</p>
                        <p className="text-sm text-gray-500">@{payment.creatorHandle}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-700">{payment.campaignName}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-700 capitalize">{payment.type}</p>
                      <p className="text-xs text-gray-500">{payment.method}</p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(payment.amount, payment.currency)}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[payment.status] || 'bg-gray-100 text-gray-700'}`}>
                        <StatusIcon className="h-3 w-3" />
                        {payment.statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-700">{new Date(payment.createdAt).toLocaleDateString()}</p>
                      {payment.paidAt && (
                        <p className="text-xs text-gray-500">Paid {new Date(payment.paidAt).toLocaleDateString()}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
