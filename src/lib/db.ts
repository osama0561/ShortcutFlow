import { createServerClient } from './supabase'

// Types
export interface Campaign {
  id: string
  name: string
  description: string | null
  brief: string | null
  script: string | null
  status: string
  target_creators: number
  budget: number | null
  start_date: string | null
  end_date: string | null
  client_id: string
  manager_id: string | null
  created_at: string
  updated_at: string
  client?: Client
  manager?: User
}

export interface Client {
  id: string
  name: string
  logo: string | null
  industry: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  created_at: string
  updated_at: string
}

export interface Creator {
  id: string
  name: string
  email: string
  phone: string | null
  avatar: string | null
  handle: string | null
  niche: string | null
  location: string | null
  followers: number
  engagement: number
  rating: number
  completed_jobs: number
  status: string
  bank_name: string | null
  bank_account: string | null
  address: string | null
  city: string | null
  verified: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string | null
  role: string
  image: string | null
  created_at: string
}

export interface Video {
  id: string
  title: string | null
  url: string | null
  thumbnail_url: string | null
  duration: number | null
  status: string
  revision_note: string | null
  client_note: string | null
  tiktok_url: string | null
  views: number
  likes: number
  comments: number
  campaign_id: string
  creator_id: string
  created_at: string
  creator?: Creator
  campaign?: Campaign
}

export interface Activity {
  id: string
  action: string
  description: string
  entity_type: string | null
  entity_id: string | null
  user_id: string | null
  created_at: string
}

// Database service
export const db = {
  // Campaigns
  campaigns: {
    async getAll() {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          client:clients(*),
          manager:users(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as (Campaign & { client: Client; manager: User | null })[]
    },

    async getById(id: string) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          client:clients(*),
          manager:users(*)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return data as Campaign & { client: Client; manager: User | null }
    },

    async create(campaign: Partial<Campaign>) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('campaigns')
        .insert(campaign)
        .select()
        .single()

      if (error) throw error
      return data as Campaign
    },

    async update(id: string, campaign: Partial<Campaign>) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('campaigns')
        .update(campaign)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Campaign
    },

    async delete(id: string) {
      const supabase = createServerClient()
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id)

      if (error) throw error
    },

    async getStats() {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('campaigns')
        .select('status')

      if (error) throw error

      const stats = {
        total: data.length,
        draft: data.filter(c => c.status === 'DRAFT').length,
        recruiting: data.filter(c => c.status === 'RECRUITING').length,
        live: data.filter(c => c.status === 'LIVE').length,
        completed: data.filter(c => c.status === 'COMPLETED').length,
      }
      return stats
    }
  },

  // Clients
  clients: {
    async getAll() {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name')

      if (error) throw error
      return data as Client[]
    },

    async getById(id: string) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data as Client
    },

    async create(client: Partial<Client>) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('clients')
        .insert(client)
        .select()
        .single()

      if (error) throw error
      return data as Client
    },

    async update(id: string, client: Partial<Client>) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('clients')
        .update(client)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Client
    },

    async delete(id: string) {
      const supabase = createServerClient()
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)

      if (error) throw error
    }
  },

  // Creators
  creators: {
    async getAll() {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('name')

      if (error) throw error
      return data as Creator[]
    },

    async getById(id: string) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data as Creator
    },

    async create(creator: Partial<Creator>) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('creators')
        .insert(creator)
        .select()
        .single()

      if (error) throw error
      return data as Creator
    },

    async update(id: string, creator: Partial<Creator>) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('creators')
        .update(creator)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Creator
    },

    async delete(id: string) {
      const supabase = createServerClient()
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id)

      if (error) throw error
    },

    async getStats() {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('creators')
        .select('status, verified')

      if (error) throw error

      return {
        total: data.length,
        available: data.filter(c => c.status === 'AVAILABLE').length,
        onCampaign: data.filter(c => c.status === 'ON_CAMPAIGN').length,
        verified: data.filter(c => c.verified).length,
      }
    }
  },

  // Videos
  videos: {
    async getAll() {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('videos')
        .select(`
          *,
          creator:creators(*),
          campaign:campaigns(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as (Video & { creator: Creator; campaign: Campaign })[]
    },

    async getByCampaign(campaignId: string) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('videos')
        .select(`
          *,
          creator:creators(*)
        `)
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as (Video & { creator: Creator })[]
    },

    async updateStatus(id: string, status: string) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('videos')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Video
    },

    async getStats() {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('videos')
        .select('status, views, likes')

      if (error) throw error

      return {
        total: data.length,
        pending: data.filter(v => v.status === 'PENDING_UPLOAD').length,
        inReview: data.filter(v => ['INTERNAL_REVIEW', 'CLIENT_REVIEW'].includes(v.status)).length,
        approved: data.filter(v => v.status === 'APPROVED').length,
        posted: data.filter(v => v.status === 'POSTED').length,
        totalViews: data.reduce((sum, v) => sum + (v.views || 0), 0),
        totalLikes: data.reduce((sum, v) => sum + (v.likes || 0), 0),
      }
    }
  },

  // Activities
  activities: {
    async getRecent(limit = 10) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data as Activity[]
    },

    async create(activity: Partial<Activity>) {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('activities')
        .insert(activity)
        .select()
        .single()

      if (error) throw error
      return data as Activity
    }
  },

  // Dashboard stats
  async getDashboardStats() {
    const [campaignStats, creatorStats, videoStats] = await Promise.all([
      this.campaigns.getStats(),
      this.creators.getStats(),
      this.videos.getStats(),
    ])

    return {
      campaigns: campaignStats,
      creators: creatorStats,
      videos: videoStats,
    }
  }
}
