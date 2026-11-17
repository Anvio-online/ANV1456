import { z } from 'zod'
import { env } from '@/lib/env'
import { SITE_URL } from '@/lib/seo/constants'
const responseSchema = z.object({
  success: z.boolean(),
  hostname: z.string().optional(),
  action: z.string().optional(),
})
export async function verifyAuditChallenge(
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) return env.NODE_ENV !== 'production'
  if (!token) return false
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token })
  if (ip !== 'unknown') body.set('remoteip', ip)
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) return false
    const result = responseSchema.safeParse(await response.json())
    return (
      result.success &&
      result.data.success &&
      result.data.action === 'audit' &&
      (result.data.hostname === new URL(SITE_URL).hostname ||
        (env.NODE_ENV !== 'production' && result.data.hostname === 'localhost'))
    )
  } catch (error) {
    console.error('[audit] challenge verification unavailable', error)
    return false
  }
}
