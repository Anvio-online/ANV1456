import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NavChrome } from '@/components/layout/nav-chrome'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Logo } from '@/components/layout/logo'

const SERVICES = [
  {
    label: 'Build',
    href: '/services/build',
    body: 'Websites, ecommerce, web apps, custom software.',
    items: [
      { label: 'Websites' },
      { label: 'Ecommerce' },
      { label: 'Web applications' },
      { label: 'CRM / ERP' },
    ],
  },
  {
    label: 'Automate',
    href: '/services/automate',
    body: 'AI agents, chatbots, workflow automation.',
    items: [
      { label: 'WhatsApp automation', href: '/services/automate/whatsapp-automation' },
      { label: 'AI chatbots', href: '/services/automate/ai-chatbot-development' },
      { label: 'Workflow automation' },
      { label: 'Integrations' },
    ],
  },
  {
    label: 'Grow',
    href: '/services/grow',
    body: 'SEO, GEO, performance, technical audits.',
    items: [
      { label: 'Technical SEO' },
      { label: 'GEO' },
      { label: 'Core Web Vitals' },
      { label: 'Conversion optimization' },
    ],
  },
] as const

/**
 * services-hub-spec.md §9 — the three-column mega-menu design-system.md
 * §6.5 specified, now that /services exists to head it. Sub-items are
 * plain text unless `href` is set — automate-spec.md §4's "never link
 * to an unbuilt page" still holds, so only the two shipped Automate
 * leaves link out; the rest stay text until their own leaf exists
 * (Wave 3). `Products` · `Case Studies` · `Blog` stay dropped — still
 * no pages to point them at (docs/README.md "Known gaps").
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
        {/* The typeset stand-in is retired — this is the real mark, inlined
            as SVG so it stays in the server-rendered response with no extra
            request and no layout shift. See components/layout/logo.tsx for
            why it isn't an <img>. `text-text` still matters: the letterforms
            are currentColor, so this is what makes the mark invert when
            NavChrome retargets data-theme over a light section. */}
        <Link href="/" className="text-text hover:text-text -m-2 flex items-center p-2">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden gap-7 md:flex">
          <div className="group relative">
            <button
              type="button"
              className="text-body-s text-text-2 hover:text-text flex items-center gap-1"
            >
              Services
            </button>
            {/* The wrapper is the hover target, not the visible card.
                `pt-2` is a deliberate bridge: it sits directly under
                the button with no gap, so moving the cursor from the
                button down into the panel never leaves the hovered
                element. Putting that 0.5rem of separation on the card
                as a `translate-y` instead left an unhoverable dead
                zone, and the menu closed before anyone could click
                anything in it. */}
            <div className="invisible absolute left-1/2 top-full w-fit -translate-x-1/2 pt-2 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {/* flex, not grid-cols-3: a `w-fit` container around a
                  grid with `1fr` tracks is a real CSS footgun — the
                  browser's shrink-to-fit pass can size the grid from
                  roughly one track's content instead of all three, so
                  each column's fixed w-56 box overflows its
                  too-narrow track and overlaps its neighbors. Flexbox
                  has no such ambiguity: it shrink-wraps to the sum of
                  its children's widths correctly. */}
              <div className="border-border bg-surface shadow-card flex flex-col gap-1 rounded-lg border p-2">
                <div className="flex gap-1">
                  {SERVICES.map((s) => (
                    <div key={s.href} className="flex w-56 flex-col gap-2 rounded-md p-3">
                      <Link
                        href={s.href}
                        className="hover:bg-surface-2 -m-1 flex flex-col gap-0.5 rounded-md p-1"
                      >
                        <span className="text-body-s text-text font-medium">{s.label}</span>
                        <span className="text-label text-text-3">{s.body}</span>
                      </Link>
                      <ul className="mt-1 flex flex-col gap-1.5">
                        {s.items.map((item) => (
                          <li key={item.label} className="text-label text-text-3">
                            {'href' in item && item.href ? (
                              <Link href={item.href} className="hover:text-accent-text">
                                {item.label}
                              </Link>
                            ) : (
                              item.label
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link
                  href="/services"
                  className="text-label text-accent-text hover:text-accent-hover w-full rounded-md px-4 py-2 font-medium"
                >
                  All services →
                </Link>
              </div>
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
