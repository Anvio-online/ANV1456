import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/schema'

/**
 * projects-spec.md. Moved into Wave 2 alongside /case-studies —
 * phase-2-plan.md §1a: the shippable client work (Baladi, Epicerma)
 * is Build/ecommerce, so without this page Phase 2 would ship three
 * Automate leaf pages with nothing demonstrable behind the category
 * the brand is positioned on.
 *
 * StableGuard.AI is the answer to that gap and the reason this page
 * finally earns its place: a real, award-winning multi-agent system
 * (3rd prize, ETHOnline 2025) that is genuinely ours to show — no
 * employer IP, no client permission needed. It is the only AI/
 * automation artifact on the site backed by an external result rather
 * than our own say-so.
 *
 * Deliberately absent: any project built under employment
 * (employer-context.md — GeniusCFO, Healthcare.AI, DFinance are all
 * out, and anonymizing them does not make them showable, since the
 * architecture is the confidential part and the public portfolio
 * de-anonymizes them instantly). BluPebble is out too — that one did
 * come through the partner agency, so it sits behind the Stratseek
 * gate that Baladi and Epicerma turned out never to have been behind.
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
    body: 'Our own work — an award-winning multi-agent system, the AI agent running on this site, and the site itself. Client work is a separate list, and we’re asking permission before it goes up.',
  },
  {
    type: 'featuredWork',
    id: 'gallery',
    variant: 'grid',
    theme: 'dark',
    items: [
      {
        client: 'StableGuard.AI',
        region: 'ETHOnline 2025',
        industry: 'Multi-agent AI · real-time monitoring',
        problem:
          'Monitoring a stablecoin means watching several independent signals at once — the usual approach flattens all of them into one model and loses the distinctions that matter.',
        build:
          'A real-time multi-agent system instead: each agent owns one defined responsibility in the monitoring loop rather than collapsing everything into a single model. Third prize at ETHOnline 2025, for best use of ASI Alliance / Fetch.ai.',
        outcome: '3rd prize · ETHOnline 2025',
        stack: ['Multi-agent systems', 'Real-time monitoring', 'Full-stack'],
        href: 'https://ag.anvio.online/projects/stableguard-ai',
        hrefLabel: 'Read the write-up →',
        kind: 'internal',
      },
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
      "Everything here is our own — built by us, shown with nobody else's permission required. StableGuard is the one with an outside result attached: third prize at ETHOnline 2025, judged against a global field, which is a harder thing to claim than anything we could write about ourselves.",
      "Client ecommerce work is a separate list, and it's coming — those are real projects for real businesses, and we'd rather ask them properly before putting their names on our site than assume it's fine. When that's done, they'll be told in full on our case studies page rather than reduced to a logo.",
      "What isn't here, and won't be: anything built under employment. That work belongs to the people who paid for it, and no amount of anonymizing changes that.",
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
