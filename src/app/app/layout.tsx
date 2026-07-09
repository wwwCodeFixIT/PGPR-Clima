export const runtime = 'edge'

import { AppShell } from '@/components/layout/app-shell'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Auth is handled by middleware (edge-compatible).
  // User data is fetched client-side in components that need it.
  return <AppShell>{children}</AppShell>
}
