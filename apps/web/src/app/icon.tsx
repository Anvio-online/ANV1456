import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/**
 * App Router's icon convention — Next injects the right <link rel="icon">
 * automatically. Still generated rather than a static file, and still a
 * real fix rather than a cosmetic one: with no icon declared at all the
 * browser guesses /favicon.ico, which 404s and surfaces as a Lighthouse
 * "errors-in-console" failure.
 *
 * What it draws changed once a mark existed. This was a typeset "A" on
 * --d-bg, standing in for artwork the project didn't have; it is now the
 * wave and the star from the real mark (components/layout/logo.tsx).
 *
 * The full lockup can't be the favicon — it is 4.28:1, so at 32px each
 * letter would land under 5px wide. The wave alone is 1.30:1, which
 * fills a square canvas properly and stays legible down to 16px.
 *
 * Kept as ImageResponse (PNG) rather than a static icon.svg on purpose.
 * An SVG favicon is unsupported below Safari 14, and the fallback for
 * those browsers is exactly the /favicon.ico 404 this route exists to
 * prevent. A PNG is understood everywhere.
 *
 * Geometry is the artwork's, repositioned but not redrawn — in the
 * lockup the star trails the O at x≈220, far to the right of the wave's
 * 75–130, so composing the two means moving it. Transforms are computed
 * from each path's measured bounding box (wave 55.12x42.27 including its
 * 9-unit stroke; star 8.06x8.06) rather than hand-tuned, so the star
 * keeps a deliberate ratio to the wave instead of a guessed one.
 *
 * Top-right, not trailing the wave as it trails the O: the wave's
 * descender crowds the bottom-right corner and the star disappears there
 * at 16px. Flat stroke caps — round ones read softer standalone but
 * would draw the same wave two different ways across the site.
 */
export default function Icon() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
        <g transform="translate(-58.026 -1.267) scale(0.8164)">
          <path
            d="M79.25 63.27C83.09 50.89 92.57 27.72 99.81 34.09C108.85 42.04 96.38 66.27 109.61 66.27C122.83 66.27 127.99 46.8 124.12 34.09"
            fill="none"
            stroke="#ff9130"
            strokeWidth="9"
          />
        </g>
        <g transform="translate(-360.665 -109.44) scale(1.86104)">
          <path
            d="M220.44 62.25C219.74 61.7 218.73 62.25 218.82 63.13L219 64.94C219.03 65.2 218.96 65.46 218.79 65.67L217.66 67.09C217.11 67.78 217.67 68.8 218.55 68.71L220.36 68.52C220.62 68.5 220.88 68.57 221.08 68.73L222.51 69.87C223.2 70.42 224.21 69.86 224.12 68.98L223.94 67.17C223.91 66.91 223.99 66.65 224.15 66.45L225.28 65.02C225.83 64.33 225.28 63.31 224.39 63.41L222.59 63.59C222.32 63.62 222.06 63.54 221.86 63.38L220.44 62.25ZM221.61 64.75C222.33 64.83 222.85 65.47 222.78 66.19C222.7 66.92 222.05 67.44 221.33 67.36C220.61 67.29 220.09 66.64 220.17 65.92C220.24 65.2 220.89 64.68 221.61 64.75Z"
            fill="#ff9130"
          />
        </g>
      </svg>
    </div>,
    { ...size },
  )
}
