import { z } from 'zod'
export const leadSourceSchema = z.enum(['contact', 'audit', 'agent', 'voice'])
export const leadStatusSchema = z.enum(['new', 'contacted', 'qualified', 'won', 'spam', 'archived'])
export type LeadSource = z.infer<typeof leadSourceSchema>
export const LEAD_STATUSES = leadStatusSchema.options
export type Lead = {
  source: LeadSource
  id: string
  email: string
  name: string | null
  created_at: string
  payload: Record<string, unknown>
  status: string
  notes: string | null
  follow_up_at: string | null
  total: number
  delivery_status: string | null
}
export function spamSignals(email: string, website?: string): string[] {
  const reasons: string[] = []
  const local = email.split('@')[0] ?? ''
  if ((local.match(/\./g)?.length ?? 0) >= 5)
    reasons.push('Unusual email formatting; verify the sender')
  if (website) {
    try {
      const label =
        new URL(website.match(/^https?:\/\//i) ? website : `https://${website}`).hostname.split(
          '.',
        )[0] ?? ''
      if (label.length >= 6 && !/[aeiou]/i.test(label))
        reasons.push('Domain resembles a generated string; verify the business')
    } catch {
      reasons.push('Website address needs review')
    }
  }
  return reasons
}
export function safeWebsite(value: unknown): string | null {
  if (typeof value !== 'string') return null
  try {
    const url = new URL(value.match(/^https?:\/\//i) ? value : `https://${value}`)
    if (
      !['http:', 'https:'].includes(url.protocol) ||
      url.username ||
      url.password ||
      !url.hostname.includes('.') ||
      /^(localhost|127\.|10\.|192\.168\.|169\.254\.)/i.test(url.hostname)
    )
      return null
    return url.toString()
  } catch {
    return null
  }
}
