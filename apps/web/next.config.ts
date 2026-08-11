import type { NextConfig } from 'next'
import { withContentCollections } from '@content-collections/next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Lets a one-off verification build (`NEXT_BUILD_DIR=.next-verify pnpm build`)
  // run alongside a live `pnpm dev` without deleting/corrupting the dev
  // server's own .next directory — that collision broke local preview
  // twice during development. Defaults to the normal '.next'.
  //
  // Gotcha: a verify build still rewrites next-env.d.ts and tsconfig.json
  // to point at whatever distDir it just used. After every verify build,
  // `git checkout -- next-env.d.ts tsconfig.json` before committing, or
  // you'll ship a next-env.d.ts pointing at a gitignored directory that
  // doesn't exist for anyone else.
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    // Preview deploys must never be indexed — see docs/engineering/workflow.md §6.
    // Vercel sets VERCEL_ENV=preview automatically on non-production deploys.
    if (process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_ENV) {
      return [
        {
          source: '/:path*',
          headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
        },
      ]
    }
    return []
  },
}

// content-layer.md §2 — the MDX loader chosen for ADR-0002's adapter.
// Wraps the config to generate .content-collections/generated at build
// and dev time from content-collections.ts; nothing outside
// lib/content/mdx.ts should ever import that generated output directly.
export default withContentCollections(nextConfig)
