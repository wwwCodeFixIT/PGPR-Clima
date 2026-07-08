import { pgTable, text, timestamp, boolean, uuid, jsonb, index, integer } from 'drizzle-orm/pg-core'
import { organizations } from './organizations'
import { workOrders } from './work-orders'

export const protocols = pgTable('protocols', {
  id:             uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  workOrderId:    uuid('work_order_id').references(() => workOrders.id),
  number:         text('number').notNull(),
  type:           text('type').notNull(),
  status:         text('status').default('draft').notNull(),
  title:          text('title'),
  formData:       jsonb('form_data').default({}).notNull(),
  snapshot:       jsonb('snapshot'),
  contentHash:    text('content_hash'),
  version:        integer('version').default(1).notNull(),
  finalizedAt:    timestamp('finalized_at', { withTimezone: true }),
  isDeleted:      boolean('is_deleted').default(false).notNull(),
  createdAt:      timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:      timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  orgIdx:  index('protocols_org_idx').on(t.organizationId),
  woIdx:   index('protocols_wo_idx').on(t.workOrderId),
  numIdx:  index('protocols_num_idx').on(t.number),
}))

export const signatures = pgTable('signatures', {
  id:          uuid('id').primaryKey().defaultRandom(),
  protocolId:  uuid('protocol_id').references(() => protocols.id, { onDelete: 'cascade' }).notNull(),
  signerName:  text('signer_name').notNull(),
  signerRole:  text('signer_role').notNull(),
  imageUrl:    text('image_url').notNull(),
  signedAt:    timestamp('signed_at', { withTimezone: true }).defaultNow().notNull(),
  ipAddress:   text('ip_address'),
  userAgent:   text('user_agent'),
  lat:         text('lat'),
  lng:         text('lng'),
})
