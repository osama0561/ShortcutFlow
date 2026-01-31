'use client'

import { useEffect, useState } from 'react'
import { MoreHorizontal, Megaphone, Users, Eye, ChevronRight, Mail, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Client {
  id: string
  name: string
  industry: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  status: string
  created_at: string
  total_budget: number
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  ONBOARDING: 'bg-blue-100 text-blue-700',
  INACTIVE: 'bg-gray-100 text-gray-700',
  CHURNED: 'bg-red-100 text-red-700',
}

const statusLabels: Record<string, string> = {
  ACTIVE: 'Active',
  ONBOARDING: 'Onboarding',
  INACTIVE: 'Inactive',
  CHURNED: 'Churned',
}

const logoColors = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-green-400 to-green-600',
  'from-amber-400 to-amber-600',
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatBudget(amount: number): string {
  if (amount >= 1000000) return `SAR ${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `SAR ${(amount / 1000).toFixed(0)}K`
  return `SAR ${amount}`
}

export function ClientsList() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch('/api/clients')
        if (res.ok) {
          const data = await res.json()
          setClients(data)
        }
      } catch (error) {
        console.error('Failed to fetch clients:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500 mb-4">No clients yet</p>
        <p className="text-sm text-gray-400">Add your first client to get started</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-4">
                Client
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-4">
                Contact
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-4">
                Budget
              </th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client, index) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${logoColors[index % logoColors.length]} rounded-xl flex items-center justify-center text-white font-bold`}>
                      {getInitials(client.name)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.industry || 'No Industry'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{client.contact_name || 'No Contact'}</p>
                    {client.contact_email && (
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {client.contact_email}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[client.status] || 'bg-gray-100 text-gray-700'}`}>
                    {statusLabels[client.status] || client.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Since {formatDate(client.created_at)}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-gray-900">{formatBudget(client.total_budget)}</p>
                  <p className="text-xs text-gray-400">Total budget</p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    <Link
                      href={`/clients/${client.id}`}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing {clients.length} clients</p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 text-sm text-white bg-primary-500 rounded-lg hover:bg-primary-600">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
