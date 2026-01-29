'use client'

import { Video, FileText, Megaphone, ChevronRight } from 'lucide-react'

const approvals = [
  {
    id: 1,
    type: 'video',
    count: 8,
    label: 'videos await client review',
    icon: Video,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    id: 2,
    type: 'script',
    count: 3,
    label: 'scripts need review',
    icon: FileText,
    color: 'text-purple-500 bg-purple-50',
  },
  {
    id: 3,
    type: 'brief',
    count: 1,
    label: 'campaign brief pending',
    icon: Megaphone,
    color: 'text-amber-500 bg-amber-50',
  },
]

export function PendingApprovals() {
  const totalPending = approvals.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            {totalPending}
          </span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className={`p-2 rounded-lg ${item.color}`}>
              <item.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-semibold">{item.count}</span> {item.label}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  )
}
