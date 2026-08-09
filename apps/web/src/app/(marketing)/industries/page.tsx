import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { faqSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { INDUSTRY_TILES } from '@/lib/content/industry-tiles'

/**
 * industries-spec.md Part 1. Composed page (ADR-0006) — the six tiles
 * come from the shared lib/content/industry-tiles.ts source Home also
 * reads, so the two can't drift. Deliberately no `Service` schema —
 * same reasoning as the /services hub: this page routes, it doesn't
 * sell a specific service.
 */
const INDUSTRIES_TITLE = 'Industries We Work With: AI & Web Development'
const INDUSTRIES_DESCRIPTION =
  "Ecommerce, accounting, healthcare, real estate, education, logistics. The manual bottlenecks differ by industry — the pattern behind them usually doesn't."

const sections: SectionInstance[] = [
  {
    type: 'breadcrumb',
    id: 'breadcrumb',
    variant: 'inline',
    theme: 'dark',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
    ],
  },
  {
    type: 'hero',
    id: 'hero',
    variant: 'page-lead',
    theme: 'dark',
    eyebrow: 'INDUSTRIES',
    heading: 'Six industries we know well.\nThe pattern is usually the same.',
    body: "What gets automated in a clinic and what gets automated in a warehouse look nothing alike from the outside. Underneath, it's almost always the same four bottlenecks.",
  },
  {
    type: 'industries',
    id: 'the-six',
    variant: 'compact-grid',
    theme: 'dark',
    items: INDUSTRY_TILES,
  },
  {
    type: 'problem',
    id: 'the-four-bottlenecks',
    variant: 'pain-grid',
    theme: 'light',
    eyebrow: 'THE PATTERN',
    heading: 'The four bottlenecks, whatever the industry.',
    items: [
      {
        pain: 'Re-typing',
        line: "The same information entered twice, into two systems that don't talk. A WhatsApp order re-keyed into the CRM; an invoice PDF re-keyed into Tally.",
      },
      {
        pain: 'Answering the same question',
        line: 'A support inbox, a front desk, or a sales rep spending most of a day on questions already answered somewhere in writing.',
      },
      {
        pain: 'Remembering to follow up',
        line: "Follow-ups that depend on a person remembering. The ones that don't happen are invisible, which is what makes them expensive.",
      },
      {
        pain: 'Assembling the report',
        line: "Somebody's Monday morning spent copying numbers between spreadsheets to produce a view a system could produce continuously.",
      },
    ],
  },
  {
    type: 'richText',
    id: 'why-two',
    variant: 'prose',
    theme: 'light',
    heading: "Why we don't have twenty industry pages.",
    paragraphs: [
      "Most agencies do, and most of them are the same page with a word swapped. We've written the two we can write specifically — ecommerce and accounting — because we've done the work and can name the actual tools and the actual failure points. The rest are on this page as tiles, honestly, until we can do the same for them.",
      "If your industry isn't listed, that's usually not a problem. Ask us about the process, not the sector — a distributor's order desk and a clinic's front desk fail in almost exactly the same way.",
    ],
  },
  {
    type: 'faq',
    id: 'faq',
    variant: 'accordion',
    theme: 'dark',
    eyebrow: 'QUESTIONS',
    heading: 'About working with us in your industry.',
    items: [
      {
        question: 'Do you only work with these industries?',
        answer:
          "No. These are the two we can describe specifically today, plus four more we know well enough to list honestly but not yet write a full page about. If your industry isn't here, that's not a reason to assume we can't help.",
      },
      {
        question: "We're in a regulated industry. Can you work with our data?",
        answer:
          "It depends on the specific regulation, and we'll tell you plainly if something is outside what we can responsibly take on. We connect to systems you already use rather than copying data by default — see our Privacy Policy at anvio.online/privacy for exactly what any automation touches.",
      },
      {
        question: 'How much does industry experience actually matter?',
        answer:
          "Less than process experience, and saying so is the honest answer. A re-typing problem looks the same whether it's a clinic's intake form or a distributor's order desk — the industry changes the vocabulary, not the underlying fix.",
      },
      {
        question: 'Do you have references in our sector?',
        answer:
          "Depends on the sector — see our case studies for what we can show. Where we don't have a direct reference, we'll say so, and tell you honestly why we still think we can help.",
      },
    ],
  },
  {
    type: 'ctaClosing',
    id: 'cta-closing',
    variant: 'centered-bold',
    theme: 'dark',
    eyebrow: "Let's talk",
    heading: 'Tell us about the process, not the industry.',
    body: "30 minutes. Describe what your team does by hand and we'll tell you whether we've solved it before — in your sector or a different one that fails the same way.",
    cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
  },
]

export const metadata: Metadata = buildMetadata({
  title: INDUSTRIES_TITLE,
  description: INDUSTRIES_DESCRIPTION,
  path: '/industries',
})

export default function IndustriesPage() {
  const faqItems = sections.find(
    (s): s is Extract<SectionInstance, { type: 'faq' }> => s.type === 'faq',
  )?.items
  const faq = faqItems ? faqSchema(faqItems) : null
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
  ])

  return (
    <>
      {faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SectionRenderer sections={sections} />
    </>
  )
}
