'use client'
import Script from 'next/script'
import { useCallback, useEffect, useRef } from 'react'
type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string
  remove: (id: string) => void
}
export function AuditChallenge({ onToken }: { onToken: (token: string) => void }) {
  const element = useRef<HTMLDivElement>(null)
  const widget = useRef<string | null>(null)
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const render = useCallback(() => {
    const api = (window as Window & { turnstile?: Turnstile }).turnstile
    if (key && api && element.current && !widget.current)
      widget.current = api.render(element.current, {
        sitekey: key,
        action: 'audit',
        callback: onToken,
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      })
  }, [key, onToken])
  useEffect(() => {
    render()
    return () => {
      const api = (window as Window & { turnstile?: Turnstile }).turnstile
      if (api && widget.current) api.remove(widget.current)
      widget.current = null
    }
  }, [render])
  if (!key) return null
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={render}
      />
      <div ref={element} aria-label="Verify your audit request" />
    </>
  )
}
