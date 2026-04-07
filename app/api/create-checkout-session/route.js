import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProductById } from '../../../lib/products'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getStock } from '../../../lib/db'
const SHIPPING_THRESHOLD = 4000
const SHIPPING_COST = 495
export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
    const { env } = getCloudflareContext()
    const { items } = await req.json()
    if (!items || items.length === 0) return NextResponse.json({ error: 'No items' }, { status: 400 })
    const lineItems = []
    let subtotal = 0
    for (const item of items) {
      const product = getProductById(item.id)
      if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 400 })
      const stock = await getStock(env.DB, item.id)
      if (stock < item.qty) return NextResponse.json({ error: `Not enough stock for ${product.subtitle}` }, { status: 400 })
      subtotal += product.price * item.qty
      lineItems.push({ price_data: { currency: 'gbp', product_data: { name: `${product.name} — ${product.subtitle}` }, unit_amount: product.price }, quantity: item.qty })
    }
    const freeShipping = subtotal >= SHIPPING_THRESHOLD
    if (!freeShipping) lineItems.push({ price_data: { currency: 'gbp', product_data: { name: 'UK Shipping' }, unit_amount: SHIPPING_COST }, quantity: 1 })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], line_items: lineItems, mode: 'payment',
      shipping_address_collection: { allowed_countries: ['GB'] },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop`,
      metadata: { items: JSON.stringify(items), shipping_cost: freeShipping ? 0 : SHIPPING_COST, subtotal },
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
