'use server'

import { db } from '@/lib/db/client'
import { auditRequests } from '@/lib/db/schema'
import { auditRequestSchema, type AuditRequestValues } from '@/lib/forms/audit-schema'
import { env } from '@/lib/env'

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

  await db.insert(auditRequests).values(parsed.data)
  return { success: true }
}
