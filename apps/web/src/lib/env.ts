import { z } from 'zod'

/**
 * Every environment variable the app touches, validated at boot.
 * A missing var fails startup with a clear message instead of surfacing
 * as `undefined` three pages deep. See docs/engineering/tech-stack.md §7.
 *
 * Server-only values are never NEXT_PUBLIC_-prefixed — that prefix inlines
 * the value into the client bundle at build time.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  ANTHROPIC_API_KEY: z.string().min(1).optional(),

  DATABASE_URL: z.string().url().optional(),

  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  RESEND_API_KEY: z.string().min(1).optional(),

  SENTRY_DSN: z.string().url().optional(),

  // Voice appointment-setter demo (ADR-0010). All optional — absent means
  // the agentDemo:voice section renders its static fallback instead of a
  // broken control, exactly like ANTHROPIC_API_KEY gating the text demo.
  VAPI_ASSISTANT_ID: z.string().min(1).optional(),
  VAPI_WEBHOOK_SECRET: z.string().min(1).optional(),
  /** The Vapi tool id for the founder's Cal.com "Anvio intro call" event —
   * attached to the assistant so the agent can offer real slots and book. */
  VAPI_CALCOM_TOOL_ID: z.string().min(1).optional(),
})

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  /** Vapi's *public* key — designed for client use (ADR-0010). It only
   * starts a call against the pre-configured assistant; it cannot read
   * data or change assistant config. The webhook secret is what protects
   * the inbound side, and that stays server-only. */
  NEXT_PUBLIC_VAPI_PUBLIC_KEY: z.string().optional(),
})

const parsedServer = serverSchema.safeParse(process.env)
if (!parsedServer.success) {
  console.error(
    '❌ Invalid server environment variables:',
    parsedServer.error.flatten().fieldErrors,
  )
  throw new Error('Invalid server environment variables — see log above.')
}

const parsedClient = clientSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_VAPI_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
})
if (!parsedClient.success) {
  console.error(
    '❌ Invalid client environment variables:',
    parsedClient.error.flatten().fieldErrors,
  )
  throw new Error('Invalid client environment variables — see log above.')
}

export const env = { ...parsedServer.data, ...parsedClient.data }
