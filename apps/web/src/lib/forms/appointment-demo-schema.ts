import { z } from 'zod'

/**
 * The voice appointment-setter demo (ADR-0010).
 *
 * `phone` is collected so the founder can follow up — in v1 it is NOT
 * dialled (the call happens in the browser). Outbound PSTN is phase 2
 * and needs its own ADR, so this only checks the shape, not a country
 * allowlist.
 *
 * `consent` is a literal `true`: the checkbox is a UX affordance, this
 * is the actual gate, and the start route re-checks it server-side.
 */
export const appointmentDemoFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  email: z.string().trim().email('Please enter a valid email.').max(160),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a phone number.')
    .max(20)
    // E.164-ish: optional +, leading non-zero, 6–14 more digits. Spaces,
    // dashes and parens are stripped before this runs (see normalisePhone).
    .regex(/^\+?[1-9]\d{6,14}$/, 'Please enter a valid phone number, including country code.'),
  consent: z.literal(true, { error: 'Please tick the box so we can call and follow up.' }),
})

export type AppointmentDemoFormValues = z.infer<typeof appointmentDemoFormSchema>

/** Strip formatting before validation so "+91 98765 43210" passes. */
export function normalisePhone(raw: string): string {
  return raw.replace(/[\s()\-.]/g, '')
}

/**
 * The slice of Vapi's `end-of-call-report` server message we actually
 * read. Vapi sends a large payload; everything not listed here is
 * ignored. Treated as untrusted input — it is parsed, never executed.
 */
export const vapiStructuredDataSchema = z
  .object({
    interested: z.boolean().optional(),
    booked: z.boolean().optional(),
    bookedFor: z.string().max(200).optional(),
    requestedAutomation: z.string().max(500).optional(),
  })
  .partial()

export const vapiEndOfCallReportSchema = z.object({
  message: z.object({
    type: z.string(),
    endedReason: z.string().optional(),
    transcript: z.string().optional(),
    summary: z.string().optional(),
    recordingUrl: z.string().url().optional(),
    analysis: z
      .object({
        summary: z.string().optional(),
        structuredData: vapiStructuredDataSchema.optional(),
      })
      .optional(),
    artifact: z
      .object({
        transcript: z.string().optional(),
        variableValues: z.record(z.string(), z.unknown()).optional(),
      })
      .optional(),
    call: z
      .object({
        id: z.string().optional(),
        assistantOverrides: z
          .object({ variableValues: z.record(z.string(), z.unknown()).optional() })
          .optional(),
      })
      .optional(),
  }),
})

export type VapiEndOfCallReport = z.infer<typeof vapiEndOfCallReportSchema>

/** The lifecycle of one demo lead row. */
export const APPOINTMENT_DEMO_STATUS = {
  started: 'started',
  booked: 'booked',
  interestedNoBooking: 'interested_no_booking',
  notInterested: 'not_interested',
  incomplete: 'incomplete',
} as const

export type AppointmentDemoStatus =
  (typeof APPOINTMENT_DEMO_STATUS)[keyof typeof APPOINTMENT_DEMO_STATUS]
