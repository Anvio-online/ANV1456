import { Resend } from 'resend'
import { env } from '@/lib/env'
import type { AutomationPlan } from '@/lib/ai/schemas'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

/**
 * ADR-0005: the plan call only ever runs once an email is captured, so
 * every completed plan produces a contactable lead — sending it here
 * (rather than only rendering it in the panel) is what makes that true
 * in practice, not just in the gate check.
 */
export async function sendAutomationPlanEmail(to: string, plan: AutomationPlan) {
  if (!resend) {
    if (env.NODE_ENV === 'production') {
      throw new Error('RESEND_API_KEY is not configured — cannot send the captured lead.')
    }
    console.warn('[email] Resend not configured — skipping send in dev.', { to, plan })
    return
  }

  // resend.emails.send() does not throw on an API-level rejection — it
  // resolves normally with { data: null, error: {...} }. Without this
  // check, a real Resend rejection would silently produce a 200 here
  // while never actually sending — the exact silent-failure shape
  // ADR-0005's every-plan-produces-a-contactable-lead guarantee exists
  // to prevent, so it has to be checked explicitly, not assumed away
  // by the lack of a thrown exception.
  // `from` is a real, monitored mailbox rather than hello@anvio.online.
  // Resend verifies the *domain*, so either address sends fine — but a
  // visitor who replies to their plan with "yes, let's talk" is the
  // highest-intent lead this site produces, and hello@ has no mailbox
  // behind it, so those replies bounced silently. That failure mode
  // defeats the point of ADR-0005's email gate: the gate exists to
  // guarantee every plan produces a *contactable* lead, which is only
  // true if the contact works in both directions.
  const { error } = await resend.emails.send({
    from: 'Anvio <anshika@anvio.online>',
    to,
    subject: 'Your automation plan from Anvio',
    text: [
      plan.summary,
      '',
      ...plan.nodes.map((n, i) => `${i + 1}. ${n.label} — ${n.detail}`),
      '',
      `Estimated hours saved/month: ${plan.estimatedHoursSavedPerMonth.low}–${plan.estimatedHoursSavedPerMonth.high}`,
      `Complexity: ${plan.complexity}`,
      '',
      'Want to scope this properly? Book a call: https://anvio.online/contact',
    ].join('\n'),
  })
  if (error) {
    throw new Error(`Resend rejected the plan email: ${error.message}`)
  }
}
