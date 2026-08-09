import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/schema'

/**
 * projects-spec.md. Moved into Wave 2 alongside /case-studies —
 * phase-2-plan.md §1a: both shippable case studies (Baladi, Epicerma)
 * are Build/ecommerce work, so without this page Phase 2 would ship
 * three Automate leaf pages with nothing demonstrable behind the
 * category the brand is positioned on.
 *
 * Ships at the reduced scope projects-spec.md's Open Items already
 * anticipates: internal items only. Baladi and Epicerma are withheld
 * here too, not just from /case-studies — the same Stratseek
 * permission gate applies to naming them anywhere (phase-2-plan.md
 * §7), and neither is internal work this page can label around that.
 * Add them once that agreement has been read.
 *
 * The "anvio.online itself" card ships without a published CWV/
 * Lighthouse number, deliberately — projects-spec.md's own rule against
 * fabricating a metric applies to this site's numbers as much as a
 * client's. Run the audit and add the real score before claiming one;
 * see this file's Open Items.
 */
const sections: SectionInstance[] = [
  {
    type: 'breadcrumb',
    id: 'breadcrumb',
    variant: 'inline',
    theme: 'dark',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ],
  },
  {
    type: 'hero',
    id: 'hero',
    variant: 'page-lead',
    theme: 'dark',
    eyebrow: 'PROJECTS',
    heading: 'Things we’ve built, including the ones on this page.',
    body: "Client work where we can show it, and our own builds where we can't yet. Both are labelled, so you can weigh them differently.",
  },
  {
    type: 'featuredWork',
    id: 'gallery',
    variant: 'grid',
    theme: 'dark',
    items: [
      {
        client: 'The Anvio agent demo',
        region: 'Live on this site',
        industry: 'AI automation',
        problem:
          'The clearest proof of what we build is a working example, not a description of one.',
        build:
          'A two-stage conversational agent: streamed Q&A, then a schema-constrained plan call gated on your email. The same component running on Home and Automate.',
        stack: ['Claude', 'Next.js', 'Zod'],
        href: '/services/automate#agent-demo',
        hrefLabel: 'Try it live →',
        kind: 'internal',
      },
      {
        client: 'Automation ROI calculator',
        region: 'In progress',
        industry: 'Internal tool',
        problem: 'A free, no-email tool that turns "we do this by hand" into an annual cost.',
        build: 'Client-side calculator, four inputs, no submission required to see a result.',
        stack: ['Next.js', 'React'],
        kind: 'internal',
      },
      {
        client: 'anvio.online',
        region: 'This site',
        industry: 'Web development · performance',
        problem: 'A site that sells performance and SEO work has to hold up under its own audit.',
        build:
          'Built on the constraints in our own motion and performance specs — server-rendered pages, a strict JS budget, and a one-signature-scene-per-page motion limit.',
        stack: ['Next.js', 'Tailwind', 'Motion'],
        kind: 'internal',
      },
    ],
  },
  {
    type: 'richText',
    id: 'how-to-read-this',
    variant: 'prose',
    theme: 'light',
    heading: 'How to read this page',
    paragraphs: [
      "This is a partial list on purpose. Two client ecommerce projects are pending a permissions check before we can show them properly — when that clears, they'll be added here and told in full on our case studies page.",
      "In the meantime, what's here is our own work: the AI agent that runs the demo on this site, the tool above it, and the site itself. We've labelled them as internal builds rather than implying they're client work, because the category we're positioned around is AI and automation, and being straightforward about where our proof currently comes from is worth more than padding this page.",
    ],
  },
  {
    type: 'ctaClosing',
    id: 'cta-closing',
    variant: 'centered-bold',
    theme: 'dark',
    eyebrow: "Let's talk",
    heading: 'Want the automation version of this list?',
    body: "It's being written. In the meantime the agent demo will build you a plan in about two minutes, which is a more useful thing to look at than someone else's project anyway.",
    cta: { label: 'Try the agent demo', href: '/services/automate#agent-demo', style: 'primary' },
  },
]

const PROJECTS_TITLE = "Projects: What We've Built"
const PROJECTS_DESCRIPTION =
  'Client work and internal builds — the AI agent behind our demo, the tools on this site, and the site itself, each labelled honestly.'

export const metadata: Metadata = buildMetadata({
  title: PROJECTS_TITLE,
  description: PROJECTS_DESCRIPTION,
  path: '/projects',
})

export default function ProjectsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SectionRenderer sections={sections} />
    </>
  )
}
