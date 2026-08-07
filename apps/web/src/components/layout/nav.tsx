import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NavChrome } from '@/components/layout/nav-chrome'

/**
 * design-system.md §6.5. Fully server-rendered and usable before
 * hydration — NavChrome only ever toggles the condense-on-scroll class,
 * it never gates this content.
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
          <Link href="/services" className="text-body-s text-text-2 hover:text-text">
            Services
          </Link>
          <Link href="/case-studies" className="text-body-s text-text-2 hover:text-text">
            Case Studies
          </Link>
          <Link href="/about" className="text-body-s text-text-2 hover:text-text">
            About
          </Link>
          <Link href="/blog" className="text-body-s text-text-2 hover:text-text">
            Blog
          </Link>
        </nav>
        <Button href="/contact" size="sm">
          Book a call
        </Button>
      </div>
    </NavChrome>
  )
}
