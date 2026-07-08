import { pgTable, text, timestamp, boolean, uuid, real, jsonb, index } from 'drizzle-orm/pg-core'
import { organizations } from './organizations'
import { customers } from './customers'

export const invoices = pgTable('invoices', {
  id:             uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  customerId:     uuid('customer_id').references(() => customers.id),
  number:         text('number').notNull(),
  type:           text('type').default('vat').notNull(),
  status:         text('status').default('draft').notNull(),
  issueDate:      timestamp('issue_date', { withTimezone: true }),
  saleDate:       timestamp('sale_date', { withTimezone: true }),
  dueDate:        timestamp('due_date', { withTimezone: true }),
  paymentMethod:  text('payment_method').default('transfer'),
  items:          jsonb('items').default([]).notNull(),
  netTotal:       real('net_total').default(0).notNull(),
  vatTotal:       real('vat_total').default(0).notNull(),
  grossTotal:     real('gross_total').default(0).notNull(),
  paidAmount:     real('paid_amount').default(0).notNull(),
  notes:          text('notes'),
  bankAccount:    text('bank_account'),
  isDeleted:      boolean('is_deleted').default(false).notNull(),
  createdAt:      timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:      timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  orgIdx:    index('invoices_org_idx').on(t.organizationId),
  statusIdx: index('invoices_status_idx').on(t.status),
}))
