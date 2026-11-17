# Internal lead dashboard

Private `/admin` workspace for one operator. Google OAuth with a verified email allowlist; every query and action checks authorization. JWT session, no public registration, no indexing or shared caches. Missing credentials deny access.

Unified inbox includes contact, audit, agent-plan and voice-demo submissions. Search and type/status filters, pagination, full readable details, source attribution, reversible spam review, notes, follow-up dates. Email opens a mail draft; scheduling exports an ICS reminder. Neither sends outreach automatically. Stored text is rendered as text. Submitted URLs are never fetched by the server.

One review row per source/id, with status new/contacted/qualified/won/spam/archived, notes, next follow-up and reviewed actor. Suspicion is a review hint, not an automatic deletion or verdict. Audit protection uses a honeypot, request-size bounds, server-verified Turnstile when configured, distributed rate limits, and duplicate suppression. Production challenge verification fails closed when unconfigured.

Plan email acceptance and delivery are distinct. Persist a plan before sending; retain Resend message id. Signed delivery webhooks preserve terminal delivery outcomes against late acceptance events. Replays are harmless. Historical email booleans mean provider acceptance only, not delivery.

PostHog remains consent-controlled. Metabase deferred because the private inbox supplies current operational needs. External setup required: Google OAuth credentials, working Upstash database, Turnstile keys, Resend webhook signing secret, PostHog EU project key.
