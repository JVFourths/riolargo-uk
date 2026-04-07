import { NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getInventory, setStock } from '../../../../lib/db'
function isAuthed(req) { return req.cookies.get('admin_token')?.value === process.env.ADMIN_PASSWORD }
export async function GET(req) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { env } = getCloudflareContext()
  return NextResponse.json({ inventory: await getInventory(env.DB) })
}
export async function PATCH(req) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { env } = getCloudflareContext()
  const { product_id, stock } = await req.json()
  await setStock(env.DB, product_id, parseInt(stock))
  return NextResponse.json({ ok: true })
}
