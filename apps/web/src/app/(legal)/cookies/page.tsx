import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { webPageSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * legal-spec.md §4. Written from what the site actually sets — audited
 * against the code, not against a vendor's docs. Re-verify against
 * `lib/analytics/` and `middleware.ts` before republishing.
 *
 * State as of this version (ADR-0008): the site loads PostHog analytics
 * and sets a first-touch attribution cookie, but **only after the
 * visitor accepts** via the consent banner. With no acceptance, nothing
 * here runs and the only cookie is the one recording that refusal.
 * Vercel Web Analytics runs regardless — it is cookieless.
 *
 * NOTE: not yet legal-reviewed. `/privacy` and this page are the two
 * surfaces where "approximately right" is not acceptable — see
 * current-situation.md §3.
 */
const sections: SectionInstance[] = [
  {
    type: 'breadcrumb',
    id: 'breadcrumb',
    variant: 'inline',
    theme: 'dark',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  },
  {
    type: 'hero',
    id: 'hero',
    variant: 'page-lead',
    theme: 'dark',
    eyebrow: 'LEGAL',
    heading: 'Cookie Policy',
    body: 'Last updated August 31, 2026.',
  },
  {
    type: 'richText',
    id: 'short-answer',
    variant: 'prose',
    theme: 'dark',
    heading: 'The short answer',
    paragraphs: [
      'Until you choose "Accept" on the banner, anvio.online sets no analytics or advertising cookies — the only thing stored is a single cookie remembering that you have not accepted, so we do not ask again on every page.',
      'If you accept, we load a privacy-friendly analytics tool (PostHog, hosted in the EU) and record where you arrived from, so we can see which pages and links actually bring people here. We never sell this data and we do not use it to build an advertising profile of you.',
      'We also measure page speed and aggregate visits with Vercel Web Analytics. That tool sets no cookies and does not identify you, so it runs whether or not you accept.',
    ],
  },
  {
    type: 'richText',
    id: 'cookies-we-set',
    variant: 'prose',
    theme: 'dark',
    heading: 'Cookies we set',
    paragraphs: [
      'anv_consent — remembers whether you accepted or declined analytics, so the banner does not reappear. First-party. Lasts 12 months. Set always; this is the cookie that lets us honour a "decline".',
      'anv_attr — records the page you first landed on and where you came from (the referring site and any campaign tags in the link). First-party. Lasts 6 months. Set only after you accept.',
      'ph_* (PostHog) — a first-party analytics identifier and its supporting values, used to count unique visits and follow a journey through the site. Set by PostHog, our analytics processor, on our domain. Lasts up to 12 months. Set only after you accept.',
    ],
  },
  {
    type: 'richText',
    id: 'change-your-mind',
    variant: 'prose',
    theme: 'dark',
    heading: 'Changing your choice',
    paragraphs: [
      'To withdraw consent after accepting, clear anvio.online cookies in your browser settings — the banner returns on your next visit and defaults, as always, to declined.',
      'Your browser also lets you block or delete cookies from any site at any time. Nothing on anvio.online depends on a cookie to function.',
    ],
  },
  {
    type: 'richText',
    id: 'related',
    variant: 'prose',
    theme: 'dark',
    heading: 'Related',
    paragraphs: [
      'See our Privacy Policy for what we collect through forms and the AI agent demo — that data collection is separate from cookies and covered there in full.',
    ],
  },
  {
    type: 'richText',
    id: 'contact',
    variant: 'prose',
    theme: 'dark',
    heading: 'Contact',
    paragraphs: ['Questions about this policy: hello@anvio.online.'],
  },
]

const COOKIES_TITLE = 'Cookie Policy'
const COOKIES_DESCRIPTION =
  'What anvio.online stores in your browser: nothing for analytics unless you accept, a cookieless speed measure that always runs, and exactly which cookies each choice sets.'

export const metadata: Metadata = buildMetadata({
  title: COOKIES_TITLE,
  description: COOKIES_DESCRIPTION,
  path: '/cookies',
})

export default function CookiesPage() {
  const webPage = webPageSchema({
    type: 'WebPage',
    name: COOKIES_TITLE,
    description: COOKIES_DESCRIPTION,
    path: '/cookies',
  })
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Cookie Policy', path: '/cookies' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SectionRenderer sections={sections} />
    </>
  )
}
