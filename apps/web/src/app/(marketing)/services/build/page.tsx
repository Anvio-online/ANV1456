import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * build-spec.md. Ten of eleven sections built — Selected work (§8) is
 * withheld, blocked on real case-study pages (/case-studies/[slug]
 * don't exist yet), same "no fabricated content" rule the rest of the
 * site follows. Cards would either link to a 404 or nowhere; neither
 * ships. Add it once /case-studies exists. The hero's secondary CTA
 * deviates from the spec's "See our work →" (which scrolled to that
 * withheld section) to "See what we build →" scrolling to the
 * capability clusters instead — same reason, not an oversight.
 *
 * §5 is Build's Tier 1 signature scene (motion-system.md §7.3) —
 * deliberately not Home's horizontalPin or Automate's workflowGraph,
 * so each page keeps its own signature piece.
 */
const sections: SectionInstance[] = [
  {
    type: 'hero',
    id: 'hero',
    variant: 'split-visual',
    theme: 'dark',
    eyebrow: 'WEB DEVELOPMENT',
    heading: 'Most agencies ship you a website.\nWe ship you the thing your business runs on.',
    body: "Websites, storefronts, and internal software built around how your team actually works — not around a template's idea of it. You get the code, the docs, and a team that still knows your system in a year.",
    cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
    ctaSecondary: { label: 'See what we build →', href: '#what-we-build', style: 'secondary' },
    trustLine: 'Typical site live in 4–8 weeks · You own everything we build',
    posterVariant: 'wireframe',
  },
  {
    type: 'proofBar',
    id: 'proof-bar',
    variant: 'stat-row',
    theme: 'dark',
    stats: [
      { value: '4–8 weeks', label: 'typical time from kickoff to a live site' },
      { value: '90+', label: 'Lighthouse performance we ship to, not just test to' },
      { value: '100%', label: 'code, design files, and docs owned by you' },
      { value: '30 days', label: 'post-launch support included on every build' },
    ],
  },
  {
    type: 'problem',
    id: 'why-rebuilds-happen',
    variant: 'pain-grid',
    theme: 'dark',
    eyebrow: 'WHY REBUILDS HAPPEN',
    heading: 'Nobody sets out to rebuild a two-year-old website.',
    body: 'They rebuild because of one of these. Usually more than one.',
    items: [
      {
        pain: "It's slow, and it's costing you",
        line: 'Every second of load time is customers leaving before they see anything. Most SMB sites we audit fail Core Web Vitals on mobile.',
      },
      {
        pain: 'Nobody can update it',
        line: "The person who built it is gone, or it needs a developer for a text change. So it doesn't get updated, and it slowly stops being true.",
      },
      {
        pain: "It doesn't fit how you work",
        line: 'The template had a blog and a portfolio. You needed a quoting tool and a stock check. So your team works around the site instead of in it.',
      },
      {
        pain: "It doesn't talk to anything",
        line: 'Orders come in on the site and get re-typed into your CRM by hand. The website is an island.',
      },
      {
        pain: "You don't own it",
        line: 'Built on a platform you rent, with a design file you never got. Leaving means starting over.',
      },
      {
        pain: 'It was designed, not built',
        line: 'Beautiful in Figma, brittle in production. No error states, no empty states, no plan for the 300th product.',
      },
    ],
  },
  {
    type: 'services',
    id: 'what-we-build',
    variant: 'cluster-grid',
    theme: 'dark',
    heading: 'What we build.',
    clusters: [
      {
        headline: 'Marketing Websites',
        promise: 'The site that has to earn trust in eight seconds',
        subItems: [
          {
            name: 'Business websites',
            description:
              'A site built around what a visitor needs to decide in the first minute — not a stock template with your logo swapped in.',
          },
          {
            name: 'Corporate websites',
            description:
              'Structured for a larger org — multiple departments, a real content workflow, and a design system that holds as it grows.',
          },
          {
            name: 'Landing pages',
            description:
              'Built to convert one specific offer, fast to load and fast to ship, with real A/B-testable structure from day one.',
          },
        ],
      },
      {
        headline: 'Ecommerce',
        promise: 'A storefront built around how people actually buy from you',
        subItems: [
          {
            name: 'Ecommerce development',
            description:
              'Catalogue, checkout, and browsing built for how your specific products get chosen — not a generic theme with your inventory poured in.',
          },
          {
            name: 'Catalogue + checkout',
            description:
              'Fast browsing at real scale, and a checkout that doesn’t lose people at the last step.',
          },
          {
            name: 'Payment and shipping integration',
            description:
              'Connected to the payment gateway and shipping providers you actually use — not the ones a platform defaults to.',
          },
        ],
      },
      {
        headline: 'Web Applications',
        promise: 'Software for the work a spreadsheet stopped being able to hold',
        subItems: [
          {
            name: 'Web application development',
            description:
              'A real application, not a form builder — built for the specific workflow your team runs, with the edge cases handled.',
          },
          {
            name: 'Internal tools + dashboards',
            description:
              'The tool your team opens every day, built to fit how they actually work rather than a generic admin panel.',
          },
          {
            name: 'Custom software development',
            description:
              'When nothing off-the-shelf fits, built from your actual requirements — not a demo, a system you run your business on.',
          },
        ],
      },
      {
        headline: 'Business Systems',
        promise: 'The systems your operation runs on, connected properly',
        subItems: [
          {
            name: 'CRM / ERP development',
            description:
              'Built or customized around your actual sales and operations process, not a generic module you configure around.',
          },
          {
            name: 'Third-party integrations',
            description:
              'Your site connected to the tools you already run — payments, shipping, CRM — so nobody re-types anything.',
          },
          {
            name: 'Data migration',
            description:
              'Your existing data moved over intact, checked, and verified — not "export a CSV and hope."',
          },
        ],
      },
    ],
  },
  {
    type: 'buildAssembly',
    id: 'wireframe-to-render',
    variant: 'wireframe-to-render',
    theme: 'dark',
    eyebrow: 'FROM WIREFRAME TO SHIPPED',
    heading: 'What "we build it properly" actually means.',
    body: 'One product page, four passes. The boring layers — structure, states, integration — are where the work actually is.',
    passes: [
      {
        label: 'Structure',
        caption: 'PASS 01 · STRUCTURE',
        explainer:
          'Grey blocks, real layout, no styling. The layout gets right before anything looks right.',
      },
      {
        label: 'Design',
        caption: 'PASS 02 · DESIGN',
        explainer:
          'Type, colour, and spacing land. Blocks become components — still no real content.',
      },
      {
        label: 'Real data',
        caption: 'PASS 03 · REAL DATA — the pass most agencies skip',
        explainer:
          'Lorem ipsum becomes a real product name, a real price, and a real empty state — "no reviews yet," not a broken blank box.',
      },
      {
        label: 'Shipped',
        caption: 'PASS 04 · SHIPPED',
        explainer:
          'Live chrome: a loading state, an error state that fails honestly, and a Lighthouse score we actually hit.',
      },
    ],
  },
  {
    type: 'process',
    id: 'process',
    variant: 'sticky-stack',
    theme: 'light',
    eyebrow: 'Our process',
    heading: 'Five stages. No mystery about where your project is.',
    stages: [
      {
        number: '01',
        title: 'Discover',
        promise: 'We learn what the site actually has to do, and for whom.',
        deliverables: ['Requirements mapping', 'Stakeholder interviews', 'Technical audit'],
        duration: '1 week',
      },
      {
        number: '02',
        title: 'Strategize',
        promise: "Structure, scope, and what we're deliberately not building in v1.",
        deliverables: ['Sitemap + structure', 'Scope + estimate', 'Success metrics'],
        duration: '1 week',
      },
      {
        number: '03',
        title: 'Build',
        promise: 'Design and development in visible increments, with weekly demos.',
        deliverables: ['Weekly demos', 'Staging access', 'Real content, not lorem ipsum'],
        duration: '3–6 weeks',
      },
      {
        number: '04',
        title: 'Launch',
        promise: "Migration, redirects, analytics, and a launch that doesn't lose your rankings.",
        deliverables: ['301 redirect map', 'Analytics + tracking', 'DNS cutover'],
        duration: '1 week',
      },
      {
        number: '05',
        title: 'Grow',
        promise: "Measure what's working, then extend it.",
        deliverables: ['Performance monitoring', 'Iteration', 'Ongoing support'],
        duration: 'Ongoing',
      },
    ],
  },
  {
    type: 'techStack',
    id: 'tech-stack',
    variant: 'categorized',
    theme: 'light',
    eyebrow: 'WHAT WE BUILD ON',
    heading: "Tools you'll actually inherit.",
    categories: [
      { category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind'] },
      { category: 'Backend', items: ['Node', 'Postgres', 'Drizzle', 'Redis'] },
      { category: 'Commerce', items: ['Shopify', 'WooCommerce', 'Stripe', 'Razorpay'] },
      { category: 'Infrastructure', items: ['Vercel', 'Cloudflare', 'S3'] },
      { category: 'Integration', items: ['REST / GraphQL APIs', 'Webhooks', 'n8n'] },
    ],
    footnote:
      'Not married to any of it. If your team already runs something that works, we build on that instead. →',
  },
  {
    type: 'engagementModel',
    id: 'pricing',
    variant: 'tier-cards',
    theme: 'light',
    eyebrow: 'What it costs',
    heading: 'What it costs.',
    tiers: [
      {
        name: 'Marketing Site',
        audienceFit: '5–15 pages, CMS, contact + analytics',
        timeline: '4–6 weeks',
        range: '₹1,25,000 – ₹3,50,000',
        includes: ['Design + development', 'CMS handover', '30 days of post-launch support'],
      },
      {
        name: 'Ecommerce Build',
        audienceFit: 'Catalogue, checkout, payments, shipping',
        timeline: '6–10 weeks',
        range: '₹2,50,000 – ₹7,00,000',
        includes: ['Full catalogue + checkout', 'Payment + shipping integration', 'Team training'],
      },
      {
        name: 'Custom Application',
        audienceFit: 'Internal tool, dashboard, or CRM/ERP work',
        timeline: '8–16 weeks',
        range: '₹4,00,000 – ₹15,00,000',
        includes: ['Weekly demos', 'Staging access', 'Handover docs + training'],
      },
    ],
    policyNotes: [
      'If scope changes mid-project, we quote the difference before starting — no surprise invoices.',
      "If we're running late, you hear about it before the deadline, not after — with a revised date and the reason why.",
      'You own everything we build — code, workflows, and documentation, from day one.',
      'At the end of an engagement, you can take everything and walk away. Most clients don’t, but you could.',
    ],
  },
  {
    type: 'faq',
    id: 'faq',
    variant: 'accordion',
    theme: 'dark',
    eyebrow: 'FAQ',
    heading: 'Questions worth asking before you commit to a rebuild.',
    items: [
      {
        question: 'How much does a business website cost?',
        answer:
          'Marketing sites typically run ₹1,25,000–₹3,50,000; ecommerce builds ₹2,50,000–₹7,00,000; custom applications ₹4,00,000–₹15,00,000. The range depends on page count, integrations, and how much is custom versus templated — we quote after discovery, not before.',
      },
      {
        question: 'How long does a website take to build?',
        answer:
          'A marketing site is typically 4–6 weeks kickoff to launch. Ecommerce runs 6–10 weeks. Custom applications, 8–16 weeks depending on scope. We give a real estimate after discovery, not a marketing number.',
      },
      {
        question: 'Do we own the code and the design files?',
        answer:
          'Yes — code, design files, and documentation are yours from day one, not licensed to you. If you want to take everything and walk away at the end, you can.',
      },
      {
        question: 'Can we update the site ourselves without a developer?',
        answer:
          'For content changes, yes — we build on a CMS so your team can edit text, images, and pages without touching code. Structural changes still need a developer, which is normal for any real system.',
      },
      {
        question: 'What happens to our search rankings when we relaunch?',
        answer:
          'We map every existing URL to its new destination with 301 redirects before launch, migrate analytics and tracking, and monitor rankings closely for the first weeks after cutover. Losing rankings on a relaunch is a planning failure, not an inevitability.',
      },
      {
        question: 'Can you work with our existing site instead of rebuilding?',
        answer:
          "Sometimes. If the underlying platform is sound and the problem is content, performance, or a few pages, a rebuild is the wrong answer and we'll say so — that's a smaller, cheaper engagement.",
      },
      {
        question: 'Do you do the design, or do we need a separate designer?',
        answer:
          "We design what we build — structure, type, and visual design are part of every engagement. We're not a design-only studio; you get a shipped site, not a Figma file to hand to a developer.",
      },
      {
        question: 'What if we need changes after launch?',
        answer:
          '30 days of support are included on every build. After that, since you own the code, you can hire anyone to change it — including us, on a retainer or one-off basis.',
      },
      {
        question: 'Will it work on mobile and pass Core Web Vitals?',
        answer:
          "Yes — we build to a 90+ Lighthouse standard on every project, tested on real mobile networks, not just desktop devtools. It's a build standard we hold ourselves to, not a claim we make after the fact.",
      },
      {
        question: 'Can you integrate it with the systems we already use?',
        answer:
          'If it has an API, generally yes — CRMs, payment gateways, shipping providers, and internal tools. We confirm feasibility for your specific stack during discovery, before any commitment.',
      },
    ],
  },
  {
    type: 'ctaClosing',
    id: 'cta-closing',
    variant: 'split-with-form',
    theme: 'dark',
    eyebrow: "Let's talk",
    heading: 'Tell us what your site needs to do.',
    body: "30 minutes. We'll tell you what it'd take, roughly what it'd cost, and whether a rebuild is actually the right call — sometimes it isn't.",
  },
]

const BUILD_TITLE = 'Web Development Services for Growing Businesses'
const BUILD_DESCRIPTION =
  'Websites, ecommerce, and custom software built to fit how your business actually works. Design, build, and integration under one roof — with the code handed to you.'

export const metadata: Metadata = buildMetadata({
  title: BUILD_TITLE,
  description: BUILD_DESCRIPTION,
  path: '/services/build',
})

export default function BuildPage() {
  const service = serviceSchema({
    name: 'Web Development Services',
    description: BUILD_DESCRIPTION,
    serviceType: 'Web development and custom software',
    path: '/services/build',
  })
  const faqItems = sections.find(
    (s): s is Extract<SectionInstance, { type: 'faq' }> => s.type === 'faq',
  )?.items
  const faq = faqItems ? faqSchema(faqItems) : null
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Build', path: '/services/build' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
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
