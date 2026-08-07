import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NavChrome } from '@/components/layout/nav-chrome'
import { MobileNav } from '@/components/layout/mobile-nav'

const SERVICES = [
  {
    label: 'Build',
    href: '/services/build',
    body: 'Websites, ecommerce, web apps, custom software.',
  },
  {
    label: 'Automate',
    href: '/services/automate',
    body: 'AI agents, chatbots, workflow automation.',
  },
  { label: 'Grow', href: '/services/grow', body: 'SEO, GEO, performance, technical audits.' },
] as const

/**
 * design-system.md §6.5 specifies a three-column mega-menu plus
 * Products/Case Studies/Blog links — none of those pages exist yet
 * (docs/README.md "Known gaps"), so this ships a plain dropdown over
 * the three real pillar pages and drops the rest rather than linking
 * to 404s. Extend to the full mega-menu once those routes land.
 *
 * Fully server-rendered and usable before hydration — NavChrome only
 * ever toggles the condense-on-scroll class, it never gates this
 * content. The dropdown itself is pure CSS (`group`/`group-hover`),
 * so it needs no client JS either. MobileNav is the one piece that
 * does need client JS (open state, scroll lock) — split out as its
 * own leaf component per conventions.md §1's smallest-leaf rule,
 * rather than making this whole nav a client component.
 */
export function Nav() {
  return (
    <NavChrome>
      {/* relative + z-10 keeps the nav's own content above .nav-chrome::before,
          which is absolutely positioned and would otherwise paint over it. */}
      <div className="h-nav-h max-w-page px-gutter relative z-10 mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-text text-xl font-bold">
          Anv<span className="text-accent">i</span>o
        </Link>
        <nav aria-label="Primary" className="hidden gap-7 md:flex">
          <div className="group relative">
            <button
              type="button"
              className="text-body-s text-text-2 hover:text-text flex items-center gap-1"
            >
              Services
            </button>
            <div className="border-border bg-surface shadow-card invisible absolute left-1/2 top-full flex w-72 -translate-x-1/2 translate-y-1 flex-col gap-1 rounded-lg border p-2 opacity-0 transition duration-150 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="hover:bg-surface-2 flex flex-col gap-0.5 rounded-md px-3 py-2"
                >
                  <span className="text-body-s text-text font-medium">{s.label}</span>
                  <span className="text-label text-text-3">{s.body}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/about" className="text-body-s text-text-2 hover:text-text">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <MobileNav />
          <Button href="/contact" size="sm">
            Book a call
          </Button>
        </div>
      </div>
    </NavChrome>
  )
}
