import { randomUUID } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'
import { db } from '@/lib/db/client'
import { appointmentDemoLeads } from '@/lib/db/schema'
import { env } from '@/lib/env'
import { checkVoiceCallRateLimit } from '@/lib/rate-limit'
import { appointmentDemoFormSchema, normalisePhone } from '@/lib/forms/appointment-demo-schema'
import { buildAssistantOverrides, isVoiceDemoConfigured } from '@/lib/vapi/config'

export const runtime = 'nodejs'

/**
 * Starts a voice appointment-setter demo call (ADR-0010).
 *
 * The browser SDK runs the call itself against Vapi's public key, but
 * the gate is here: validate → rate limit → record → hand back config.
 * A caller who is rate-limited or hasn't consented gets no assistant
 * config back, so no call can start. conventions.md §5 order.
 */
export async function POST(req: NextRequest) {
  if (!isVoiceDemoConfigured) {
    return NextResponse.json({ error: 'Voice demo is not configured.' }, { status: 503 })
  }

  // Same client-IP ladder as api/agent/route.ts — a real IP first, the
  // constant only as a last resort so the per-IP cap can't collapse into
  // one shared bucket.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    '127.0.0.1'

  const raw = await req.json().catch(() => null)
  const parsed = appointmentDemoFormSchema.safeParse(
    raw && typeof raw === 'object'
      ? { ...raw, phone: typeof raw.phone === 'string' ? normalisePhone(raw.phone) : raw.phone }
      : raw,
  )
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' },
      { status: 400 },
    )
  }
  const { name, email, phone } = parsed.data

  const rl = await checkVoiceCallRateLimit(ip)
  if (!rl.success) {
    return NextResponse.json(
      { error: 'The demo is at its limit for now — book a consultation instead.' },
      { status: 429 },
    )
  }

  let leadId: string
  if (db) {
    const [row] = await db
      .insert(appointmentDemoLeads)
      .values({ name, email, phone, sourceIp: ip, status: 'started' })
      .returning({ id: appointmentDemoLeads.id })
    leadId = row?.id ?? randomUUID()
  } else {
    if (env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL is not configured — cannot record the voice demo lead.')
    }
    leadId = randomUUID()
  }

  return NextResponse.json({
    publicKey: env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
    assistantId: env.VAPI_ASSISTANT_ID,
    assistantOverrides: buildAssistantOverrides({ name, leadId }),
  })
}
