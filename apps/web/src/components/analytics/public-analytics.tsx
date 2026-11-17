import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PostHogAnalytics } from './posthog'
import { ConsentBanner } from './consent-banner'
/** Mounted only in public route groups; admin records never enter analytics. */
export function PublicAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <PostHogAnalytics />
      <ConsentBanner />
    </>
  )
}
