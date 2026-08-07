import { z } from 'zod'

/**
 * Shared between the client form and the Server Action — one schema
 * validates both sides. conventions.md §2/§5: the client half is a UX
 * affordance, not a security boundary; the server re-validates.
 */
/** contact-spec.md §1 — matches Brand_strategy.md's stated 10-200
 * employee range, plus a below/above band so nobody's forced into the
 * wrong bucket. Not a security boundary, just keeps the stored value
 * consistent with what the form actually offers. */
export const TEAM_SIZE_OPTIONS = ['1–9', '10–49', '50–100', '101–200', '200+'] as const

export const contactSchema = z.object({
  name: z.string().min(1, 'Enter your name.').max(200),
  email: z.string().email('Enter a valid email.'),
  company: z.string().max(200).optional(),
  teamSize: z.enum(TEAM_SIZE_OPTIONS).optional(),
  message: z.string().min(1, "Tell us what's the most repetitive thing your team does.").max(2000),
})

export type ContactFormValues = z.infer<typeof contactSchema>
