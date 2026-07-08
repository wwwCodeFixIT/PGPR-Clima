import type { Metadata } from 'next'
import { Monitor, ClipboardList, FileText, Receipt } from 'lucide-react'

export const metadata: Metadata = { title: 'Portal Klienta | PGPR Clima' }

export default function CustomerPortalPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pgpr-blue-700 to-pgpr-cyan-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">PC</span>
          </div>
          <span className="font-semibold text-foreground">Portal Klienta</span>
        </div>
        <span className="text-sm text-muted-foreground">Jan Kowalski</span>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Witaj, Jan</h1>
          <p className="text-muted-foreground text-sm mt-1">Twoje urządzenia i dokumenty serwisowe</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Monitor,       label: 'Urządzenia',  count: 3  },
            { icon: ClipboardList, label: 'Zlecenia',    count: 12 },
            { icon: FileText,      label: 'Protokoły',   count: 8  },
            { icon: Receipt,       label: 'Faktury',     count: 4  },
          ].map(({ icon: Icon, label, count }) => (
            <div key={label} className="rounded-lg border border-border bg-card p-4 text-center">
              <Icon className="h-6 w-6 text-primary mx-auto mb-2" aria-hidden="true" />
              <p className="text-2xl font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3">Twoje urządzenia</h2>
          <div className="space-y-3">
            {[
              { name: 'Klimatyzator Mitsubishi MSZ-EF35', location: 'Salon', nextService: '2025-04-15' },
              { name: 'Klimatyzator Daikin FTXM50R',      location: 'Sypialnia', nextService: '2025-06-01' },
              { name: 'Pompa ciepła Daikin EHVX16S23D6V', location: 'Kotłownia', nextService: '2025-08-20' },
            ].map(({ name, location, nextService }) => (
              <div key={name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Następny przegląd</p>
                  <p className="text-xs font-medium text-foreground">{nextService}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
