'use client'

import { Search, Filter, MoreHorizontal, Check, X, Upload, Package, FileText, Eye } from 'lucide-react'

const creators = [
  {
    id: 1,
    name: 'Noura Ahmed',
    avatar: 'NA',
    followers: '45K',
    status: 'complete',
    shipped: true,
    scriptRead: true,
    videoSubmitted: true,
    approved: true,
    paid: true,
    videoUrl: '#',
  },
  {
    id: 2,
    name: 'Sara Hassan',
    avatar: 'SH',
    followers: '32K',
    status: 'filming',
    shipped: true,
    scriptRead: true,
    videoSubmitted: false,
    approved: false,
    paid: false,
    videoUrl: null,
  },
  {
    id: 3,
    name: 'Ahmed Ali',
    avatar: 'AA',
    followers: '28K',
    status: 'scripted',
    shipped: true,
    scriptRead: true,
    videoSubmitted: false,
    approved: false,
    paid: false,
    videoUrl: null,
  },
  {
    id: 4,
    name: 'Fatima Omar',
    avatar: 'FO',
    followers: '67K',
    status: 'shipping',
    shipped: false,
    scriptRead: true,
    videoSubmitted: false,
    approved: false,
    paid: false,
    videoUrl: null,
  },
  {
    id: 5,
    name: 'Mohammed Khalid',
    avatar: 'MK',
    followers: '52K',
    status: 'review',
    shipped: true,
    scriptRead: true,
    videoSubmitted: true,
    approved: false,
    paid: false,
    videoUrl: '#',
  },
  {
    id: 6,
    name: 'Layla Saeed',
    avatar: 'LS',
    followers: '89K',
    status: 'complete',
    shipped: true,
    scriptRead: true,
    videoSubmitted: true,
    approved: true,
    paid: true,
    videoUrl: '#',
  },
]

const statusColors: Record<string, string> = {
  complete: 'bg-green-100 text-green-700',
  review: 'bg-yellow-100 text-yellow-700',
  filming: 'bg-blue-100 text-blue-700',
  scripted: 'bg-purple-100 text-purple-700',
  shipping: 'bg-orange-100 text-orange-700',
}

const statusLabels: Record<string, string> = {
  complete: 'Complete',
  review: 'In Review',
  filming: 'Filming',
  scripted: 'Script Sent',
  shipping: 'Shipping',
}

export function CreatorList() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Creators (200)</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search creators..."
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Creator
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Status
              </th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                <Package className="h-4 w-4 inline" title="Shipped" />
              </th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                <FileText className="h-4 w-4 inline" title="Script Read" />
              </th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                <Upload className="h-4 w-4 inline" title="Video Submitted" />
              </th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                <Check className="h-4 w-4 inline" title="Approved" />
              </th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Paid
              </th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {creators.map((creator) => (
              <tr key={creator.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {creator.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{creator.name}</p>
                      <p className="text-sm text-gray-500">{creator.followers} followers</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[creator.status]}`}>
                    {statusLabels[creator.status]}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  {creator.shipped ? (
                    <Check className="h-5 w-5 text-green-500 inline" />
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="px-5 py-4 text-center">
                  {creator.scriptRead ? (
                    <Check className="h-5 w-5 text-green-500 inline" />
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="px-5 py-4 text-center">
                  {creator.videoSubmitted ? (
                    <button className="p-1 text-primary-500 hover:text-primary-600 hover:bg-primary-50 rounded">
                      <Eye className="h-5 w-5" />
                    </button>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="px-5 py-4 text-center">
                  {creator.approved ? (
                    <Check className="h-5 w-5 text-green-500 inline" />
                  ) : creator.videoSubmitted ? (
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1 text-green-500 hover:bg-green-50 rounded">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="px-5 py-4 text-center">
                  {creator.paid ? (
                    <span className="text-xs font-medium text-green-600">SAR 150</span>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 6 of 200 creators</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm text-white bg-primary-500 rounded-lg hover:bg-primary-600">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
