'use server'

import { and, eq, gte } from 'drizzle-orm'
import { checkAuditRateLimit } from '@/lib/rate-limit'
import { verifyAuditChallenge } from '@/lib/forms/bot-protection'
import { cookies, headers } from 'next/headers'
import { db } from '@/lib/db/client'
import { auditRequests } from '@/lib/db/schema'
import { auditRequestSchema, type AuditRequestValues } from '@/lib/forms/audit-schema'
import { env } from '@/lib/env'
import { sendAuditRequestNotification } from '@/lib/email/lead-notification'
import { ATTRIBUTION_COOKIE, readAttribution } from '@/lib/analytics/attribution'
import { CONSENT_COOKIE } from '@/lib/analytics/consent'
import { captureServer } from '@/lib/analytics/posthog-server'
import { AnalyticsEvent } from '@/lib/analytics/events'

export type AuditRequestResult = { success: true } | { success: false; error: string }

/**
 * grow-spec.md §7. Same validate -> act pattern as
 * lib/actions/contact.ts — see that file's docstring on why there's no
 * rate limit yet (low volume, no model call).
 */
export async function submitAuditRequest(values: AuditRequestValues): Promise<AuditRequestResult> {
  const parsed = auditRequestSchema.safeParse(values)
  if (!parsed.success) {
    return { success: false, error: 'Please check the form and try again.' }
  }

  // A filled trap gets a harmless response without creating a lead or email.
  if (parsed.data.companyWebsite) return { success: true }
  const requestHeaders = await headers()
  const ip =
    requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    requestHeaders.get('x-real-ip') ||
    'unknown'
  try {
    if (!(await checkAuditRateLimit(ip, parsed.data.email)).success)
      return { success: false, error: 'Too many requests. Please try again later.' }
    if (!(await verifyAuditChallenge(parsed.data.challengeToken, ip)))
      return { success: false, error: 'Please complete the verification and try again.' }
  } catch (error) {
    console.error('[audit] submission protection unavailable', error)
    return {
      success: false,
      error: 'Submissions are temporarily unavailable. Please try again later.',
    }
  }

  if (!db) {
    if (env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL is not configured — cannot store the submission.')
    }
    console.warn('[audit] DB not configured — skipping insert in dev.', parsed.data)
    return { success: true }
  }

  const cookieStore = await cookies()
  const attribution = readAttribution(cookieStore.get(ATTRIBUTION_COOKIE)?.value)
  const { url, email } = parsed.data
  const existing = await db
    .select({ id: auditRequests.id })
    .from(auditRequests)
    .where(
      and(
        eq(auditRequests.email, email),
        eq(auditRequests.url, url),
        gte(auditRequests.createdAt, new Date(Date.now() - 86400000)),
      ),
    )
    .limit(1)
  if (existing.length) return { success: true }
  await db.insert(auditRequests).values({ url, email, ...attribution })
  await sendAuditRequestNotification(parsed.data)

  await captureServer({
    distinctId: parsed.data.email,
    consentCookie: cookieStore.get(CONSENT_COOKIE)?.value,
    event: AnalyticsEvent.AuditRequested,
  })
  return { success: true }
}
