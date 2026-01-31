import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .order('name')

    if (error) throw error

    return NextResponse.json(clients)
  } catch (error) {
    console.error('Clients fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    const { data: client, error } = await supabase
      .from('clients')
      .insert({
        name: body.name,
        industry: body.industry,
        contact_name: body.contactName,
        contact_email: body.contactEmail,
        contact_phone: body.contactPhone,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(client)
  } catch (error) {
    console.error('Client create error:', error)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
