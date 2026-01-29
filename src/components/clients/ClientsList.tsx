'use client'

import { MoreHorizontal, Megaphone, Users, Eye, ChevronRight, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

const clients = [
  {
    id: 1,
    name: 'SG Corp',
    logo: 'SG',
    industry: 'Art & Supplies',
    contact: 'Ahmed Al-Rashid',
    email: 'ahmed@sgcorp.com',
    phone: '+966 50 123 4567',
    activeCampaigns: 2,
    totalCampaigns: 8,
    totalCreators: 450,
    totalViews: '4.2M',
    status: 'active',
    joinedDate: 'Jan 2024',
  },
  {
    id: 2,
    name: 'Florina',
    logo: 'FL',
    industry: 'Food & Beverage',
    contact: 'Sara Mohammed',
    email: 'sara@florina.com',
    phone: '+966 55 987 6543',
    activeCampaigns: 1,
    totalCampaigns: 5,
    totalCreators: 200,
    totalViews: '2.8M',
    status: 'active',
    joinedDate: 'Mar 2024',
  },
  {
    id: 3,
    name: 'My Beauty',
    logo: 'MB',
    industry: 'Beauty & Skincare',
    contact: 'Noura Abdullah',
    email: 'noura@mybeauty.com',
    phone: '+966 54 567 8901',
    activeCampaigns: 1,
    totalCampaigns: 3,
    totalCreators: 150,
    totalViews: '1.6M',
    status: 'active',
    joinedDate: 'Jun 2024',
  },
  {
    id: 4,
    name: 'TechCo',
    logo: 'TC',
    industry: 'Technology',
    contact: 'Khalid Omar',
    email: 'khalid@techco.com',
    phone: '+966 56 234 5678',
    activeCampaigns: 1,
    totalCampaigns: 1,
    totalCreators: 45,
    totalViews: '0',
    status: 'onboarding',
    joinedDate: 'Jan 2025',
  },
  {
    id: 5,
    name: 'Fashion House',
    logo: 'FH',
    industry: 'Fashion',
    contact: 'Layla Saeed',
    email: 'layla@fashionhouse.com',
    phone: '+966 50 345 6789',
    activeCampaigns: 1,
    totalCampaigns: 12,
    totalCreators: 600,
    totalViews: '8.5M',
    status: 'active',
    joinedDate: 'Sep 2023',
  },
]

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  onboarding: 'bg-blue-100 text-blue-700',
  inactive: 'bg-gray-100 text-gray-700',
}

const statusLabels: Record<string, string> = {
  active: 'Active',
  onboarding: 'Onboarding',
  inactive: 'Inactive',
}

const logoColors = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-green-400 to-green-600',
  'from-amber-400 to-amber-600',
]

export function ClientsList() {
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
                Campaigns
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-4">
                Performance
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
                      {client.logo}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.industry}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{client.contact}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[client.status]}`}>
                    {statusLabels[client.status]}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Since {client.joinedDate}</p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Megaphone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        <span className="font-medium">{client.activeCampaigns}</span>
                        <span className="text-gray-400">/{client.totalCampaigns}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{client.totalCreators}</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{client.totalViews}</span>
                    <span className="text-xs text-gray-400">total views</span>
                  </div>
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
        <p className="text-sm text-gray-500">Showing 5 of 15 clients</p>
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
