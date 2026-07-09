import { redirect } from 'next/navigation'
import { AppShell } from '@/components/layout/app-shell'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  const shellUser = profile != null
    ? {
        name:  profile.full_name ?? user.email ?? 'Użytkownik',
        email: user.email ?? '',
        role:  (profile.role as string) ?? 'technician',
      }
    : undefined

  return (
    <AppShell user={shellUser} notificationCount={0}>
      {children}
    </AppShell>
  )
}
