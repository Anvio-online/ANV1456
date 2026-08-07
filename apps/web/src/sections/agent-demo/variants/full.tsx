'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { AgentDemoProps } from '../agent-demo.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { ChatTurn, AutomationPlan } from '@/lib/ai/schemas'
import { AGENT_DEMO_READY_PHRASE } from '@/lib/ai/prompts/agent-demo'
import { Button } from '@/components/ui/button'
import type { CSSVarStyle } from '@/lib/utils/css-vars'
import { Preview } from './preview'

/** Safety net: force the gate even if the model never says the ready
 * phrase (matches the system prompt's "at most 3 follow-ups" + the
 * visitor's opening description ≈ 4 user turns). */
const MAX_USER_TURNS = 4

const ROTATE_MS = 3000

type Phase =
  | { kind: 'idle' }
  | { kind: 'chatting' }
  | { kind: 'gate' }
  | { kind: 'gate-submitting' }
  | { kind: 'plan'; plan: AutomationPlan }
  | { kind: 'error' }

/**
 * home-spec.md §4 / section-library.md §5. The differentiator — a live
 * two-stage conversation against POST /api/agent (ADR-0005): cheap
 * streamed Q&A, then one email-gated structured call for the plan.
 *
 * Any hard failure (misconfigured backend, network error, a refused or
 * unparseable plan) falls back to rendering <Preview> in place — the
 * section must never look broken. See section-library.md §5.
 */
export function Full({
  eyebrow,
  heading,
  body,
  placeholders,
  headingTag,
  ...rest
}: AgentDemoProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' })
  const [turns, setTurns] = useState<ChatTurn[]>([])
  const [streamingText, setStreamingText] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [email, setEmail] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const streamRef = useRef<HTMLDivElement>(null)

  // Rotating idle placeholder — paused once the visitor starts typing.
  useEffect(() => {
    if (phase.kind !== 'idle' || input) return
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [phase.kind, input, placeholders.length])

  // Keep the stream scrolled to the latest message.
  useEffect(() => {
    streamRef.current?.scrollTo({ top: streamRef.current.scrollHeight, behavior: 'smooth' })
  }, [turns, streamingText])

  async function sendTurn(nextTurns: ChatTurn[]) {
    setPhase({ kind: 'chatting' })
    setStreamingText('')
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turns: nextTurns, stage: 'chat' }),
      })
      if (!res.ok || !res.body) throw new Error('chat request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        setStreamingText(full)
      }

      const assistantTurn: ChatTurn = { role: 'assistant', content: full }
      const updatedTurns = [...nextTurns, assistantTurn]
      setTurns(updatedTurns)
      setStreamingText(null)

      const userTurnCount = updatedTurns.filter((t) => t.role === 'user').length
      const ready = full.toLowerCase().includes(AGENT_DEMO_READY_PHRASE)
      setPhase(ready || userTurnCount >= MAX_USER_TURNS ? { kind: 'gate' } : { kind: 'chatting' })
    } catch {
      setPhase({ kind: 'error' })
    }
  }

  function handleFirstSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    // Eagerly reflect the user's own message before the round trip
    // starts — matches handleFollowupSubmit below. Without this, the
    // visitor's first message stayed invisible until the assistant's
    // reply finished streaming, since `turns` state was never set
    // until sendTurn's completion handler ran.
    const nextTurns: ChatTurn[] = [{ role: 'user', content: text }]
    setTurns(nextTurns)
    void sendTurn(nextTurns)
  }

  function handleFollowupSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    const nextTurns: ChatTurn[] = [...turns, { role: 'user', content: text }]
    setTurns(nextTurns)
    void sendTurn(nextTurns)
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setPhase({ kind: 'gate-submitting' })
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turns, email, stage: 'plan' }),
      })
      const data = await res.json()
      if (!res.ok || !data.plan) throw new Error(data?.error ?? 'plan request failed')
      setPhase({ kind: 'plan', plan: data.plan as AutomationPlan })
    } catch {
      setPhase({ kind: 'error' })
    }
  }

  if (phase.kind === 'error') {
    return (
      <Preview
        eyebrow={eyebrow}
        heading={heading}
        body={body}
        headingTag={headingTag}
        {...rest}
        placeholders={placeholders}
        variant="preview"
      />
    )
  }

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="mb-head-gap flex flex-col gap-4">
        {eyebrow ? (
          <span className="text-label text-accent-text font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <HeadingTagEl className="max-w-headline text-h2 leading-none tracking-tight">
            {heading}
          </HeadingTagEl>
        ) : null}
        {body ? <p className="max-w-measure text-body-l text-text-2">{body}</p> : null}
      </div>

      <div className="max-w-content border-accent-line bg-surface mx-auto grid grid-cols-1 gap-6 rounded-xl border p-6 md:grid-cols-2 md:p-8">
        {/* Left — chat */}
        <div className="min-h-105 flex flex-col gap-3">
          {phase.kind === 'idle' ? (
            <form onSubmit={handleFirstSubmit} className="m-auto flex w-full flex-col gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                aria-label="Describe a manual process at your business"
                className="h-13 border-border bg-bg font-body text-body text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash w-full truncate rounded-md border px-4 focus:outline-none"
              />
              <Button type="submit" size="lg">
                Build my plan
              </Button>
            </form>
          ) : (
            <>
              <div ref={streamRef} className="max-h-105 flex flex-col gap-2.5 overflow-y-auto">
                {turns.map((turn, i) => (
                  <MessageBubble key={i} turn={turn} />
                ))}
                {streamingText !== null ? (
                  streamingText.length > 0 ? (
                    <MessageBubble turn={{ role: 'assistant', content: streamingText }} />
                  ) : (
                    <TypingIndicator />
                  )
                ) : null}
              </div>

              {phase.kind === 'chatting' && streamingText === null ? (
                <form onSubmit={handleFollowupSubmit} className="mt-auto flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Your answer…"
                    aria-label="Your answer"
                    className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 flex-1 rounded-md border px-4 focus:outline-none"
                  />
                  <Button type="submit" size="md">
                    Send
                  </Button>
                </form>
              ) : null}

              {phase.kind === 'gate' || phase.kind === 'gate-submitting' ? (
                <form
                  onSubmit={handleEmailSubmit}
                  className="border-border mt-auto flex flex-col gap-2 border-t pt-4"
                >
                  <label
                    htmlFor="agent-demo-email"
                    className="text-label text-text-3 font-mono uppercase tracking-widest"
                  >
                    Your plan is ready — where should we send it?
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="agent-demo-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 flex-1 rounded-md border px-4 focus:outline-none"
                    />
                    <Button type="submit" size="md" disabled={phase.kind === 'gate-submitting'}>
                      {phase.kind === 'gate-submitting' ? 'Building…' : 'Get my plan'}
                    </Button>
                  </div>
                </form>
              ) : null}
            </>
          )}
        </div>

        {/* Right — plan-in-progress / plan */}
        <div className="min-h-105 border-border-soft bg-bg flex flex-col justify-center gap-4 rounded-lg border p-6">
          {phase.kind === 'plan' ? (
            <PlanResult plan={phase.plan} />
          ) : (
            <p className="text-label text-text-3 m-auto max-w-52 text-center font-mono">
              {phase.kind === 'idle'
                ? 'Describe a process and the plan builds here, step by step.'
                : 'Your plan will build here once we have enough to work with.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ turn }: { turn: ChatTurn }) {
  const isUser = turn.role === 'user'
  return (
    <p
      className={
        isUser
          ? 'max-w-4/5 border-accent-line bg-accent-wash text-body-s text-text self-end rounded-xl border px-4 py-2.5'
          : 'max-w-4/5 border-border bg-surface-2 text-body-s text-text-2 self-start rounded-xl border px-4 py-2.5'
      }
    >
      {turn.content}
    </p>
  )
}

function TypingIndicator() {
  return (
    <div className="border-border bg-surface-2 flex w-fit gap-1 self-start rounded-xl border px-4 py-3.5">
      <span
        className="bg-text-3 h-1.5 w-1.5 animate-pulse rounded-full"
        style={{ animationDelay: '0ms' }}
      />
      <span
        className="bg-text-3 h-1.5 w-1.5 animate-pulse rounded-full"
        style={{ animationDelay: '180ms' }}
      />
      <span
        className="bg-text-3 h-1.5 w-1.5 animate-pulse rounded-full"
        style={{ animationDelay: '360ms' }}
      />
    </div>
  )
}

function PlanResult({ plan }: { plan: AutomationPlan }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-label text-text-3 font-mono uppercase tracking-widest">
        Your automation plan
      </span>
      <p className="text-body-s text-text-2">{plan.summary}</p>

      <div className="flex flex-col gap-1.5">
        {plan.nodes.map((node, i) => (
          <div
            key={node.label}
            className="fade-up-in border-accent-line bg-surface flex items-center gap-2.5 rounded-md border px-3 py-2"
            style={{ '--reveal-i': i + 1 } as CSSVarStyle}
          >
            <span aria-hidden className="bg-accent h-2 w-2 shrink-0 rounded-full" />
            <span className="text-body-s text-text font-mono">{node.label}</span>
            <span className="text-label text-text-3 ml-auto">{node.detail}</span>
          </div>
        ))}
      </div>

      <div className="border-border border-t pt-4">
        <span className="text-label text-text-3 font-mono uppercase tracking-widest">
          Estimated time returned
        </span>
        <div className="text-metric text-accent-ink mt-1 font-mono tabular-nums">
          {plan.estimatedHoursSavedPerMonth.low}–{plan.estimatedHoursSavedPerMonth.high} hrs/mo
        </div>
      </div>

      <Button href="/contact" size="md" className="mt-2">
        Book a call to scope it →
      </Button>
    </div>
  )
}
