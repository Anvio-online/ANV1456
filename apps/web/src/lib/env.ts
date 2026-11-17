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

  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  ADMIN_EMAILS: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  RESEND_WEBHOOK_SECRET: z.string().optional(),
  KV_REST_API_URL: z.string().url().optional(),
  KV_REST_API_TOKEN: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  VAPI_ASSISTANT_ID: z.string().min(1).optional(),
  VAPI_WEBHOOK_SECRET: z.string().min(1).optional(),
  VAPI_CALCOM_TOOL_ID: z.string().min(1).optional(),
})

const clientSchema = z.object({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),

  /**
   * PostHog project API key — write-only, safe in the client bundle by
   * design, and used by `posthog-node` server-side too (it is the
   * ingestion key, not a personal/admin key). ADR-0008. Absent in dev
   * and on preview → analytics is a no-op, which is the intended
   * default. Supersedes the Plausible/GA vars this replaced.
   */
  NEXT_PUBLIC_VAPI_PUBLIC_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().default('https://eu.i.posthog.com'),
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
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_VAPI_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
})
if (!parsedClient.success) {
  console.error(
    '❌ Invalid client environment variables:',
    parsedClient.error.flatten().fieldErrors,
  )
  throw new Error('Invalid client environment variables — see log above.')
}

export const env = { ...parsedServer.data, ...parsedClient.data }
