import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { webPageSchema, organizationSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * contact-spec.md. All four Phase 1 sections built — this page has no
 * Tier 1 or Tier 2 motion, deliberately: the form is the LCP-critical
 * element and must never wait on a bundle (motion-system.md §6 rule 1's
 * logic, applied to a form instead of a hero headline).
 *
 * Not optimized for a service keyword (contact-spec.md's own rule) —
 * this route exists to convert traffic that arrived already convinced,
 * not to rank.
 */
const sections: SectionInstance[] = [
  {
    type: 'contact',
    id: 'hero',
    variant: 'split-form',
    theme: 'dark',
    eyebrow: "LET'S TALK",
    heading: 'Tell us what’s slow.',
    body: 'A 30-minute call. We’ll look at one process or one page, tell you honestly whether it’s worth fixing, roughly what it’d take, and what it’d cost. If the answer is "not yet," you’ll get that too.',
    reassurances: [
      'We reply within one working day',
      'No pitch deck, no slide about our "process journey"',
      'If we’re not the right fit, we’ll say so and point you somewhere better',
    ],
    messageLabel: 'What should we look at?',
  },
  {
    type: 'leadMagnet',
    id: 'not-ready',
    variant: 'route-cards',
    theme: 'dark',
    eyebrow: 'NOT READY FOR A CALL?',
    heading: 'Check us out without talking to anyone.',
    options: [
      {
        title: 'Try the agent demo',
        body: 'Describe one repetitive process and get a real automation plan back. Free, no call, about 60 seconds.',
        href: '/services/automate#agent-demo',
        ctaLabel: 'Try the demo',
      },
      {
        title: 'Get a free site audit',
        body: 'Send a URL, get back a real technical audit in five working days.',
        href: '/services/grow',
        ctaLabel: 'Get the audit',
      },
    ],
  },
  {
    type: 'contact',
    id: 'details',
    variant: 'details',
    theme: 'dark',
    eyebrow: 'OTHER WAYS TO REACH US',
    email: 'hello@anvio.online',
    responseTime: 'Within one working day, Monday–Friday',
    location: 'India · working with clients in India, the UAE, and remote-first elsewhere',
  },
  {
    type: 'richText',
    id: 'what-happens-next',
    variant: 'numbered-steps',
    theme: 'dark',
    eyebrow: 'WHAT HAPPENS NEXT',
    steps: [
      {
        label: 'You send this form.',
        text: 'It reaches a person, not a queue.',
      },
      {
        label: 'We reply within one working day',
        text: '— usually with a couple of questions or a calendar link.',
      },
      {
        label: 'The call is 30 minutes.',
        text: 'You describe the problem; we tell you what we’d do and roughly what it costs.',
      },
      {
        label: 'You get a written summary',
        text: 'whether or not you hire us. Including the "you don’t need this" version.',
      },
    ],
  },
]

const CONTACT_TITLE = 'Contact Anvio — Book a Free Consultation'
const CONTACT_DESCRIPTION =
  "Tell us what's slow. A 30-minute call, no pitch deck — we'll tell you honestly whether we can help and roughly what it would take."

export const metadata: Metadata = buildMetadata({
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  path: '/contact',
})

export default function ContactPage() {
  const webPage = webPageSchema({
    type: 'ContactPage',
    name: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    path: '/contact',
  })
  const org = organizationSchema()
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SectionRenderer sections={sections} />
    </>
  )
}
