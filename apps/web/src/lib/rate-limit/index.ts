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

/**
 * Sized off the plan caps above, not picked independently. One demo run
 * costs up to MAX_USER_TURNS (4) chat calls before the visitor ever
 * reaches the email gate, so the chat ceiling has to clear
 * plan_limit × 4 or it becomes the binding constraint and the plan
 * allowance is unreachable:
 *
 *   3 plans/hour × 4 turns = 12 chat calls/hour minimum → 20 (was 10)
 *   10 plans/day  × 4 turns = 40 chat calls/day  minimum → 60 (was 20)
 *
 * At the old 10/hour and 20/day, chat ran out first every time — a
 * visitor burned four turns, got refused mid-conversation, and never
 * saw the email field. That inverts ADR-0005: we paid for the cheap
 * turns and captured nothing, which is the one outcome the gate exists
 * to prevent. The plan caps are untouched — they remain the actual
 * spend control, exactly as the ADR specifies.
 */
export const chatRateLimitHourly = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, '1 h'), prefix: 'agent:chat:1h' })
  : null

/** Plan had both an hourly and a daily cap from the start; chat only
 * ever had the hourly one — nothing stopped it from running around
 * the clock, indefinitely, from one IP, since there was no ceiling
 * above the hourly window. */
export const chatRateLimitDaily = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, '1 d'), prefix: 'agent:chat:1d' })
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
  if (!chatRateLimitHourly || !chatRateLimitDaily) {
    if (env.NODE_ENV === 'production') {
      throw new Error('Rate limiting is not configured — refusing to serve the chat endpoint.')
    }
    return { success: true } as const
  }
  const [hourly, daily] = await Promise.all([
    chatRateLimitHourly.limit(ip),
    chatRateLimitDaily.limit(ip),
  ])
  return { success: hourly.success && daily.success } as const
}
