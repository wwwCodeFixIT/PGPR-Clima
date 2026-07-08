'use client'
import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, Search, Menu, ChevronRight, LogOut, Settings, User, Moon, Sun, Monitor } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Avatar from '@radix-ui/react-avatar'
import { useTheme } from 'next-themes'
import { cn, initials } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const ROUTE_LABELS: Record<string, string> = {
  app: 'Pulpit', leads: 'Leady', pipeline: 'Pipeline', calendar: 'Kalendarz',
  'work-orders': 'Zlecenia', customers: 'Klienci', sites: 'Obiekty', devices: 'Urządzenia',
  protocols: 'Protokoły', refrigerants: 'F-Gazy', cylinders: 'Butle', inventory: 'Magazyn',
  surveys: 'Wizje lokalne', estimates: 'Wyceny', quotations: 'Oferty', 'price-lists': 'Cenniki',
  invoices: 'Faktury', payments: 'Płatności', profitability: 'Rentowność', team: 'Zespół',
  reports: 'Raporty', automations: 'Automatyzacje', integrations: 'Integracje', settings: 'Ustawienia',
  new: 'Nowy', edit: 'Edycja',
}

function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, i) => ({
    label: ROUTE_LABELS[seg] ?? seg,
    href: '/' + segments.slice(0, i + 1).join('/'),
    isLast: i === segments.length - 1,
    isId: /^[0-9a-f-]{20,}$/.test(seg),
  }))
  if (crumbs.length <= 1) return null
  return (
    <nav aria-label="Nawigacja okruszkowa" className="hidden md:flex items-center gap-1 text-sm">
      {crumbs.map((crumb, i) => (
        <React.Fragment key={crumb.href}>
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden="true" />}
          {crumb.isLast ? (
            <span className="font-medium text-foreground truncate max-w-[180px]" aria-current="page">
              {crumb.isId ? 'Szczegóły' : crumb.label}
            </span>
          ) : (
            <a href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors duration-fast truncate max-w-[120px]">{crumb.label}</a>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="h-9 w-9" aria-hidden="true" />
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Zmień motyw">
          {theme === 'dark' ? <Moon className="h-4 w-4" /> : theme === 'light' ? <Sun className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={6} className="z-dropdown min-w-[130px] rounded-lg border border-border bg-popover p-1 shadow-floating text-sm text-popover-foreground animate-slide-down-fade">
          {[{ label: 'Jasny', value: 'light', icon: Sun }, { label: 'Ciemny', value: 'dark', icon: Moon }, { label: 'Systemowy', value: 'system', icon: Monitor }].map(({ label, value, icon: Icon }) => (
            <DropdownMenu.Item key={value} onSelect={() => setTheme(value)} className={cn('flex items-center gap-2.5 rounded-md px-2.5 py-2 cursor-default outline-none select-none transition-colors hover:bg-secondary hover:text-secondary-foreground', theme === value && 'bg-secondary font-medium')}>
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />{label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

function NotificationBell({ count = 0 }: { count?: number }) {
  return (
    <Button variant="ghost" size="icon" aria-label={count > 0 ? `${count} powiadomień` : 'Powiadomienia'} className="relative">
      <Bell className="h-4 w-4" />
      {count > 0 && <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center" aria-hidden="true">{count > 9 ? '9+' : count}</span>}
    </Button>
  )
}

function UserMenu({ name, email, role }: { name: string; email: string; role: string }) {
  const router = useRouter()
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Menu użytkownika: ${name}`}>
          <Avatar.Root className="h-7 w-7 rounded-full">
            <Avatar.Fallback className="h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">{initials(name)}</Avatar.Fallback>
          </Avatar.Root>
          <div className="hidden lg:flex flex-col items-start leading-none gap-0.5">
            <span className="text-xs font-medium text-foreground truncate max-w-[120px]">{name}</span>
            <span className="text-[10px] text-muted-foreground">{role}</span>
          </div>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={6} className="z-dropdown w-56 rounded-lg border border-border bg-popover p-1 shadow-floating text-sm text-popover-foreground animate-slide-down-fade">
          <div className="px-2.5 py-2 border-b border-border mb-1">
            <p className="font-medium text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
          {[{ label: 'Mój profil', icon: User, href: '/app/settings/profile' }, { label: 'Ustawienia', icon: Settings, href: '/app/settings' }].map(({ label, icon: Icon, href }) => (
            <DropdownMenu.Item key={href} onSelect={() => router.push(href)} className="flex items-center gap-2.5 rounded-md px-2.5 py-2 cursor-default outline-none select-none transition-colors hover:bg-secondary hover:text-secondary-foreground">
              <Icon className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />{label}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Separator className="my-1 h-px bg-border" />
          <DropdownMenu.Item onSelect={() => router.push('/api/auth/signout')} className="flex items-center gap-2.5 rounded-md px-2.5 py-2 cursor-default outline-none select-none transition-colors hover:bg-destructive/10 hover:text-destructive text-destructive/80">
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />Wyloguj się
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

interface TopbarProps {
  onMenuClick?: () => void
  notificationCount?: number
  user?: { name: string; email: string; role: string }
  onSearchClick?: () => void
}

export function Topbar({ onMenuClick, notificationCount = 0, user, onSearchClick }: TopbarProps) {
  return (
    <header className="flex items-center h-topbar px-4 gap-3 border-b border-border bg-card/80 backdrop-blur-sm shrink-0 sticky top-0 z-sticky">
      <Button variant="ghost" size="icon" className="lg:hidden shrink-0" onClick={onMenuClick} aria-label="Otwórz menu">
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex-1 min-w-0"><Breadcrumbs /></div>
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon" onClick={onSearchClick} aria-label="Szukaj (Ctrl+K)" title="Szukaj (Ctrl+K)">
          <Search className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <NotificationBell count={notificationCount} />
        {user ? <UserMenu {...user} /> : <div className="h-7 w-7 rounded-full bg-muted animate-skeleton-shimmer" aria-hidden="true" />}
      </div>
    </header>
  )
}
