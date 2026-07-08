import { pgTable, text, timestamp, boolean, uuid, real, index } from 'drizzle-orm/pg-core'
import { organizations } from './organizations'

export const leads = pgTable('leads', {
  id:                uuid('id').primaryKey().defaultRandom(),
  organizationId:    uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  number:            text('number').notNull(),
  source:            text('source').default('phone').notNull(),
  stage:             text('stage').default('new').notNull(),
  temperature:       text('temperature').default('warm'),
  priority:          text('priority').default('normal'),
  customerType:      text('customer_type').default('company'),
  companyName:       text('company_name'),
  firstName:         text('first_name'),
  lastName:          text('last_name'),
  email:             text('email'),
  phone:             text('phone'),
  nip:               text('nip'),
  serviceType:       text('service_type'),
  estimatedValue:    real('estimated_value'),
  assignedTo:        uuid('assigned_to'),
  expectedCloseDate: timestamp('expected_close_date', { withTimezone: true }),
  lostReason:        text('lost_reason'),
  notes:             text('notes'),
  tags:              text('tags').array().default([]),
  convertedAt:       timestamp('converted_at', { withTimezone: true }),
  convertedToCustomerId: uuid('converted_to_customer_id'),
  isDeleted:         boolean('is_deleted').default(false).notNull(),
  createdAt:         timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:         timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  orgIdx:   index('leads_org_idx').on(t.organizationId),
  stageIdx: index('leads_stage_idx').on(t.stage),
}))

export const leadStageHistory = pgTable('lead_stage_history', {
  id:          uuid('id').primaryKey().defaultRandom(),
  leadId:      uuid('lead_id').references(() => leads.id, { onDelete: 'cascade' }).notNull(),
  fromStage:   text('from_stage'),
  toStage:     text('to_stage').notNull(),
  changedBy:   uuid('changed_by'),
  changedAt:   timestamp('changed_at', { withTimezone: true }).defaultNow().notNull(),
  notes:       text('notes'),
})
