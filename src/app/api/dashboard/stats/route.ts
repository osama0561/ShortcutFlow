import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get campaigns count by status
    const { data: campaigns } = await supabase
      .from('campaigns')
      .select('status')

    // Get creators count
    const { data: creators } = await supabase
      .from('creators')
      .select('status, verified')

    // Get clients count
    const { data: clients } = await supabase
      .from('clients')
      .select('id')

    // Get video stats
    const { data: videos } = await supabase
      .from('videos')
      .select('views, likes, status')

    const activeCampaigns = campaigns?.filter(c =>
      !['DRAFT', 'COMPLETED'].includes(c.status)
    ).length || 0

    const totalCreators = creators?.length || 0
    const availableCreators = creators?.filter(c => c.status === 'AVAILABLE').length || 0

    const totalClients = clients?.length || 0

    const totalViews = videos?.reduce((sum, v) => sum + (v.views || 0), 0) || 0

    return NextResponse.json({
      activeCampaigns,
      totalCreators,
      availableCreators,
      totalClients,
      totalViews,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
