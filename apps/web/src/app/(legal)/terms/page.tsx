import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { webPageSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * legal-spec.md §3. Terms of use for the website itself — not a
 * services agreement. The agent-demo clause is the one that matters
 * most: it's where the system prompt's "never quote a firm price"
 * guardrail (section-library.md §5) becomes a stated term rather than
 * only an implementation detail. Governing law is a placeholder — see
 * this file's Open Items note and legal-spec.md's Open Items.
 */
const sections: SectionInstance[] = [
  {
    type: 'breadcrumb',
    id: 'breadcrumb',
    variant: 'inline',
    theme: 'dark',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Use', path: '/terms' },
    ],
  },
  {
    type: 'hero',
    id: 'hero',
    variant: 'page-lead',
    theme: 'dark',
    eyebrow: 'LEGAL',
    heading: 'Terms of Use',
    body: 'Last updated August 10, 2026. These terms cover anvio.online — the website, the AI agent demo, and any free tools on it. They are not the agreement that governs client project work, which is a separate signed contract.',
  },
  {
    type: 'richText',
    id: 'acceptable-use',
    variant: 'prose',
    theme: 'dark',
    heading: 'Acceptable use',
    paragraphs: [
      "You can use this site to learn about our services, request a consultation, and try the AI agent demo. Don't use it to attempt to disrupt the site, extract data from it beyond your own submissions, or misuse the AI agent demo — for example, to send content unrelated to describing a business process, or to attempt to make it produce something harmful, illegal, or off-topic. The demo's system prompt is built to decline requests like that; deliberately trying to work around it is a breach of these terms.",
    ],
  },
  {
    type: 'richText',
    id: 'ip',
    variant: 'prose',
    theme: 'dark',
    heading: 'Intellectual property',
    paragraphs: [
      "The content on this site — copy, design, and code — belongs to Anvio unless stated otherwise. You're welcome to link to it. Don't reproduce substantial parts of it elsewhere without asking first.",
    ],
  },
  {
    type: 'richText',
    id: 'agent-demo',
    variant: 'prose',
    theme: 'dark',
    heading: 'The AI agent demo and free tools',
    paragraphs: [
      'The AI agent demo is a demonstration of what an automation plan for your business might look like, based on what you describe to it in a short conversation. Its output — including any hours-saved estimate, complexity band, or workflow diagram — is an estimate for illustration, not a quote, a contractual commitment, or professional advice. We do not treat anything the demo generates as a firm price, and neither should you; an actual scope and price only exist after we talk with you directly.',
      'The same applies to any free calculator or tool on this site: its output is an estimate based on the numbers you enter, provided for illustration, not a guarantee of results.',
    ],
  },
  {
    type: 'richText',
    id: 'no-warranty',
    variant: 'prose',
    theme: 'dark',
    heading: 'No warranty',
    paragraphs: [
      'This site, the AI agent demo, and any free tools on it are provided "as is," without warranty of any kind, to the extent permitted by law. We work to keep them accurate and available, but we don\'t guarantee uninterrupted access or that any output is error-free.',
    ],
  },
  {
    type: 'richText',
    id: 'liability',
    variant: 'prose',
    theme: 'dark',
    heading: 'Limitation of liability',
    paragraphs: [
      "To the extent permitted by law, Anvio isn't liable for indirect, incidental, or consequential damages arising from your use of this site or its free features. Nothing here limits liability that can't be limited by law.",
    ],
  },
  {
    type: 'richText',
    id: 'governing-law',
    variant: 'prose',
    theme: 'dark',
    heading: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of India, without regard to conflict-of-law principles.',
    ],
  },
  {
    type: 'richText',
    id: 'changes',
    variant: 'prose',
    theme: 'dark',
    heading: 'Changes to these terms',
    paragraphs: [
      "If we change these terms, we'll update the date at the top of this page. Continuing to use the site after a change means you accept the updated terms.",
    ],
  },
  {
    type: 'richText',
    id: 'contact',
    variant: 'prose',
    theme: 'dark',
    heading: 'Contact',
    paragraphs: ['Questions about these terms: hello@anvio.online.'],
  },
]

const TERMS_TITLE = 'Terms of Use'
const TERMS_DESCRIPTION =
  'The terms covering anvio.online, the AI agent demo, and any free tools on it. Separate from the agreement that governs client project work.'

export const metadata: Metadata = buildMetadata({
  title: TERMS_TITLE,
  description: TERMS_DESCRIPTION,
  path: '/terms',
})

export default function TermsPage() {
  const webPage = webPageSchema({
    type: 'WebPage',
    name: TERMS_TITLE,
    description: TERMS_DESCRIPTION,
    path: '/terms',
  })
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Terms of Use', path: '/terms' },
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
