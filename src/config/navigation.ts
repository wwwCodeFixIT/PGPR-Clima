import {
  LayoutDashboard, Flame, Kanban, CalendarDays, ClipboardList,
  Users, Building2, Monitor, FileText, Wind, Archive, Package,
  MapPinned, Calculator, FileCheck2, Tags, Receipt, Banknote,
  TrendingUp, Users2, BarChart3, Zap, Plug2, Settings,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label:  string
  href:   string
  icon:   LucideIcon
  exact?: boolean
  badge?: string | number
}

export interface NavGroup {
  group: string
  items: NavItem[]
}

export const SIDEBAR_NAV: NavGroup[] = [
  {
    group: 'Główne',
    items: [
      { label: 'Pulpit',    href: '/app',            icon: LayoutDashboard, exact: true },
      { label: 'Leady',     href: '/app/leads',       icon: Flame },
      { label: 'Pipeline',  href: '/app/pipeline',    icon: Kanban },
      { label: 'Kalendarz', href: '/app/calendar',    icon: CalendarDays },
      { label: 'Zlecenia',  href: '/app/work-orders', icon: ClipboardList },
    ],
  },
  {
    group: 'Operacje',
    items: [
      { label: 'Klienci',    href: '/app/customers',    icon: Users },
      { label: 'Obiekty',    href: '/app/sites',        icon: Building2 },
      { label: 'Urządzenia', href: '/app/devices',      icon: Monitor },
      { label: 'Protokoły',  href: '/app/protocols',    icon: FileText },
      { label: 'F-Gazy',     href: '/app/refrigerants', icon: Wind },
      { label: 'Butle',      href: '/app/cylinders',    icon: Archive },
      { label: 'Magazyn',    href: '/app/inventory',    icon: Package },
    ],
  },
  {
    group: 'Sprzedaż',
    items: [
      { label: 'Wizje lokalne', href: '/app/surveys',     icon: MapPinned },
      { label: 'Wyceny',        href: '/app/estimates',   icon: Calculator },
      { label: 'Oferty',        href: '/app/quotations',  icon: FileCheck2 },
      { label: 'Cenniki',       href: '/app/price-lists', icon: Tags },
    ],
  },
  {
    group: 'Finanse',
    items: [
      { label: 'Faktury',    href: '/app/invoices',      icon: Receipt },
      { label: 'Płatności',  href: '/app/payments',      icon: Banknote },
      { label: 'Rentowność', href: '/app/profitability', icon: TrendingUp },
    ],
  },
  {
    group: 'Zarządzanie',
    items: [
      { label: 'Zespół',        href: '/app/team',         icon: Users2 },
      { label: 'Raporty',       href: '/app/reports',      icon: BarChart3 },
      { label: 'Automatyzacje', href: '/app/automations',  icon: Zap },
      { label: 'Integracje',    href: '/app/integrations', icon: Plug2 },
      { label: 'Ustawienia',    href: '/app/settings',     icon: Settings },
    ],
  },
]

export const MOBILE_BOTTOM_NAV: NavItem[] = [
  { label: 'Pulpit',   href: '/app',             icon: LayoutDashboard, exact: true },
  { label: 'Zlecenia', href: '/app/work-orders',  icon: ClipboardList },
  { label: 'Klienci',  href: '/app/customers',    icon: Users },
  { label: 'Kalendarz',href: '/app/calendar',     icon: CalendarDays },
]
