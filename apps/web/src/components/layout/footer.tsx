import Link from 'next/link'

/**
 * design-system.md §6.6 specifies Services / Company / Resources /
 * Legal, with individual leaf-service links under Services. None of
 * the leaf pages, Resources content, or Legal pages exist yet
 * (docs/README.md "Known gaps") — linking to them would just move the
 * 404s from nav into the footer. Ships with two columns of real
 * routes only; extend as those pages land.
 */
const columns = [
  {
    heading: 'Services',
    links: [
      ['Build', '/services/build'],
      ['Automate', '/services/automate'],
      ['Grow', '/services/grow'],
    ],
  },
  {
    heading: 'Company',
    links: [
      ['About', '/about'],
      ['Contact', '/contact'],
    ],
  },
] as const

export function Footer() {
  return (
    <footer data-theme="dark" className="border-border bg-bg text-text border-t">
      <div className="max-w-page px-gutter mx-auto py-16">
        <div className="mb-14 grid grid-cols-2 gap-8">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-label text-text-3 mb-4 font-mono uppercase tracking-widest">
                {col.heading}
              </h4>
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
        <div className="border-border font-display text-wordmark text-surface-2 border-t pt-8 text-center font-bold leading-none tracking-tight">
          ANVIO
        </div>
      </div>
    </footer>
  )
}
