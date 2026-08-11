import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { softwareApplicationSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * tools-spec.md. Composed page (ADR-0006) — no content dependency.
 * The one Tier 2 piece is the calculator itself; everything else is
 * Tier 3/4, per phase-2-plan.md §4.
 */
const TOOLS_TITLE = 'Automation ROI Calculator: What Manual Work Costs'
const TOOLS_DESCRIPTION =
  'Work out what repetitive manual work costs your business each year, and how long an automation would take to pay for itself. No email required to see it.'

const sections: SectionInstance[] = [
  {
    type: 'breadcrumb',
    id: 'breadcrumb',
    variant: 'inline',
    theme: 'dark',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Tools', path: '/tools/automation-roi-calculator' },
      { name: 'Automation ROI Calculator', path: '/tools/automation-roi-calculator' },
    ],
  },
  {
    type: 'hero',
    id: 'hero',
    variant: 'page-lead',
    theme: 'dark',
    eyebrow: 'FREE TOOL',
    heading: 'What is manual work actually costing you?',
    body: "Four numbers, no email. It won't be exact — nothing that starts from four numbers is — but it will usually be larger than the estimate in your head.",
  },
  {
    type: 'problem',
    id: 'calculator',
    variant: 'automation-calculator',
    theme: 'dark',
    automationCalculator: {
      defaultHoursPerWeek: 10,
      defaultPeople: 2,
      defaultLoadedHourlyCost: 400,
      defaultAutomatableShare: 70,
      buildCostLow: 25000,
      buildCostHigh: 90000,
      disclaimer:
        'This is an order-of-magnitude estimate, not a quote. It excludes error cost, opportunity cost, and the work that only exists because the manual process does — all of which usually make the real number larger, not smaller.',
    },
  },
  {
    type: 'richText',
    id: 'methodology',
    variant: 'prose',
    theme: 'light',
    heading: 'How this is calculated.',
    paragraphs: [
      "The annual cost is hours per week, times people, times the share you say is automatable, times 52 weeks, times your loaded hourly cost — loaded meaning salary plus overhead, not just take-home pay, since that's the real cost to the business of an hour of someone's time.",
      'The payback range compares that annual cost against a typical build-cost range for a project this size — the same ₹25,000–₹90,000 range named on our service leaves — rather than a single number, because scope varies and a single figure would be a false precision this calculator has no way to earn.',
      'What it deliberately excludes: the cost of errors the manual process causes, the opportunity cost of the time not spent on higher-value work, and any work that exists only because the manual process does — an approval step invented to catch a mistake a person makes, for instance. Every one of those usually makes the real number bigger, not smaller, so treat this as a floor, not a ceiling.',
    ],
  },
  {
    type: 'leadMagnet',
    id: 'next-step',
    variant: 'route-cards',
    theme: 'light',
    eyebrow: 'WHAT TO DO WITH THIS NUMBER',
    heading: 'Two ways to go further.',
    options: [
      {
        title: 'Get an actual plan',
        body: 'The number above is an estimate. Describe the process to our agent and get the specific workflow — the steps, the tools, and a real hours-saved range.',
        href: '/services/automate#agent-demo',
        ctaLabel: 'Try the agent demo',
      },
      {
        title: 'Talk it through',
        body: "30 minutes. We'll tell you whether this one is worth automating, and what it'd take.",
        href: '/contact',
        ctaLabel: 'Book a free consultation',
      },
    ],
  },
  {
    type: 'faq',
    id: 'faq',
    variant: 'accordion',
    theme: 'dark',
    eyebrow: 'QUESTIONS',
    heading: 'About this calculator.',
    items: [
      {
        question: 'How accurate is this?',
        answer:
          "It's an order-of-magnitude estimate, not a precise figure — useful for deciding whether something is worth investigating further, not for budgeting to the rupee. The four inputs are a simplification of a real process, and real processes are messier than four numbers.",
      },
      {
        question: 'What counts as "loaded" hourly cost?',
        answer:
          "Salary plus the overhead that comes with employing someone — benefits, equipment, office costs, taxes — divided into an hourly rate. It's usually meaningfully higher than take-home pay alone, and using take-home pay understates the real cost.",
      },
      {
        question: "Why doesn't it assume 100% automation?",
        answer:
          "Because almost nothing is 100% automatable — there's usually a judgement-call fraction that stays manual by design. A calculator that assumes total automation produces a number nobody would believe, which defeats the point of it.",
      },
      {
        question: 'What does an automation like this actually cost to build?',
        answer:
          "Typically ₹25,000–₹90,000 depending on scope, which is the range this calculator uses for its payback estimate. We'll confirm a real number for your specific process on a call — never a firm price from a calculator.",
      },
      {
        question: "What isn't included in this calculation?",
        answer:
          'Error cost, opportunity cost, and any work that only exists because the manual process does. All three usually push the real cost higher than this calculator shows, which is why it should be read as a conservative floor.',
      },
    ],
  },
  {
    type: 'relatedLinks',
    id: 'related',
    theme: 'dark',
    variant: 'card-grid',
    eyebrow: 'RELATED',
    heading: 'Where to go next.',
    items: [
      {
        label: 'Which processes are actually worth automating',
        href: '/guides/which-processes-are-worth-automating',
        note: 'The framework behind this calculator, in full.',
      },
      {
        label: 'WhatsApp automation',
        href: '/services/automate/whatsapp-automation',
        note: 'The most common first automation for India-market businesses.',
      },
      {
        label: 'AI chatbot development',
        href: '/services/automate/ai-chatbot-development',
        note: 'For manual work that looks like answering questions.',
      },
      {
        label: 'Automate overview',
        href: '/services/automate',
        note: 'The full pillar page.',
      },
    ],
  },
  {
    type: 'ctaClosing',
    id: 'cta-closing',
    variant: 'centered-bold',
    theme: 'dark',
    eyebrow: "Let's talk",
    heading: 'Want the specific version of this number?',
    body: "30 minutes. Describe the process and we'll tell you honestly whether it's worth automating, and what it would actually take.",
    cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
  },
]

export const metadata: Metadata = buildMetadata({
  title: TOOLS_TITLE,
  description: TOOLS_DESCRIPTION,
  path: '/tools/automation-roi-calculator',
})

export default function AutomationRoiCalculatorPage() {
  const faqItems = sections.find(
    (s): s is Extract<SectionInstance, { type: 'faq' }> => s.type === 'faq',
  )?.items
  const softwareApplication = softwareApplicationSchema({
    name: 'Automation ROI Calculator',
    description: TOOLS_DESCRIPTION,
    applicationCategory: 'BusinessApplication',
    path: '/tools/automation-roi-calculator',
  })
  const faq = faqItems ? faqSchema(faqItems) : null
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Automation ROI Calculator', path: '/tools/automation-roi-calculator' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
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
