'use client'
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MoreHorizontal, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOBILE_BOTTOM_NAV } from '@/config/navigation'

interface MobileBottomNavProps {
  onMoreClick?: () => void
  onQuickAction?: () => void
  className?: string
}

export function MobileBottomNav({ onMoreClick, onQuickAction, className }: MobileBottomNavProps) {
  const pathname = usePathname()
  return (
    <>
      <div className="h-mobile-bottom lg:hidden" aria-hidden="true" />
      <nav aria-label="Nawigacja mobilna" className={cn('fixed bottom-0 inset-x-0 z-fixed lg:hidden bg-card border-t border-border pb-safe flex items-center', className)}>
        <div className="flex items-center w-full h-mobile-bottom">
          {MOBILE_BOTTOM_NAV.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} aria-current={isActive ? 'page' : undefined}
                className={cn('flex-1 flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:bg-secondary touch-target', isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}>
                <Icon className={cn('h-5 w-5 transition-colors', isActive ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            )
          })}
          <button onClick={onMoreClick} className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:bg-secondary touch-target" aria-label="Więcej">
            <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
            <span>Więcej</span>
          </button>
        </div>
        <button onClick={onQuickAction} className="absolute right-4 -top-7 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-floating flex items-center justify-center transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Szybka akcja">
          <Plus className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>
    </>
  )
}
