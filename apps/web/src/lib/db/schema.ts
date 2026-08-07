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
  /** contact-spec.md §1 — optional, qualifies fast against the stated
   * 10-200 employee range. Specced for automate-spec.md's closing CTA
   * too but deferred there; this is where it actually lands. */
  teamSize: text('team_size'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

/**
 * grow-spec.md §7 — the page's primary conversion. URL + email only:
 * every extra field costs completions, and those two are all the audit
 * work itself needs. Name/company can come in the reply, same
 * reasoning the spec gives for keeping the form to two fields.
 */
export const auditRequests = pgTable('audit_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  url: text('url').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
