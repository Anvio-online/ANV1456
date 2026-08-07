import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/**
 * App Router's icon convention — Next injects the right <link rel="icon">
 * automatically. No static asset exists yet (design-system.md's mark is
 * just the wordmark, no separate logotype), so this generates one from
 * the same tokens rather than shipping a placeholder image: --d-bg and
 * --accent, the exact pair design-system.md §2.3 verifies at 8.78:1.
 * Fixes a real bug, not a cosmetic one — with no icon declared at all,
 * the browser fell back to guessing /favicon.ico, which 404s and shows
 * up as a Lighthouse "errors-in-console" failure.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0b',
        borderRadius: 6,
        fontFamily: 'sans-serif',
        fontWeight: 700,
        fontSize: 22,
        color: '#ff9130',
      }}
    >
      A
    </div>,
    { ...size },
  )
}
