// User model is managed by Supabase Auth.
// Profiles are in organizations.ts.
// This file reserved for user-preferences, skills, etc.
import { pgTable, text, uuid, timestamp, jsonb } from 'drizzle-orm/pg-core'
import { profiles } from './organizations'

export const technicianSkills = pgTable('technician_skills', {
  id:         uuid('id').primaryKey().defaultRandom(),
  profileId:  uuid('profile_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  skill:      text('skill').notNull(),
  level:      text('level').default('basic'),
  createdAt:  timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const userPreferences = pgTable('user_preferences', {
  id:          uuid('id').primaryKey().defaultRandom(),
  profileId:   uuid('profile_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull().unique(),
  preferences: jsonb('preferences').default({}).notNull(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
