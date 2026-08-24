import type { ReactElement } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * The Anvio wordmark, inlined rather than served as a file.
 *
 * Inline SVG is the choice that protects both budgets the nav is
 * measured against:
 *
 * - **Performance.** The mark sits above the fold on every route, so an
 *   `<img>`/`next/image` would add a blocking request to the critical
 *   path and a frame of empty box before it lands — layout shift on the
 *   one element that is present on every page. Inlined, it arrives in
 *   the same HTML response as the nav, costs zero requests, and can't
 *   shift. The path data is ~1.5KB and compresses to a few hundred
 *   bytes in the document stream; the source raster
 *   (assets/anvio_logo_glow_transparent.png) is 173KB for a mark that
 *   renders 24px tall.
 * - **SEO.** The link keeps real server-rendered anchor text — the
 *   `sr-only` span below — so the sitewide home link still carries
 *   "Anvio" as its accessible name and its anchor text. An image-only
 *   logo link is anchor text thrown away on every page of the site.
 *
 * Two things fall out of being vector rather than raster. The
 * letterforms are `currentColor`, so the mark inverts for free when
 * NavChrome retargets the nav's `data-theme` over a light section — a
 * flat raster of near-white letters would simply vanish there. And the
 * glow is a filter (`.logo-glow` in globals.css) rather than baked
 * pixels, so it can drop out on the light canvas where it has no job.
 *
 * Geometry is the artwork's, verified against the raster: both masks
 * agree to within antialiasing. The viewBox is tightened to the ink
 * bounds — the authored file at public/images/logo-wordmark.svg keeps
 * its original padded framing for design-tool use, but that padding is
 * asymmetric (more above than below), which would sit the mark visibly
 * below the optical centre of the nav row and make `h-*` mean something
 * other than the height you see.
 *
 * Default height is `h-5`. The mark is a wide lockup (4.28:1) where the
 * typeset stand-in it replaced was condensed (1.6:1), so matching the
 * old cap height would have put 2.4x the old footprint in the corner —
 * which is exactly how it read. `h-5` lands it at 86px against the old
 * 42px, which is as close as a lockup of this ratio gets before the
 * asterisk after the O stops resolving.
 */
type LogoProps = {
  /** Sizes the mark. Set a height; width follows the aspect ratio. */
  className?: string
  /**
   * The amber bloom from the source artwork. Off by default:
   * design-system.md §4.4 caps amber glow at one focal element per
   * viewport, and a mark that sits in the corner of every page is the
   * last thing that should spend that budget — in the nav it read as a
   * light source rather than a wordmark. Opt in for large-format use
   * (an OG image, a social avatar) where the mark is the only thing in
   * frame and the bloom is the point.
   */
  glow?: boolean
  /**
   * Drops the text equivalent and hides the mark from assistive tech.
   * For the footer watermark band, where the mark is a background
   * graphic and the nav link already carries "Anvio" on every page —
   * a second copy would just be a duplicate announcement.
   */
  decorative?: boolean
  /**
   * Renders the wave and the asterisk in `currentColor` too, instead of
   * holding them at --accent. For the watermark band, where the whole
   * point is a near-invisible mark: a full-strength accent stroke
   * inside a --surface-2 band isn't a faint watermark any more, it's
   * the loudest element in the footer.
   */
  mono?: boolean
}

export function Logo({
  className,
  glow = false,
  decorative = false,
  mono = false,
}: LogoProps): ReactElement {
  const accent = mono ? 'currentColor' : 'var(--accent)'

  const svg = (
    <svg
      viewBox="40.79 27.84 184.68 43.12"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn('h-5 w-auto', glow && 'logo-glow', className)}
    >
      {/* The wave is the N: a stroked path, not a glyph. Kept on
            --accent rather than --accent-text because a logo holds its
            brand colour on both canvases — WCAG 1.4.3 exempts logotype
            from the contrast minimum, and this is a 9-unit graphic
            stroke, not text. */}
      <path
        d="M79.25 63.27C83.09 50.89 92.57 27.72 99.81 34.09C108.85 42.04 96.38 66.27 109.61 66.27C122.83 66.27 127.99 46.8 124.12 34.09"
        fill="none"
        stroke={accent}
        strokeWidth="9"
      />
      <path d="M52.74 70.48H40.77L57.03 28.48H69.31L85.57 70.48H73.6L70.84 62.98H55.5L52.74 70.48ZM58.26 55.18H68.08L63.17 41.08L58.26 55.18Z" />
      <path d="M137.63 57.88L147.71 28.48H159.53L143.63 70.48H131.63L115.73 28.48H127.43L137.63 57.88Z" />
      <path d="M173.14 62.09V70.5H162.34V28.42H173.14V62.09Z" />
      <path d="M205.27 39.88C205.27 37.48 204.07 36.28 201.67 36.28H191.47C189.07 36.28 187.87 37.48 187.87 39.88V59.08C187.87 61.48 189.07 62.68 191.47 62.68H201.67C204.07 62.68 205.27 61.48 205.27 59.08V39.88ZM216.07 59.08C216.07 63.28 215.11 66.34 213.19 68.26C211.31 70.14 208.27 71.08 204.07 71.08H189.07C184.87 71.08 181.81 70.14 179.89 68.26C178.01 66.34 177.07 63.28 177.07 59.08V39.88C177.07 35.68 178.01 32.64 179.89 30.76C181.81 28.84 184.87 27.88 189.07 27.88H204.07C208.27 27.88 211.31 28.84 213.19 30.76C215.11 32.64 216.07 35.68 216.07 39.88V59.08Z" />
      <path
        d="M220.44 62.25C219.74 61.7 218.73 62.25 218.82 63.13L219 64.94C219.03 65.2 218.96 65.46 218.79 65.67L217.66 67.09C217.11 67.78 217.67 68.8 218.55 68.71L220.36 68.52C220.62 68.5 220.88 68.57 221.08 68.73L222.51 69.87C223.2 70.42 224.21 69.86 224.12 68.98L223.94 67.17C223.91 66.91 223.99 66.65 224.15 66.45L225.28 65.02C225.83 64.33 225.28 63.31 224.39 63.41L222.59 63.59C222.32 63.62 222.06 63.54 221.86 63.38L220.44 62.25ZM221.61 64.75C222.33 64.83 222.85 65.47 222.78 66.19C222.7 66.92 222.05 67.44 221.33 67.36C220.61 67.29 220.09 66.64 220.17 65.92C220.24 65.2 220.89 64.68 221.61 64.75Z"
        fill={accent}
      />
    </svg>
  )

  // Decorative use (the footer watermark band) needs no text equivalent,
  // and returning the bare svg is also what lets a consumer size it with
  // `w-full` — a shrink-to-fit inline-flex wrapper would give that
  // percentage nothing to resolve against. The svg is already
  // aria-hidden, so it drops out of the accessibility tree on its own.
  if (decorative) return svg

  return (
    <span className="inline-flex items-center">
      {svg}
      {/* The mark's text equivalent. `aria-hidden` on the svg plus real
          text here is more robust across screen readers than <title>,
          and unlike an aria-label it is text a crawler reads as the
          anchor text of the sitewide home link. */}
      <span className="sr-only">Anvio</span>
    </span>
  )
}
