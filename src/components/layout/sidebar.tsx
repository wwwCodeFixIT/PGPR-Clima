'use client'
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SIDEBAR_NAV, type NavItem } from '@/config/navigation'
import { PgprLogo } from './pgpr-logo'

function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('pgpr-sidebar-collapsed')
      if (stored !== null) setCollapsed(JSON.parse(stored) as boolean)
    } catch { /* ignore */ }
  }, [])
  const toggle = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      try { localStorage.setItem('pgpr-sidebar-collapsed', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])
  return { collapsed: mounted ? collapsed : false, toggle, mounted }
}

function SidebarNavItem({ item, collapsed, pathname }: { item: NavItem; collapsed: boolean; pathname: string }) {
  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
  const Icon = item.icon
  return (
    <li>
      <Link href={item.href} data-active={isActive} aria-current={isActive ? 'page' : undefined}
        title={collapsed ? item.label : undefined}
        className={cn('group relative flex items-center rounded-md text-sm transition-colors duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-primary',
          collapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-2.5 py-2',
          isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'text-sidebar-foreground/65 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground')}>
        {isActive && <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-sidebar-primary" aria-hidden="true" />}
        <Icon className={cn('shrink-0 transition-colors duration-fast', collapsed ? 'h-5 w-5' : 'h-4 w-4', isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80')} aria-hidden="true" />
        {!collapsed && <span className="truncate">{item.label}</span>}
        {!collapsed && item.badge !== undefined && (
          <span className="ml-auto shrink-0 rounded-full bg-sidebar-primary text-[10px] font-semibold text-sidebar-primary-foreground px-1.5 py-0.5 min-w-[1.25rem] text-center">{item.badge}</span>
        )}
        {collapsed && <span className="sr-only">{item.label}</span>}
      </Link>
    </li>
  )
}

export function Sidebar({ className }: { className?: string }) {
  const { collapsed, toggle, mounted } = useSidebarCollapsed()
  const pathname = usePathname()
  return (
    <aside className={cn('flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-[width] duration-normal ease-standard overflow-hidden shrink-0', mounted ? (collapsed ? 'w-sidebar-icon' : 'w-sidebar') : 'w-sidebar', className)} aria-label="Nawigacja główna">
      <div className={cn('flex items-center h-topbar shrink-0 border-b border-sidebar-border', collapsed ? 'justify-center px-2' : 'px-4')}>
        <PgprLogo size="sm" showText={!collapsed} />
      </div>
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-4">
        {SIDEBAR_NAV.map((section) => (
          <div key={section.group}>
            {!collapsed && <p className="sidebar-group-label">{section.group}</p>}
            {collapsed && <div className="h-px bg-sidebar-border mx-1 mb-2" aria-hidden="true" />}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarNavItem key={item.href} item={item} collapsed={collapsed} pathname={pathname} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-2 shrink-0">
        <button onClick={toggle} className={cn('flex w-full items-center rounded-md px-2 py-2 text-xs text-sidebar-foreground/40 hover:text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-primary', collapsed ? 'justify-center' : 'gap-2')} aria-label={collapsed ? 'Rozwiń menu' : 'Zwiń menu'}>
          {collapsed ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : <><ChevronLeft className="h-4 w-4" aria-hidden="true" /><span>Zwiń menu</span></>}
        </button>
      </div>
    </aside>
  )
}
