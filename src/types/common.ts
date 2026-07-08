export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type ApiSuccess<T> = { success: true; data: T; error?: never }
export type ApiError      = { success: false; error: string; data?: never }
export type ApiResult<T>  = ApiSuccess<T> | ApiError

export type UserRole = 'owner' | 'admin' | 'manager' | 'dispatcher' | 'technician' | 'office' | 'read_only'

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  owner: 'Właściciel', admin: 'Administrator', manager: 'Kierownik',
  dispatcher: 'Dyspozytor', technician: 'Technik', office: 'Biuro', read_only: 'Tylko odczyt',
}

export type WorkOrderStatus =
  | 'new' | 'quoted' | 'scheduled' | 'confirmed' | 'en_route'
  | 'started' | 'paused' | 'completed' | 'cancelled'

export const WORK_ORDER_STATUS_LABELS: Record<WorkOrderStatus, string> = {
  new: 'Nowe', quoted: 'Do wyceny', scheduled: 'Zaplanowane', confirmed: 'Potwierdzone',
  en_route: 'W drodze', started: 'Rozpoczęte', paused: 'Wstrzymane',
  completed: 'Zakończone', cancelled: 'Anulowane',
}

export type WorkOrderType =
  | 'installation' | 'service' | 'emergency' | 'inspection'
  | 'leak_test' | 'commissioning' | 'decommission' | 'recovery' | 'other'

export const WORK_ORDER_TYPE_LABELS: Record<WorkOrderType, string> = {
  installation: 'Montaż', service: 'Serwis', emergency: 'Awaria',
  inspection: 'Przegląd', leak_test: 'Kontrola szczelności',
  commissioning: 'Uruchomienie', decommission: 'Demontaż',
  recovery: 'Odzysk czynnika', other: 'Inne',
}

export type Priority = 'low' | 'normal' | 'high' | 'urgent' | 'critical'

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Niski', normal: 'Normalny', high: 'Wysoki', urgent: 'Pilny', critical: 'Krytyczny',
}

export type LeadStage =
  | 'new' | 'contacted' | 'qualified' | 'survey'
  | 'estimate' | 'offer_sent' | 'negotiation' | 'won' | 'lost'

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  new: 'Nowy', contacted: 'Skontaktowano', qualified: 'Kwalifikacja',
  survey: 'Wizja lokalna', estimate: 'Przygotowanie wyceny',
  offer_sent: 'Oferta wysłana', negotiation: 'Negocjacje',
  won: 'Wygrany', lost: 'Przegrany',
}

export type LeadTemperature = 'hot' | 'warm' | 'cold'

export type InvoiceStatus =
  | 'draft' | 'issued' | 'sent' | 'paid' | 'partially_paid' | 'overdue' | 'cancelled'

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: 'Szkic', issued: 'Wystawiona', sent: 'Wysłana',
  paid: 'Zapłacona', partially_paid: 'Częściowo zapłacona',
  overdue: 'Przeterminowana', cancelled: 'Anulowana',
}

export type ProtocolStatus = 'draft' | 'pending_signature' | 'signed' | 'finalized'

export const PROTOCOL_STATUS_LABELS: Record<ProtocolStatus, string> = {
  draft: 'Szkic', pending_signature: 'Oczekuje na podpis',
  signed: 'Podpisany', finalized: 'Sfinalizowany',
}

export type CylinderStatus = 'active' | 'low' | 'empty' | 'inspection_due' | 'retired'

export const CYLINDER_STATUS_LABELS: Record<CylinderStatus, string> = {
  active: 'Aktywna', low: 'Niski stan', empty: 'Pusta',
  inspection_due: 'Wymaga kontroli', retired: 'Wycofana',
}

export type SyncStatus = 'synced' | 'pending' | 'syncing' | 'conflict' | 'error'

export const SYNC_STATUS_LABELS: Record<SyncStatus, string> = {
  synced: 'Zsynchronizowano', pending: 'Oczekuje',
  syncing: 'Synchronizacja…', conflict: 'Konflikt', error: 'Błąd synchronizacji',
}

export type QuotationStatus =
  | 'draft' | 'internal_review' | 'ready' | 'sent' | 'viewed'
  | 'accepted' | 'rejected' | 'expired' | 'converted'

export const QUOTATION_STATUS_LABELS: Record<QuotationStatus, string> = {
  draft: 'Szkic', internal_review: 'Weryfikacja wewnętrzna', ready: 'Gotowa',
  sent: 'Wysłana', viewed: 'Wyświetlona', accepted: 'Zaakceptowana',
  rejected: 'Odrzucona', expired: 'Wygasła', converted: 'Skonwertowana',
}

export type CustomerType = 'individual' | 'company'

export type RefrigerantOperationType =
  | 'fill' | 'top_up' | 'recovery' | 'transfer' | 'disposal' | 'correction'

export const REFRIGERANT_OP_LABELS: Record<RefrigerantOperationType, string> = {
  fill: 'Napełnienie', top_up: 'Uzupełnienie', recovery: 'Odzysk',
  transfer: 'Transfer', disposal: 'Utylizacja', correction: 'Korekta',
}

export type SortDirection = 'asc' | 'desc'

export interface SortParams {
  field: string
  direction: SortDirection
}

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
  organizationId: string
}
