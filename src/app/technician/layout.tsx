import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Panel Technika | PGPR Clima' }

export default function TechnicianLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
