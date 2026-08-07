import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { webPageSchema, organizationSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * about-spec.md. All eight sections built. "Who you actually work
 * with" (§4, team:founder-note) ships without a photo or name —
 * deliberately, not as a placeholder: the copy is written in
 * first-person-plural so it's honest either way, and TeamProps.photo/
 * .name are optional specifically so the real ones can be added later
 * without touching this file or the component. Different case from
 * home-spec.md's featured-work rule against fabrication — there's
 * nothing fabricated here, just an identity withheld on purpose.
 *
 * Theme boundary restored to §4 (the founder-note section itself) now
 * that it's built — dark(1-3) -> light(4-6) -> dark(7-8), matching
 * design-system.md §2.5's alternation and about-spec.md §4's intent
 * ("the shift lands here deliberately — the page changes register
 * from argument to person").
 *
 * No Tier 1 or Tier 2 motion anywhere on this page — deliberate, see
 * motion-system.md §8. A trust page shouldn't perform the same way a
 * sales page does.
 */
const sections: SectionInstance[] = [
  {
    type: 'hero',
    id: 'hero',
    variant: 'page-lead',
    theme: 'dark',
    eyebrow: 'ABOUT ANVIO',
    heading: 'We build the boring infrastructure\nthat makes a business faster.',
    body: "Anvio is a small engineering team. We automate manual work, build software that fits how a business actually runs, and make sure people can find it. Most of what we do isn't glamorous — it's the plumbing that stops your team retyping things.",
  },
  {
    type: 'richText',
    id: 'why-we-exist',
    variant: 'prose',
    theme: 'dark',
    eyebrow: 'WHY ANVIO EXISTS',
    paragraphs: [
      'Most businesses with 10 to 200 people are running on a stack of things that half-work. A website someone built three years ago and nobody can update. A CRM that people update by hand, when they remember. A team spending Monday morning assembling a report that a machine could have written at 6am.',
      "None of it is broken enough to fix urgently. All of it, together, is a full-time salary's worth of wasted time.",
      'Anvio exists to fix that layer specifically — not to redesign your brand, and not to sell you an AI strategy deck. We build the automation, the software, and the search visibility, and we hand you the code.',
    ],
  },
  {
    type: 'whyUs',
    id: 'what-we-believe',
    variant: 'principle-cards',
    theme: 'dark',
    eyebrow: 'WHAT WE BELIEVE',
    heading: 'A small set of things we actually hold to.',
    items: [
      {
        title: 'Published pricing',
        body: "Ranges are on the site. You shouldn't need a call to find out whether we're in your budget.",
      },
      {
        title: 'You own everything',
        body: 'Code, workflows, design files, documentation — yours from day one, not licensed to you.',
      },
      {
        title: 'Weekly demos, not status updates',
        body: 'You see the actual thing every week. "On track" is not a status.',
      },
      {
        title: "We'll tell you not to buy",
        body: "If a process isn't worth automating or your site doesn't need a rebuild, that's the advice you get. It costs us a project and saves you a bad one.",
      },
      {
        title: 'Boring where it counts',
        body: 'Proven tools, tested against your real data, with the failure modes thought through. Novelty is a cost, not a feature.',
      },
      {
        title: 'We stay reachable',
        body: '30 days support on every build, and a team that still knows your system in a year.',
      },
    ],
  },
  {
    type: 'team',
    id: 'who-you-work-with',
    variant: 'founder-note',
    theme: 'light',
    eyebrow: 'WHO YOU ACTUALLY WORK WITH',
    heading: "You'll talk to the person actually building it.",
    paragraphs: [
      "Anvio is small on purpose. You'll talk to the person building your system, not an account manager relaying messages to a team you never meet. When something breaks at an awkward time, that's a direct line, not a ticket queue.",
      "For larger builds we bring in specialists we've worked with before — and we tell you who's doing what before the work starts, not after.",
    ],
  },
  {
    type: 'whyUs',
    id: 'what-we-wont-do',
    variant: 'numbered-list',
    theme: 'light',
    eyebrow: "THINGS WE'LL TURN DOWN",
    heading: 'Being clear about this saves everyone a discovery call.',
    items: [
      {
        title: "We're not a design studio.",
        body: "We design what we build. We don't sell a Figma file and wish you luck.",
      },
      {
        title: "We're not a social media or ads agency.",
        body: "We'll make you findable in search and AI assistants. We won't run your Instagram.",
      },
      {
        title: "We don't do WordPress theme work.",
        body: "If you need a plugin configured on an existing WordPress site, we're the wrong call — and an expensive one.",
      },
      {
        title: "We don't take enterprise procurement.",
        body: "Twelve-month sales cycles and six stakeholders aren't what we're built for. Under 200 people is where we're good.",
      },
      {
        title: "We won't automate something that shouldn't be.",
        body: "Some processes are too low-volume, too judgement-heavy, or too close to changing. We'll say so.",
      },
    ],
  },
  {
    type: 'process',
    id: 'how-we-work',
    variant: 'vertical-list',
    theme: 'light',
    eyebrow: 'HOW WE WORK',
    heading: 'Five stages, every time.',
    stages: [
      {
        number: '01',
        title: 'Discover',
        promise: 'We learn what the site actually has to do, and for whom.',
        deliverables: [],
        duration: '',
      },
      {
        number: '02',
        title: 'Strategize',
        promise: "Structure, scope, and what we're deliberately not building in v1.",
        deliverables: [],
        duration: '',
      },
      {
        number: '03',
        title: 'Build',
        promise: 'Design and development in visible increments, with weekly demos.',
        deliverables: [],
        duration: '',
      },
      {
        number: '04',
        title: 'Launch',
        promise: "Integration, migration, and a launch that doesn't lose your rankings.",
        deliverables: [],
        duration: '',
      },
      {
        number: '05',
        title: 'Grow',
        promise: "Measure what's working, then extend it.",
        deliverables: [],
        duration: '',
      },
    ],
  },
  {
    type: 'richText',
    id: 'where-we-work',
    variant: 'prose',
    theme: 'dark',
    eyebrow: 'WHERE WE WORK',
    paragraphs: [
      'Based in India, working with businesses in India and the UAE, and remote-first for English-speaking markets beyond that.',
      'Every project runs on a shared staging link and a weekly demo — you see the actual thing every week, not a status update about it. Timezone overlap is planned before the work starts, not discovered halfway through.',
    ],
  },
  {
    type: 'ctaClosing',
    id: 'closing-cta',
    variant: 'centered-bold',
    theme: 'dark',
    eyebrow: "Let's talk",
    heading: 'If that sounds like the right fit, let’s talk.',
    body: "30 minutes, no pitch deck. Tell us what's slow and we'll tell you honestly whether we can help.",
    cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
  },
]

const ABOUT_TITLE = 'About Anvio — AI Automation & Software, Built Properly'
const ABOUT_DESCRIPTION =
  'Why Anvio exists, how we work, and what we won’t do. A small engineering team building AI automation, software, and growth systems for businesses with 10–200 people.'

export const metadata: Metadata = buildMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: '/about',
})

export default function AboutPage() {
  const webPage = webPageSchema({
    type: 'AboutPage',
    name: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    path: '/about',
  })
  const org = organizationSchema()
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
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
