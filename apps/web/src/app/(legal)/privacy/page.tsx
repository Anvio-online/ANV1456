import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { webPageSchema, breadcrumbSchema } from '@/lib/seo/schema'

/**
 * legal-spec.md §2. Written from that section's audited table of what
 * the code actually collects, not from a generator — re-verify the
 * table before republishing if a form or route changes underneath it.
 *
 * Retention periods, the deletion-request owner, and governing law are
 * concrete engineering defaults, not yet legal-reviewed sign-off — see
 * legal-spec.md's Open Items and phase-2-plan.md §7. Update this file
 * when that review lands rather than treating it as final.
 *
 * Structured as several richText:prose instances rather than one —
 * each carries its own heading (a real <h2>), which is the closest
 * this composition model gets to a proper section-headed document
 * without richText:mdx (content-layer.md §5 step 3, not yet built).
 */
const sections: SectionInstance[] = [
  {
    type: 'breadcrumb',
    id: 'breadcrumb',
    variant: 'inline',
    theme: 'dark',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
  },
  {
    type: 'hero',
    id: 'hero',
    variant: 'page-lead',
    theme: 'dark',
    eyebrow: 'LEGAL',
    heading: 'Privacy Policy',
    body: 'Last updated August 10, 2026. This describes what anvio.online collects when you use this site, why, where it goes, and what you can do about it.',
  },
  {
    type: 'richText',
    id: 'overview',
    variant: 'prose',
    theme: 'dark',
    heading: 'Overview',
    paragraphs: [
      'Anvio ("we", "us") operates anvio.online. This policy covers the website itself — the contact form, the free audit form, and the AI agent demo. It does not cover work delivered under a signed client agreement, which has its own terms.',
      "We collect the minimum each feature needs to work, we don't sell personal data, and we tell you below exactly where each piece of information goes.",
    ],
  },
  {
    type: 'richText',
    id: 'what-we-collect',
    variant: 'prose',
    theme: 'dark',
    heading: 'What we collect',
    paragraphs: [
      'Contact form: your name, work email, company, team size, and message. Stored in our database and forwarded to our email provider, Resend, so we get notified.',
      'Free audit request: the URL you submit and your email. Stored in our database and forwarded to Resend the same way.',
      'AI agent demo: the questions you answer, your email once you provide it to receive a plan, the plan we generate, and the IP address the request came from. The conversation and the email are stored in our database. Separately, and only after you submit your email, the conversation is sent to our AI model provider, Anthropic, to generate your plan — see "Your conversation with our AI agent" below.',
      'Every request to the AI agent demo, whether or not you go on to submit an email, has its IP address processed for rate limiting, using Upstash. This exists to stop abuse of a feature that costs us money to run, not to identify you.',
      'Basic analytics on page views may be collected sitewide. As of this policy, we have not enabled a third-party analytics tool on the live site; if we add one, we will update this section before it goes live and prefer privacy-respecting, cookieless tools where the feature allows it — see our Cookie Policy.',
    ],
  },
  {
    type: 'richText',
    id: 'ai-agent',
    variant: 'prose',
    theme: 'dark',
    heading: 'Your conversation with our AI agent',
    paragraphs: [
      'This is the most consequential thing on this page and we\'re not going to bury it in a general clause about "service providers."',
      'When you use the AI agent demo and submit your email, the text of your conversation — what you typed, not your name or email directly — is sent to Anthropic, the company whose AI model generates your automation plan. Anthropic processes that content to return the plan to us; it is not used to identify you personally by us or, to our knowledge, by Anthropic for purposes unrelated to generating your response.',
      "We store the full conversation and the resulting plan in our own database, tagged with the email you provided, so we can review it, improve the demo, and — if you've asked us to — follow up. This is also noted in the demo itself, at the point you submit your email.",
    ],
  },
  {
    type: 'richText',
    id: 'retention',
    variant: 'prose',
    theme: 'dark',
    heading: 'How long we keep it',
    paragraphs: [
      '"As long as necessary" isn\'t a real answer, so here are the actual periods we work to. If you ask us to delete something sooner, we will.',
      'Contact form and free audit submissions: up to 24 months from your last contact with us, or until you ask us to delete them, whichever is sooner.',
      'AI agent demo conversations, plans, and the email tied to them: up to 12 months from submission, or until you ask us to delete them, whichever is sooner.',
      'IP addresses processed for rate limiting: kept only as long as the rate-limit window itself requires — on the order of hours to a day — then automatically expired, not retained separately.',
    ],
  },
  {
    type: 'richText',
    id: 'who-we-share-with',
    variant: 'prose',
    theme: 'dark',
    heading: 'Who we share it with',
    paragraphs: [
      "We don't sell personal data, to anyone, ever.",
      'We share what a feature needs with the provider that runs it: Resend for sending and receiving form notification emails, Anthropic for generating an AI agent plan from a conversation you chose to have, and Upstash for the rate-limiting described above. Our database is hosted on Neon (Postgres). None of these providers is authorized to use your data for their own marketing.',
      'We disclose information if required by law, or to protect the rights, property, or safety of Anvio, our users, or others.',
    ],
  },
  {
    type: 'richText',
    id: 'your-rights',
    variant: 'prose',
    theme: 'dark',
    heading: 'Your rights, and how to use them',
    paragraphs: [
      "If you are in India, this processing is carried out under India's Digital Personal Data Protection Act, on the basis of your consent when you submit a form or start the AI agent demo, and our legitimate interest in operating the site securely (for example, rate limiting).",
      'If you are in the EU or UK, the same activities are carried out under the GDPR on the equivalent legal bases — consent for the forms and the demo, legitimate interest for security and abuse prevention.',
      'Either way, you can ask us to access, correct, or delete the personal data we hold about you, or ask what we hold. Email hello@anvio.online with your request and we will respond within a reasonable time. We are a small team — if that email goes unanswered for more than a few business days, that is a failure on our part, not a sign to give up.',
    ],
  },
  {
    type: 'richText',
    id: 'children',
    variant: 'prose',
    theme: 'dark',
    heading: "Children's data",
    paragraphs: [
      "This site is intended for business visitors and we don't knowingly collect personal data from anyone under 18. If you believe a child has submitted information to us, contact hello@anvio.online and we will delete it.",
    ],
  },
  {
    type: 'richText',
    id: 'security',
    variant: 'prose',
    theme: 'dark',
    heading: 'How we protect it',
    paragraphs: [
      'Data in transit between your browser and our servers is encrypted over HTTPS. Our database and rate-limiting store are hosted by third-party infrastructure providers (Neon and Upstash) rather than run by us directly. No method of storage or transmission is completely secure, and we do not claim a specific security certification we do not hold.',
    ],
  },
  {
    type: 'richText',
    id: 'changes',
    variant: 'prose',
    theme: 'dark',
    heading: 'Changes to this policy',
    paragraphs: [
      "If we change what we collect or how we use it, we'll update this page and the date at the top. We won't apply a material change to data we already hold without telling you.",
    ],
  },
  {
    type: 'richText',
    id: 'contact',
    variant: 'prose',
    theme: 'dark',
    heading: 'Contact',
    paragraphs: ['Questions about this policy, or a request about your data: hello@anvio.online.'],
  },
]

const PRIVACY_TITLE = 'Privacy Policy'
const PRIVACY_DESCRIPTION =
  'What anvio.online collects when you use the contact form, the free audit tool, or the AI agent demo — including what is sent to our AI provider and why.'

export const metadata: Metadata = buildMetadata({
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
  path: '/privacy',
})

export default function PrivacyPage() {
  const webPage = webPageSchema({
    type: 'WebPage',
    name: PRIVACY_TITLE,
    description: PRIVACY_DESCRIPTION,
    path: '/privacy',
  })
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy' },
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
