import { Resend } from 'resend'
import { env } from '@/lib/env'
import type { AppointmentDemoStatus } from '@/lib/forms/appointment-demo-schema'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

/** Same inbox as the contact/audit notifications (lib/email/lead-notification.ts).
 * The founder's personal inbox, separate from the anvio.online mailbox. */
const LEAD_NOTIFICATION_RECIPIENT = 'anshika1307goel@gmail.com'

const STATUS_LINE: Record<AppointmentDemoStatus, string> = {
  started: 'Call started but no end-of-call report yet',
  booked: '✅ Interested — call BOOKED',
  interested_no_booking: 'Interested, but no slot booked — follow up',
  not_interested: 'Not interested right now',
  incomplete: 'Call ended early / incomplete',
}

type AppointmentDemoLead = {
  name: string
  email: string
  phone: string
  status: AppointmentDemoStatus
  summary?: string | null
  transcript?: string | null
  structuredData?: {
    bookedFor?: string
    requestedAutomation?: string
  } | null
}

/**
 * ADR-0010: fires from the Vapi end-of-call webhook. Best-effort —
 * logged, never thrown (mirrors lead-notification.ts): the lead row is
 * already saved, and a Resend outage must not 500 the webhook and make
 * Vapi retry a call we've already recorded. Cal.com sends its own
 * calendar invite to both parties when a slot is booked; this is the
 * founder's working copy, transcript included.
 */
export async function sendAppointmentDemoNotification(lead: AppointmentDemoLead): Promise<void> {
  if (!resend) {
    console.warn('[appointment-demo] Resend not configured — skipping notification.', {
      email: lead.email,
      status: lead.status,
    })
    return
  }

  const body = [
    STATUS_LINE[lead.status],
    '',
    `Name:  ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    lead.structuredData?.bookedFor ? `Booked for: ${lead.structuredData.bookedFor}` : null,
    lead.structuredData?.requestedAutomation
      ? `Wants automated: ${lead.structuredData.requestedAutomation}`
      : null,
    '',
    lead.summary ? `Summary:\n${lead.summary}` : null,
    '',
    lead.transcript ? `Transcript:\n${lead.transcript}` : '(no transcript captured)',
  ]
    .filter((line): line is string => line !== null)
    .join('\n')

  try {
    const { error } = await resend.emails.send({
      from: 'Anvio Leads <hello@anvio.online>',
      to: LEAD_NOTIFICATION_RECIPIENT,
      replyTo: lead.email,
      subject: `Voice demo: ${lead.name} — ${lead.status.replace(/_/g, ' ')}`,
      text: body,
    })
    if (error) {
      console.error('[appointment-demo] Resend rejected the notification.', {
        email: lead.email,
        error,
      })
    }
  } catch (error) {
    console.error('[appointment-demo] Notification failed — lead is still saved in the DB.', {
      email: lead.email,
      error,
    })
  }
}
