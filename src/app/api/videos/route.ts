import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: videos, error } = await supabase
      .from('videos')
      .select(`
        *,
        creator:creators(id, name, handle, email),
        campaign:campaigns(id, name)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(videos)
  } catch (error) {
    console.error('Videos fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createServerClient()
    const body = await request.json()
    const { id, status, revision_note, client_note } = body

    const updateData: Record<string, any> = { status }

    if (revision_note !== undefined) updateData.revision_note = revision_note
    if (client_note !== undefined) updateData.client_note = client_note

    if (status === 'APPROVED') {
      updateData.approved_at = new Date().toISOString()
    } else if (status === 'POSTED') {
      updateData.posted_at = new Date().toISOString()
    }

    const { data: video, error } = await supabase
      .from('videos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(video)
  } catch (error) {
    console.error('Video update error:', error)
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
  }
}
