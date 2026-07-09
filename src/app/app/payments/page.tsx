import type { Metadata } from 'next'
export const runtime = 'edge'
export const metadata: Metadata = { title: 'Payments' }
export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">Payments</h1>
      <p className="text-muted-foreground text-sm">Moduł w budowie.</p>
    </div>
  )
}
