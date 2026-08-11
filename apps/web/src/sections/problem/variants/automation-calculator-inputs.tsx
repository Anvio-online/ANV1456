'use client'

import { useEffect, useId, useState, type ReactNode } from 'react'
import type { ProblemProps } from '../problem.types'

type Calculator = NonNullable<ProblemProps['automationCalculator']>

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})
const integer = new Intl.NumberFormat('en-IN')

/**
 * tools-spec.md §3. Debounced ~300ms, same reasoning as
 * cost-calculator-inputs.tsx — a continuously-recalculating value
 * isn't what counterRoll's count-once-on-intersection behaviour is
 * for. Client-side only, no submission, no gate — the calculator is
 * the free thing, not the lead capture.
 */
export function AutomationCalculatorInputs({ calculator }: { calculator: Calculator }) {
  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`
  const [hoursPerWeek, setHoursPerWeek] = useState(calculator.defaultHoursPerWeek)
  const [people, setPeople] = useState(calculator.defaultPeople)
  const [loadedHourlyCost, setLoadedHourlyCost] = useState(calculator.defaultLoadedHourlyCost)
  const [automatableShare, setAutomatableShare] = useState(calculator.defaultAutomatableShare)

  const [debounced, setDebounced] = useState({
    hoursPerWeek,
    people,
    loadedHourlyCost,
    automatableShare,
  })
  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebounced({ hoursPerWeek, people, loadedHourlyCost, automatableShare })
    }, 300)
    return () => window.clearTimeout(id)
  }, [hoursPerWeek, people, loadedHourlyCost, automatableShare])

  const automatableFraction = debounced.automatableShare / 100
  const weeklyHoursReturned = debounced.hoursPerWeek * debounced.people * automatableFraction
  const annualHoursReturned = weeklyHoursReturned * 52
  const annualCost = annualHoursReturned * debounced.loadedHourlyCost
  const monthlyCost = annualCost / 12
  const paybackLowMonths = monthlyCost > 0 ? calculator.buildCostLow / monthlyCost : 0
  const paybackHighMonths = monthlyCost > 0 ? calculator.buildCostHigh / monthlyCost : 0

  return (
    <div className="border-border bg-surface shadow-card rounded-xl border p-7">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field id={fieldId('hours')} label="Hours/week on this">
          <input
            id={fieldId('hours')}
            type="number"
            min={0}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value) || 0)}
            className="border-border bg-bg font-body text-body text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
          />
        </Field>
        <Field id={fieldId('people')} label="People involved">
          <input
            id={fieldId('people')}
            type="number"
            min={0}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value) || 0)}
            className="border-border bg-bg font-body text-body text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 focus:outline-none"
          />
        </Field>
        <Field id={fieldId('cost')} label="Loaded hourly cost">
          <div className="relative">
            <span className="text-text-3 pointer-events-none absolute inset-y-0 left-4 flex items-center">
              ₹
            </span>
            <input
              id={fieldId('cost')}
              type="number"
              min={0}
              value={loadedHourlyCost}
              onChange={(e) => setLoadedHourlyCost(Number(e.target.value) || 0)}
              className="border-border bg-bg font-body text-body text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-7 focus:outline-none"
            />
          </div>
        </Field>
        <Field id={fieldId('share')} label="Share that's automatable">
          <div className="relative">
            <input
              id={fieldId('share')}
              type="number"
              min={0}
              max={100}
              value={automatableShare}
              onChange={(e) => setAutomatableShare(Number(e.target.value) || 0)}
              className="border-border bg-bg font-body text-body text-text focus:border-accent-line focus:ring-3 focus:ring-accent-wash h-11 w-full rounded-sm border px-4 pr-8 focus:outline-none"
            />
            <span className="text-text-3 pointer-events-none absolute inset-y-0 right-4 flex items-center">
              %
            </span>
          </div>
        </Field>
      </div>

      <div className="border-border-soft divide-border-soft mt-6 flex flex-col divide-y border-t">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
          <span className="text-body text-text-2">Hours returned per year</span>
          <span className="text-body font-mono tabular-nums">
            {integer.format(Math.round(annualHoursReturned))} hrs
          </span>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
          <span className="text-body text-text font-medium">Annual cost of the manual work</span>
          <span className="text-h4 text-accent-text font-mono tabular-nums">
            {currency.format(Math.round(annualCost))} / year
          </span>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
          <span className="text-body text-text-2">Indicative payback period</span>
          <span className="text-body font-mono tabular-nums">
            {monthlyCost > 0
              ? `${paybackLowMonths.toFixed(1)}–${paybackHighMonths.toFixed(1)} months`
              : '—'}
          </span>
        </div>
      </div>

      <p className="text-body-s text-text-3 mt-4">{calculator.disclaimer}</p>
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
