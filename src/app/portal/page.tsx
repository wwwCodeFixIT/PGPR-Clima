export const runtime = 'edge'
import type { Metadata } from 'next'
import { Monitor, ClipboardList, FileText, Receipt } from 'lucide-react'
export const metadata: Metadata = { title: 'Portal Klienta | PGPR Clima' }
export default function CustomerPortalPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-foreground">Portal Klienta — PGPR Clima</span>
        <span className="text-sm text-muted-foreground">Jan Kowalski</span>
      </header>
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Witaj, Jan</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{icon: Monitor, label: 'Urządzenia', count: 3}, {icon: ClipboardList, label: 'Zlecenia', count: 12}, {icon: FileText, label: 'Protokoły', count: 8}, {icon: Receipt, label: 'Faktury', count: 4}].map(({ icon: Icon, label, count }) => (
            <div key={label} className="rounded-lg border border-border bg-card p-4 text-center">
              <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
