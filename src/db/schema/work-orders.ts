import { pgTable, text, timestamp, boolean, uuid, integer, real, index } from 'drizzle-orm/pg-core'
import { organizations } from './organizations'
import { customers } from './customers'
import { sites } from './customers'

export const workOrders = pgTable('work_orders', {
  id:             uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  number:         text('number').notNull(),
  type:           text('type').notNull(),
  status:         text('status').default('new').notNull(),
  priority:       text('priority').default('normal').notNull(),
  customerId:     uuid('customer_id').references(() => customers.id),
  siteId:         uuid('site_id').references(() => sites.id),
  title:          text('title'),
  description:    text('description'),
  scheduledStart: timestamp('scheduled_start', { withTimezone: true }),
  scheduledEnd:   timestamp('scheduled_end', { withTimezone: true }),
  actualStart:    timestamp('actual_start', { withTimezone: true }),
  actualEnd:      timestamp('actual_end', { withTimezone: true }),
  estimatedHours: real('estimated_hours'),
  travelKm:       real('travel_km'),
  notes:          text('notes'),
  internalNotes:  text('internal_notes'),
  isDeleted:      boolean('is_deleted').default(false).notNull(),
  createdAt:      timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:      timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  orgIdx:     index('work_orders_org_idx').on(t.organizationId),
  statusIdx:  index('work_orders_status_idx').on(t.status),
  schedIdx:   index('work_orders_sched_idx').on(t.scheduledStart),
}))
