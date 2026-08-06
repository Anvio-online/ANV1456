# ADR-0002: MDX content behind a repository adapter

**Status:** Accepted
**Date:** 2026-08-07
**Deciders:** Anshika

## Context

The site needs case studies, blog posts, guides, and industry pages. Phase 1 has two case studies and a handful of posts — trivial content volume. But content is the growth engine, and at some point a non-developer will need to publish without opening a PR.

The tension: a CMS now is infrastructure ahead of need (a database, a schema maintained in two places, a vendor). MDX now is right-sized but creates a migration later — and a naive MDX setup means every page imports content directly, so migrating means touching every page.

Contentlayer is the cautionary tale: a popular typed-MDX library that was abandoned, stranding everyone who had coupled their pages to it.

## Decision

Content lives as MDX in `apps/web/content/`, with Zod-validated frontmatter, loaded through a typed build step (content-collections or velite) — but **pages never import MDX or the loader directly.** They call a `ContentRepository` interface in `lib/content/`. The MDX implementation is one file behind that interface.

## Alternatives considered

**Sanity from the start.** Hosted, generous free tier, fastest path to a non-technical writer. Rejected for Phase 1: content lives outside the repo (no atomic content+code commits, no preview-by-branch), adds a vendor dependency, and the schema is maintained in two places. Real cost, no Phase 1 benefit.

**Payload 3.** Self-hosted, Next-native, you own the data. Rejected as premature: it needs a Postgres database and admin infrastructure for a site with ~10 content files.

**MDX with direct imports, no adapter.** Simpler by one file. Rejected because it's the version that makes migration expensive — the adapter is the entire point.

## Consequences

**Good:** zero content infrastructure in Phase 1. Content is versioned, reviewable, and atomic with code. Migrating to any CMS means writing one new implementation of `ContentRepository`. If the MDX loader library dies, only `mdx.ts` changes.

**Bad:** one indirection layer that earns nothing until migration day. Non-developers can't publish. No visual preview without a dev server.

**Revisit when:** a non-developer needs to publish, or content exceeds roughly 40 files. Write ADR-000N choosing the CMS at that point.
