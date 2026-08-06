import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * design-system.md §6.5. Server-rendered and usable before hydration —
 * the scroll-condense (blur + hairline past 80px) is a client-side
 * enhancement layered on top in a later pass, not required for the
 * nav to function.
 */
export function Nav() {
  return (
    <header className="h-18 fixed inset-x-0 top-0 z-50" data-theme="dark">
      <div className="h-18 max-w-page px-gutter mx-auto flex items-center justify-between">
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
    </header>
  )
}
