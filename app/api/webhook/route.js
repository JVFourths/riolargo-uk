import Stripe from 'stripe'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { createOrder, deductStock, getLowStockItems, getOrderBySession } from '../../../lib/db'
import { sendOrderConfirmation, sendAdminNewOrder, sendLowStockAlert } from '../../../lib/email'
import { getProductById } from '../../../lib/products'
export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const { env } = getCloudflareContext()
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  let event
  try { event = await stripe.webhooks.constructEventAsync(body, sig, process.env.STRIPE_WEBHOOK_SECRET) }
  catch (err) { return new Response('Invalid signature', { status: 400 }) }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const existing = await getOrderBySession(env.DB, session.id)
    if (existing) return Response.json({ received: true })
    try {
      const meta = session.metadata
      const items = JSON.parse(meta.items)
      const addr = session.shipping_details?.address
      const shippingAddress = [session.customer_details?.name, addr?.line1, addr?.line2, addr?.city, addr?.postal_code, addr?.country].filter(Boolean).join('\n')
      const enrichedItems = items.map(item => { const p = getProductById(item.id); return { id: item.id, name: p?.name || item.id, subtitle: p?.subtitle || '', qty: item.qty, price: p?.price || 0 } })
      const result = await createOrder(env.DB, { stripe_session_id: session.id, customer_name: session.customer_details?.name || '', customer_email: session.customer_details?.email || '', shipping_address: shippingAddress, items: JSON.stringify(enrichedItems), subtotal: parseInt(meta.subtotal), shipping: parseInt(meta.shipping_cost), total: session.amount_total, status: 'paid' })
      const order = { id: result.meta?.last_row_id, stripe_session_id: session.id, customer_name: session.customer_details?.name || '', customer_email: session.customer_details?.email || '', shipping_address: shippingAddress, items: JSON.stringify(enrichedItems), subtotal: parseInt(meta.subtotal), shipping: parseInt(meta.shipping_cost), total: session.amount_total, status: 'paid' }
      for (const item of items) await deductStock(env.DB, item.id, item.qty)
      try { await sendOrderConfirmation(order); await sendAdminNewOrder(order); const lowItems = await getLowStockItems(env.DB); if (lowItems.length > 0) await sendLowStockAlert(lowItems) } catch (e) { console.error('Email error:', e) }
    } catch (err) { console.error('Order error:', err); return new Response('Order processing failed', { status: 500 }) }
  }
  return Response.json({ received: true })
}
