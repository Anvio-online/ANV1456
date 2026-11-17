import { pgTable, text, timestamp, uuid, jsonb, boolean } from 'drizzle-orm/pg-core'

/**
 * First-touch attribution, captured once per visitor by `middleware.ts`
 * into the `anv_attr` cookie and copied onto whichever lead row that
 * visitor eventually produces. ADR-0008.
 *
 * Every column is nullable: the cookie is consent-gated, so a lead from
 * a visitor who declined analytics (or predates the consent banner)
 * simply has no attribution — that is a valid state, not a defect. The
 * same block is spread into all three lead tables so a Metabase query
 * can `UNION` them on a common shape.
 */
const attributionColumns = {
  /** The path the visitor first landed on, e.g. `/services/automate`. */
  landingPage: text('landing_page'),
  /** The `Referer` header on that first request — origin only, in practice. */
  referrer: text('referrer'),
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  utmTerm: text('utm_term'),
  utmContent: text('utm_content'),
  /** PostHog's anonymous id, so a DB row can be reconciled with its
   * PostHog person timeline without storing anything more. */
  posthogDistinctId: text('posthog_distinct_id'),
}

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
  /** Whether the plan email actually reached Resend without rejection —
   * the same boolean the /api/agent response returns to the client, kept
   * so the dashboard can show a delivery-success rate. */
  emailSent: boolean('email_sent').notNull().default(false),
  ...attributionColumns,
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
  ...attributionColumns,
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

/**
 * ADR-0010: the voice appointment-setter demo. One row per started
 * call. The row is inserted before the call connects (status
 * 'started'), then filled in from Vapi's end-of-call-report webhook.
 * `phone` is stored for founder follow-up — it is NOT dialled in v1.
 */
export const appointmentDemoLeads = pgTable('appointment_demo_leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  /** started | booked | interested_no_booking | not_interested | incomplete */
  status: text('status').notNull().default('started'),
  vapiCallId: text('vapi_call_id'),
  transcript: text('transcript'),
  summary: text('summary'),
  structuredData: jsonb('structured_data'),
  sourceIp: text('source_ip'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
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
  ...attributionColumns,
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
