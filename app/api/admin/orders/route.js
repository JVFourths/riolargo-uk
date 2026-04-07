import { NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getAllOrders, updateOrderStatus, updateOrderNotes } from '../../../../lib/db'
import { sendDispatchNotification } from '../../../../lib/email'
function isAuthed(req) { return req.cookies.get('admin_token')?.value === process.env.ADMIN_PASSWORD }
export async function GET(req) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { env } = getCloudflareContext()
  return NextResponse.json({ orders: await getAllOrders(env.DB) })
}
export async function PATCH(req) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { env } = getCloudflareContext()
  const { id, status, tracking, notes } = await req.json()
  if (notes !== undefined) await updateOrderNotes(env.DB, id, notes)
  if (status) {
    await updateOrderStatus(env.DB, id, status, tracking || null)
    if (status === 'dispatched') {
      try { const orders = await getAllOrders(env.DB); const order = orders.find(o => o.id === id); if (order) await sendDispatchNotification({ ...order, tracking_number: tracking }) } catch (e) { console.error(e) }
    }
  }
  return NextResponse.json({ ok: true })
}
