import { describe, expect, it } from 'vitest'
import { hasAnalyticsConsent, readConsent } from './consent'

describe('readConsent', () => {
  it('maps the two known values and treats everything else as unset', () => {
    expect(readConsent('granted')).toBe('granted')
    expect(readConsent('denied')).toBe('denied')
    expect(readConsent(undefined)).toBe('unset')
    expect(readConsent('')).toBe('unset')
    expect(readConsent('true')).toBe('unset')
  })
})

describe('hasAnalyticsConsent', () => {
  it('is true only for an explicit grant', () => {
    expect(hasAnalyticsConsent('granted')).toBe(true)
    expect(hasAnalyticsConsent('denied')).toBe(false)
    expect(hasAnalyticsConsent(undefined)).toBe(false)
  })
})
