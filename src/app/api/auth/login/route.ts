import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent('Nieprawidłowe dane logowania')}`, request.url), { status: 303 })
  }
  return NextResponse.redirect(new URL('/app', request.url), { status: 303 })
}
