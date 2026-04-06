export function isAdminAuthed(req) {
  const token = req.cookies.get('admin_token')?.value
  return token === process.env.ADMIN_PASSWORD
}

export function unauthorised() {
  const { NextResponse } = require('next/server')
  return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
}
