import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { webPageSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * legal-spec.md §4. Written from what the site actually sets — audited
 * against the code, not against an analytics vendor's own docs. As of
 * this page, no analytics tool is wired into the codebase at all
 * (lib/analytics/ is empty), so the honest answer is short: the site
 * sets no tracking cookies today. legal-spec.md's own recommendation,
 * if analytics is added later, is Plausible (cookieless) over GA4 —
 * update this page before any tracking script ships, not after.
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
    body: 'Last updated August 10, 2026.',
  },
  {
    type: 'richText',
    id: 'short-answer',
    variant: 'prose',
    theme: 'dark',
    heading: 'The short answer',
    paragraphs: [
      "We don't currently set any tracking or advertising cookies on anvio.online. There is no analytics or marketing script running on the site as of this policy — nothing here to opt out of.",
      "This page exists anyway because it's meant to stay true, not just be present. If that changes, we'll list exactly what's added below before it goes live, and we prefer tools that don't need cookies at all where a feature allows it.",
    ],
  },
  {
    type: 'richText',
    id: 'what-could-change',
    variant: 'prose',
    theme: 'dark',
    heading: 'What might be added later',
    paragraphs: [
      'If we add site analytics, our first choice is a cookieless tool that measures aggregate traffic without tracking you individually or needing consent. If we ever add a tool that does set a cookie, we will list its name, purpose, and duration in a table on this page, and add a consent option for visitors in the EU and UK that defaults to declined.',
    ],
  },
  {
    type: 'richText',
    id: 'browser-controls',
    variant: 'prose',
    theme: 'dark',
    heading: 'Your browser controls',
    paragraphs: [
      'Even with nothing to opt out of here, your browser lets you block or delete cookies from any site at any time in its settings. Nothing on anvio.online currently depends on a cookie to function.',
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
  "What anvio.online sets in your browser — as of this policy, no tracking or analytics cookies at all — and what would change if that ever isn't true."

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
