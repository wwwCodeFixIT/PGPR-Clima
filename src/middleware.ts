import { type NextRequest, NextResponse } from 'next/server'

// Public paths that don't require authentication
const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/q/',          // public quotation links
  '/api/auth/',   // auth endpoints
]

/**
 * Check for Supabase session cookie.
 * Edge-compatible — no Node.js APIs, no Supabase import.
 * Full session verification happens in server layouts via createSupabaseServerClient().
 */
function hasSessionCookie(request: NextRequest): boolean {
  const cookies = request.cookies.getAll()
  return cookies.some(
    (c) =>
      (c.name.includes('-auth-token') || c.name.includes('sb-access-token')) &&
      c.value.length > 10
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths through
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const authenticated = hasSessionCookie(request)

  const isProtectedPath =
    pathname.startsWith('/app') ||
    pathname.startsWith('/technician') ||
    pathname.startsWith('/portal') ||
    pathname.startsWith('/super-admin')

  // Redirect unauthenticated users to login
  if (!authenticated && isProtectedPath) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect logged-in users away from login page
  if (authenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, manifest.json, sw.js, icons/
     */
    '/((?!_next/static|_next/image|favicon\\.ico|manifest\\.json|sw\\.js|icons|apple-touch-icon).*)',
  ],
}
