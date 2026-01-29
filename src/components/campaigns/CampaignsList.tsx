'use client'

import { MoreHorizontal, Users, Video, Eye, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const campaigns = [
  {
    id: 1,
    name: 'Safe Gallery UGC Campaign',
    client: 'SG Corp',
    description: 'Product showcase for art supplies with 200 creators',
    image: '/campaign-1.jpg',
    creators: { current: 200, total: 200 },
    videos: { submitted: 156, approved: 89 },
    views: '1.2M',
    status: 'review',
    statusLabel: 'In Review',
    dueDate: 'Feb 15, 2025',
    progress: 78,
    stages: {
      brief: true,
      recruit: true,
      script: true,
      shipping: true,
      filming: true,
      review: false,
      complete: false,
    },
  },
  {
    id: 2,
    name: 'Florina Coffee Launch',
    client: 'Florina',
    description: 'New coffee blend launch campaign',
    image: '/campaign-2.jpg',
    creators: { current: 50, total: 50 },
    videos: { submitted: 50, approved: 50 },
    views: '1.4M',
    status: 'live',
    statusLabel: 'Live',
    dueDate: 'Feb 20, 2025',
    progress: 100,
    stages: {
      brief: true,
      recruit: true,
      script: true,
      shipping: true,
      filming: true,
      review: true,
      complete: true,
    },
  },
  {
    id: 3,
    name: 'Beauty Product Launch',
    client: 'My Beauty',
    description: 'Skincare routine videos with beauty influencers',
    image: '/campaign-3.jpg',
    creators: { current: 87, total: 100 },
    videos: { submitted: 45, approved: 32 },
    views: '340K',
    status: 'filming',
    statusLabel: 'Filming',
    dueDate: 'Feb 28, 2025',
    progress: 62,
    stages: {
      brief: true,
      recruit: true,
      script: true,
      shipping: true,
      filming: false,
      review: false,
      complete: false,
    },
  },
  {
    id: 4,
    name: 'Tech Gadget Promo',
    client: 'TechCo',
    description: 'Unboxing and review videos for new gadgets',
    image: '/campaign-4.jpg',
    creators: { current: 45, total: 150 },
    videos: { submitted: 0, approved: 0 },
    views: '0',
    status: 'recruiting',
    statusLabel: 'Recruiting',
    dueDate: 'Mar 5, 2025',
    progress: 30,
    stages: {
      brief: true,
      recruit: false,
      script: false,
      shipping: false,
      filming: false,
      review: false,
      complete: false,
    },
  },
]

const statusColors: Record<string, string> = {
  review: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  live: 'bg-green-100 text-green-700 border-green-200',
  filming: 'bg-blue-100 text-blue-700 border-blue-200',
  recruiting: 'bg-orange-100 text-orange-700 border-orange-200',
  planning: 'bg-gray-100 text-gray-700 border-gray-200',
}

const stageLabels = ['Brief', 'Recruit', 'Script', 'Ship', 'Film', 'Review', 'Done']

export function CampaignsList() {
  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Link
          key={campaign.id}
          href={`/campaigns/${campaign.id}`}
          className="block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all"
        >
          <div className="p-5">
            <div className="flex items-start justify-between">
              {/* Campaign Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColors[campaign.status]}`}>
                    {campaign.statusLabel}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{campaign.client} • {campaign.description}</p>

                {/* Stats Row */}
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{campaign.creators.current}/{campaign.creators.total} creators</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Video className="h-4 w-4 text-gray-400" />
                    <span>{campaign.videos.submitted} videos ({campaign.videos.approved} approved)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span>{campaign.views} views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>Due {campaign.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Pipeline Stages */}
            <div className="mt-5 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-1">
                {Object.entries(campaign.stages).map(([stage, completed], index) => (
                  <div key={stage} className="flex-1 flex items-center">
                    <div className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-full h-2 rounded-full ${
                          completed ? 'bg-primary-500' : 'bg-gray-200'
                        }`}
                      />
                      <span className="text-xs text-gray-500 mt-1">{stageLabels[index]}</span>
                    </div>
                    {index < Object.keys(campaign.stages).length - 1 && (
                      <div className="w-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
