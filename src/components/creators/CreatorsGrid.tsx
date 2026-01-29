'use client'

import { Star, Instagram, Video, MoreHorizontal, MapPin, CheckCircle } from 'lucide-react'

const creators = [
  {
    id: 1,
    name: 'Noura Ahmed',
    handle: '@noura.creates',
    avatar: 'NA',
    location: 'Riyadh',
    niche: 'Beauty',
    followers: '45K',
    engagement: '4.8%',
    rating: 4.9,
    completedCampaigns: 12,
    status: 'available',
    verified: true,
  },
  {
    id: 2,
    name: 'Sara Hassan',
    handle: '@sara.lifestyle',
    avatar: 'SH',
    location: 'Jeddah',
    niche: 'Lifestyle',
    followers: '32K',
    engagement: '5.2%',
    rating: 4.7,
    completedCampaigns: 8,
    status: 'available',
    verified: true,
  },
  {
    id: 3,
    name: 'Ahmed Ali',
    handle: '@tech.ahmed',
    avatar: 'AA',
    location: 'Riyadh',
    niche: 'Tech',
    followers: '28K',
    engagement: '3.9%',
    rating: 4.5,
    completedCampaigns: 15,
    status: 'on_campaign',
    verified: false,
  },
  {
    id: 4,
    name: 'Fatima Omar',
    handle: '@fatima.beauty',
    avatar: 'FO',
    location: 'Dammam',
    niche: 'Beauty',
    followers: '67K',
    engagement: '4.1%',
    rating: 4.8,
    completedCampaigns: 20,
    status: 'available',
    verified: true,
  },
  {
    id: 5,
    name: 'Mohammed Khalid',
    handle: '@moh.fitness',
    avatar: 'MK',
    location: 'Riyadh',
    niche: 'Fitness',
    followers: '52K',
    engagement: '6.3%',
    rating: 4.6,
    completedCampaigns: 7,
    status: 'on_campaign',
    verified: true,
  },
  {
    id: 6,
    name: 'Layla Saeed',
    handle: '@layla.fashion',
    avatar: 'LS',
    location: 'Jeddah',
    niche: 'Fashion',
    followers: '89K',
    engagement: '4.5%',
    rating: 5.0,
    completedCampaigns: 25,
    status: 'available',
    verified: true,
  },
  {
    id: 7,
    name: 'Omar Fahad',
    handle: '@omar.food',
    avatar: 'OF',
    location: 'Riyadh',
    niche: 'Food',
    followers: '41K',
    engagement: '5.8%',
    rating: 4.4,
    completedCampaigns: 10,
    status: 'available',
    verified: false,
  },
  {
    id: 8,
    name: 'Reem Abdullah',
    handle: '@reem.travel',
    avatar: 'RA',
    location: 'Khobar',
    niche: 'Travel',
    followers: '76K',
    engagement: '3.7%',
    rating: 4.7,
    completedCampaigns: 18,
    status: 'busy',
    verified: true,
  },
]

const statusColors: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  on_campaign: 'bg-blue-100 text-blue-700',
  busy: 'bg-gray-100 text-gray-700',
}

const statusLabels: Record<string, string> = {
  available: 'Available',
  on_campaign: 'On Campaign',
  busy: 'Busy',
}

const nicheColors: Record<string, string> = {
  Beauty: 'bg-pink-100 text-pink-700',
  Lifestyle: 'bg-purple-100 text-purple-700',
  Tech: 'bg-blue-100 text-blue-700',
  Fashion: 'bg-amber-100 text-amber-700',
  Fitness: 'bg-green-100 text-green-700',
  Food: 'bg-orange-100 text-orange-700',
  Travel: 'bg-cyan-100 text-cyan-700',
}

export function CreatorsGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-medium">
                      {creator.avatar}
                    </div>
                    {creator.verified && (
                      <CheckCircle className="absolute -bottom-0.5 -right-0.5 h-4 w-4 text-primary-500 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{creator.name}</p>
                    <p className="text-sm text-gray-500">{creator.handle}</p>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mt-3">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${nicheColors[creator.niche]}`}>
                  {creator.niche}
                </span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[creator.status]}`}>
                  {statusLabels[creator.status]}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 mt-3 text-sm text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                {creator.location}
              </div>
            </div>

            {/* Stats */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{creator.followers}</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{creator.engagement}</p>
                  <p className="text-xs text-gray-500">Engagement</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <p className="text-sm font-semibold text-gray-900">{creator.rating}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {creator.completedCampaigns} campaigns completed
              </span>
              <button className="px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 8 of 7,200 creators</p>
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
