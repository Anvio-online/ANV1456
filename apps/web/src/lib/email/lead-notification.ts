import { Resend } from 'resend'
import { env } from '@/lib/env'
import type { ContactFormValues } from '@/lib/forms/contact-schema'
import type { AuditRequestValues } from '@/lib/forms/audit-schema'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

/**
 * Where new leads land. docs/README.md's open item — "Decide who
 * monitors hello@anvio.online and where form submissions notify" —
 * resolved: the user's own inbox, not the shared hello@ address.
 * `from` stays hello@anvio.online below regardless — that's the
 * verified sending domain; only the recipient changes here.
 */
const LEAD_NOTIFICATION_RECIPIENT = 'anshika1307goel@gmail.com'

/**
 * Both contact.ts and audit.ts previously only wrote to the database —
 * a real submission with no code path that ever notified anyone. The
 * lead was never lost (verified: rows land in contact_submissions /
 * audit_requests correctly), just silent — nobody had a reason to go
 * check the database unless they already suspected a lead existed.
 *
 * Deliberately best-effort: a failure here is logged, never thrown.
 * The visitor already got their success confirmation once the DB
 * insert committed — a Resend outage shouldn't turn their already-
 * successful submission into an error on their screen. Contrast with
 * sendAutomationPlanEmail, which throws in production, because that
 * email *is* the deliverable the visitor is waiting for; this one is
 * a side notification to Anvio, not to them.
 */
async function sendLeadNotification(subject: string, text: string, replyTo: string) {
  if (!resend) {
    console.warn('[lead-notification] Resend not configured — skipping send.', {
      subject,
      text,
    })
    return
  }

  try {
    // resend.emails.send() does not throw on an API-level rejection —
    // it resolves normally with { data: null, error: {...} }. Only a
    // network-level failure lands in the catch below; a real Resend
    // rejection (bad request, restricted account, whatever) would have
    // silently fallen through here with no log at all before this
    // check existed — found by a real notification that never arrived
    // with nothing in the logs to explain why.
    const { data, error } = await resend.emails.send({
      from: 'Anvio Leads <hello@anvio.online>',
      to: LEAD_NOTIFICATION_RECIPIENT,
      replyTo,
      subject,
      text,
    })
    if (error) {
      console.error('[lead-notification] Resend rejected the send.', { subject, error })
      return
    }
    console.log('[lead-notification] Sent.', { subject, id: data.id })
  } catch (error) {
    console.error('[lead-notification] Failed to send — lead is still saved in the database.', {
      subject,
      error,
    })
  }
}

export async function sendContactNotification(values: ContactFormValues) {
  await sendLeadNotification(
    `New contact form lead: ${values.name}`,
    [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company ? `Company: ${values.company}` : null,
      values.teamSize ? `Team size: ${values.teamSize}` : null,
      '',
      values.message,
    ]
      .filter((line): line is string => line !== null)
      .join('\n'),
    values.email,
  )
}

export async function sendAuditRequestNotification(values: AuditRequestValues) {
  await sendLeadNotification(
    `New free-audit request: ${values.url}`,
    [`URL: ${values.url}`, `Email: ${values.email}`].join('\n'),
    values.email,
  )
}
