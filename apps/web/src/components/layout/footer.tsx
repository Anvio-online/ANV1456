import Link from 'next/link'

/**
 * design-system.md §6.6. Carries the pillar + leaf links — real
 * internal-linking equity on a small site, per seo-strategy.md §5.
 */
const columns = [
  {
    heading: 'Build',
    links: [
      ['Website Development', '/services/build/website-development'],
      ['Ecommerce', '/services/build/ecommerce-development'],
      ['Web Applications', '/services/build/web-applications'],
      ['Custom Software', '/services/build/custom-software'],
    ],
  },
  {
    heading: 'Automate',
    links: [
      ['AI Agents', '/services/automate/ai-agent-development'],
      ['AI Chatbots', '/services/automate/ai-chatbot-development'],
      ['Workflow Automation', '/services/automate/workflow-automation'],
      ['WhatsApp Automation', '/services/automate/whatsapp-automation'],
    ],
  },
  {
    heading: 'Grow',
    links: [
      ['SEO', '/services/grow/seo'],
      ['GEO', '/services/grow/geo'],
      ['Performance', '/services/grow/performance-optimization'],
      ['Technical Audit', '/services/grow/technical-audit'],
    ],
  },
  {
    heading: 'Company',
    links: [
      ['About', '/about'],
      ['Case Studies', '/case-studies'],
      ['Products', '/products'],
      ['Blog', '/blog'],
      ['Contact', '/contact'],
    ],
  },
] as const

export function Footer() {
  return (
    <footer data-theme="dark" className="border-border bg-bg text-text border-t">
      <div className="max-w-page px-gutter mx-auto py-16">
        <div className="mb-14 grid grid-cols-2 gap-8 md:grid-cols-4">
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
