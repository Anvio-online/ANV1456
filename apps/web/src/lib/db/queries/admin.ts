import { sql } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { leadReviews } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/admin/auth'
import type { Lead, LeadSource } from '@/lib/admin/leads'

const inbox = sql`WITH inbox AS (
 SELECT 'contact'::text source, id, email, name, created_at, to_jsonb(t) - 'source_ip' payload FROM contact_submissions t
 UNION ALL SELECT 'audit', id, email, NULL, created_at, to_jsonb(t) - 'source_ip' FROM audit_requests t
 UNION ALL SELECT 'agent', id, email, NULL, created_at, to_jsonb(t) - 'source_ip' FROM agent_leads t
 UNION ALL SELECT 'voice', id, email, name, created_at, to_jsonb(t) - 'source_ip' FROM appointment_demo_leads t
), reviewed AS (
 SELECT i.*, COALESCE(r.status, 'new') status, r.notes, r.follow_up_at,
 COALESCE((SELECT e.status FROM email_delivery_events e WHERE e.provider_id = i.payload->>'email_provider_id' ORDER BY CASE WHEN e.status IN ('delivered','bounced','complained','failed') THEN 1 ELSE 0 END DESC, e.occurred_at DESC, e.received_at DESC LIMIT 1), i.payload->>'email_delivery_status') delivery_status
 FROM inbox i LEFT JOIN lead_reviews r ON r.source = i.source AND r.lead_id = i.id
)`
export async function listLeads(args: {
  q: string
  source: string
  status: string
  page: number
}): Promise<{ leads: Lead[]; total: number }> {
  await requireAdmin()
  if (!db) throw new Error('Database is not configured.')
  const pattern = `%${args.q.replace(/[\\%_]/g, '\\$&')}%`
  const filter = sql`(${args.source} = '' OR source = ${args.source}) AND (${args.status} = '' OR status = ${args.status}) AND (${args.q} = '' OR email ILIKE ${pattern} OR name ILIKE ${pattern} OR payload::text ILIKE ${pattern})`
  const counts = await db.execute<{ total: number }>(
    sql`${inbox} SELECT count(*)::int total FROM reviewed WHERE ${filter}`,
  )
  const rows = await db.execute<Lead>(
    sql`${inbox} SELECT * FROM reviewed WHERE ${filter} ORDER BY created_at DESC, id DESC LIMIT 25 OFFSET ${(args.page - 1) * 25}`,
  )
  return { leads: rows.rows, total: counts.rows[0]?.total ?? 0 }
}
export async function getLead(source: LeadSource, id: string): Promise<Lead | null> {
  await requireAdmin()
  if (!db) throw new Error('Database is not configured.')
  const rows = await db.execute<Lead>(
    sql`${inbox} SELECT * FROM reviewed WHERE source = ${source} AND id = ${id}::uuid LIMIT 1`,
  )
  return rows.rows[0] ?? null
}
export async function saveLeadReview(input: {
  source: LeadSource
  leadId: string
  status: string
  notes: string
  followUpAt: Date | null
}): Promise<void> {
  const actor = await requireAdmin()
  if (!db || !(await getLead(input.source, input.leadId))) throw new Error('Lead not found.')
  const values = { ...input, updatedBy: actor, updatedAt: new Date() }
  await db
    .insert(leadReviews)
    .values(values)
    .onConflictDoUpdate({ target: [leadReviews.source, leadReviews.leadId], set: values })
}
export async function inboxCounts(): Promise<{ source: string; total: number }[]> {
  await requireAdmin()
  if (!db) return []
  return (
    await db.execute<{ source: string; total: number }>(
      sql`${inbox} SELECT source, count(*)::int total FROM reviewed GROUP BY source`,
    )
  ).rows
}
