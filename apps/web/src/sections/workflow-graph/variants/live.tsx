'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { WorkflowGraphProps } from '../workflow-graph.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { WorkflowGraphStaticList } from '../workflow-graph-static-list'

/**
 * motion-system.md §6 rule 4: Tier 1 scenes are dynamically imported
 * with ssr:false and IntersectionObserver-gated. Same two-gate pattern
 * as process/variants/horizontal-pin.tsx — see that file's docstring
 * for why the dynamic import has to live in a Client Component here
 * rather than in workflow-graph/index.tsx.
 */
const WorkflowGraphScene = dynamic(
  () => import('@/scenes/workflow-graph/workflow-graph').then((m) => m.WorkflowGraphScene),
  { ssr: false },
)

export function Live({
  eyebrow,
  heading,
  body,
  scenario,
  nodes,
  edges,
  headingTag,
}: WorkflowGraphProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const containerRef = useRef<HTMLDivElement>(null)

  // Gate 1: desktop + motion-allowed only — motion-system.md §7.2's
  // reduced-motion/mobile fallback is the static list, same as Process.
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

  // Gate 2: don't fetch the scene's JS until nearly in view.
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
        <WorkflowGraphScene scenario={scenario} nodes={nodes} edges={edges} />
      ) : (
        <WorkflowGraphStaticList nodes={nodes} />
      )}
    </div>
  )
}
