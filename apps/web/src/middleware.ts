import { NextResponse, type NextRequest } from 'next/server'
import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE_SECONDS,
  attributionFromRequest,
} from '@/lib/analytics/attribution'

/**
 * First-touch attribution capture. ADR-0008.
 *
 * On the first request from a visitor, snapshot where they came from
 * (landing path, referrer origin, UTM params) into the `anv_attr`
 * cookie. Every lead-producing path reads it back and stamps the lead
 * row, so the dashboard can attribute a captured email to its source.
 *
 * Consent gate: the cookie is only written once `anv_consent=granted`
 * is present (set by the consent banner — ADR-0008 Phase 2). Until then
 * this middleware is a no-op in practice, which is the correct default
 * for a site whose /cookies policy promises consent-first tracking.
 * Vercel's own analytics is unaffected — it is cookieless.
 */
export function middleware(req: NextRequest): NextResponse {
  const res = NextResponse.next()

  const hasConsent = req.cookies.get('anv_consent')?.value === 'granted'
  const alreadyCaptured = req.cookies.has(ATTRIBUTION_COOKIE)

  if (hasConsent && !alreadyCaptured) {
    const attribution = attributionFromRequest(req.nextUrl, req.headers.get('referer'))
    res.cookies.set(ATTRIBUTION_COOKIE, JSON.stringify(attribution), {
      maxAge: ATTRIBUTION_MAX_AGE_SECONDS,
      sameSite: 'lax',
      path: '/',
      // Read by Server Actions and the agent route on the server; no
      // client code needs it, so keep it out of document.cookie.
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
  }

  return res
}

export const config = {
  /**
   * Page navigations only. Skip API routes, Next internals, and static
   * assets — none of them are a "first landing" and running middleware
   * on every asset request is wasted work.
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
