import type { Metadata } from 'next'
import {
  ClipboardList, Users, Monitor, Wind, Archive, AlertTriangle, CalendarCheck, TrendingUp,
} from 'lucide-react'
import { KpiCard } from '@/components/ui/card'
import { SkeletonCard } from '@/components/ui/skeleton'

export const runtime = 'edge'
export const metadata: Metadata = { title: 'Pulpit' }

interface KpiItem {
  label: string
  value: string
  accent?: 'primary' | 'success' | 'warning' | 'destructive' | 'accent'
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

const KPI: KpiItem[] = [
  { label: 'Zlecenia dzisiaj',      value: '8',       accent: 'primary',     icon: <ClipboardList className="h-5 w-5" />, trend: 'up', trendValue: '+2 vs wczoraj' },
  { label: 'Zlecenia w toku',       value: '14',      accent: 'accent',      icon: <TrendingUp    className="h-5 w-5" /> },
  { label: 'Przeglądy (30 dni)',    value: '23',      accent: 'warning',     icon: <CalendarCheck className="h-5 w-5" /> },
  { label: 'Aktywni klienci',       value: '142',     accent: 'success',     icon: <Users         className="h-5 w-5" /> },
  { label: 'Urządzenia',            value: '387',     icon: <Monitor       className="h-5 w-5" /> },
  { label: 'Czynnik wydany',        value: '48,2 kg', icon: <Wind          className="h-5 w-5" /> },
  { label: 'Butle — niski stan',    value: '3',       accent: 'destructive', icon: <Archive       className="h-5 w-5" /> },
  { label: 'Niepodpisane protokoły',value: '5',       accent: 'warning',     icon: <AlertTriangle className="h-5 w-5" /> },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Pulpit</h1>
        <p className="text-sm text-muted-foreground mt-1">PGPR Clima — HVAC Business Operating System</p>
      </div>
      <section aria-label="Wskaźniki KPI">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI.map((kpi) => (
            <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} accent={kpi.accent} icon={kpi.icon} trend={kpi.trend} trendValue={kpi.trendValue} />
          ))}
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Dzisiejszy plan</h2>
          <div className="space-y-3">
            {['08:00 – Montaż klimatyzatora, ul. Kwiatowa 12','11:30 – Serwis agregatu, Centrum Logistyczne','14:00 – Przegląd VRF, Biurowiec Nova Park','16:30 – Kontrola szczelności, Hotel Mercure'].map((item) => (
              <div key={item} className="flex items-start gap-3 p-3 rounded-md bg-secondary/50">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Wymagają uwagi</h2>
          <div className="space-y-3">
            {[
              { label: 'Butla R32 – niski stan (1,2 kg)', color: 'bg-destructive' },
              { label: '3 protokoły bez podpisu klienta',  color: 'bg-warning' },
              { label: 'Przegląd zaległy: ul. Piękna 7',   color: 'bg-destructive' },
              { label: 'Faktura #FV/2024/0087 zaległa',    color: 'bg-destructive' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-start gap-3">
                <div className={`h-2 w-2 rounded-full ${color} mt-1.5 shrink-0`} />
                <p className="text-sm text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-4">Ostatnie protokoły</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0,1,2].map((i) => <SkeletonCard key={i} />)}
        </div>
      </section>
    </div>
  )
}
