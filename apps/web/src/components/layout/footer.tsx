import Link from 'next/link'

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
            link on every page. aria-hidden rather than brightened: low
            contrast is the design here (a faint background mark), not a
            bug. WCAG 1.4.3 explicitly exempts "text that is part of a logo
            or brand name" from the contrast minimum — axe-core's automated
            check still flags it (it can't tell logotype from body text),
            so this will keep showing as one Lighthouse contrast failure by
            design. Don't brighten it to satisfy the tool. */}
        <div
          aria-hidden="true"
          className="border-border font-display text-wordmark text-surface-2 border-t pt-8 text-center font-bold leading-none tracking-tight"
        >
          ANVIO
        </div>
      </div>
    </footer>
  )
}
