'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { GrowthChartProps } from '../growth-chart.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { GrowthChartStaticList } from '../growth-chart-static-list'

/**
 * motion-system.md §6 rule 4: Tier 1 scenes are dynamically imported
 * with ssr:false and IntersectionObserver-gated. Same two-gate pattern
 * as every other Tier 1 scene's wrapper on this site.
 */
const GrowthChartScene = dynamic(
  () => import('@/scenes/growth-chart/growth-chart').then((m) => m.GrowthChartScene),
  { ssr: false },
)

export function DashboardEvolve({
  eyebrow,
  heading,
  body,
  states,
  disclaimer,
  headingTag,
}: GrowthChartProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const containerRef = useRef<HTMLDivElement>(null)

  const [sceneEligible, setSceneEligible] = useState(false)
  useEffect(() => {
    const desktopMq = window.matchMedia('(min-width: 1024px)')
    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    function evaluate() {
      setSceneEligible(desktopMq.matches && !reducedMotionMq.matches)
    }
    evaluate()
    desktopMq.addEventListener('change', evaluate)
    reducedMotionMq.addEventListener('change', evaluate)
    return () => {
      desktopMq.removeEventListener('change', evaluate)
      reducedMotionMq.removeEventListener('change', evaluate)
    }
  }, [])

  const [nearViewport, setNearViewport] = useState(false)
  useEffect(() => {
    if (!sceneEligible || !containerRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearViewport(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(containerRef.current)
    return () => io.disconnect()
  }, [sceneEligible])

  const showScene = sceneEligible && nearViewport

  const header = (
    <>
      {eyebrow ? (
        <span className="text-label text-accent-text mb-4 block font-mono uppercase tracking-widest">
          {eyebrow}
        </span>
      ) : null}
      {heading ? (
        <HeadingTagEl className="max-w-headline text-h2 leading-none tracking-tight">
          {heading}
        </HeadingTagEl>
      ) : null}
      {body ? <p className="max-w-measure text-body-l text-text-2 mt-4">{body}</p> : null}
    </>
  )

  return (
    <div ref={containerRef}>
      <div className="max-w-page px-gutter mb-head-gap mx-auto">{header}</div>
      {showScene ? (
        <GrowthChartScene states={states} disclaimer={disclaimer} />
      ) : (
        <GrowthChartStaticList states={states} disclaimer={disclaimer} />
      )}
    </div>
  )
}
