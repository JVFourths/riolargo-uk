import { NextResponse } from 'next/server'
export async function POST(req) {
  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', process.env.ADMIN_PASSWORD, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 604800, path: '/' })
  return res
}
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('admin_token')
  return res
}
