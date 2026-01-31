'use client'

import { Check, FileText, Users, ScrollText, Truck, Video, Eye, Flag } from 'lucide-react'

interface Campaign {
  status: string
  creator_count: number
  products_shipped: number
  videos_submitted: number
  videos_approved: number
}

interface CampaignPipelineProps {
  campaign: Campaign
}

const statusStyles = {
  complete: {
    bg: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-500',
  },
  current: {
    bg: 'bg-primary-500',
    text: 'text-white',
    border: 'border-primary-500',
  },
  pending: {
    bg: 'bg-white',
    text: 'text-gray-400',
    border: 'border-gray-200',
  },
}

function getStageStatus(campaign: Campaign, stageName: string): 'complete' | 'current' | 'pending' {
  const { creator_count, products_shipped, videos_submitted, videos_approved, status } = campaign

  // For completed campaigns
  if (status === 'COMPLETED') {
    return 'complete'
  }

  switch (stageName) {
    case 'Brief':
      return 'complete' // Brief is always done if campaign exists
    case 'Recruit':
      return creator_count > 0 ? 'complete' : 'current'
    case 'Script':
      return creator_count > 0 ? 'complete' : 'pending'
    case 'Shipping':
      if (products_shipped >= creator_count && creator_count > 0) return 'complete'
      if (products_shipped > 0) return 'current'
      return creator_count > 0 ? 'pending' : 'pending'
    case 'Filming':
      if (videos_submitted >= creator_count && creator_count > 0) return 'complete'
      if (videos_submitted > 0) return 'current'
      return products_shipped > 0 ? 'pending' : 'pending'
    case 'Review':
      if (videos_approved >= videos_submitted && videos_submitted > 0) return 'complete'
      if (videos_submitted > 0) return 'current'
      return 'pending'
    case 'Complete':
      return status === 'COMPLETED' ? 'complete' : 'pending'
    default:
      return 'pending'
  }
}

export function CampaignPipeline({ campaign }: CampaignPipelineProps) {
  const stages = [
    { name: 'Brief', icon: FileText, count: null },
    { name: 'Recruit', icon: Users, count: `${campaign.creator_count}` },
    { name: 'Script', icon: ScrollText, count: `${campaign.creator_count} sent` },
    { name: 'Shipping', icon: Truck, count: `${campaign.products_shipped}/${campaign.creator_count}` },
    { name: 'Filming', icon: Video, count: `${campaign.videos_submitted}/${campaign.creator_count}` },
    { name: 'Review', icon: Eye, count: `${campaign.videos_approved} approved` },
    { name: 'Complete', icon: Flag, count: null },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Pipeline</h3>

      <div className="flex items-start justify-between">
        {stages.map((stage, index) => {
          const stageStatus = getStageStatus(campaign, stage.name)
          const styles = statusStyles[stageStatus]
          const prevStageStatus = index > 0 ? getStageStatus(campaign, stages[index - 1].name) : null

          return (
            <div key={stage.name} className="flex-1 flex flex-col items-center relative">
              {/* Connector Line */}
              {index > 0 && (
                <div
                  className={`absolute top-5 right-1/2 w-full h-0.5 ${
                    stageStatus === 'complete' || prevStageStatus === 'complete'
                      ? 'bg-green-500'
                      : prevStageStatus === 'current'
                      ? 'bg-primary-500'
                      : 'bg-gray-200'
                  }`}
                  style={{ transform: 'translateX(50%)' }}
                />
              )}

              {/* Stage Icon */}
              <div
                className={`relative z-10 w-10 h-10 rounded-full border-2 ${styles.border} ${styles.bg} flex items-center justify-center`}
              >
                {stageStatus === 'complete' ? (
                  <Check className="h-5 w-5 text-white" />
                ) : (
                  <stage.icon className={`h-5 w-5 ${styles.text}`} />
                )}
              </div>

              {/* Stage Label */}
              <p className={`text-sm font-medium mt-2 ${
                stageStatus === 'pending' ? 'text-gray-400' : 'text-gray-900'
              }`}>
                {stage.name}
              </p>

              {/* Stage Count */}
              {stage.count && (
                <p className="text-xs text-gray-500 mt-0.5">{stage.count}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
