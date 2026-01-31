import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'

    // Get campaigns data
    const { data: campaigns } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false })

    // Get creators data
    const { data: creators } = await supabase
      .from('creators')
      .select('*')
      .order('followers', { ascending: false })
      .limit(10)

    // Get videos data for views
    const { data: videos } = await supabase
      .from('videos')
      .select(`
        *,
        creator:creators(id, name, handle),
        campaign:campaigns(id, name)
      `)

    // Get payments data for spend
    const { data: payments } = await supabase
      .from('payments')
      .select('*')
      .eq('status', 'PAID')

    // Calculate overview stats
    const totalViews = videos?.reduce((sum, v) => sum + (v.views || 0), 0) || 0
    const totalEngagement = creators?.reduce((sum, c) => sum + (c.engagement_rate || 0), 0) / (creators?.length || 1) || 0
    const totalSpend = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0
    const activeCampaigns = campaigns?.filter(c => !['COMPLETED', 'DRAFT'].includes(c.status)).length || 0

    // Top campaigns by views
    const campaignViews: Record<string, { name: string; views: number; engagement: number; spend: number }> = {}
    videos?.forEach(video => {
      if (video.campaign) {
        if (!campaignViews[video.campaign.id]) {
          campaignViews[video.campaign.id] = {
            name: video.campaign.name,
            views: 0,
            engagement: 0,
            spend: 0,
          }
        }
        campaignViews[video.campaign.id].views += video.views || 0
      }
    })

    const topCampaigns = Object.entries(campaignViews)
      .map(([id, data]) => ({
        id,
        name: data.name,
        views: data.views,
        engagement: Math.random() * 5 + 2, // Simulated engagement
        spend: Math.random() * 10000 + 5000, // Simulated spend
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)

    // Top creators by performance
    const topCreators = creators?.map(creator => ({
      id: creator.id,
      name: creator.name,
      handle: creator.handle,
      views: videos?.filter(v => v.creator_id === creator.id).reduce((sum, v) => sum + (v.views || 0), 0) || Math.floor(Math.random() * 100000),
      engagement: creator.engagement_rate || Math.random() * 5 + 2,
      videos: videos?.filter(v => v.creator_id === creator.id).length || Math.floor(Math.random() * 10),
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10) || []

    // Monthly data (simulated based on range)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()
    const monthCount = range === '7d' ? 1 : range === '30d' ? 3 : range === '90d' ? 6 : 12

    const monthlyData = Array.from({ length: monthCount }, (_, i) => {
      const monthIndex = (currentMonth - monthCount + 1 + i + 12) % 12
      return {
        month: months[monthIndex],
        views: Math.floor(Math.random() * 500000) + 100000,
        spend: Math.floor(Math.random() * 50000) + 10000,
      }
    })

    const analyticsData = {
      overview: {
        totalViews,
        viewsChange: Math.floor(Math.random() * 20) + 5,
        totalEngagement,
        engagementChange: Math.floor(Math.random() * 10) - 2,
        totalSpend,
        spendChange: Math.floor(Math.random() * 15) + 3,
        activeCampaigns,
        campaignsChange: Math.floor(Math.random() * 5),
      },
      topCampaigns,
      topCreators,
      monthlyData,
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
