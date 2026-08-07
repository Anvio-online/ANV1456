import { z } from 'zod'

/**
 * grow-spec.md §7. Shared between the client form and the Server
 * Action — one schema validates both sides, same pattern as
 * contact-schema.ts. URL + email only, deliberately: every extra field
 * costs completions on the page's primary conversion device.
 */
export const auditRequestSchema = z.object({
  url: z
    .string()
    .min(1, 'Enter your website URL.')
    .refine((value) => {
      try {
        new URL(value.match(/^https?:\/\//) ? value : `https://${value}`)
        return true
      } catch {
        return false
      }
    }, 'Enter a valid URL.'),
  email: z.string().email('Enter a valid email.'),
})

export type AuditRequestValues = z.infer<typeof auditRequestSchema>
