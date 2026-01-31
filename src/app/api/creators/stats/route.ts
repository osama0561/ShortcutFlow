import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: creators, error } = await supabase
      .from('creators')
      .select('*')

    if (error) throw error

    const totalCreators = creators?.length || 0
    const availableNow = creators?.filter(c => c.status === 'AVAILABLE').length || 0
    const topRated = creators?.filter(c => c.rating >= 4.5).length || 0

    // Calculate average engagement
    const creatorsWithEngagement = creators?.filter(c => c.engagement > 0) || []
    const avgEngagement = creatorsWithEngagement.length > 0
      ? (creatorsWithEngagement.reduce((sum, c) => sum + c.engagement, 0) / creatorsWithEngagement.length).toFixed(1)
      : '0'

    return NextResponse.json({
      totalCreators,
      availableNow,
      topRated,
      avgEngagement,
    })
  } catch (error) {
    console.error('Creator stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch creator stats' }, { status: 500 })
  }
}
