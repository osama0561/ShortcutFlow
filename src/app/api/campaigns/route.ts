import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: campaigns, error } = await supabase
      .from('campaigns')
      .select(`
        *,
        client:clients(id, name),
        campaign_creators(id)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform data for frontend
    const transformedCampaigns = campaigns?.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      client: campaign.client?.name || 'Unknown',
      clientId: campaign.client_id,
      status: campaign.status.toLowerCase(),
      statusLabel: formatStatus(campaign.status),
      targetCreators: campaign.target_creators,
      currentCreators: campaign.campaign_creators?.length || 0,
      budget: campaign.budget,
      description: campaign.description,
      createdAt: campaign.created_at,
    })) || []

    return NextResponse.json(transformedCampaigns)
  } catch (error) {
    console.error('Campaigns fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    const { data: campaign, error } = await supabase
      .from('campaigns')
      .insert({
        name: body.name,
        description: body.description,
        client_id: body.clientId,
        target_creators: body.targetCreators || 10,
        budget: body.budget,
        status: 'DRAFT',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(campaign)
  } catch (error) {
    console.error('Campaign create error:', error)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}

function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    DRAFT: 'Draft',
    RECRUITING: 'Recruiting',
    SCRIPTING: 'Scripting',
    SHIPPING: 'Shipping',
    FILMING: 'Filming',
    REVIEW: 'In Review',
    LIVE: 'Live',
    COMPLETED: 'Completed',
  }
  return statusMap[status] || status
}
