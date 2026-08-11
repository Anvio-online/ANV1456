import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { faqSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * services-hub-spec.md. Fixes the live JSON-LD defect recorded in
 * phase-2-plan.md §2: the three pillar pages have been emitting
 * `{ name: 'Services', path: '/services' }` in their own
 * BreadcrumbList schema since Phase 1, resolving to a URL that 404s.
 *
 * Deliberately no `Service` schema here — services-hub-spec.md's
 * header: the three pillar pages each own that schema for their own
 * intent, and a fourth generic one on the hub is the schema-level
 * version of the cannibalization this page exists to avoid (§0).
 *
 * Section 6 (Selected work) is withheld until /case-studies ships
 * (Wave 2) — see services-hub-spec.md §6. Adding it later is a single
 * array insertion, not a rebuild.
 */
const sections: SectionInstance[] = [
  {
    type: 'breadcrumb',
    id: 'breadcrumb',
    variant: 'inline',
    theme: 'dark',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
  },
  {
    type: 'hero',
    id: 'hero',
    variant: 'page-lead',
    theme: 'dark',
    eyebrow: 'SERVICES',
    heading: 'Three ways we help.\nMost clients need two.',
    body: "Build makes the thing. Automate removes the manual work around it. Grow gets it found. They're sold separately because not everyone needs all three — but they're built by the same people, which is why they fit together.",
  },
  {
    type: 'services',
    id: 'the-three-pillars',
    variant: 'pillar-cards',
    theme: 'dark',
    showViz: false,
    pillars: [
      {
        key: 'build',
        title: 'Build',
        body: 'Websites, applications, and internal systems that hold up as you grow.',
        subItems: [
          'Business websites',
          'Corporate websites',
          'Landing pages',
          'Ecommerce development',
          'Catalogue + checkout',
          'Payment and shipping integration',
          'Web application development',
          'Internal tools + dashboards',
          'Custom software development',
          'CRM / ERP development',
          'Third-party integrations',
          'Data migration',
        ],
        href: '/services/build',
      },
      {
        key: 'automate',
        title: 'Automate',
        body: 'AI agents and workflows that do the repetitive work your team is doing by hand.',
        subItems: [
          'Custom AI agent development',
          'Multi-agent orchestration',
          'AI-powered chatbots',
          'AI customer support',
          'Repetitive task automation',
          'AI process automation',
          'CRM automation',
          'Custom AI integrations',
          'API integrations',
          'RAG / knowledge-base solutions',
          'AI strategy consulting',
          'Real-time insights & reporting',
          'Automation audit',
        ],
        href: '/services/automate',
      },
      {
        key: 'grow',
        title: 'Grow',
        body: 'Found in search, fast on every device, and improving month over month.',
        subItems: [
          'Technical SEO audit',
          'Site structure + internal linking',
          'Content structure for search',
          'Generative engine optimization',
          'Structured data + entity clarity',
          'Citation-shaped content',
          'Core Web Vitals',
          'Performance optimization',
          'Technical debt cleanup',
          'Conversion rate optimization',
          'Ongoing site maintenance',
          'Monthly measurement + iteration',
        ],
        href: '/services/grow',
      },
    ],
  },
  {
    type: 'faq',
    id: 'which-one',
    variant: 'accordion',
    theme: 'dark',
    eyebrow: 'START HERE',
    heading: 'Which one do you need?',
    items: [
      {
        question: 'We have a website but it doesn’t bring in enquiries. Where do we start?',
        answer:
          "Usually Grow, not Build. A site that isn't found or doesn't convert the traffic it already gets rarely needs a rebuild — it needs the technical and search work fixed first. Rebuilding solves the wrong problem more often than not.",
      },
      {
        question: 'Our team is drowning in manual work. Do we need new software first?',
        answer:
          'Usually not. Automate is built to work on the tools you already run — a rebuild is only necessary when the existing system genuinely has no way to connect to anything else.',
      },
      {
        question: 'Can you do all three at once?',
        answer:
          "Yes, and it's often cheaper than doing them separately — the site gets built with the automation hooks and the search structure already in it, rather than retrofitted later at a higher cost.",
      },
      {
        question: "What if we don't know which problem we have?",
        answer:
          "That's what the free consultation is for. We'll tell you which of the three we'd start with, including when the honest answer is none of them yet.",
      },
      {
        question: "Do you work on projects you didn't build?",
        answer:
          "Yes, for Automate and Grow — both are commonly layered onto an existing site. For Build we'll usually recommend improving what exists before recommending a replacement.",
      },
      {
        question: "What's the smallest thing you'll take on?",
        answer:
          "A landing page, a single automated workflow, or a technical audit. All three pillars have an entry point that isn't a full engagement.",
      },
    ],
  },
  {
    type: 'process',
    id: 'how-we-work',
    variant: 'vertical-list',
    theme: 'light',
    eyebrow: 'HOW WE WORK',
    heading: 'The process is the same, whichever you start with.',
    stages: [
      {
        number: '01',
        title: 'Discover',
        promise: 'We learn what the engagement actually has to achieve, and for whom.',
        deliverables: [],
        duration: '',
      },
      {
        number: '02',
        title: 'Strategize',
        promise: "A plan you approve, and what we're deliberately not doing yet.",
        deliverables: [],
        duration: '',
      },
      {
        number: '03',
        title: 'Build',
        promise: 'Visible progress with weekly demos, not a black box until launch.',
        deliverables: [],
        duration: '',
      },
      {
        number: '04',
        title: 'Launch',
        promise: 'A launch that runs in parallel with what you have now, then switches over.',
        deliverables: [],
        duration: '',
      },
      {
        number: '05',
        title: 'Grow',
        promise: 'Support after launch, and the next thing worth doing.',
        deliverables: [],
        duration: '',
      },
    ],
  },
  {
    type: 'whyUs',
    id: 'why-one-partner',
    variant: 'principle-cards',
    theme: 'dark',
    heading: "Why this isn't three vendors.",
    items: [
      {
        title: 'The automation is designed into the build',
        body: 'When the same team builds the site and the workflows, the integration points exist from day one instead of being bolted on by whoever inherits the project.',
      },
      {
        title: 'Nobody gets to blame the other vendor',
        body: 'The most expensive weeks in any multi-vendor project are the ones spent establishing whose fault something is. One team, one answer.',
      },
      {
        title: "Search structure isn't retrofitted",
        body: 'A site built without a URL architecture, schema, and internal linking gets those added later at three times the cost, badly. Ours ship with the build.',
      },
      {
        title: 'You can start with one and add later',
        body: "Nothing here is a bundle. Each pillar is a real standalone engagement, and we'd rather do one well than sell three.",
      },
    ],
  },
  {
    type: 'ctaClosing',
    id: 'cta-closing',
    variant: 'split-with-form',
    theme: 'dark',
    eyebrow: "Let's talk",
    heading: 'Not sure which one you need?',
    body: 'Tell us the problem rather than the service. 30 minutes, and we\'ll tell you which of the three we\'d start with — including if the honest answer is "wait."',
  },
]

const SERVICES_TITLE = 'AI Automation, Web Development & SEO Services'
const SERVICES_DESCRIPTION =
  'Three ways we help growing businesses: automate manual work, build software that scales, and get found online. See what each covers and where to start.'

export const metadata: Metadata = buildMetadata({
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  path: '/services',
})

export default function ServicesPage() {
  const faqItems = sections.find(
    (s): s is Extract<SectionInstance, { type: 'faq' }> => s.type === 'faq',
  )?.items
  const faq = faqItems ? faqSchema(faqItems) : null
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
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
