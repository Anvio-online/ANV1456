/**
 * First-touch attribution. ADR-0008.
 *
 * `middleware.ts` writes the `anv_attr` cookie once, on the first request
 * from a visitor who has granted analytics consent. Every lead-producing
 * path (contact action, audit action, agent route) reads it back through
 * `readAttribution()` and persists the fields onto the DB row, so the
 * Metabase dashboard can answer "where did this lead come from" without a
 * PostHog API call.
 *
 * The cookie is the single source of truth for first-touch. It is never
 * overwritten — a visitor's attribution is whatever brought them the
 * first time, even if they return later on a different link.
 *
 * No dependencies on purpose: this module is imported by `middleware.ts`
 * and runs on the Edge runtime. The cookie payload is one we wrote
 * ourselves, so a hand-rolled shape check is enough — pulling Zod into
 * the middleware bundle for it is not worth the kilobytes.
 */

export const ATTRIBUTION_COOKIE = 'anv_attr'

/** 180 days. Long enough to attribute a slow B2B consideration cycle;
 * short enough that a stale first-touch eventually expires. */
export const ATTRIBUTION_MAX_AGE_SECONDS = 60 * 60 * 24 * 180

type UtmKey = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content'

/** Stored in the cookie; a superset of what lands on a lead row. */
export type Attribution = {
  landingPage: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string
}

/** The DB-column subset written onto a lead row. `posthogDistinctId` is
 * added by the caller, not by this cookie. */
export type AttributionColumns = {
  landingPage: string | null
  referrer: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmTerm: string | null
  utmContent: string | null
}

/**
 * Build the attribution record from an incoming request's URL and
 * headers. Used by `middleware.ts` when it first sees a visitor.
 */
export function attributionFromRequest(url: URL, referer: string | null): Attribution {
  const utm = (key: UtmKey): string => url.searchParams.get(key)?.slice(0, 200) ?? ''

  return {
    landingPage: url.pathname.slice(0, 512),
    // Store the referrer's origin only — the full URL can carry query
    // strings we have no reason to keep, and the origin is all the
    // "which channel" question needs.
    referrer: safeOrigin(referer),
    utmSource: utm('utm_source'),
    utmMedium: utm('utm_medium'),
    utmCampaign: utm('utm_campaign'),
    utmTerm: utm('utm_term'),
    utmContent: utm('utm_content'),
  }
}

const EMPTY_COLUMNS: AttributionColumns = {
  landingPage: null,
  referrer: null,
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmTerm: null,
  utmContent: null,
}

/**
 * Parse the `anv_attr` cookie value into DB columns. Returns all-null on
 * a missing or malformed cookie — a lead with no attribution is a valid
 * state (visitor declined consent, or predates the banner), never an
 * error worth throwing over. `''` fields normalise to `null` so the
 * column reads as "not set" rather than "set to empty" in SQL.
 */
export function readAttribution(cookieValue: string | undefined): AttributionColumns {
  if (!cookieValue) return EMPTY_COLUMNS

  const raw = safeJsonParse(cookieValue)
  if (raw === null || typeof raw !== 'object') return EMPTY_COLUMNS
  const record = raw as Record<string, unknown>

  const field = (key: keyof Attribution): string | null => {
    const value = record[key]
    return typeof value === 'string' && value !== '' ? value.slice(0, 512) : null
  }

  return {
    landingPage: field('landingPage'),
    referrer: field('referrer'),
    utmSource: field('utmSource'),
    utmMedium: field('utmMedium'),
    utmCampaign: field('utmCampaign'),
    utmTerm: field('utmTerm'),
    utmContent: field('utmContent'),
  }
}

function safeJsonParse(value: string): unknown {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function safeOrigin(referer: string | null): string {
  if (!referer) return ''
  try {
    return new URL(referer).origin
  } catch {
    return ''
  }
}
