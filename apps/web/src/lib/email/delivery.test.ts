import { describe, it, expect } from 'vitest'
import { Webhook } from 'svix'
import { verifyDeliveryEvent } from './delivery'
const secret = `whsec_${Buffer.from('local-test-secret-with-32-bytes!!').toString('base64')}`
function signed(body: string, date = new Date()) {
  const id = 'msg_test123'
  return new Headers({
    'svix-id': id,
    'svix-timestamp': String(Math.floor(date.getTime() / 1000)),
    'svix-signature': new Webhook(secret).sign(id, date, body),
  })
}
const body = JSON.stringify({
  type: 'email.delivered',
  created_at: new Date().toISOString(),
  data: { email_id: 'email_test' },
})
describe('delivery verification', () => {
  it('accepts a signed delivery event and correlates its provider id', () =>
    expect(verifyDeliveryEvent(body, signed(body), secret)).toMatchObject({
      id: 'msg_test123',
      providerId: 'email_test',
      status: 'delivered',
    }))
  it('rejects a modified payload', () =>
    expect(() => verifyDeliveryEvent(body + ' ', signed(body), secret)).toThrow())
  it('rejects an expired signature', () =>
    expect(() =>
      verifyDeliveryEvent(body, signed(body, new Date(Date.now() - 600000)), secret),
    ).toThrow())
  it('does not confuse provider acceptance with confirmed delivery', () => {
    const sent = JSON.stringify({
      type: 'email.sent',
      created_at: new Date().toISOString(),
      data: { email_id: 'email_test' },
    })
    expect(verifyDeliveryEvent(sent, signed(sent), secret)).toBeNull()
  })
})
