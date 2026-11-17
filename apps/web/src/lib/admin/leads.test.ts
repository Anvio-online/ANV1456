import { describe, it, expect } from 'vitest'
import { safeWebsite, spamSignals } from './leads'
describe('untrusted lead data', () => {
  it('does not turn unsafe protocols or embedded credentials into visit links', () => {
    for (const value of [
      'javascript:alert(1)',
      'https://user:pass@example.com',
      'https://127.0.0.1',
      'http://localhost',
    ])
      expect(safeWebsite(value)).toBeNull()
  })
  it('allows a business URL without fetching it', () =>
    expect(safeWebsite('example.com')).toBe('https://example.com/'))
  it('does not label an ordinary Gmail address suspicious', () =>
    expect(spamSignals('alex.smith@gmail.com', 'https://example.com')).toEqual([]))
  it('explains suspicious formatting without deciding a spam status', () =>
    expect(spamSignals('a.b.c.d.e.f@gmail.com', 'https://nxfsvlsq.com')).toHaveLength(2))
})
