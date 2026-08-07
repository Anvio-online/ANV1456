'use client'

import { useId, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  contactSchema,
  TEAM_SIZE_OPTIONS,
  type ContactFormValues,
} from '@/lib/forms/contact-schema'
import { submitContactForm } from '@/lib/actions/contact'
import { Button } from '@/components/ui/button'
import { MagneticCta } from '@/components/motion/magnetic-cta'

/**
 * home-spec.md §11 / contact-spec.md §1. Shared by ctaClosing:split-with-form
 * (Home, Automate) and contact:split-form (the Contact page) — one form,
 * one validation path, per conventions.md §2. The qualifying textarea
 * does double duty: it filters tyre-kickers and gives the call a real
 * opening line. `messageLabel` is the one thing that legitimately
 * differs by placement (Home/Automate ask about a process specifically;
 * Contact's is deliberately broader) — everything else is identical.
 */
export function ContactForm({
  messageLabel = "What's the most repetitive thing your team does?",
}: {
  messageLabel?: string
}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) })
  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`

  async function onSubmit(values: ContactFormValues) {
    setStatus('submitting')
    const result = await submitContactForm(values)
    setStatus(result.success ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="border-border bg-surface text-body-l rounded-xl border p-7">
        Got it — we'll be in touch shortly.
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-border bg-surface flex flex-col gap-3 rounded-xl border p-7"
      noValidate
    >
      <Field id={fieldId('name')} label="Name" error={errors.name?.message}>
        <input
          {...register('name')}
          id={fieldId('name')}
          type="text"
          placeholder="Your name"
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

      <Field id={fieldId('company')} label="Company">
        <input
          {...register('company')}
          id={fieldId('company')}
          type="text"
          placeholder="Company name"
          className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
        />
      </Field>

      <Field id={fieldId('team-size')} label="Team size">
        <select
          {...register('teamSize')}
          id={fieldId('team-size')}
          defaultValue=""
          className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
        >
          <option value="" disabled>
            Select a range
          </option>
          {TEAM_SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option} people
            </option>
          ))}
        </select>
      </Field>

      <Field id={fieldId('message')} label={messageLabel} error={errors.message?.message}>
        <textarea
          {...register('message')}
          id={fieldId('message')}
          rows={3}
          placeholder="Describe it in a sentence"
          className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash w-full resize-y rounded-sm border px-4 py-3 focus:outline-none"
        />
      </Field>

      <MagneticCta>
        <Button type="submit" size="lg" className="mt-2 w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Book the call'}
        </Button>
      </MagneticCta>

      {status === 'error' ? (
        <p role="alert" className="text-body-s text-error">
          Something went wrong — try again, or email us directly.
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
