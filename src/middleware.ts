import { type NextRequest, NextResponse } from 'next/server'

// With static export, auth is handled client-side via Supabase JS.
// This middleware is a no-op pass-through.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest.json).*)'],
}
