import { pgTable, text, timestamp, boolean, uuid, real, index, integer } from 'drizzle-orm/pg-core'
import { organizations } from './organizations'
import { customers } from './customers'
import { sites } from './customers'

export const devices = pgTable('devices', {
  id:                  uuid('id').primaryKey().defaultRandom(),
  organizationId:      uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  customerId:          uuid('customer_id').references(() => customers.id),
  siteId:              uuid('site_id').references(() => sites.id),
  number:              text('number').notNull(),
  type:                text('type').notNull(),
  manufacturer:        text('manufacturer'),
  model:               text('model'),
  serialNumber:        text('serial_number'),
  refrigerantType:     text('refrigerant_type'),
  refrigerantChargeKg: real('refrigerant_charge_kg'),
  additionalChargeKg:  real('additional_charge_kg'),
  gwp:                 integer('gwp'),
  coolingCapacityKw:   real('cooling_capacity_kw'),
  heatingCapacityKw:   real('heating_capacity_kw'),
  powerW:              real('power_w'),
  voltage:             text('voltage'),
  room:                text('room'),
  installedAt:         timestamp('installed_at', { withTimezone: true }),
  commissionedAt:      timestamp('commissioned_at', { withTimezone: true }),
  warrantyUntil:       timestamp('warranty_until', { withTimezone: true }),
  inspectionIntervalMonths: integer('inspection_interval_months').default(12),
  nextInspectionAt:    timestamp('next_inspection_at', { withTimezone: true }),
  qrCode:              text('qr_code'),
  notes:               text('notes'),
  status:              text('status').default('active').notNull(),
  isDeleted:           boolean('is_deleted').default(false).notNull(),
  createdAt:           timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:           timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  orgIdx:     index('devices_org_idx').on(t.organizationId),
  serialIdx:  index('devices_serial_idx').on(t.serialNumber),
  siteIdx:    index('devices_site_idx').on(t.siteId),
}))
