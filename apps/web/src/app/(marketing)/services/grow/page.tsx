import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * grow-spec.md. Ten of eleven sections built — Selected work (§8) is
 * withheld and blocked harder than Build's: Build can show a site that
 * exists, Grow has to show real, permission-cleared results, and there
 * are none yet. Cut per the spec's own explicit instruction rather
 * than shipped with illustrative numbers — on the page that sells
 * measurement honesty, a fabricated metric is disqualifying.
 *
 * §5 is Grow's Tier 1 signature scene (motion-system.md §7.4) —
 * deliberately not Home/Automate/Build's, so each page keeps its own
 * signature piece. Its numbers are illustrative of a shape, not a real
 * client's results, and say so in a visible caption per the spec's
 * honesty constraint — not a footnote.
 *
 * Closing CTA re-offers the free audit rather than a call, matching
 * the page's primary conversion (§7) instead of competing with it.
 */
const sections: SectionInstance[] = [
  {
    type: 'hero',
    id: 'hero',
    variant: 'split-visual',
    theme: 'dark',
    eyebrow: 'SEO · GEO · PERFORMANCE',
    heading: 'Your customers stopped Googling.\nSome of them are asking an AI instead.',
    body: 'We do the technical SEO that still decides rankings — and the newer work that decides whether an AI assistant cites you or your competitor. Measured monthly, in traffic and leads, not in "impressions."',
    cta: { label: 'Get a free site audit', href: '#free-audit', style: 'primary' },
    ctaSecondary: { label: 'Book a consultation', href: '/contact', style: 'secondary' },
    trustLine: 'First audit back in 5 working days · No contract to see it',
    posterVariant: 'dashboard',
  },
  {
    type: 'proofBar',
    id: 'proof-bar',
    variant: 'stat-row',
    theme: 'dark',
    stats: [
      { value: '5 days', label: 'to your first audit, free' },
      { value: '90+', label: 'Core Web Vitals score we build to on every engagement' },
      { value: 'Monthly', label: 'reporting in traffic and leads, not vanity metrics' },
      { value: '100%', label: 'month to month, cancel any time — no lock-in' },
    ],
  },
  {
    type: 'problem',
    id: 'cost-calculator',
    variant: 'cost-calculator',
    theme: 'dark',
    eyebrow: "WHAT IT'S COSTING YOU",
    heading: "The phone isn't ringing because of a number, not a feeling.",
    body: "An SMB owner doesn't feel 'poor search visibility.' They feel this.",
    calculator: {
      defaultVisitors: 2000,
      defaultEnquiryRate: 1.5,
      targetEnquiryRate: 3,
      defaultDealValue: 25000,
      disclaimer:
        'Rough arithmetic, not a promise. A 1.5% → 3% move is realistic on most sites we audit; some are already there, and we’ll tell you if yours is.',
    },
  },
  {
    type: 'services',
    id: 'what-we-do',
    variant: 'cluster-grid',
    theme: 'dark',
    heading: 'What we do.',
    clusters: [
      {
        headline: 'Search Visibility',
        promise: 'The technical work that still decides who ranks',
        subItems: [
          {
            name: 'Technical SEO audit',
            description:
              'Every issue costing you rankings, ranked by actual impact — not a 40-page report nobody reads.',
          },
          {
            name: 'Site structure + internal linking',
            description:
              'How your pages connect decides what ranks for what. Structured so your best content doesn’t compete with itself.',
          },
          {
            name: 'Content structure for search',
            description:
              'Pages built to directly answer what someone searched — not content written for its own sake and hoping.',
          },
        ],
      },
      {
        headline: 'AI Search (GEO)',
        promise: 'Being the answer, not just a blue link',
        subItems: [
          {
            name: 'Generative engine optimization',
            description:
              'The specific work that gets you cited by ChatGPT, Perplexity, and AI Overviews — most agencies added the term last quarter, we built a methodology.',
          },
          {
            name: 'Structured data + entity clarity',
            description:
              'Schema and structured markup that tells an AI assistant exactly who you are and what you offer, unambiguously.',
          },
          {
            name: 'Citation-shaped content',
            description:
              'Written the way AI assistants actually quote sources — direct, factual, and attributable — not marketing copy.',
          },
        ],
      },
      {
        headline: 'Performance',
        promise: 'Fast enough that nobody leaves before the page loads',
        subItems: [
          {
            name: 'Core Web Vitals',
            description:
              'The specific metrics Google measures and ranks on, fixed to a 90+ standard — not just tested to it.',
          },
          {
            name: 'Performance optimization',
            description:
              'Real-world load time on real-world connections, not a devtools score that doesn’t match what customers experience.',
          },
          {
            name: 'Technical debt cleanup',
            description:
              'The accumulated plugins, scripts, and bloat slowing a site down after years of quick fixes.',
          },
        ],
      },
      {
        headline: 'Conversion & Iteration',
        promise: 'Turning the traffic you already have into enquiries',
        subItems: [
          {
            name: 'Conversion rate optimization',
            description:
              'The traffic is already arriving — this is about how much of it actually enquires.',
          },
          {
            name: 'Ongoing site maintenance',
            description:
              'Updates, security, and monitoring so the site stays fast and findable, not a one-time fix that decays.',
          },
          {
            name: 'Monthly measurement + iteration',
            description:
              'What moved, why, and what we’re doing next — reported in language you can actually use.',
          },
        ],
      },
    ],
  },
  {
    type: 'growthChart',
    id: 'dashboard-evolve',
    variant: 'dashboard-evolve',
    theme: 'dark',
    eyebrow: 'WHAT GOOD LOOKS LIKE',
    heading: 'What good looks like, over six months.',
    body: "The honest shape of this work — including the month that doesn't feel like progress.",
    disclaimer:
      "These numbers show a shape, not a case study — an illustration of how an engagement typically unfolds, not a real client's results.",
    states: [
      {
        month: 'M1',
        label: 'BASELINE',
        caption: 'Audit done, 41 issues found, nothing fixed yet.',
        metrics: [
          { label: 'Issues found', value: '41' },
          { label: 'Keywords in top 10', value: '3' },
        ],
        chartHeight: 6,
      },
      {
        month: 'M2',
        label: 'TECHNICAL',
        caption: 'Core Web Vitals green, crawl errors cleared — rankings flat, deliberately.',
        metrics: [
          { label: 'Core Web Vitals', value: '52 → 91' },
          { label: 'Keywords in top 10', value: '3' },
        ],
        chartHeight: 10,
      },
      {
        month: 'M3',
        label: 'STRUCTURE',
        caption: 'Internal linking and schema land; first impressions move.',
        metrics: [
          { label: 'Organic impressions', value: '+38%' },
          { label: 'Keywords in top 10', value: '7' },
        ],
        chartHeight: 32,
      },
      {
        month: 'M4',
        label: 'CONTENT',
        caption: 'Citation-shaped pages ship; first AI Overview appearance.',
        metrics: [
          { label: 'AI citations', value: '1' },
          { label: 'Keywords in top 10', value: '12' },
        ],
        chartHeight: 55,
      },
      {
        month: 'M5',
        label: 'COMPOUNDING',
        caption: 'Rankings and enquiries both moving.',
        metrics: [
          { label: 'Organic sessions', value: '+2.1×' },
          { label: 'Enquiries from organic', value: '+64%' },
        ],
        chartHeight: 78,
      },
      {
        month: 'M6',
        label: 'STEADY STATE',
        caption: 'Measurable lead flow, monthly iteration.',
        metrics: [
          { label: 'Organic sessions', value: '+3.1×' },
          { label: 'Enquiries from organic', value: '+2.4×' },
        ],
        chartHeight: 95,
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
        promise: "Full technical audit: what's broken, what's ranking, what's invisible to AI.",
        deliverables: ['Technical audit', 'Ranking baseline', 'GEO visibility check'],
        duration: '1 week',
      },
      {
        number: '02',
        title: 'Strategize',
        promise:
          'We pick the fixes with the best effort-to-impact ratio and tell you what to ignore.',
        deliverables: ['Priority roadmap', 'Scope + estimate', 'Success metrics'],
        duration: '1 week',
      },
      {
        number: '03',
        title: 'Build',
        promise: 'Technical fixes, structure, and content ship in priority order.',
        deliverables: ['Technical fixes', 'Structure + schema', 'Citation-shaped content'],
        duration: '2–4 weeks',
      },
      {
        number: '04',
        title: 'Launch',
        promise: 'Changes go live in measured batches, so we know what caused what.',
        deliverables: ['Staged rollout', 'Tracking verification', 'Baseline reset'],
        duration: '1 week',
      },
      {
        number: '05',
        title: 'Grow',
        promise: 'Monthly measurement, monthly iteration, monthly report you can actually read.',
        deliverables: ['Monthly reporting', 'Iteration', 'Ongoing monitoring'],
        duration: 'Ongoing',
      },
    ],
  },
  {
    type: 'leadMagnet',
    id: 'free-audit',
    variant: 'tool-card',
    theme: 'light',
    eyebrow: 'FREE SITE AUDIT',
    heading: "Start with the audit. It's free, and it's not a PDF template.",
    body: 'Send us your URL. In five working days you get a real audit — technical issues ranked by impact, what’s costing you rankings, how you look to an AI assistant, and what we’d fix first. If the answer is "your site’s fine, spend the money elsewhere," we’ll say that.',
  },
  {
    type: 'results',
    id: 'what-we-report',
    variant: 'metric-row',
    theme: 'light',
    eyebrow: 'WHAT WE REPORT',
    heading: 'What you actually get every month.',
    metrics: [
      {
        name: 'Organic sessions',
        definition: 'Visitors arriving from unpaid search — the top of the funnel.',
      },
      {
        name: 'Ranking keywords in top 10',
        definition: 'The terms you actually show up for on page one.',
      },
      {
        name: 'AI citations',
        definition:
          'Mentions in ChatGPT, Perplexity, and AI Overview answers — tracked, not guessed.',
      },
      {
        name: 'Core Web Vitals',
        definition: 'The specific speed metrics Google measures and ranks on.',
      },
      {
        name: 'Enquiries from organic',
        definition: 'The number that actually matters — leads, not visits.',
      },
      {
        name: 'Cost per enquiry',
        definition: 'What each enquiry costs, compared against your other channels.',
      },
    ],
    footnote:
      'And the ones we don’t report on, because they don’t mean anything: impressions, "domain authority," keyword count.',
  },
  {
    type: 'faq',
    id: 'faq',
    variant: 'accordion',
    theme: 'dark',
    eyebrow: 'FAQ',
    heading: 'Questions worth asking before you sign a retainer.',
    items: [
      {
        question: 'How long does SEO take to work?',
        answer:
          "Meaningful movement typically starts around month 3, with compounding results by month 5-6 — technical fixes alone (month 1-2) rarely move rankings, which is normal, not a sign anything's wrong. Anyone promising faster is either lucky or not being straight with you.",
      },
      {
        question: 'What is GEO, and is it different from SEO?',
        answer:
          'GEO (generative engine optimization) is the work that gets you cited by AI assistants like ChatGPT and Perplexity rather than just ranked in a search results page. It overlaps with technical SEO but needs its own structured data and content approach — most agencies added the term without changing the methodology.',
      },
      {
        question: 'How do we get cited by ChatGPT or AI Overviews?',
        answer:
          "Structured data that makes your entity unambiguous, and content written the way AI assistants actually quote sources — direct, factual, attributable. It's a real, specific methodology, not a checkbox added to an existing SEO package.",
      },
      {
        question: 'Do you guarantee rankings?',
        answer:
          "No, and anyone who does is lying to you. Search algorithms aren't something any agency controls. We guarantee the work — the audit, the fixes, the monthly reporting — not a specific ranking position.",
      },
      {
        question: "What's in the monthly report?",
        answer:
          'Organic sessions, ranking keywords, AI citations, Core Web Vitals, enquiries from organic, and cost per enquiry — with what changed and why. We don’t report impressions, "domain authority," or keyword count, because they don’t mean anything.',
      },
      {
        question: 'Do we need to sign a long contract?',
        answer:
          "No — month to month, cancel any time. SEO work does need sustained effort to show results, but that's an argument for staying because it's working, not for being locked in.",
      },
      {
        question: 'Can you work with our existing developer or agency?',
        answer:
          'Yes — we typically hand off technical recommendations for your developer to implement, or implement directly if you prefer. Either way, you get the audit and the roadmap regardless.',
      },
      {
        question: "What if our site is fine and doesn't need this?",
        answer:
          'Then the audit says so, and you’ve lost five days and nothing else — it’s free. We’d rather tell you that than sign a retainer for work that won’t move the number that matters.',
      },
      {
        question: 'How much does SEO cost for a small business?',
        answer:
          'We quote after the audit, once we know the actual scope — a site with a handful of technical issues costs less to fix than one with structural problems. The audit itself is free and is what the quote is based on.',
      },
      {
        question: 'Will AI search kill SEO traffic entirely?',
        answer:
          "It's changing what search traffic looks like, not eliminating it — some queries now get answered directly by an AI assistant instead of a click-through. That's exactly why GEO exists: being the cited source in that answer is the new version of ranking first.",
      },
    ],
  },
  {
    type: 'ctaClosing',
    id: 'cta-closing',
    variant: 'split-with-form',
    theme: 'dark',
    eyebrow: "Let's talk",
    heading: "Find out what's actually wrong first.",
    body: "The audit is free and there's no contract to see it. If it turns out you don't need us, that's a fine outcome — you'll still have the list.",
  },
]

const GROW_TITLE = 'SEO & AI Search Optimization Services'
const GROW_DESCRIPTION =
  'Get found by search engines and by the AI assistants your customers now ask first. Technical SEO, GEO, and performance work — measured, not promised.'

export const metadata: Metadata = buildMetadata({
  title: GROW_TITLE,
  description: GROW_DESCRIPTION,
  path: '/services/grow',
})

export default function GrowPage() {
  const service = serviceSchema({
    name: 'SEO & GEO Services',
    description: GROW_DESCRIPTION,
    serviceType: 'Search engine optimization and generative engine optimization',
    path: '/services/grow',
  })
  const faqItems = sections.find(
    (s): s is Extract<SectionInstance, { type: 'faq' }> => s.type === 'faq',
  )?.items
  const faq = faqItems ? faqSchema(faqItems) : null
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Grow', path: '/services/grow' },
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
