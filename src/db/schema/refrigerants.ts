import { pgTable, text, timestamp, boolean, uuid, real, integer, index } from 'drizzle-orm/pg-core'
import { organizations } from './organizations'
import { devices } from './devices'

export const refrigerantOperations = pgTable('refrigerant_operations', {
  id:              uuid('id').primaryKey().defaultRandom(),
  organizationId:  uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  deviceId:        uuid('device_id').references(() => devices.id),
  type:            text('type').notNull(),
  refrigerantType: text('refrigerant_type').notNull(),
  massKg:          real('mass_kg').notNull(),
  gwp:             integer('gwp'),
  co2EquivalentT:  real('co2_equivalent_t'),
  performedAt:     timestamp('performed_at', { withTimezone: true }).defaultNow().notNull(),
  performedBy:     uuid('performed_by'),
  notes:           text('notes'),
  createdAt:       timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  orgIdx:    index('refrig_ops_org_idx').on(t.organizationId),
  deviceIdx: index('refrig_ops_device_idx').on(t.deviceId),
}))
