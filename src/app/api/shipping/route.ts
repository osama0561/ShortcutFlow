import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: shipments, error } = await supabase
      .from('shipments')
      .select(`
        *,
        creator:creators(id, name, handle),
        campaign:campaigns(id, name)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    const transformedShipments = shipments?.map(shipment => ({
      id: shipment.id,
      creatorName: shipment.creator?.name || 'Unknown',
      creatorHandle: shipment.creator?.handle || 'unknown',
      campaignName: shipment.campaign?.name || 'Unknown Campaign',
      trackingNumber: shipment.tracking_number,
      carrier: shipment.carrier,
      status: shipment.status.toLowerCase(),
      statusLabel: formatStatus(shipment.status),
      address: shipment.address,
      items: shipment.items,
      createdAt: shipment.created_at,
      estimatedDelivery: shipment.estimated_delivery,
    })) || []

    return NextResponse.json(transformedShipments)
  } catch (error) {
    console.error('Shipments fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch shipments' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    const { data: shipment, error } = await supabase
      .from('shipments')
      .insert({
        creator_id: body.creatorId,
        campaign_id: body.campaignId,
        tracking_number: body.trackingNumber,
        carrier: body.carrier,
        status: 'PENDING',
        address: body.address,
        items: body.items,
        estimated_delivery: body.estimatedDelivery,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(shipment)
  } catch (error) {
    console.error('Shipment create error:', error)
    return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 })
  }
}

function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    PENDING: 'Pending',
    SHIPPED: 'Shipped',
    IN_TRANSIT: 'In Transit',
    DELIVERED: 'Delivered',
    FAILED: 'Failed',
  }
  return statusMap[status] || status
}
