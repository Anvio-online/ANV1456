import { z } from 'zod'

/**
 * Shared between the client form and the Server Action — one schema
 * validates both sides. conventions.md §2/§5: the client half is a UX
 * affordance, not a security boundary; the server re-validates.
 */
export const contactSchema = z.object({
  name: z.string().min(1, 'Enter your name.').max(200),
  email: z.string().email('Enter a valid email.'),
  company: z.string().max(200).optional(),
  message: z.string().min(1, "Tell us what's the most repetitive thing your team does.").max(2000),
})

export type ContactFormValues = z.infer<typeof contactSchema>
