/**
 * The analytics event catalogue. ADR-0008.
 *
 * Every event Anvio sends to PostHog is named here once — call sites use
 * the constant, never a string literal, so a rename is one edit and a
 * typo is a type error rather than a second half-populated event in the
 * dashboard. Names are `snake_case` per code-style.md; property keys too,
 * to match PostHog's own convention.
 *
 * `capture()` lives in `analytics.ts` (client) and `posthog-server.ts`
 * (server); both take an `AnalyticsEventName` and the matching
 * `AnalyticsEventProperties` entry.
 */

export const AnalyticsEvent = {
  /** The agent-demo CTA — fires once, when the visitor sends their first
   * message (an empty "Build my plan" click submits nothing, so there is
   * nothing earlier to hook). The top of the demo funnel. */
  BuildMyPlanClicked: 'build_my_plan_clicked',
  /** Each answer the visitor sends during the Q&A stage. */
  AgentDemoTurnSent: 'agent_demo_turn_sent',
  /** The visitor submitted their email at the gate (client-side — the
   * request may still fail or be rate-limited). */
  AgentPlanEmailSubmitted: 'agent_plan_email_submitted',
  /** Server confirmed a plan was generated and a lead row written. */
  AgentPlanGenerated: 'agent_plan_generated',
  /** Whether the plan email actually left for Resend without rejection. */
  AgentPlanEmailSent: 'agent_plan_email_sent',
  /** A contact-form submission stored successfully. */
  ContactFormSubmitted: 'contact_form_submitted',
  /** A free-audit request stored successfully. */
  AuditRequested: 'audit_requested',
} as const

export type AnalyticsEventName = (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent]

/** Property shape per event. `Record<string, never>` = no properties. */
export type AnalyticsEventProperties = {
  build_my_plan_clicked: Record<string, never>
  agent_demo_turn_sent: { turn_number: number }
  agent_plan_email_submitted: Record<string, never>
  agent_plan_generated: {
    complexity: 'low' | 'medium' | 'high'
    hours_low: number
    hours_high: number
  }
  agent_plan_email_sent: { email_sent: boolean }
  contact_form_submitted: { team_size: string | null; has_company: boolean }
  audit_requested: Record<string, never>
}
