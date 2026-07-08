import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Protocols' }

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">Protocols</h1>
      <p className="text-muted-foreground text-sm">Moduł w budowie — implementacja kolejnych vertical slices.</p>
    </div>
  )
}
