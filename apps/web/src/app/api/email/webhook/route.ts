import { NextResponse, type NextRequest } from 'next/server'
import { db } from '@/lib/db/client'
import { emailDeliveryEvents } from '@/lib/db/schema'
import { env } from '@/lib/env'
import { verifyDeliveryEvent } from '@/lib/email/delivery'
export const runtime = 'nodejs'
export async function POST(req: NextRequest) {
  if (!env.RESEND_WEBHOOK_SECRET || !db)
    return new NextResponse('Delivery tracking unavailable', { status: 503 })
  const body = await req.text()
  if (body.length > 262144) return new NextResponse('Payload too large', { status: 413 })
  let event
  try {
    event = verifyDeliveryEvent(body, req.headers, env.RESEND_WEBHOOK_SECRET)
  } catch {
    return new NextResponse('Invalid signature', { status: 401 })
  }
  if (!event) return NextResponse.json({ ignored: true })
  await db.insert(emailDeliveryEvents).values(event).onConflictDoNothing()
  return NextResponse.json({ ok: true })
}
