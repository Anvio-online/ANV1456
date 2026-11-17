import { z } from 'zod'
export const auditRequestSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Enter your website URL.')
    .max(2048)
    .transform((value) => (value.match(/^https?:\/\//i) ? value : `https://${value}`))
    .refine((value) => {
      try {
        const url = new URL(value)
        return (
          ['https:', 'http:'].includes(url.protocol) &&
          !url.username &&
          !url.password &&
          url.hostname.includes('.') &&
          !/^(localhost|127\.|10\.|192\.168\.|169\.254\.)/i.test(url.hostname)
        )
      } catch {
        return false
      }
    }, 'Enter a public website URL.'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email.')
    .max(254)
    .transform((value) => value.toLowerCase()),
  companyWebsite: z.string().max(200).optional(),
  challengeToken: z.string().max(4096).optional(),
})
export type AuditRequestValues = z.infer<typeof auditRequestSchema>
