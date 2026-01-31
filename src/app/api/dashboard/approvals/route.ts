import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get videos pending review
    const { data: videos } = await supabase
      .from('videos')
      .select('status')
      .in('status', ['CLIENT_REVIEW', 'INTERNAL_REVIEW'])

    // Get campaigns in review status
    const { data: campaigns } = await supabase
      .from('campaigns')
      .select('status')
      .eq('status', 'REVIEW')

    const pendingVideos = videos?.length || 0
    const pendingCampaigns = campaigns?.length || 0

    return NextResponse.json({
      videos: pendingVideos,
      campaigns: pendingCampaigns,
    })
  } catch (error) {
    console.error('Approvals fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch approvals' }, { status: 500 })
  }
}
