import { pgTable, text, timestamp, boolean, uuid, index } from 'drizzle-orm/pg-core'
import { organizations } from './organizations'

export const customers = pgTable('customers', {
  id:             uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  number:         text('number').notNull(),
  type:           text('type').default('company').notNull(),
  companyName:    text('company_name'),
  firstName:      text('first_name'),
  lastName:       text('last_name'),
  nip:            text('nip'),
  regon:          text('regon'),
  email:          text('email'),
  phone:          text('phone'),
  address:        text('address'),
  city:           text('city'),
  postalCode:     text('postal_code'),
  notes:          text('notes'),
  tags:           text('tags').array().default([]),
  status:         text('status').default('active').notNull(),
  isDeleted:      boolean('is_deleted').default(false).notNull(),
  deletedAt:      timestamp('deleted_at', { withTimezone: true }),
  createdAt:      timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:      timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  orgIdx:    index('customers_org_idx').on(t.organizationId),
  nipIdx:    index('customers_nip_idx').on(t.nip),
  statusIdx: index('customers_status_idx').on(t.status),
}))

export const sites = pgTable('sites', {
  id:             uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  customerId:     uuid('customer_id').references(() => customers.id, { onDelete: 'cascade' }).notNull(),
  name:           text('name').notNull(),
  address:        text('address'),
  city:           text('city'),
  postalCode:     text('postal_code'),
  type:           text('type'),
  floor:          text('floor'),
  contactPerson:  text('contact_person'),
  contactPhone:   text('contact_phone'),
  accessNotes:    text('access_notes'),
  lat:            text('lat'),
  lng:            text('lng'),
  isDeleted:      boolean('is_deleted').default(false).notNull(),
  createdAt:      timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:      timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  orgIdx:      index('sites_org_idx').on(t.organizationId),
  customerIdx: index('sites_customer_idx').on(t.customerId),
}))
