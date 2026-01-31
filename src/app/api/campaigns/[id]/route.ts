import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()

    const { data: campaign, error } = await supabase
      .from('campaigns')
      .select(`
        *,
        client:clients(id, name, industry)
      `)
      .eq('id', params.id)
      .single()

    if (error) throw error

    // Get videos count for this campaign
    const { data: videos } = await supabase
      .from('videos')
      .select('id, status, views')
      .eq('campaign_id', params.id)

    const videosSubmitted = videos?.length || 0
    const videosApproved = videos?.filter(v => ['APPROVED', 'POSTED'].includes(v.status)).length || 0
    const totalViews = videos?.reduce((sum, v) => sum + (v.views || 0), 0) || 0

    return NextResponse.json({
      ...campaign,
      videos_submitted: videosSubmitted,
      videos_approved: videosApproved,
      total_views: totalViews,
    })
  } catch (error) {
    console.error('Campaign fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    const { data: campaign, error } = await supabase
      .from('campaigns')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(campaign)
  } catch (error) {
    console.error('Campaign update error:', error)
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Campaign delete error:', error)
    return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 })
  }
}
