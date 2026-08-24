import Link from 'next/link'
import { Logo } from '@/components/layout/logo'

/**
 * design-system.md §6.6 specifies Services / Company / Resources /
 * Legal — all four now shipped. Legal landed in Wave 1
 * (legal-spec.md); Resources waited on real content and now links
 * Guides and Industries (case studies still don't exist, blocked on
 * the Stratseek agreement — no "Case Studies" link until they do).
 * Services carries the two shipped leaves (service-leaf-spec.md §5)
 * and the free tool; the rest wait until they exist too.
 */
const columns = [
  {
    heading: 'Services',
    links: [
      ['All services', '/services'],
      ['Build', '/services/build'],
      ['Automate', '/services/automate'],
      ['Grow', '/services/grow'],
      ['WhatsApp automation', '/services/automate/whatsapp-automation'],
      ['AI chatbot development', '/services/automate/ai-chatbot-development'],
    ],
  },
  {
    heading: 'Company',
    links: [
      ['About', '/about'],
      ['Projects', '/projects'],
      ['Contact', '/contact'],
    ],
  },
  {
    heading: 'Resources',
    links: [
      ['Guides', '/guides'],
      ['Industries', '/industries'],
      ['Automation ROI calculator', '/tools/automation-roi-calculator'],
    ],
  },
  {
    heading: 'Legal',
    links: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
      ['Cookies', '/cookies'],
    ],
  },
] as const

export function Footer() {
  return (
    <footer data-theme="dark" className="border-border bg-bg text-text border-t">
      <div className="max-w-page px-gutter mx-auto py-16">
        <div className="mb-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              {/* A styled label, not a document heading — footer nav groups
                  aren't part of the page's content outline. A literal <h4>
                  here breaks heading-order the moment the page's real
                  headings don't happen to reach h4 first (design-system.md
                  §6.6, caught by a live Lighthouse accessibility audit). */}
              <p className="text-label text-text-3 mb-4 font-mono uppercase tracking-widest">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-body-s text-text-2 hover:text-accent-text">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Decorative watermark, not content — the real wordmark is the nav
            link on every page, so this one is `decorative`: no text
            equivalent, and it stays out of the accessibility tree rather
            than announcing "Anvio" a second time. Low contrast is the
            design here (a faint background mark), not a bug; don't
            brighten it.

            `mono` is the whole reason this reads as a watermark. The mark
            holds its wave at --accent everywhere else, but a
            full-strength amber stroke at clamp(3.5rem, 14vw, 11rem)
            stops being a faint band and becomes the loudest element on
            the page — louder than the CTA above it.

            Worth re-checking on the next axe run: this used to be the
            one contrast failure we accepted by design, because axe-core
            can't tell logotype from body text and WCAG 1.4.3's logo
            exemption isn't machine-readable. The band is vector now, not
            a text node, so the colour-contrast rule should no longer
            evaluate it at all. */}
        <div className="border-border flex justify-center border-t pt-8">
          <Logo decorative mono className="text-surface-2 h-auto w-1/3" />
        </div>
      </div>
    </footer>
  )
}
