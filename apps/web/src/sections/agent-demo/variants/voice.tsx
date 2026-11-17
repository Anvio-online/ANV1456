'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent, type RefObject } from 'react'
import Link from 'next/link'
import type { AgentDemoProps } from '../agent-demo.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Button } from '@/components/ui/button'
import type { CSSVarStyle } from '@/lib/utils/css-vars'
import { appointmentDemoFormSchema, normalisePhone } from '@/lib/forms/appointment-demo-schema'
import { Preview } from './preview'

/**
 * home-spec.md §11 / section-library.md §3 — the voice appointment-setter
 * demo (ADR-0010). A short form, then a live browser voice call: the AI
 * discloses itself, briefs Anvio, gauges interest, and books a real
 * 15-minute call with the founder (Cal.com) — or captures what the
 * visitor would want automated.
 *
 * Any hard failure — backend not configured, mic denied, SDK error —
 * renders <Preview> in place. The section must never look broken
 * (section-library.md §5).
 */

type TranscriptLine = { role: 'user' | 'assistant'; text: string }

type Phase =
  | { kind: 'idle' }
  | { kind: 'starting' }
  | { kind: 'in-call' }
  | { kind: 'ended' }
  | { kind: 'rate-limited' }
  | { kind: 'fallback' }

type FormState = { name: string; email: string; phone: string; consent: boolean }

const EMPTY_FORM: FormState = { name: '', email: '', phone: '', consent: false }

type VapiClient = {
  start: (assistantId: string, overrides: unknown) => Promise<unknown>
  stop: () => void
  setMuted: (muted: boolean) => void
  on: (event: string, cb: (payload: unknown) => void) => void
  removeAllListeners: () => void
}

export function Voice({
  eyebrow,
  heading,
  body,
  headingTag,
  consentLabel = 'I agree Anvio may contact me about this enquiry.',
  privacyNote = 'We record and transcribe this call so we can follow up. Privacy policy.',
  ...rest
}: AgentDemoProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  const [phase, setPhase] = useState<Phase>({ kind: 'idle' })
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [formError, setFormError] = useState<string | null>(null)
  const [lines, setLines] = useState<TranscriptLine[]>([])
  const [speaker, setSpeaker] = useState<'assistant' | 'user' | null>(null)
  const [muted, setMuted] = useState(false)

  const vapiRef = useRef<VapiClient | null>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  const teardown = useCallback(() => {
    try {
      vapiRef.current?.stop()
      vapiRef.current?.removeAllListeners()
    } catch {
      /* already gone */
    }
    vapiRef.current = null
  }, [])

  // Stop the call if the visitor navigates away mid-conversation.
  useEffect(() => teardown, [teardown])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError(null)

    const candidate = { ...form, phone: normalisePhone(form.phone) }
    const parsed = appointmentDemoFormSchema.safeParse(candidate)
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? 'Please check the form.')
      return
    }

    setPhase({ kind: 'starting' })
    setLines([])

    let config: { publicKey?: string; assistantId?: string; assistantOverrides?: unknown }
    try {
      const res = await fetch('/api/appointment-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      if (res.status === 429) {
        setPhase({ kind: 'rate-limited' })
        return
      }
      if (!res.ok) throw new Error('start failed')
      config = await res.json()
    } catch {
      setPhase({ kind: 'fallback' })
      return
    }

    if (!config.publicKey || !config.assistantId) {
      setPhase({ kind: 'fallback' })
      return
    }

    try {
      const mod = await import('@vapi-ai/web')
      const Vapi = mod.default as unknown as new (key: string) => VapiClient
      const vapi = new Vapi(config.publicKey)
      vapiRef.current = vapi

      vapi.on('call-start', () => setPhase({ kind: 'in-call' }))
      vapi.on('call-end', () => {
        setSpeaker(null)
        setPhase((p) => (p.kind === 'in-call' || p.kind === 'starting' ? { kind: 'ended' } : p))
      })
      vapi.on('speech-start', () => setSpeaker('assistant'))
      vapi.on('speech-end', () => setSpeaker(null))
      vapi.on('message', (payload) => {
        const m = payload as {
          type?: string
          role?: string
          transcriptType?: string
          transcript?: string
        }
        if (m.type === 'transcript' && m.transcriptType === 'final' && m.transcript) {
          const role = m.role === 'assistant' ? 'assistant' : 'user'
          setLines((prev) => [...prev, { role, text: m.transcript as string }])
        }
      })
      vapi.on('error', () => {
        // If the call never got going, drop to the fallback; if it was
        // already live, treat it as a normal hang-up.
        setPhase((p) => (p.kind === 'starting' ? { kind: 'fallback' } : { kind: 'ended' }))
        teardown()
      })

      await vapi.start(config.assistantId, config.assistantOverrides)
    } catch {
      setPhase({ kind: 'fallback' })
      teardown()
    }
  }

  function endCall() {
    teardown()
    setSpeaker(null)
    setPhase({ kind: 'ended' })
  }

  function toggleMute() {
    const next = !muted
    setMuted(next)
    try {
      vapiRef.current?.setMuted(next)
    } catch {
      /* no-op */
    }
  }

  function reset() {
    setForm(EMPTY_FORM)
    setLines([])
    setMuted(false)
    setPhase({ kind: 'idle' })
  }

  if (phase.kind === 'fallback') {
    return (
      <Preview eyebrow={eyebrow} heading={heading} body={body} headingTag={headingTag} {...rest} />
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

      <div className="max-w-content border-accent-line bg-surface mx-auto flex flex-col gap-5 rounded-xl border p-6 md:p-8">
        {phase.kind === 'rate-limited' ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <p className="text-body text-text-2 max-w-measure">
              The demo is at its limit for now — a real conversation gets you the same outcome,
              faster.
            </p>
            <Button href="/contact" size="lg">
              Book a consultation →
            </Button>
          </div>
        ) : phase.kind === 'ended' ? (
          <div className="flex flex-col gap-4">
            <span className="text-label text-text-3 font-mono uppercase tracking-widest">
              Call ended
            </span>
            <p className="text-body text-text-2 max-w-measure">
              Thanks for trying it. If a time was booked you&rsquo;ll have a calendar invite; either
              way our founder will follow up at the email you gave.
            </p>
            {lines.length > 0 ? <Transcript lines={lines} scrollRef={transcriptRef} /> : null}
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" size="md">
                Book a call to scope it →
              </Button>
              <Button intent="secondary" size="md" onClick={reset}>
                Try again
              </Button>
            </div>
          </div>
        ) : phase.kind === 'in-call' || phase.kind === 'starting' ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <span
                className="text-label text-text-2 flex items-center gap-2 font-mono uppercase tracking-widest"
                aria-live="polite"
              >
                <span
                  aria-hidden
                  className={
                    speaker
                      ? 'bg-accent h-2 w-2 rounded-full motion-safe:animate-pulse'
                      : 'bg-text-3 h-2 w-2 rounded-full'
                  }
                />
                {phase.kind === 'starting'
                  ? 'Connecting…'
                  : speaker === 'assistant'
                    ? 'AI is speaking'
                    : 'Listening…'}
              </span>
              <div className="flex gap-2">
                <Button
                  intent="secondary"
                  size="sm"
                  onClick={toggleMute}
                  disabled={phase.kind === 'starting'}
                  aria-pressed={muted}
                >
                  {muted ? 'Unmute' : 'Mute'}
                </Button>
                <Button intent="secondary" size="sm" onClick={endCall}>
                  End call
                </Button>
              </div>
            </div>

            <Transcript lines={lines} scrollRef={transcriptRef} placeholderWhenEmpty />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Field
                id="voice-name"
                label="Your name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                autoComplete="name"
              />
              <Field
                id="voice-email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                autoComplete="email"
              />
              <Field
                id="voice-phone"
                label="Phone (with country code)"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                autoComplete="tel"
                placeholder="+91…"
              />
            </div>

            <label
              htmlFor="voice-consent"
              className="text-body-s text-text-2 flex items-start gap-2.5"
            >
              <input
                id="voice-consent"
                type="checkbox"
                checked={form.consent}
                aria-label={consentLabel}
                onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                className="border-border text-accent focus:ring-accent-wash focus:ring-3 mt-0.5 h-4 w-4 shrink-0 rounded"
              />
              <span>{consentLabel}</span>
            </label>

            {formError ? (
              <p className="text-body-s text-error" role="alert">
                {formError}
              </p>
            ) : null}

            <Button type="submit" size="lg">
              Talk to the AI now →
            </Button>

            <p className="text-label text-text-3">
              You&rsquo;ll talk to the AI in your browser — allow microphone access when asked.{' '}
              {privacyNote.replace(/\s*Privacy policy\.?\s*$/i, '')}{' '}
              <Link href="/privacy" className="hover:text-accent-text underline">
                Privacy policy
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function Transcript({
  lines,
  scrollRef,
  placeholderWhenEmpty = false,
}: {
  lines: TranscriptLine[]
  scrollRef: RefObject<HTMLDivElement | null>
  placeholderWhenEmpty?: boolean
}) {
  return (
    <div
      ref={scrollRef}
      aria-live="polite"
      aria-label="Call transcript"
      className="border-border-soft bg-bg flex max-h-80 min-h-40 flex-col gap-2.5 overflow-y-auto rounded-lg border p-4"
    >
      {lines.length === 0 && placeholderWhenEmpty ? (
        <p className="text-label text-text-3 m-auto text-center font-mono">
          The conversation will appear here as you talk.
        </p>
      ) : (
        lines.map((line, i) => (
          <p
            key={i}
            style={{ '--reveal-i': 1 } as CSSVarStyle}
            className={
              line.role === 'user'
                ? 'max-w-4/5 border-accent-line bg-accent-wash text-body-s text-text self-end rounded-xl border px-4 py-2.5'
                : 'max-w-4/5 border-border bg-surface-2 text-body-s text-text-2 self-start rounded-xl border px-4 py-2.5'
            }
          >
            {line.text}
          </p>
        ))
      )}
    </div>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label text-text-3 font-mono uppercase tracking-widest">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-md border px-4 focus:outline-none"
      />
    </div>
  )
}
