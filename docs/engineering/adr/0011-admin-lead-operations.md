# ADR-0011: Internal lead operations use a protected Next.js workspace

**Status:** Accepted
**Date:** 2026-11-17
**Deciders:** Anshika

## Context
Raw form submissions include suspected spam and have no working review interface. The owner requested an admin workspace with response and follow-up actions.

## Decision
Build a bounded internal inbox in Next.js, Google sign-in restricted to verified allowlisted emails. Store review metadata separately from original submissions. Draft email and export calendar reminders rather than sending unsolicited outreach. Keep acceptance and delivery distinct through signed Resend callbacks. Add server-side challenge verification and rate limits to the audit form.

## Alternatives considered
Metabase remains good for BI but does not provide the requested review workflow. A full external CRM adds setup before the lead pipeline is qualified. Password-only access adds a secret to share and rotate; the owner selected Google.

## Consequences
**Good:** submissions become readable and actionable in one protected workspace.
**Bad:** authentication, migrations and provider configuration must be maintained.
**Revisit when:** multiple operators or sales automation justify an external CRM.

Supersedes ADR-0008 only on deferring `/admin` and selecting Metabase for initial lead visibility. Analytics stays with PostHog.
