import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  type WorkOrderStatus, type InvoiceStatus, type ProtocolStatus,
  type CylinderStatus, type SyncStatus, type QuotationStatus, type Priority, type LeadTemperature,
  WORK_ORDER_STATUS_LABELS, INVOICE_STATUS_LABELS, PROTOCOL_STATUS_LABELS,
  CYLINDER_STATUS_LABELS, SYNC_STATUS_LABELS, QUOTATION_STATUS_LABELS, PRIORITY_LABELS,
} from '@/types/common'

type CC = { bg: string; text: string; dot: string }

const WO: Record<WorkOrderStatus, CC> = {
  new:       { bg: 'bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400', dot: 'bg-indigo-500' },
  quoted:    { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
  scheduled: { bg: 'bg-blue-500/10',   text: 'text-blue-600 dark:text-blue-400',     dot: 'bg-blue-500' },
  confirmed: { bg: 'bg-sky-500/10',    text: 'text-sky-600 dark:text-sky-400',       dot: 'bg-sky-500' },
  en_route:  { bg: 'bg-amber-500/10',  text: 'text-amber-600 dark:text-amber-400',   dot: 'bg-amber-500' },
  started:   { bg: 'bg-emerald-500/10',text: 'text-emerald-600 dark:text-emerald-400',dot:'bg-emerald-500'},
  paused:    { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  completed: { bg: 'bg-green-500/10',  text: 'text-green-600 dark:text-green-400',   dot: 'bg-green-500' },
  cancelled: { bg: 'bg-red-500/10',    text: 'text-red-600 dark:text-red-400',       dot: 'bg-red-500' },
}
const INV: Record<InvoiceStatus, CC> = {
  draft:         { bg: 'bg-slate-500/10',  text: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-500' },
  issued:        { bg: 'bg-blue-500/10',   text: 'text-blue-600 dark:text-blue-400',   dot: 'bg-blue-500' },
  sent:          { bg: 'bg-sky-500/10',    text: 'text-sky-600 dark:text-sky-400',     dot: 'bg-sky-500' },
  paid:          { bg: 'bg-green-500/10',  text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
  partially_paid:{ bg: 'bg-teal-500/10',  text: 'text-teal-600 dark:text-teal-400',   dot: 'bg-teal-500' },
  overdue:       { bg: 'bg-red-500/10',   text: 'text-red-600 dark:text-red-400',     dot: 'bg-red-500' },
  cancelled:     { bg: 'bg-slate-500/10', text: 'text-slate-500 dark:text-slate-400', dot: 'bg-slate-400' },
}
const PROTO: Record<ProtocolStatus, CC> = {
  draft:             { bg: 'bg-slate-500/10', text: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-500' },
  pending_signature: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  signed:            { bg: 'bg-blue-500/10',  text: 'text-blue-600 dark:text-blue-400',   dot: 'bg-blue-500' },
  finalized:         { bg: 'bg-green-500/10', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
}
const CYL: Record<CylinderStatus, CC> = {
  active:         { bg: 'bg-green-500/10',  text: 'text-green-600 dark:text-green-400',   dot: 'bg-green-500' },
  low:            { bg: 'bg-amber-500/10',  text: 'text-amber-600 dark:text-amber-400',   dot: 'bg-amber-500' },
  empty:          { bg: 'bg-red-500/10',    text: 'text-red-600 dark:text-red-400',       dot: 'bg-red-500' },
  inspection_due: { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  retired:        { bg: 'bg-slate-500/10',  text: 'text-slate-500 dark:text-slate-400',   dot: 'bg-slate-400' },
}
const SYNC: Record<SyncStatus, CC> = {
  synced:   { bg: 'bg-green-500/10',  text: 'text-green-600 dark:text-green-400',   dot: 'bg-green-500' },
  pending:  { bg: 'bg-amber-500/10',  text: 'text-amber-600 dark:text-amber-400',   dot: 'bg-amber-500' },
  syncing:  { bg: 'bg-blue-500/10',   text: 'text-blue-600 dark:text-blue-400',     dot: 'bg-blue-500' },
  conflict: { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  error:    { bg: 'bg-red-500/10',    text: 'text-red-600 dark:text-red-400',       dot: 'bg-red-500' },
}
const PRIO: Record<Priority, CC> = {
  low:      { bg: 'bg-slate-500/10',  text: 'text-slate-500 dark:text-slate-400',    dot: 'bg-slate-400' },
  normal:   { bg: 'bg-blue-500/10',   text: 'text-blue-600 dark:text-blue-400',      dot: 'bg-blue-500' },
  high:     { bg: 'bg-amber-500/10',  text: 'text-amber-600 dark:text-amber-400',    dot: 'bg-amber-500' },
  urgent:   { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400',  dot: 'bg-orange-500' },
  critical: { bg: 'bg-red-500/10',    text: 'text-red-600 dark:text-red-400',        dot: 'bg-red-500' },
}
const QUOT: Record<QuotationStatus, CC> = {
  draft:           { bg: 'bg-slate-500/10',   text: 'text-slate-600 dark:text-slate-400',   dot: 'bg-slate-500' },
  internal_review: { bg: 'bg-purple-500/10',  text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
  ready:           { bg: 'bg-blue-500/10',    text: 'text-blue-600 dark:text-blue-400',     dot: 'bg-blue-500' },
  sent:            { bg: 'bg-sky-500/10',     text: 'text-sky-600 dark:text-sky-400',       dot: 'bg-sky-500' },
  viewed:          { bg: 'bg-teal-500/10',    text: 'text-teal-600 dark:text-teal-400',     dot: 'bg-teal-500' },
  accepted:        { bg: 'bg-green-500/10',   text: 'text-green-600 dark:text-green-400',   dot: 'bg-green-500' },
  rejected:        { bg: 'bg-red-500/10',     text: 'text-red-600 dark:text-red-400',       dot: 'bg-red-500' },
  expired:         { bg: 'bg-slate-500/10',   text: 'text-slate-500 dark:text-slate-400',   dot: 'bg-slate-400' },
  converted:       { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400',dot:'bg-emerald-500'},
}
const TEMP: Record<LeadTemperature, CC> = {
  hot:  { bg: 'bg-red-500/10',   text: 'text-red-600 dark:text-red-400',    dot: 'bg-red-500' },
  warm: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  cold: { bg: 'bg-slate-500/10', text: 'text-slate-500 dark:text-slate-400', dot: 'bg-slate-400' },
}

type SBType =
  | { type: 'work-order'; status: WorkOrderStatus }
  | { type: 'invoice';    status: InvoiceStatus }
  | { type: 'protocol';   status: ProtocolStatus }
  | { type: 'cylinder';   status: CylinderStatus }
  | { type: 'sync';       status: SyncStatus }
  | { type: 'priority';   status: Priority }
  | { type: 'quotation';  status: QuotationStatus }
  | { type: 'lead-temp';  status: LeadTemperature }

type StatusBadgeProps = SBType & { showDot?: boolean; size?: 'sm' | 'default'; className?: string }

function getConfig(p: SBType): { colors: CC; label: string } {
  switch (p.type) {
    case 'work-order': return { colors: WO[p.status],    label: WORK_ORDER_STATUS_LABELS[p.status] }
    case 'invoice':    return { colors: INV[p.status],   label: INVOICE_STATUS_LABELS[p.status] }
    case 'protocol':   return { colors: PROTO[p.status], label: PROTOCOL_STATUS_LABELS[p.status] }
    case 'cylinder':   return { colors: CYL[p.status],   label: CYLINDER_STATUS_LABELS[p.status] }
    case 'sync':       return { colors: SYNC[p.status],  label: SYNC_STATUS_LABELS[p.status] }
    case 'priority':   return { colors: PRIO[p.status],  label: PRIORITY_LABELS[p.status] }
    case 'quotation':  return { colors: QUOT[p.status],  label: QUOTATION_STATUS_LABELS[p.status] }
    case 'lead-temp':  return { colors: TEMP[p.status],  label: p.status === 'hot' ? 'Gorący' : p.status === 'warm' ? 'Ciepły' : 'Zimny' }
  }
}

export function StatusBadge({ showDot = true, size = 'default', className, ...tp }: StatusBadgeProps) {
  const { colors, label } = getConfig(tp as SBType)
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap', colors.bg, colors.text, size === 'sm' && 'px-1.5 py-0 text-[10px]', size === 'default' && 'px-2 py-0.5 text-xs', className)} role="status" aria-label={label}>
      {showDot && <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', colors.dot)} aria-hidden="true" />}
      {label}
    </span>
  )
}
