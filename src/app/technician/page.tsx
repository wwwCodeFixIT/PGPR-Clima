'use client'

import { useEffect, useState } from 'react'
import { ClipboardList, QrCode, Camera, AlertTriangle, MapPin } from 'lucide-react'

export default function TechnicianHomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-pgpr-navy-900 text-white p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/60 uppercase tracking-wide">Panel Technika</p>
          <h1 className="text-lg font-bold">Dzień dobry</h1>
        </div>
        <div className="h-9 w-9 rounded-full bg-pgpr-cyan-500 flex items-center justify-center text-sm font-bold">JK</div>
      </header>
      <div className="bg-pgpr-navy-800 text-white px-4 pb-5 pt-2">
        <p className="text-3xl font-bold">4 <span className="text-lg font-normal text-white/70">zlecenia dzisiaj</span></p>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {[
          { icon: ClipboardList, label: 'Moje zlecenia',     href: '/technician/jobs',   color: 'bg-primary' },
          { icon: QrCode,        label: 'Skanuj urządzenie', href: '/technician/scan',   color: 'bg-pgpr-cyan-600' },
          { icon: Camera,        label: 'Dodaj zdjęcie',     href: '/technician/photo',  color: 'bg-pgpr-graphite-600' },
          { icon: AlertTriangle, label: 'Zgłoś problem',     href: '/technician/report', color: 'bg-warning' },
        ].map(({ icon: Icon, label, href, color }) => (
          <a key={href} href={href} className={`${color} text-white rounded-xl p-4 flex flex-col gap-3 min-h-[100px]`}>
            <Icon className="h-6 w-6" />
            <span className="text-sm font-semibold">{label}</span>
          </a>
        ))}
      </div>
      <div className="flex-1 px-4 pb-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Zlecenia na dziś</h2>
        <div className="space-y-3">
          {[
            { t: '08:00', n: 'Montaż klimatyzatora', a: 'ul. Kwiatowa 12' },
            { t: '11:30', n: 'Serwis agregatu',       a: 'ul. Przemysłowa 4' },
            { t: '14:00', n: 'Przegląd VRF',          a: 'ul. Długa 8' },
          ].map(({ t, n, a }) => (
            <div key={t} className="rounded-xl border border-border bg-card p-4 flex gap-4">
              <div className="text-sm font-mono font-semibold text-muted-foreground w-12 shrink-0 pt-0.5">{t}</div>
              <div>
                <p className="text-sm font-semibold text-foreground">{n}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" />{a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
