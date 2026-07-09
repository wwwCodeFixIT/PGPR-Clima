'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { AppShell } from '@/components/layout/app-shell'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; role: string } | undefined>()

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (!u) {
        router.replace('/login')
      } else {
        setUser({ name: u.email ?? 'Użytkownik', email: u.email ?? '', role: 'user' })
        setReady(true)
      }
    })

    // Listen for auth changes (logout from another tab etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (!ready) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">Ładowanie…</p>
        </div>
      </div>
    )
  }

  return <AppShell user={user}>{children}</AppShell>
}
