'use server'

import { cookies } from 'next/headers'
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

  if (!db) {
    if (env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL is not configured — cannot store the submission.')
    }
    console.warn('[audit] DB not configured — skipping insert in dev.', parsed.data)
    return { success: true }
  }

  const cookieStore = await cookies()
  const attribution = readAttribution(cookieStore.get(ATTRIBUTION_COOKIE)?.value)
  await db.insert(auditRequests).values({ ...parsed.data, ...attribution })
  await sendAuditRequestNotification(parsed.data)

  await captureServer({
    distinctId: parsed.data.email,
    consentCookie: cookieStore.get(CONSENT_COOKIE)?.value,
    event: AnalyticsEvent.AuditRequested,
  })
  return { success: true }
}
