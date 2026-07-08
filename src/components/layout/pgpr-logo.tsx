import * as React from 'react'
import { cn } from '@/lib/utils'

interface PgprLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
  textClass?: string
}

const SIZE_MAP = {
  xs: { box: 'h-6 w-6',   svg: 14, text: 'text-xs',   sub: 'hidden' },
  sm: { box: 'h-7 w-7',   svg: 16, text: 'text-sm',   sub: 'text-[9px]' },
  md: { box: 'h-8 w-8',   svg: 18, text: 'text-sm',   sub: 'text-[10px]' },
  lg: { box: 'h-10 w-10', svg: 22, text: 'text-base', sub: 'text-xs' },
}

export function PgprLogo({ size = 'md', showText = true, className, textClass }: PgprLogoProps) {
  const s = SIZE_MAP[size]
  return (
    <div className={cn('flex items-center gap-2.5 shrink-0', className)}>
      <div className={cn('rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-pgpr-blue-700 to-pgpr-cyan-500 shadow-md', s.box)} aria-hidden="true">
        <svg width={s.svg} height={s.svg} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="2"  x2="10" y2="18" stroke="white" strokeWidth="2"   strokeLinecap="round" />
          <line x1="2"  y1="10" x2="18" y2="10" stroke="white" strokeWidth="2"   strokeLinecap="round" />
          <line x1="5"  y1="5"  x2="15" y2="15" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
          <line x1="15" y1="5"  x2="5"  y2="15" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
          <circle cx="10" cy="10" r="2" fill="white" />
        </svg>
      </div>
      {showText && (
        <div className={cn('leading-none select-none', textClass)}>
          <p className={cn('font-bold tracking-tight text-sidebar-accent-foreground', s.text)}>PGPR Clima</p>
          <p className={cn('uppercase tracking-widest text-sidebar-foreground/45 mt-0.5', s.sub)}>Field Service</p>
        </div>
      )}
    </div>
  )
}
