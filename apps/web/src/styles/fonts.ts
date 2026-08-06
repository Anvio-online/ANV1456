import localFont from 'next/font/local'

/**
 * Self-hosted, per design-system.md §3.1:
 *  - No Google Fonts / Fontshare CDN at runtime.
 *  - Preload Display + Body only. Mono loads normally.
 *  - font-display: swap (next/font/local default), size-adjust handled by
 *    next/font's automatic fallback-metric matching — no manual CLS tuning needed.
 *  - Payload: Display + Body together ≈ 91KB (budget: ≤110KB for the two
 *    preloaded faces). Mono is a separate, non-preloaded 31KB.
 */

export const fontDisplay = localFont({
  src: [
    { path: '../../public/fonts/cabinet-grotesk-medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/cabinet-grotesk-bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--ff-display',
  display: 'swap',
  preload: true,
})

export const fontBody = localFont({
  src: [
    { path: '../../public/fonts/satoshi-regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/satoshi-medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/satoshi-bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--ff-body',
  display: 'swap',
  preload: true,
})

export const fontMono = localFont({
  src: [
    {
      path: '../../public/fonts/jetbrains-mono-variable.woff2',
      weight: '100 800',
      style: 'normal',
    },
  ],
  variable: '--ff-mono',
  display: 'swap',
  preload: false,
})
