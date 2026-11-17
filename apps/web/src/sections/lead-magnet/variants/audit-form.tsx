'use client'

import { useCallback, useId, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { auditRequestSchema, type AuditRequestValues } from '@/lib/forms/audit-schema'
import { submitAuditRequest } from '@/lib/actions/audit'
import { AuditChallenge } from '@/components/ui/audit-challenge'
import { Button } from '@/components/ui/button'
import { MagneticCta } from '@/components/motion/magnetic-cta'

/**
 * grow-spec.md §7. URL + email only — every extra field costs
 * completions on the page's primary conversion device. Same
 * validate/submit shape as cta-closing/contact-form.tsx, a distinct
 * component rather than a shared one since the field sets don't
 * overlap at all.
 */
export function AuditForm() {
  const [errorMessage, setErrorMessage] = useState('')
  const [challengeToken, setChallengeToken] = useState('')
  const handleToken = useCallback((token: string) => setChallengeToken(token), [])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuditRequestValues>({ resolver: zodResolver(auditRequestSchema) })
  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`

  async function onSubmit(values: AuditRequestValues) {
    setStatus('submitting')
    try {
      const result = await submitAuditRequest({ ...values, challengeToken })
      setErrorMessage(result.success ? '' : result.error)
      setStatus(result.success ? 'success' : 'error')
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border-border bg-surface text-body-l rounded-xl border p-7">
        Got it — your audit will land in your inbox within 5 working days.
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-border bg-surface flex flex-col gap-3 rounded-xl border p-7"
      noValidate
    >
      <Field id={fieldId('url')} label="Website URL" error={errors.url?.message}>
        <input
          {...register('url')}
          id={fieldId('url')}
          type="text"
          placeholder="yoursite.com"
          className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
        />
      </Field>

      <Field id={fieldId('email')} label="Work email" error={errors.email?.message}>
        <input
          {...register('email')}
          id={fieldId('email')}
          type="email"
          placeholder="you@company.com"
          className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
        />
      </Field>

      <div hidden aria-hidden="true">
        <label htmlFor={fieldId('companyWebsite')}>Leave this field empty</label>
        <input
          {...register('companyWebsite')}
          id={fieldId('companyWebsite')}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <AuditChallenge onToken={handleToken} />
      <MagneticCta>
        <Button type="submit" size="lg" className="mt-2 w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Get the audit'}
        </Button>
      </MagneticCta>

      {status === 'error' ? (
        <p role="alert" className="text-body-s text-error">
          {errorMessage}
        </p>
      ) : null}
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label text-text-3 font-mono uppercase tracking-widest">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-body-s text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}
