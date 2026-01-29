'use client'

import { ArrowLeft, MoreHorizontal, MessageSquare, FileDown, Settings } from 'lucide-react'
import Link from 'next/link'

export function CampaignHeader() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link
            href="/campaigns"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Safe Gallery UGC Campaign</h1>
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-yellow-100 text-yellow-700 border-yellow-200">
                In Review
              </span>
            </div>
            <p className="text-gray-500 mt-1">SG Corp • Product showcase for art supplies</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">200</span> creators
              </span>
              <span className="text-sm text-gray-500">
                Due <span className="font-medium text-gray-900">Feb 15, 2025</span>
              </span>
              <span className="text-sm text-gray-500">
                Budget <span className="font-medium text-gray-900">SAR 45,000</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <MessageSquare className="h-4 w-4" />
            Message All
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <FileDown className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
