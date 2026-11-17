'use server'

import { cookies } from 'next/headers'
import { db } from '@/lib/db/client'
import { contactSubmissions } from '@/lib/db/schema'
import { contactSchema, type ContactFormValues } from '@/lib/forms/contact-schema'
import { env } from '@/lib/env'
import { sendContactNotification } from '@/lib/email/lead-notification'
import { ATTRIBUTION_COOKIE, readAttribution } from '@/lib/analytics/attribution'
import { CONSENT_COOKIE } from '@/lib/analytics/consent'
import { captureServer } from '@/lib/analytics/posthog-server'
import { AnalyticsEvent } from '@/lib/analytics/events'

export type ContactActionResult = { success: true } | { success: false; error: string }

/**
 * conventions.md §5: validate → rate limit → act → revalidate, in that
 * order. No rate limit here yet — this form is low-volume relative to
 * the agent demo's per-request cost, and doesn't call the model.
 */
export async function submitContactForm(values: ContactFormValues): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) {
    return { success: false, error: 'Please check the form and try again.' }
  }

  if (!db) {
    if (env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL is not configured — cannot store the submission.')
    }
    console.warn('[contact] DB not configured — skipping insert in dev.', parsed.data)
    return { success: true }
  }

  const cookieStore = await cookies()
  const attribution = readAttribution(cookieStore.get(ATTRIBUTION_COOKIE)?.value)
  await db.insert(contactSubmissions).values({ ...parsed.data, ...attribution })
  await sendContactNotification(parsed.data)

  await captureServer({
    distinctId: parsed.data.email,
    consentCookie: cookieStore.get(CONSENT_COOKIE)?.value,
    event: AnalyticsEvent.ContactFormSubmitted,
    properties: {
      team_size: parsed.data.teamSize ?? null,
      has_company: Boolean(parsed.data.company),
    },
  })
  return { success: true }
}
