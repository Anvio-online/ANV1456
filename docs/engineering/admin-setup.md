# Lead operations setup

Implementation: [admin-spec.md](../specs/admin-spec.md), ADR-0011.

## Release checklist

1. Google Cloud: create/select a Web OAuth client with only OpenID, email and profile scope. Add callback `https://anvio.online/api/auth/callback/google`; optionally localhost callback for development. Configure `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_URL=https://anvio.online`, a cryptographically random 32+ character `NEXTAUTH_SECRET`, and `ADMIN_EMAILS=anshika1307goel@gmail.com`. Never commit credentials. Restrict testing users if the consent screen is in testing mode. The application independently rejects all non-allowlisted and unverified identities.
2. Upstash: sign in and inspect whether the old database was archived. Restore/create a persistent database, then replace `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` together. At diagnosis, all saved KV addresses referenced the same unavailable instance; switching variable names alone was not a repair. On 2026-11-17 the owner approved a free Mumbai database named `anvio-production`; its REST endpoint returned PONG, the primary production Upstash variables were replaced, and the existing live release was redeployed. Validate PING, a chat request, and hourly/daily limits. Do not disable production rate limits.
3. Cloudflare: create a Turnstile widget for `anvio.online` (and `www.anvio.online` only if used directly). Configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. The audit action validates action `audit`, successful challenge and site hostname. Without a secret it refuses production submissions. Development-only missing-secret behavior is allowed for local tests.
4. Run migration `0004_broad_absorbing_man.sql` through `pnpm db:migrate` after approval. It creates review and delivery-event tables and adds three email-tracking columns. It does not delete submissions. Verify the four original tables remain intact.
5. Resend: create a webhook for `https://anvio.online/api/email/webhook`, enable delivered, delivery_delayed, bounced, complained and failed events, and configure `RESEND_WEBHOOK_SECRET`. Set `RESEND_API_KEY` as before. Webhooks must be verified with the raw body. Successful API submission means accepted, not delivered; delivered means the recipient mail server accepted it, not guaranteed inbox placement or reading.
6. PostHog: configure the EU project ingestion key and host (`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com`). Set retention according to the privacy policy, verify opt-in/out. The optional PostHog connector helps inspect project configuration but is not installed by adding code.
7. Deploy a preview, verify anonymous and non-admin users cannot read records or submit admin actions, then approve production rollout. Verify the approved Google identity can read a lead, save a reversible review and download an ICS reminder. No customer email or meeting invitation is sent by these shortcuts.

## Approved end-to-end email test

The owner approved `anshika1307goel@gmail.com` as both the admin identity and the single test-plan recipient on 2026-11-17. Once Redis and Resend are available: run normal chat, submit that email at the plan gate, confirm the lead and plan persist, confirm provider message id and acceptance, then confirm a signed delivery event. Ask the owner to check inbox/spam placement. Mark the test record in its review notes. Do not use any existing enquiry recipient for tests.

## Observability and limits

`/admin` shows persisted submissions, not a list of every anonymous visitor. PostHog supplies consented journeys; Vercel supplies aggregate traffic. Source tags appear only if captured. Spam heuristics are review hints and never delete records automatically. Historical records retain unknown delivery status unless independently verified. Metabase is deferred while the protected operational inbox serves current needs.

## Verified status (2026-11-17)

- Google admin: OAuth web client created, callback configured, owner added as the sole test user; production credentials configured. Live Google sign-in with the approved owner succeeded.
- Rate limiting: replacement database is healthy and the repaired settings are live.
- Approved live test: chat HTTP 200, plan HTTP 200, one plan saved; email acceptance false. Resend reported that `anvio.online` is not verified. That first attempt was correctly recorded as not sent; see the successful follow-up below.
- Admin migration: applied to production with approval. All four original lead tables remain; review and delivery-event tables and email-tracking columns were verified. Unified inbox queries also passed synthetic PostgreSQL validation.
- Automated checks: type checks, lint, 27 tests and production build passed. Anonymous admin and detail pages redirected to login; calendar exports returned 401; private responses use no-store.
- Provider setup: managed Turnstile widget created for anvio.online with pre-clearance disabled; site/secret keys configured in production. Resend delivery webhook enabled for five delivery/failure events and its signing secret configured. PostHog EU ingestion key and host configured.

## Sender verification and successful retry (2026-11-17)

The owner approved adding the missing `resend._domainkey` TXT record in Hostinger. Its public key was copied exactly from Resend, TTL 3600. Existing website, SPF and sending MX records were preserved. The TXT matched on public DNS; Resend then showed the domain and all sending records as Verified.

The approved live retry returned chat 200 and plan 200, saved the generated plan, and returned `emailSent: true`. Resend email `01a1e9df-9e30-7a11-a41b-52bee4109166` showed Sent and Delivered to the approved owner inbox. The database held two clearly labelled internal test plans: the first failed sending and the retry was accepted. Delivery was confirmed independently in Resend, not inferred from the database boolean. The owner confirmed receipt in their mailbox.

The rollout is live at https://anvio.online/admin. Metabase remains deferred; the operational inbox serves current lead management needs.


## Production rollout verification (2026-11-17)

Application release `d8675c6` was pushed to main, passed GitHub CI, and deployed as `dpl_77CG3LPCK8DUVAugY4NRk1Zo5DzW`, aliased to anvio.online. A final local `pnpm verify` also passed.

- Google sign-in succeeded with the approved owner. The inbox loaded all existing sources. Anonymous inbox/detail requests returned 307 to login; anonymous calendar access returned 401. Private pages returned no-store and noindex headers.
- Private notes persisted after a reload. An authenticated calendar action downloaded a valid ICS reminder with no customer attendee or automatic invitation. Mail actions remain drafts.
- A genuine audit submission passed the production Turnstile widget and saved one test row. The deployed server action rejected an invalid token, then rejected further attempts with its rate-limit response. A database check confirmed the rejected attempts added no rows.
- Live chat and plan generation returned 200. The generated plan was persisted with a Resend message id and accepted status. A genuine signed delivered callback was stored, and admin displayed delivered. An unsigned callback returned 401. New internal audit and plan test rows were labelled and archived.
- PostHog EU received the consented server events `agent_plan_generated` and `agent_plan_email_sent`. A fresh visitor on the protected production alias accepted analytics; PostHog received a browser pageview and an About link click. The primary-domain decline choice survived reload. The deployed public bundle was checked against the intended ingestion key and EU host. Admin is excluded from analytics initialization and sending; session replay remains disabled.
- PostHog uses its capped Free plan with one-year retention. No paid analytics plan was selected.

Historical plan rows retain unknown delivery unless independently verified. Old spam-like submissions remain available for manual review; no prospect was contacted during verification. The voice-calling demo is a separate provider setup and is not enabled by this release.
