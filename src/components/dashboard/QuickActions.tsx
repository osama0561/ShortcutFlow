'use client'

import { Plus, UserPlus, Send, FileText } from 'lucide-react'

const actions = [
  {
    name: 'New Campaign',
    description: 'Start a new UGC campaign',
    icon: Plus,
    color: 'bg-primary-500 hover:bg-primary-600',
  },
  {
    name: 'Add Creator',
    description: 'Onboard a new creator',
    icon: UserPlus,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    name: 'Send Broadcast',
    description: 'Message all creators',
    icon: Send,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    name: 'Generate Report',
    description: 'Export campaign data',
    icon: FileText,
    color: 'bg-amber-500 hover:bg-amber-600',
  },
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.name}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
          >
            <div className={`${action.color} p-2.5 rounded-lg text-white transition-colors`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-gray-900 mt-2">{action.name}</span>
            <span className="text-xs text-gray-500 mt-0.5 text-center">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
