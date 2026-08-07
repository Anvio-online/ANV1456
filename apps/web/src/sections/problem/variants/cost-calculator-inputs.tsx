'use client'

import { useEffect, useId, useState, type ReactNode } from 'react'
import type { ProblemProps } from '../problem.types'

type Calculator = NonNullable<ProblemProps['calculator']>

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})
const integer = new Intl.NumberFormat('en-IN')

/**
 * grow-spec.md §3. Debounced ~300ms so the outputs settle rather than
 * flicker on every keystroke — a plain debounced state update rather
 * than routing through CounterRoll, whose count-up-from-zero-on-first-
 * intersection behaviour is built for a value appearing once, not
 * recalculating continuously as someone types.
 */
export function CostCalculatorInputs({ calculator }: { calculator: Calculator }) {
  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`
  const [visitors, setVisitors] = useState(calculator.defaultVisitors)
  const [enquiryRate, setEnquiryRate] = useState(calculator.defaultEnquiryRate)
  const [dealValue, setDealValue] = useState(calculator.defaultDealValue)

  const [debounced, setDebounced] = useState({ visitors, enquiryRate, dealValue })
  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebounced({ visitors, enquiryRate, dealValue })
    }, 300)
    return () => window.clearTimeout(id)
  }, [visitors, enquiryRate, dealValue])

  const todayEnquiries = Math.round(debounced.visitors * (debounced.enquiryRate / 100))
  const todayRevenue = todayEnquiries * debounced.dealValue
  const targetEnquiries = Math.round(debounced.visitors * (calculator.targetEnquiryRate / 100))
  const targetRevenue = targetEnquiries * debounced.dealValue
  const gap = targetRevenue - todayRevenue

  return (
    <div className="border-border bg-surface shadow-card rounded-xl border p-7">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Field id={fieldId('visitors')} label="Monthly visitors">
          <input
            id={fieldId('visitors')}
            type="number"
            min={0}
            value={visitors}
            onChange={(e) => setVisitors(Number(e.target.value) || 0)}
            className="border-border bg-bg font-body text-body text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
          />
        </Field>
        <Field id={fieldId('enquiry-rate')} label="Enquiry rate">
          <div className="relative">
            <input
              id={fieldId('enquiry-rate')}
              type="number"
              min={0}
              step={0.1}
              value={enquiryRate}
              onChange={(e) => setEnquiryRate(Number(e.target.value) || 0)}
              className="border-border bg-bg font-body text-body text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 pr-8 focus:outline-none"
            />
            <span className="text-text-3 pointer-events-none absolute inset-y-0 right-4 flex items-center">
              %
            </span>
          </div>
        </Field>
        <Field id={fieldId('deal-value')} label="Average deal value">
          <input
            id={fieldId('deal-value')}
            type="number"
            min={0}
            value={dealValue}
            onChange={(e) => setDealValue(Number(e.target.value) || 0)}
            className="border-border bg-bg font-body text-body text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
          />
        </Field>
      </div>

      <div className="border-border-soft divide-border-soft mt-6 flex flex-col divide-y border-t">
        <Row label="Today" enquiries={todayEnquiries} revenue={todayRevenue} />
        <Row
          label={`At ${calculator.targetEnquiryRate}% enquiry rate`}
          enquiries={targetEnquiries}
          revenue={targetRevenue}
        />
        <div className="flex items-baseline justify-between py-4">
          <span className="text-body text-text font-medium">The gap</span>
          <span className="text-h4 text-accent-text font-mono tabular-nums">
            {currency.format(gap)} / month
          </span>
        </div>
      </div>

      <p className="text-body-s text-text-3 mt-4">{calculator.disclaimer}</p>
    </div>
  )
}

function Row({ label, enquiries, revenue }: { label: string; enquiries: number; revenue: number }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
      <span className="text-body text-text-2">{label}</span>
      <span className="text-body font-mono tabular-nums">
        {integer.format(enquiries)} enquiries/mo · {currency.format(revenue)}
      </span>
    </div>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label text-text-3 font-mono uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  )
}
