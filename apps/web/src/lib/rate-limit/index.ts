import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { env } from '@/lib/env'

/**
 * ADR-0005: 3 completed plans/hour, 10/day per IP — plans are the
 * expensive call. Chat turns get a separate, looser cap since they're
 * cheap and open to everyone. There is no API-side spend cap; this is
 * the only thing standing between the public demo and an open bill.
 */
const redis =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN })
    : null

export const planRateLimitHourly = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, '1 h'), prefix: 'agent:plan:1h' })
  : null

export const planRateLimitDaily = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, '1 d'), prefix: 'agent:plan:1d' })
  : null

export const chatRateLimitHourly = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, '1 h'), prefix: 'agent:chat:1h' })
  : null

export async function checkPlanRateLimit(ip: string) {
  if (!planRateLimitHourly || !planRateLimitDaily) {
    // No Redis configured (local dev without env vars) — fail open, but
    // loudly, so this is never silently the production behaviour.
    if (env.NODE_ENV === 'production') {
      throw new Error('Rate limiting is not configured — refusing to serve the plan endpoint.')
    }
    return { success: true } as const
  }
  const [hourly, daily] = await Promise.all([
    planRateLimitHourly.limit(ip),
    planRateLimitDaily.limit(ip),
  ])
  return { success: hourly.success && daily.success } as const
}

export async function checkChatRateLimit(ip: string) {
  if (!chatRateLimitHourly) {
    if (env.NODE_ENV === 'production') {
      throw new Error('Rate limiting is not configured — refusing to serve the chat endpoint.')
    }
    return { success: true } as const
  }
  return chatRateLimitHourly.limit(ip)
}
