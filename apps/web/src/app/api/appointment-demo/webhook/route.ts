import { NextResponse, type NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { appointmentDemoLeads } from '@/lib/db/schema'
import {
  vapiEndOfCallReportSchema,
  type AppointmentDemoStatus,
} from '@/lib/forms/appointment-demo-schema'
import { verifyVapiWebhook } from '@/lib/vapi/config'
import { sendAppointmentDemoNotification } from '@/lib/email/appointment-demo'

export const runtime = 'nodejs'

/**
 * Inbound from Vapi at the end of a voice appointment-setter call
 * (ADR-0010). We only act on `end-of-call-report`. Everything here is
 * untrusted input: verified, parsed, never executed.
 *
 * Updates the lead row and emails the founder the transcript + outcome.
 * Cal.com handles the calendar invite itself when a slot was booked.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  if (!verifyVapiWebhook(rawBody, req.headers)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  let json: unknown
  try {
    json = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = vapiEndOfCallReportSchema.safeParse(json)
  if (!parsed.success) {
    // Not a shape we handle (a different message type, or Vapi changed
    // the payload) — 200 so Vapi doesn't retry a message we're choosing
    // to ignore.
    return NextResponse.json({ ok: true, ignored: true })
  }

  const { message } = parsed.data
  if (message.type !== 'end-of-call-report') {
    return NextResponse.json({ ok: true, ignored: true })
  }

  const transcript = message.transcript ?? message.artifact?.transcript ?? null
  const summary = message.analysis?.summary ?? message.summary ?? null
  const structured = message.analysis?.structuredData ?? null

  const leadId =
    asString(message.call?.assistantOverrides?.variableValues?.leadId) ??
    asString(message.artifact?.variableValues?.leadId)

  const status = resolveStatus(message.endedReason, structured)

  if (db && leadId) {
    await db
      .update(appointmentDemoLeads)
      .set({
        status,
        vapiCallId: message.call?.id ?? null,
        transcript,
        summary,
        structuredData: structured ?? null,
        completedAt: new Date(),
      })
      .where(eq(appointmentDemoLeads.id, leadId))
  }

  // Fetch the row back for the name/email/phone the notification needs;
  // if there's no DB or no row, send what the report itself carries.
  let lead: {
    name: string
    email: string
    phone: string
  } | null = null
  if (db && leadId) {
    const [row] = await db
      .select({
        name: appointmentDemoLeads.name,
        email: appointmentDemoLeads.email,
        phone: appointmentDemoLeads.phone,
      })
      .from(appointmentDemoLeads)
      .where(eq(appointmentDemoLeads.id, leadId))
      .limit(1)
    lead = row ?? null
  }

  await sendAppointmentDemoNotification({
    name: lead?.name ?? 'Unknown (no lead row)',
    email: lead?.email ?? 'unknown',
    phone: lead?.phone ?? 'unknown',
    status,
    summary,
    transcript,
    structuredData: structured,
  })

  return NextResponse.json({ ok: true })
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

function resolveStatus(
  endedReason: string | undefined,
  structured: { interested?: boolean; booked?: boolean } | null,
): AppointmentDemoStatus {
  if (structured?.booked) return 'booked'
  if (structured?.interested) return 'interested_no_booking'
  if (structured?.interested === false) return 'not_interested'
  // No structured signal — infer from how the call ended.
  if (endedReason && /customer-ended|assistant-ended|hangup/i.test(endedReason)) return 'incomplete'
  return 'incomplete'
}
