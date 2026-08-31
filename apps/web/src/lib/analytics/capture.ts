'use client'

import type { PostHog } from 'posthog-js'
import type { AnalyticsEventName, AnalyticsEventProperties } from './events'
import { CONSENT_COOKIE, hasAnalyticsConsent } from './consent'

/**
 * Client-side analytics. ADR-0008.
 *
 * `posthog-js` is ~85 KB gzipped — far too much for the shared bundle
 * the LCP budget is measured against. So it is **never statically
 * imported**: `loadAnalytics()` pulls it in with a dynamic `import()`
 * (its own chunk, fetched after hydration) and only when the visitor has
 * consented. Before that, `captureClient`/`identifyLead` are silent
 * no-ops and the library is never downloaded.
 *
 * Call sites import `captureClient` freely — it costs nothing until
 * consent turns the machinery on.
 */

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com'

let instance: PostHog | null = null
let pending: Promise<PostHog | null> | null = null

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.slice(name.length + 1)
}

/**
 * Load, initialise, and return the PostHog client — or `null` if there
 * is no key or the visitor has not consented. Idempotent and safe to
 * call on every route change; the import resolves once.
 */
export async function loadAnalytics(): Promise<PostHog | null> {
  if (instance) return instance
  if (!POSTHOG_KEY) return null
  if (!hasAnalyticsConsent(readCookie(CONSENT_COOKIE))) return null

  if (!pending) {
    pending = import('posthog-js').then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        // No person profile — and no billed event — until identifyLead().
        person_profiles: 'identified_only',
        // Sent manually by the pageview tracker; App Router soft
        // navigations don't trigger PostHog's own listener.
        capture_pageview: false,
        capture_pageleave: true,
        persistence: 'localStorage+cookie',
        respect_dnt: true,
      })
      instance = posthog
      return posthog
    })
  }
  return pending
}

/** The already-loaded client, or null. Never triggers a load. */
export function getAnalytics(): PostHog | null {
  return instance
}

export function captureClient<E extends AnalyticsEventName>(
  event: E,
  ...args: AnalyticsEventProperties[E] extends Record<string, never>
    ? []
    : [properties: AnalyticsEventProperties[E]]
): void {
  instance?.capture(event, args[0])
}

/**
 * Tie the anonymous session to the captured email — every prior
 * pageview and click then stitches to this person in PostHog. If
 * analytics hasn't loaded yet (consent granted moments earlier, import
 * still in flight), wait for it so the identify isn't lost.
 */
export function identifyLead(email: string): void {
  if (instance) {
    instance.identify(email)
    return
  }
  void loadAnalytics().then((ph) => ph?.identify(email))
}
