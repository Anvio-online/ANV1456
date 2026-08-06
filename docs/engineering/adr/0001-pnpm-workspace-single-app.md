# ADR-0001: pnpm workspace with a single app

**Status:** Accepted
**Date:** 2026-08-07
**Deciders:** Anshika

## Context

Phase 1 is one marketing site. But the information architecture already includes a **Products** surface, and the design system is the asset most likely to be shared across whatever comes after. Retrofitting a workspace onto a flat repo means moving every file, rewriting every import, and reconfiguring the whole toolchain — a real week, done under pressure, at the exact moment you're trying to ship a second thing.

## Decision

`pnpm-workspace.yaml` from the first commit, with `apps/web` as the only workspace and an empty `packages/`. No Turborepo yet.

## Alternatives considered

**Flat single app (`src/` at root).** Simplest tooling, one `package.json`, marginally faster CI. Rejected because the migration cost is paid later at a worse time, and the cost of avoiding it now is roughly a five-line YAML file.

**Full Turborepo with `packages/ui` and `packages/config` extracted on day one.** Correct if a second app were imminent. Rejected as speculative: extracting a design system before a second consumer exists means designing an API against an imaginary caller, and you get the abstraction wrong.

## Consequences

**Good:** the second surface costs a `pnpm create` and a workspace entry. Vercel handles workspaces natively. Extraction becomes a file move, not a migration.

**Bad:** one extra directory level in every path. Commands need `--filter web` (aliased in root scripts). Marginally more onboarding surface for a new developer.

**Revisit when:** a second app appears — extract `packages/ui` and `packages/config` at that point, not before. Add Turborepo when CI exceeds ~5 minutes or a third workspace lands.
