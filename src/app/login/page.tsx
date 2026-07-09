import type { Metadata } from 'next'
import Link from 'next/link'
import { Wind, CheckCircle } from 'lucide-react'

export const runtime = 'edge'

export const metadata: Metadata = { title: 'Logowanie' }

const BENEFITS = [
  'Zarządzanie zleceniami i protokołami HVAC',
  'Ewidencja czynników chłodniczych (F-Gazy)',
  'Podpis cyfrowy i generowanie PDF',
  'Praca offline – synchronizacja po połączeniu',
  'CRM klientów i rejestr urządzeń',
]

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pgpr-navy-900 via-pgpr-navy-800 to-pgpr-graphite-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pgpr-blue-600 to-pgpr-cyan-500 flex items-center justify-center shadow-lg">
              <Wind className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">PGPR Clima</p>
              <p className="text-xs text-white/50 uppercase tracking-widest">Field Service</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            System operacyjny<br />dla firm HVAC
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            Protokoły, F-Gazy, zlecenia i CRM w jednym miejscu.
          </p>
        </div>
        <div className="relative z-10">
          <ul className="space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/70">
                <CheckCircle className="h-4 w-4 text-pgpr-cyan-400 shrink-0" aria-hidden="true" />
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-pgpr-blue-600 to-pgpr-cyan-500 flex items-center justify-center">
              <Wind className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-foreground">PGPR Clima</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Zaloguj się</h2>
            <p className="mt-1 text-sm text-muted-foreground">Podaj dane swojego konta</p>
          </div>
          <form action="/api/auth/login" method="POST" className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="field-label">Adres e-mail</label>
              <input id="email" name="email" type="email" autoComplete="email" required placeholder="jan@firma.pl"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="field-label">Hasło</label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">Zapomniałem hasła</Link>
              </div>
              <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <button type="submit" className="w-full h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Zaloguj się
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Nie masz konta?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">Zarejestruj firmę</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
