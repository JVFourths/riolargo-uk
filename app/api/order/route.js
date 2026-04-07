import { NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getOrderBySession } from '../../../lib/db'
export async function GET(req) {
  const { env } = getCloudflareContext()
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  const order = await getOrderBySession(env.DB, sessionId)
  if (!order) return NextResponse.json({ order: null })
  return NextResponse.json({ order: { id: order.id, customer_name: order.customer_name, shipping_address: order.shipping_address, total: order.total, status: order.status } })
}
