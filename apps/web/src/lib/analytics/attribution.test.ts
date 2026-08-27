import { describe, expect, it } from 'vitest'
import { attributionFromRequest, readAttribution } from './attribution'

describe('attributionFromRequest', () => {
  it('captures landing path and UTM params, and reduces the referrer to its origin', () => {
    const url = new URL(
      'https://anvio.online/services/automate?utm_source=linkedin&utm_medium=social&utm_campaign=launch',
    )
    const attr = attributionFromRequest(url, 'https://www.linkedin.com/feed/some/post')

    expect(attr).toEqual({
      landingPage: '/services/automate',
      referrer: 'https://www.linkedin.com',
      utmSource: 'linkedin',
      utmMedium: 'social',
      utmCampaign: 'launch',
      utmTerm: '',
      utmContent: '',
    })
  })

  it('handles a direct visit with no referrer and no UTM', () => {
    const attr = attributionFromRequest(new URL('https://anvio.online/'), null)
    expect(attr.landingPage).toBe('/')
    expect(attr.referrer).toBe('')
    expect(attr.utmSource).toBe('')
  })

  it('ignores a malformed referer header rather than throwing', () => {
    const attr = attributionFromRequest(new URL('https://anvio.online/'), 'not-a-url')
    expect(attr.referrer).toBe('')
  })
})

describe('readAttribution', () => {
  it('returns all-null for a missing cookie', () => {
    expect(readAttribution(undefined)).toEqual({
      landingPage: null,
      referrer: null,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
    })
  })

  it('returns all-null for a malformed cookie instead of throwing', () => {
    expect(readAttribution('{not json').utmSource).toBeNull()
    expect(readAttribution('"a string"').utmSource).toBeNull()
  })

  it('round-trips a captured record and normalises empty strings to null', () => {
    const cookie = JSON.stringify(
      attributionFromRequest(
        new URL('https://anvio.online/guides/x?utm_source=newsletter'),
        'https://mail.google.com/',
      ),
    )
    const columns = readAttribution(cookie)

    expect(columns.landingPage).toBe('/guides/x')
    expect(columns.referrer).toBe('https://mail.google.com')
    expect(columns.utmSource).toBe('newsletter')
    expect(columns.utmMedium).toBeNull()
  })
})
