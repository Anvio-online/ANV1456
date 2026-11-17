import { PostHog } from 'posthog-node'
import { env } from '@/lib/env'
import { hasAnalyticsConsent } from './consent'
import type { AnalyticsEventName, AnalyticsEventProperties } from './events'

/**
 * Server-side event capture. ADR-0008.
 *
 * Used for the events a client cannot vouch for — a plan was actually
 * generated, the plan email actually left for Resend, a form row
 * actually committed. Keyed to the captured email as `distinctId`, so
 * these land on the same PostHog person the client-side `identifyLead`
 * created.
 *
 * Gated on the same consent cookie as everything else: no key, or no
 * consent, → no-op. The caller passes the request's `anv_consent` cookie
 * value; reading cookies is the route/action's job, not this module's.
 */

let client: PostHog | null = null

function getClient(): PostHog | null {
  if (!env.NEXT_PUBLIC_POSTHOG_KEY) return null
  if (!client) {
    client = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: env.NEXT_PUBLIC_POSTHOG_HOST,
      // Serverless: send immediately rather than batching across a
      // process that may freeze the moment the response is returned.
      flushAt: 1,
      flushInterval: 0,
    })
  }
  return client
}

export async function captureServer<E extends AnalyticsEventName>(
  args: {
    distinctId: string
    consentCookie: string | undefined
    event: E
  } & (AnalyticsEventProperties[E] extends Record<string, never>
    ? { properties?: undefined }
    : { properties: AnalyticsEventProperties[E] }),
): Promise<void> {
  if (!hasAnalyticsConsent(args.consentCookie)) return
  const ph = getClient()
  if (!ph) return

  ph.capture({
    distinctId: args.distinctId,
    event: args.event,
    properties: args.properties,
  })
  // Best-effort: an analytics flush must never fail the request it rides
  // on. The event is already queued; a lost flush loses one event.
  await ph.flush().catch((err: unknown) => {
    console.error('[analytics] server flush failed', err)
  })
}
