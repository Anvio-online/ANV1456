import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core'

/**
 * The record ADR-0005 exists to produce: every gated agent-demo plan
 * generates a row here, tagged with the transcript that led to it.
 */
export const agentLeads = pgTable('agent_leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull(),
  transcript: jsonb('transcript').notNull(),
  plan: jsonb('plan').notNull(),
  sourceIp: text('source_ip'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
