'use client'
import * as React from 'react'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { MobileBottomNav } from './mobile-bottom-nav'
import { cn } from '@/lib/utils'

function MobileSidebarOverlay({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])
  return (
    <>
      <div className={cn('fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm transition-opacity duration-normal lg:hidden', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')} onClick={onClose} aria-hidden="true" />
      <div className={cn('fixed inset-y-0 left-0 z-modal lg:hidden transition-transform duration-normal ease-standard', open ? 'translate-x-0' : '-translate-x-full')} role="dialog" aria-modal="true" aria-label="Menu nawigacyjne">
        {children}
      </div>
    </>
  )
}

interface AppShellProps {
  children: React.ReactNode
  user?: { name: string; email: string; role: string }
  notificationCount?: number
}

export function AppShell({ children, user, notificationCount = 0 }: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)
  const [, setSearchOpen] = React.useState(false)
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar className="hidden lg:flex" />
      <MobileSidebarOverlay open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)}>
        <Sidebar className="flex h-full" />
      </MobileSidebarOverlay>
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setMobileSidebarOpen(true)} onSearchClick={() => setSearchOpen(true)} notificationCount={notificationCount} user={user} />
        <main id="main-content" className="flex-1 overflow-y-auto focus-visible:outline-none" tabIndex={-1}>
          {children}
        </main>
      </div>
      <MobileBottomNav onMoreClick={() => setMobileSidebarOpen(true)} />
    </div>
  )
}
