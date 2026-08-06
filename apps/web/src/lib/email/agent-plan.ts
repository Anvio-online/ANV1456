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

  await resend.emails.send({
    from: 'Anvio <hello@anvio.online>',
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
}
