import { pgTable, text, timestamp, boolean, uuid, real, index } from 'drizzle-orm/pg-core'
import { organizations } from './organizations'

export const cylinders = pgTable('cylinders', {
  id:              uuid('id').primaryKey().defaultRandom(),
  organizationId:  uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  number:          text('number').notNull(),
  serialNumber:    text('serial_number'),
  qrCode:          text('qr_code'),
  refrigerantType: text('refrigerant_type').notNull(),
  taraKg:          real('tara_kg').notNull(),
  capacityKg:      real('capacity_kg').notNull(),
  currentGrossKg:  real('current_gross_kg').notNull(),
  status:          text('status').default('active').notNull(),
  location:        text('location'),
  assignedTo:      uuid('assigned_to'),
  lastInspection:  timestamp('last_inspection', { withTimezone: true }),
  nextInspection:  timestamp('next_inspection', { withTimezone: true }),
  notes:           text('notes'),
  isDeleted:       boolean('is_deleted').default(false).notNull(),
  createdAt:       timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:       timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  orgIdx: index('cylinders_org_idx').on(t.organizationId),
}))

export const cylinderMovements = pgTable('cylinder_movements', {
  id:           uuid('id').primaryKey().defaultRandom(),
  cylinderId:   uuid('cylinder_id').references(() => cylinders.id, { onDelete: 'cascade' }).notNull(),
  type:         text('type').notNull(),
  massBeforeKg: real('mass_before_kg').notNull(),
  massChangeKg: real('mass_change_kg').notNull(),
  massAfterKg:  real('mass_after_kg').notNull(),
  performedAt:  timestamp('performed_at', { withTimezone: true }).defaultNow().notNull(),
  performedBy:  uuid('performed_by'),
  workOrderId:  uuid('work_order_id'),
  deviceId:     uuid('device_id'),
  notes:        text('notes'),
  createdAt:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  cylIdx: index('cylinder_movements_cyl_idx').on(t.cylinderId),
}))
