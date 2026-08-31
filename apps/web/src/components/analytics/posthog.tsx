'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { loadAnalytics } from '@/lib/analytics/capture'

/**
 * PostHog bootstrap. ADR-0008. Mounted once in `app/layout.tsx`,
 * renders nothing.
 *
 * All it does is kick `loadAnalytics()` on mount and on every route
 * change, and send a manual `$pageview`. `loadAnalytics()` itself is the
 * gate: no key or no consent → it returns null, `posthog-js` is never
 * fetched, and this component is inert. The consent banner (Phase 2)
 * sets the cookie and calls `loadAnalytics()`, at which point the next
 * pageview effect starts sending.
 */
export function PostHogAnalytics() {
  return (
    <Suspense fallback={null}>
      <PageviewTracker />
    </Suspense>
  )
}

function PageviewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    void loadAnalytics().then((ph) => {
      if (!ph) return
      const query = searchParams.toString()
      ph.capture('$pageview', {
        $current_url: window.origin + pathname + (query ? `?${query}` : ''),
      })
    })
  }, [pathname, searchParams])

  return null
}
