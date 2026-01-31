import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get all clients
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('*')

    if (clientsError) throw clientsError

    // Get all campaigns
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('*')

    if (campaignsError) throw campaignsError

    const totalClients = clients?.length || 0
    const activeCampaigns = campaigns?.filter(c => c.status === 'ACTIVE').length || 0
    const totalRevenue = clients?.reduce((sum, c) => sum + (c.total_budget || 0), 0) || 0

    // Calculate average creators per campaign
    const campaignsWithCreators = campaigns?.filter(c => c.creator_count > 0) || []
    const avgCampaignSize = campaignsWithCreators.length > 0
      ? Math.round(campaignsWithCreators.reduce((sum, c) => sum + c.creator_count, 0) / campaignsWithCreators.length)
      : 0

    return NextResponse.json({
      totalClients,
      activeCampaigns,
      totalRevenue,
      avgCampaignSize,
    })
  } catch (error) {
    console.error('Client stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch client stats' }, { status: 500 })
  }
}
