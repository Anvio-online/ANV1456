import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * automate-spec.md. Eleven of twelve sections are built — Case Studies
 * (§8) is withheld, blocked on two real automation projects + written
 * permission to name them, per the same "no fabricated metrics" rule
 * home-spec.md's featuredWork uses. Add it once that content exists;
 * do not fill the gap with placeholder projects.
 *
 * Workflow graph (§5) is Automate's Tier 1 signature scene
 * (motion-system.md §7.2) — deliberately not Home's horizontalPin, so
 * each page keeps its own signature piece. Process (§6) here uses
 * stickyStack for the same reason (process/index.tsx's docstring).
 *
 * The contact form (inside ctaClosing:split-with-form, §12) doesn't
 * currently have a "Team size" field the way the spec's form does —
 * that needs a schema + DB migration on contact-schema.ts /
 * lib/actions/contact.ts, not just page copy, so it's shipped with
 * Home's existing three fields (Name / Work email / Company / message)
 * rather than done as a drive-by change here.
 */
const sections: SectionInstance[] = [
  {
    type: 'hero',
    id: 'hero',
    variant: 'split-visual',
    theme: 'dark',
    eyebrow: 'AI AUTOMATION',
    heading: 'Your team is doing work\nyour software should be doing.',
    body: "We find the processes eating your team's week — data entry, follow-ups, support replies, reporting — and replace them with AI agents and automated workflows that plug into the tools you already run on.",
    cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
    ctaSecondary: {
      label: 'See what we’d automate for you →',
      href: '#agent-demo',
      style: 'secondary',
    },
    trustLine: 'First automation live in 2–4 weeks · Works with your existing stack',
  },
  {
    type: 'proofBar',
    id: 'proof-bar',
    variant: 'stat-row',
    theme: 'dark',
    stats: [
      { value: '2–4 weeks', label: 'typical time to first live automation' },
      { value: '40+ hrs/mo', label: 'typical manual hours removed per automated process' },
      { value: '30 days', label: 'post-launch support included on every build' },
      { value: '100%', label: 'code and workflows owned by you' },
    ],
  },
  {
    type: 'problem',
    id: 'problem',
    variant: 'before-after',
    theme: 'dark',
    eyebrow: 'THE REAL COST',
    heading: 'The bottlenecks nobody puts on the P&L.',
    body: "None of these feel like problems. Together they're a full salary.",
    rows: [
      {
        without: 'Someone re-types order details from WhatsApp into your CRM',
        withAnvio: 'Orders land in the CRM the moment the message arrives',
      },
      {
        without: 'Support answers the same 20 questions all day',
        withAnvio: 'An AI agent handles them from your own documentation, and escalates the rest',
      },
      {
        without: 'Follow-ups happen when someone remembers',
        withAnvio: 'Every lead gets a timely, personal follow-up, automatically',
      },
      {
        without: 'Reports are assembled by hand every Monday',
        withAnvio: 'Reports build themselves and land in your inbox',
      },
      {
        without: "Your tools don't talk, so people are the integration",
        withAnvio: 'Systems sync directly. People do the judgement work',
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
        headline: 'AI Agents & Assistants',
        promise: 'Software that takes an instruction and finishes the job',
        subItems: [
          {
            name: 'Custom AI agent development',
            description:
              'An agent built for one specific job in your business, wired into your real tools and data — not a generic assistant with your logo on it.',
          },
          {
            name: 'Multi-agent orchestration',
            description:
              'When one process needs more than one agent — one drafts, one checks, one hands off — coordinated to work as a single system, not five disconnected bots talking past each other.',
          },
          {
            name: 'AI-powered chatbots',
            description:
              'Trained on your own documentation and edge cases, not a generic script — handles what it can, hands off what it can’t.',
          },
          {
            name: 'AI customer support',
            description:
              'Answers the repeat questions from your knowledge base in your tone, and escalates to a human with full context when it should.',
          },
        ],
      },
      {
        headline: 'Workflow & Process Automation',
        promise: 'The repetitive path from A to B, without a person in the middle',
        subItems: [
          {
            name: 'Repetitive task automation',
            description:
              'The manual, rule-based steps someone does every day — moved to a workflow that runs itself, every time, the same way.',
          },
          {
            name: 'AI process automation',
            description:
              'Steps that need judgement, not just rules — an AI reads the input, decides, and acts, with a human checkpoint where it matters.',
          },
          {
            name: 'CRM automation',
            description:
              'Records update themselves as things actually happen, instead of after someone remembers to log them.',
          },
        ],
      },
      {
        headline: 'Integrations & Data',
        promise: 'Your tools, finally talking to each other',
        subItems: [
          {
            name: 'Custom AI integrations',
            description:
              'Connects an AI layer to the specific tools you run — not a generic Zapier chain, built for how your systems actually work.',
          },
          {
            name: 'API integrations',
            description:
              'If it has an API, we can connect it to the rest of your stack — one source of truth instead of five half-synced ones.',
          },
          {
            name: 'RAG / knowledge-base solutions',
            description:
              'Your documents, policies, and past tickets become something an AI agent can actually search and answer from accurately.',
          },
        ],
      },
      {
        headline: 'Strategy & Insight',
        promise: 'Knowing what to automate first — and what to leave alone',
        subItems: [
          {
            name: 'AI strategy consulting',
            description:
              'An honest read on where AI actually pays for itself in your business, before any building starts.',
          },
          {
            name: 'Real-time insights & reporting',
            description:
              'Reports that build themselves from live data, so you see what changed without asking someone to pull a spreadsheet.',
          },
          {
            name: 'Automation audit',
            description:
              'We map what your team does by hand today and tell you plainly which parts are, and aren’t, worth automating yet.',
          },
        ],
      },
    ],
  },
  {
    type: 'workflowGraph',
    id: 'workflow-graph',
    variant: 'live',
    theme: 'dark',
    eyebrow: 'How it actually works',
    heading: 'One message, six systems, no one typing.',
    body: 'A real scenario, not a diagram we made up for the pitch. Hover any step to see what it does.',
    scenario: 'A customer messages on WhatsApp at 11pm.',
    nodes: [
      {
        id: 'customer',
        label: 'Customer',
        status: 'WhatsApp · 11:04pm',
        explainer:
          'A message comes in outside business hours — the moment automation either saves the sale or loses it to silence until morning.',
      },
      {
        id: 'ai-agent',
        label: 'AI Agent',
        status: 'classifying intent',
        explainer:
          'Reads the message, matches it against known intents — order status, a complaint, a new order — and decides what happens next. No human required for the common cases.',
      },
      {
        id: 'knowledge-base',
        label: 'Knowledge Base',
        status: 'checking policy + order status',
        explainer:
          "Your actual documentation and order data. The agent looks up the real answer instead of guessing, and cites what it's not sure about.",
      },
      {
        id: 'crm',
        label: 'CRM',
        status: 'logging + updating record',
        explainer:
          'The conversation and any resulting change get written back automatically — no one has to remember to log it later.',
      },
      {
        id: 'whatsapp',
        label: 'WhatsApp',
        status: 'replying, in your tone',
        explainer:
          "The customer gets an answer in minutes, written the way you'd actually write it — not a generic bot reply.",
      },
      {
        id: 'team',
        label: 'Team',
        status: 'only if it needs a human',
        explainer:
          "If the agent can't resolve it confidently, it hands off to your team with the full conversation attached — no re-explaining required.",
      },
    ],
    edges: [
      { from: 'customer', to: 'ai-agent' },
      { from: 'ai-agent', to: 'knowledge-base' },
      { from: 'knowledge-base', to: 'ai-agent' },
      { from: 'ai-agent', to: 'crm' },
      { from: 'crm', to: 'whatsapp' },
      { from: 'whatsapp', to: 'team' },
    ],
  },
  {
    type: 'process',
    id: 'process',
    variant: 'sticky-stack',
    theme: 'light',
    eyebrow: 'Our process',
    heading: 'Five stages. Nothing built without you seeing it first.',
    stages: [
      {
        number: '01',
        title: 'Discover',
        promise: 'We map the process end to end, including the parts nobody documented.',
        deliverables: ['Process mapping', 'Stakeholder interviews', 'Systems audit'],
        duration: '1 week',
      },
      {
        number: '02',
        title: 'Strategize',
        promise:
          "We pick the highest-ROI automation first, and tell you what isn't worth automating yet.",
        deliverables: ['Automation priority list', 'Scope + estimate', 'Success metrics'],
        duration: '1 week',
      },
      {
        number: '03',
        title: 'Build',
        promise: 'We build and test against your real data, with weekly demos.',
        deliverables: ['Weekly demos', 'Staging access', 'Testing against real records'],
        duration: '2–6 weeks',
      },
      {
        number: '04',
        title: 'Launch',
        promise: 'We integrate, run it in parallel with the manual process, then switch over.',
        deliverables: ['Integration', 'Parallel run', 'Handover docs'],
        duration: '1 week',
      },
      {
        number: '05',
        title: 'Grow',
        promise: 'We monitor, tune, and automate the next thing.',
        deliverables: ['Monitoring', 'Tuning', 'Next-process recommendation'],
        duration: 'Ongoing',
      },
    ],
  },
  {
    type: 'integrations',
    id: 'integrations',
    variant: 'marquee-dual',
    theme: 'light',
    eyebrow: 'Works with your stack',
    heading: 'We connect the tools you already use.',
    groups: [
      { category: 'CRM', items: ['HubSpot', 'Salesforce', 'Zoho', 'Pipedrive'] },
      {
        category: 'Messaging',
        items: ['WhatsApp Business API', 'Slack', 'Telegram', 'Gmail'],
      },
      { category: 'Ops', items: ['Notion', 'Airtable', 'Google Sheets', 'Monday'] },
      { category: 'Commerce', items: ['Shopify', 'WooCommerce', 'Razorpay', 'Stripe'] },
      { category: 'AI', items: ['OpenAI', 'Anthropic', 'Google'] },
      { category: 'Automation', items: ['n8n', 'Make', 'Zapier'] },
      { category: 'Accounting', items: ['Tally', 'Zoho Books', 'QuickBooks'] },
    ],
    footnote: "Don't see yours? If it has an API, we can connect it. →",
  },
  {
    type: 'whyUs',
    id: 'why-us',
    variant: 'contrast-table',
    theme: 'dark',
    heading: "The difference is clear once you've been burned once.",
    rows: [
      {
        typical: 'Sells you a chatbot',
        anvio: 'Maps your process first, then builds only what pays for itself',
      },
      {
        typical: 'Generic bot on generic docs',
        anvio: 'Trained on your knowledge, your tone, your edge cases',
      },
      {
        typical: 'Locked into their platform',
        anvio: 'Built on tools you own, with code and workflows handed to you',
      },
      {
        typical: 'Goes quiet after launch',
        anvio: '30 days support included, then monitoring if you want it',
      },
      {
        typical: '"AI will transform everything"',
        anvio: "We'll tell you which processes aren't worth automating",
      },
    ],
  },
  {
    type: 'agentDemo',
    id: 'agent-demo',
    variant: 'full',
    theme: 'dark',
    eyebrow: 'Try it now',
    heading: 'Describe one process. Get a real automation plan.',
    body: 'Not a lead form with extra steps. Our agent asks what you do by hand, then builds you the actual workflow — tools, steps, and rough hours saved.',
    placeholders: [
      'We manually enter invoices into Tally…',
      'Our team answers the same WhatsApp questions all day…',
      'Someone builds our sales report by hand every Monday…',
      'We re-type orders from WhatsApp into our CRM…',
    ],
  },
  {
    type: 'faq',
    id: 'faq',
    variant: 'accordion',
    theme: 'dark',
    eyebrow: 'FAQ',
    heading: 'Questions worth asking before you commit to anything.',
    items: [
      {
        question: 'How much does AI automation cost for a small business?',
        answer:
          'Most single-process automations run ₹75,000–₹2,50,000 depending on complexity and how many systems it touches. Ongoing retainers for larger builds start around ₹35,000/month. We quote after an audit, not before — a number without a scope is a guess.',
      },
      {
        question: 'How long does it take to build an automation?',
        answer:
          'A single, well-defined process is typically live in 2–4 weeks: discovery, build, test against your real data, then launch. Multi-system builds or ones needing new integrations take longer — we tell you the real estimate after discovery, not a marketing number.',
      },
      {
        question: 'Will this work with the software we already use?',
        answer:
          "Almost certainly. If it has an API — most CRMs, messaging platforms, spreadsheets, and accounting tools do — we can connect to it. We'll confirm this specifically for your stack before any work starts, not after.",
      },
      {
        question: 'What happens if the automation breaks?',
        answer:
          'Every build includes 30 days of post-launch support at no extra cost. After that, you can monitor it yourself (you own the code) or put it on a monitoring retainer with us. Either way, we design for failure to fail loudly, not silently.',
      },
      {
        question: 'Do we need technical staff to run it?',
        answer:
          "No. We build the automation and hand over documentation your team can actually use — most of our clients don't have an in-house developer. If something needs a code-level change later, that's what a retainer or a one-off fix is for.",
      },
      {
        question: 'Is our data safe? Where does it go?',
        answer:
          "Your data stays in the tools you already use — we connect to them, we don’t copy your database into a separate system by default. Any AI provider in the workflow only sees what a given step needs, never your full dataset. (That's about automations we build for you — for what this website itself collects, including the AI agent demo above, see our Privacy Policy at anvio.online/privacy.)",
      },
      {
        question: "What's the difference between an AI agent and a chatbot?",
        answer:
          "A chatbot answers questions from a script. An AI agent reads a situation, decides what to do, and takes multi-step action — checking a knowledge base, updating a CRM, deciding when to escalate. Most 'AI chatbots' sold to small businesses are the former with better marketing.",
      },
      {
        question: 'Which processes are actually worth automating?',
        answer:
          "Anything repetitive, rule-based (or judgement-based but consistent), and done often enough that the hours add up — data entry, follow-ups, report assembly, first-line support. Low-frequency or highly judgement-heavy work usually isn't worth it yet, and we'll say so.",
      },
      {
        question: 'Do we own what you build?',
        answer:
          'Yes — the code, the workflows, and the documentation are yours from day one, not licensed to you. If you want to take everything and walk away at the end of an engagement, you can.',
      },
      {
        question: 'What if we want to change it later?',
        answer:
          "Since you own the code and workflows, you or another developer can modify it directly. We're also available for changes on a retainer or one-off basis — there's no lock-in requiring you to come back to us.",
      },
    ],
  },
  {
    type: 'ctaClosing',
    id: 'cta-closing',
    variant: 'split-with-form',
    theme: 'dark',
    eyebrow: "Let's talk",
    heading: 'Tell us the most repetitive thing your team does.',
    body: "30 minutes. We'll tell you honestly whether it's worth automating, what it'd take, and roughly what it'd cost. If the answer is \"not yet,\" we'll say that.",
  },
]

const AUTOMATE_TITLE = 'AI Automation Services for Growing Businesses'
const AUTOMATE_DESCRIPTION =
  'Cut manual work with AI agents, chatbots, and automated workflows. We map your process, build the automation, and integrate it with the tools you already use.'

export const metadata: Metadata = buildMetadata({
  title: AUTOMATE_TITLE,
  description: AUTOMATE_DESCRIPTION,
  path: '/services/automate',
})

export default function AutomatePage() {
  const service = serviceSchema({
    name: 'AI Automation Services',
    description: AUTOMATE_DESCRIPTION,
    serviceType: 'AI automation and business process automation',
    path: '/services/automate',
  })
  const faqItems = sections.find(
    (s): s is Extract<SectionInstance, { type: 'faq' }> => s.type === 'faq',
  )?.items
  const faq = faqItems ? faqSchema(faqItems) : null
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Automate', path: '/services/automate' },
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
