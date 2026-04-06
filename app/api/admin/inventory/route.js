import { NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { getInventory, setStock } from '../../../../lib/db'
export const runtime = 'edge'
function isAuthed(req) { return req.cookies.get('admin_token')?.value === process.env.ADMIN_PASSWORD }
export async function GET(req) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { env } = getRequestContext()
  return NextResponse.json({ inventory: await getInventory(env.DB) })
}
export async function PATCH(req) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { env } = getRequestContext()
  const { product_id, stock } = await req.json()
  await setStock(env.DB, product_id, parseInt(stock))
  return NextResponse.json({ ok: true })
}
