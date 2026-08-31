/**
 * Analytics consent state. ADR-0008.
 *
 * The `/cookies` policy promises consent-first tracking: nothing that
 * sets a cookie or identifies a visitor runs until they opt in, and the
 * default is declined. Every analytics entry point — the middleware
 * attribution cookie, client-side PostHog, server-side PostHog capture —
 * gates on `hasAnalyticsConsent()` reading this one cookie.
 *
 * The cookie is written by the consent banner (ADR-0008 Phase 2). Until
 * that ships there is no way to reach `granted`, so analytics is inert —
 * the correct default, not a bug.
 *
 * No dependencies: imported by `middleware.ts` (Edge runtime).
 */

export const CONSENT_COOKIE = 'anv_consent'

/** 1 year — a consent choice should outlast a session but still lapse
 * eventually so the banner can re-ask. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

export type ConsentState = 'granted' | 'denied' | 'unset'

export function readConsent(cookieValue: string | undefined): ConsentState {
  if (cookieValue === 'granted') return 'granted'
  if (cookieValue === 'denied') return 'denied'
  return 'unset'
}

export function hasAnalyticsConsent(cookieValue: string | undefined): boolean {
  return readConsent(cookieValue) === 'granted'
}
