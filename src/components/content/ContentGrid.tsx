'use client'

import { useEffect, useState } from 'react'
import { Play, Check, X, MessageSquare, Download, MoreHorizontal, Clock, Eye, Loader2 } from 'lucide-react'

interface Video {
  id: string
  title: string
  file_url: string | null
  thumbnail_url: string | null
  duration: number | null
  status: string
  revision_note: string | null
  client_note: string | null
  views: number
  created_at: string
  creator: {
    id: string
    name: string
    handle: string | null
    email: string
  } | null
  campaign: {
    id: string
    name: string
  } | null
}

const statusColors: Record<string, string> = {
  PENDING_UPLOAD: 'bg-gray-100 text-gray-700 border-gray-200',
  UPLOADED: 'bg-blue-100 text-blue-700 border-blue-200',
  INTERNAL_REVIEW: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  CLIENT_REVIEW: 'bg-purple-100 text-purple-700 border-purple-200',
  REVISION_REQUESTED: 'bg-orange-100 text-orange-700 border-orange-200',
  APPROVED: 'bg-green-100 text-green-700 border-green-200',
  REJECTED: 'bg-red-100 text-red-700 border-red-200',
  POSTED: 'bg-teal-100 text-teal-700 border-teal-200',
}

const statusLabels: Record<string, string> = {
  PENDING_UPLOAD: 'Pending Upload',
  UPLOADED: 'Uploaded',
  INTERNAL_REVIEW: 'Internal Review',
  CLIENT_REVIEW: 'Client Review',
  REVISION_REQUESTED: 'Revision',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  POSTED: 'Posted',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
  return views.toString()
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  return 'Just now'
}

export function ContentGrid() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  async function fetchVideos() {
    try {
      const res = await fetch('/api/videos')
      if (res.ok) {
        const data = await res.json()
        setVideos(data)
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateVideoStatus(videoId: string, status: string, revisionNote?: string) {
    setUpdating(videoId)
    try {
      const res = await fetch('/api/videos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: videoId,
          status,
          revision_note: revisionNote
        }),
      })
      if (res.ok) {
        await fetchVideos()
      }
    } catch (error) {
      console.error('Failed to update video:', error)
    } finally {
      setUpdating(null)
    }
  }

  function handleApprove(videoId: string) {
    updateVideoStatus(videoId, 'APPROVED')
  }

  function handleReject(videoId: string) {
    const note = prompt('Enter revision note (optional):')
    updateVideoStatus(videoId, 'REVISION_REQUESTED', note || undefined)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500 mb-4">No videos yet</p>
        <p className="text-sm text-gray-400">Videos will appear here once creators start uploading</p>
      </div>
    )
  }

  const isPendingReview = (status: string) =>
    ['UPLOADED', 'INTERNAL_REVIEW', 'CLIENT_REVIEW'].includes(status)

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
                {formatDuration(video.duration)}
              </div>

              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusColors[video.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                  {statusLabels[video.status] || video.status}
                </span>
              </div>

              {/* Views (if approved/posted) */}
              {video.views > 0 && (
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  <Eye className="h-3 w-3" />
                  {formatViews(video.views)}
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {video.creator ? getInitials(video.creator.name) : '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {video.creator?.name || 'Unknown Creator'}
                  </p>
                  <p className="text-xs text-gray-500">{video.campaign?.name || 'No Campaign'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {timeAgo(video.created_at)}
              </div>

              {/* Actions for pending review */}
              {isPendingReview(video.status) && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleApprove(video.id)}
                    disabled={updating === video.id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {updating === video.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Approve
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleReject(video.id)}
                    disabled={updating === video.id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                    Revision
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Approved/Posted actions */}
              {['APPROVED', 'POSTED'].includes(video.status) && (
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

              {/* Revision note */}
              {video.status === 'REVISION_REQUESTED' && video.revision_note && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
                    Revision requested: {video.revision_note}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing {videos.length} videos</p>
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
