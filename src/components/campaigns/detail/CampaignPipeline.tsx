'use client'

import { Check, FileText, Users, ScrollText, Truck, Video, Eye, Flag } from 'lucide-react'

const stages = [
  { name: 'Brief', icon: FileText, status: 'complete', count: null },
  { name: 'Recruit', icon: Users, status: 'complete', count: '200/200' },
  { name: 'Script', icon: ScrollText, status: 'complete', count: '200 sent' },
  { name: 'Shipping', icon: Truck, status: 'complete', count: '195/200' },
  { name: 'Filming', icon: Video, status: 'current', count: '156/200' },
  { name: 'Review', icon: Eye, status: 'pending', count: '67 pending' },
  { name: 'Complete', icon: Flag, status: 'pending', count: null },
]

const statusStyles = {
  complete: {
    bg: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-500',
    line: 'bg-green-500',
  },
  current: {
    bg: 'bg-primary-500',
    text: 'text-white',
    border: 'border-primary-500',
    line: 'bg-gray-200',
  },
  pending: {
    bg: 'bg-white',
    text: 'text-gray-400',
    border: 'border-gray-200',
    line: 'bg-gray-200',
  },
}

export function CampaignPipeline() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Pipeline</h3>

      <div className="flex items-start justify-between">
        {stages.map((stage, index) => {
          const styles = statusStyles[stage.status as keyof typeof statusStyles]
          return (
            <div key={stage.name} className="flex-1 flex flex-col items-center relative">
              {/* Connector Line */}
              {index > 0 && (
                <div
                  className={`absolute top-5 right-1/2 w-full h-0.5 ${
                    stage.status === 'complete' || stages[index - 1].status === 'complete'
                      ? 'bg-green-500'
                      : stages[index - 1].status === 'current'
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
                {stage.status === 'complete' ? (
                  <Check className="h-5 w-5 text-white" />
                ) : (
                  <stage.icon className={`h-5 w-5 ${styles.text}`} />
                )}
              </div>

              {/* Stage Label */}
              <p className={`text-sm font-medium mt-2 ${
                stage.status === 'pending' ? 'text-gray-400' : 'text-gray-900'
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
