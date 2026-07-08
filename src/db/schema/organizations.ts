import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core'

export const organizations = pgTable('organizations', {
  id:            uuid('id').primaryKey().defaultRandom(),
  name:          text('name').notNull(),
  slug:          text('slug').notNull().unique(),
  nip:           text('nip'),
  regon:         text('regon'),
  email:         text('email'),
  phone:         text('phone'),
  address:       text('address'),
  city:          text('city'),
  postalCode:    text('postal_code'),
  logoUrl:       text('logo_url'),
  website:       text('website'),
  isActive:      boolean('is_active').default(true).notNull(),
  plan:          text('plan').default('start').notNull(),
  planExpiresAt: timestamp('plan_expires_at', { withTimezone: true }),
  createdAt:     timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:     timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const profiles = pgTable('profiles', {
  id:             uuid('id').primaryKey(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
  fullName:       text('full_name'),
  avatarUrl:      text('avatar_url'),
  role:           text('role').default('technician').notNull(),
  phone:          text('phone'),
  isActive:       boolean('is_active').default(true).notNull(),
  createdAt:      timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:      timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
