import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: payments, error } = await supabase
      .from('payments')
      .select(`
        *,
        creator:creators(id, name, handle),
        campaign:campaigns(id, name)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    const transformedPayments = payments?.map(payment => {
      const normalizedStatus = payment.status.toUpperCase()
      const statusMapping: Record<string, string> = {
        PENDING: 'pending',
        PROCESSING: 'processing',
        PAID: 'paid',
        COMPLETED: 'paid',
        FAILED: 'failed',
        CANCELLED: 'cancelled',
      }
      return {
        id: payment.id,
        creatorName: payment.creator?.name || 'Unknown',
        creatorHandle: payment.creator?.handle || 'unknown',
        campaignName: payment.campaign?.name || 'Unknown Campaign',
        amount: payment.amount,
        currency: payment.currency || 'USD',
        status: statusMapping[normalizedStatus] || payment.status.toLowerCase(),
        statusLabel: formatStatus(payment.status),
        type: payment.type || 'creator_fee',
        method: payment.method || 'bank_transfer',
        createdAt: payment.created_at,
        paidAt: payment.paid_at,
      }
    }) || []

    return NextResponse.json(transformedPayments)
  } catch (error) {
    console.error('Payments fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        creator_id: body.creatorId,
        campaign_id: body.campaignId,
        amount: body.amount,
        currency: body.currency || 'USD',
        status: 'PENDING',
        type: body.type || 'creator_fee',
        method: body.method || 'bank_transfer',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(payment)
  } catch (error) {
    console.error('Payment create error:', error)
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
  }
}

function formatStatus(status: string): string {
  const normalizedStatus = status.toUpperCase()
  const statusMap: Record<string, string> = {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    PAID: 'Paid',
    COMPLETED: 'Paid',
    FAILED: 'Failed',
    CANCELLED: 'Cancelled',
  }
  return statusMap[normalizedStatus] || status
}
