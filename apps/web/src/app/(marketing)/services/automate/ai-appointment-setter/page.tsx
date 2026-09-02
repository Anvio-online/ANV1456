import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { contentRepository } from '@/lib/content'

const PATH = '/services/automate/ai-appointment-setter'
const SLUG = 'ai-appointment-setter'

/**
 * service-leaf-spec.md. Same frame as ai-chatbot-development/page.tsx —
 * see that file for the class. The one difference: the demo section is
 * `agentDemo:voice` (ADR-0010), the live voice appointment setter,
 * because on this page the demo *is* the service.
 */
export async function generateMetadata(): Promise<Metadata> {
  const entry = await contentRepository.get('services', SLUG)
  if (!entry) return {}
  return buildMetadata({ title: entry.title, description: entry.description, path: PATH })
}

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Automate', path: '/services/automate' },
]

export default async function AiAppointmentSetterPage() {
  const entry = await contentRepository.get('services', SLUG)
  if (!entry) notFound()

  const crumbs = [...CRUMBS, { name: entry.title, path: PATH }]

  const sections: SectionInstance[] = [
    {
      type: 'breadcrumb',
      id: 'breadcrumb',
      variant: 'inline',
      theme: 'dark',
      items: crumbs,
    },
    {
      type: 'hero',
      id: 'hero',
      variant: 'page-lead',
      theme: 'dark',
      eyebrow: 'AUTOMATE · VOICE',
      heading: entry.h1,
      body: entry.description,
    },
    {
      type: 'problem',
      id: 'the-problem',
      variant: 'pain-grid',
      theme: 'dark',
      eyebrow: 'WHAT IT REPLACES',
      heading: 'The calls this stops you losing.',
      items: entry.pains,
    },
    {
      type: 'richText',
      id: 'body',
      variant: 'mdx',
      theme: 'light',
      body: entry.content,
    },
    {
      type: 'workflowGraph',
      id: 'how-it-works',
      variant: 'compact',
      theme: 'light',
      eyebrow: 'HOW A CALL BECOMES A BOOKING',
      heading: 'One call, from ring to calendar.',
      scenario: 'Someone rings while you are on a job.',
      nodes: [
        {
          id: 'answer',
          label: 'AI answers',
          status: 'received',
          explainer: 'It picks up, and says in the first sentence that it is an AI.',
        },
        {
          id: 'qualify',
          label: 'Qualify',
          status: 'classifying',
          explainer: 'Location, what they need, rough timing — the questions you ask every time.',
        },
        {
          id: 'book',
          label: 'Offer real slots',
          status: 'searching',
          explainer: 'It reads your actual calendar and offers only times that are free.',
        },
        {
          id: 'handover',
          label: 'Booked + noted',
          status: 'confirmed',
          explainer: 'The slot is in your calendar and you get the number and a one-line summary.',
        },
      ],
      edges: [
        { from: 'answer', to: 'qualify' },
        { from: 'qualify', to: 'book' },
        { from: 'book', to: 'handover' },
      ],
    },
    {
      type: 'faq',
      id: 'faq',
      variant: 'accordion',
      theme: 'light',
      eyebrow: 'QUESTIONS',
      heading: 'About the AI appointment setter specifically.',
      items: entry.faq,
    },
    {
      type: 'agentDemo',
      id: 'agent-demo',
      variant: 'voice',
      theme: 'dark',
      eyebrow: 'TRY IT NOW',
      heading: 'Let it call you.',
      body: 'Fill in the three fields and it calls you in your browser — the same system, wired to our own calendar. It will ask what you need, and if it makes sense, book you fifteen minutes with our founder.',
      consentLabel: 'I agree Anvio may call me now and follow up about this enquiry.',
      privacyNote: 'We record and transcribe the call so we can follow up. Privacy policy.',
    },
    {
      type: 'relatedLinks',
      id: 'related',
      theme: 'dark',
      variant: 'card-grid',
      eyebrow: 'RELATED',
      heading: 'Where to go next.',
      items: entry.relatedLinks,
    },
    {
      type: 'ctaClosing',
      id: 'cta-closing',
      variant: 'centered-bold',
      theme: 'dark',
      eyebrow: "Let's talk",
      heading: 'Tell us how your calls come in.',
      body: "30 minutes. We'll tell you honestly whether an AI appointment setter is the right tool for your business, and what it would take.",
      cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
    },
  ]

  const service = serviceSchema({
    name: entry.title,
    description: entry.description,
    serviceType: entry.keywordPrimary,
    path: PATH,
  })
  const faq = faqSchema(entry.faq)
  const breadcrumb = breadcrumbSchema(crumbs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SectionRenderer sections={sections} />
    </>
  )
}
