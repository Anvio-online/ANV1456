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
})

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
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
})
if (!parsedClient.success) {
  console.error(
    '❌ Invalid client environment variables:',
    parsedClient.error.flatten().fieldErrors,
  )
  throw new Error('Invalid client environment variables — see log above.')
}

export const env = { ...parsedServer.data, ...parsedClient.data }
