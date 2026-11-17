import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PostHogAnalytics } from '@/components/analytics/posthog'
import { ConsentBanner } from '@/components/analytics/consent-banner'
import { fontDisplay, fontBody, fontMono } from '@/styles/fonts'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/seo/constants'
import { organizationSchema, websiteSchema } from '@/lib/seo/schema'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Automation, Web Development & Growth`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
        <PostHogAnalytics />
        <ConsentBanner />
      </body>
    </html>
  )
}
