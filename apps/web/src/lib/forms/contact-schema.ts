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
  /** The <select>'s unselected state submits '' (matching its disabled
   * placeholder option's value), not undefined — z.enum(...).optional()
   * accepts undefined but not '', so leaving this field alone (exactly
   * what "optional" is supposed to allow) failed validation for every
   * visitor who did that. Found live on production: skipping this field
   * blocked the whole form, silently, with no visible error (contact-
   * form.tsx never wired up error={errors.teamSize?.message} either).
   * The preprocess step normalizes '' to undefined before the enum check
   * runs, so an empty selection reads as "not provided," as intended. */
  teamSize: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.enum(TEAM_SIZE_OPTIONS).optional(),
  ),
  message: z.string().min(1, "Tell us what's the most repetitive thing your team does.").max(2000),
})

export type ContactFormValues = z.infer<typeof contactSchema>
