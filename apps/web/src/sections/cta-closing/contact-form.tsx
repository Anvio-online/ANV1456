'use client'

import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormValues } from '@/lib/forms/contact-schema'
import { submitContactForm } from '@/lib/actions/contact'
import { Button } from '@/components/ui/button'
import { MagneticCta } from '@/components/motion/magnetic-cta'

/**
 * home-spec.md §11. The qualifying textarea ("what's the most repetitive
 * thing your team does?") does double duty — it filters tyre-kickers
 * and gives the call a real opening line.
 */
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) })

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
      <Field label="Name" error={errors.name?.message}>
        <input
          {...register('name')}
          type="text"
          placeholder="Your name"
          className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
        />
      </Field>

      <Field label="Work email" error={errors.email?.message}>
        <input
          {...register('email')}
          type="email"
          placeholder="you@company.com"
          className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
        />
      </Field>

      <Field label="Company">
        <input
          {...register('company')}
          type="text"
          placeholder="Company name"
          className="border-border bg-bg font-body text-body-s text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
        />
      </Field>

      <Field
        label="What's the most repetitive thing your team does?"
        error={errors.message?.message}
      >
        <textarea
          {...register('message')}
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

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-label text-text-3 font-mono uppercase tracking-widest">{label}</label>
      {children}
      {error ? (
        <p role="alert" className="text-body-s text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}
