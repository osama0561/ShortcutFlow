import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: creators, error } = await supabase
      .from('creators')
      .select('*')
      .order('name')

    if (error) throw error

    return NextResponse.json(creators)
  } catch (error) {
    console.error('Creators fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch creators' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    const { data: creator, error } = await supabase
      .from('creators')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        handle: body.handle,
        niche: body.niche,
        location: body.location,
        followers: body.followers || 0,
        engagement: body.engagement || 0,
        status: 'AVAILABLE',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(creator)
  } catch (error) {
    console.error('Creator create error:', error)
    return NextResponse.json({ error: 'Failed to create creator' }, { status: 500 })
  }
}
