'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CONSENT_COOKIE, readConsent } from '@/lib/analytics/consent'
import { denyAnalyticsConsent, grantAnalyticsConsent } from '@/lib/analytics/capture'

/**
 * Analytics consent. ADR-0008 Phase 2.
 *
 * Shown once, to everyone, until a choice is made — the /cookies policy
 * promises a consent option that defaults to declined, and nothing
 * analytics-related runs before "Accept" here. Vercel's own analytics is
 * cookieless and out of scope.
 *
 * Renders nothing on the server and on the first client paint (the
 * cookie is only readable in the browser) to avoid a hydration
 * mismatch, then reveals itself if no choice is stored yet.
 */
export function ConsentBanner() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const current = readConsent(readCookie(CONSENT_COOKIE))
    if (current === 'unset') setVisible(true)
  }, [])

  if (!visible) return null

  function accept() {
    grantAnalyticsConsent()
    setVisible(false)
    // The middleware now sees consent granted; refreshing the route lets
    // it capture first-touch attribution from the URL we're still on
    // (UTM params included) before the visitor navigates away.
    router.refresh()
  }

  function decline() {
    denyAnalyticsConsent()
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Analytics consent"
      className="p-gutter fixed inset-x-0 bottom-0 z-50 flex justify-center"
    >
      <div className="border-border bg-surface shadow-card-lg max-w-content flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center">
        <p className="text-body-s text-text-2">
          We use a privacy-friendly analytics tool to understand which pages and links bring people
          here. It only runs if you accept.{' '}
          <Link href="/cookies" className="text-accent-text underline">
            Cookie Policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button type="button" intent="secondary" size="md" onClick={decline}>
            Decline
          </Button>
          <Button type="button" size="md" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}

function readCookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.slice(name.length + 1)
}
