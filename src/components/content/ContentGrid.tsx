'use client'

import { Play, Check, X, MessageSquare, Download, MoreHorizontal, Clock, Eye } from 'lucide-react'

const videos = [
  {
    id: 1,
    creator: 'Noura Ahmed',
    creatorAvatar: 'NA',
    campaign: 'Safe Gallery',
    thumbnail: '/video-1.jpg',
    duration: '0:45',
    submittedAt: '2 hours ago',
    status: 'pending',
    views: null,
  },
  {
    id: 2,
    creator: 'Sara Hassan',
    creatorAvatar: 'SH',
    campaign: 'Florina Coffee',
    thumbnail: '/video-2.jpg',
    duration: '1:12',
    submittedAt: '3 hours ago',
    status: 'pending',
    views: null,
  },
  {
    id: 3,
    creator: 'Ahmed Ali',
    creatorAvatar: 'AA',
    campaign: 'Safe Gallery',
    thumbnail: '/video-3.jpg',
    duration: '0:58',
    submittedAt: '5 hours ago',
    status: 'approved',
    views: '12.5K',
  },
  {
    id: 4,
    creator: 'Fatima Omar',
    creatorAvatar: 'FO',
    campaign: 'Beauty Launch',
    thumbnail: '/video-4.jpg',
    duration: '1:30',
    submittedAt: '6 hours ago',
    status: 'revision',
    views: null,
  },
  {
    id: 5,
    creator: 'Mohammed Khalid',
    creatorAvatar: 'MK',
    campaign: 'Tech Gadget',
    thumbnail: '/video-5.jpg',
    duration: '2:05',
    submittedAt: '8 hours ago',
    status: 'pending',
    views: null,
  },
  {
    id: 6,
    creator: 'Layla Saeed',
    creatorAvatar: 'LS',
    campaign: 'Safe Gallery',
    thumbnail: '/video-6.jpg',
    duration: '0:55',
    submittedAt: '1 day ago',
    status: 'approved',
    views: '45.2K',
  },
  {
    id: 7,
    creator: 'Omar Fahad',
    creatorAvatar: 'OF',
    campaign: 'Florina Coffee',
    thumbnail: '/video-7.jpg',
    duration: '1:18',
    submittedAt: '1 day ago',
    status: 'approved',
    views: '28.7K',
  },
  {
    id: 8,
    creator: 'Reem Abdullah',
    creatorAvatar: 'RA',
    campaign: 'Beauty Launch',
    thumbnail: '/video-8.jpg',
    duration: '0:42',
    submittedAt: '2 days ago',
    status: 'rejected',
    views: null,
  },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  approved: 'bg-green-100 text-green-700 border-green-200',
  revision: 'bg-orange-100 text-orange-700 border-orange-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  revision: 'Revision',
  rejected: 'Rejected',
}

export function ContentGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-[9/16] bg-gray-900 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="h-6 w-6 text-gray-900 ml-1" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                {video.duration}
              </div>

              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusColors[video.status]}`}>
                  {statusLabels[video.status]}
                </span>
              </div>

              {/* Views (if approved) */}
              {video.views && (
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  <Eye className="h-3 w-3" />
                  {video.views}
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {video.creatorAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{video.creator}</p>
                  <p className="text-xs text-gray-500">{video.campaign}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {video.submittedAt}
              </div>

              {/* Actions */}
              {video.status === 'pending' && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors">
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              )}

              {video.status === 'approved' && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-primary-600 bg-primary-50 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              )}

              {video.status === 'revision' && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
                    Revision requested: Please improve lighting in the first 10 seconds
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 8 of 847 videos</p>
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
