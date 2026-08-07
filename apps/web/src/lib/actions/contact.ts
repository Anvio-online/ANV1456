'use server'

import { db } from '@/lib/db/client'
import { contactSubmissions } from '@/lib/db/schema'
import { contactSchema, type ContactFormValues } from '@/lib/forms/contact-schema'
import { env } from '@/lib/env'
import { sendContactNotification } from '@/lib/email/lead-notification'

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

  await db.insert(contactSubmissions).values(parsed.data)
  await sendContactNotification(parsed.data)
  return { success: true }
}
