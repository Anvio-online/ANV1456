# ADR-0003: Pages compose from a section registry

**Status:** Accepted
**Date:** 2026-08-07
**Deciders:** Anshika

## Context

The information architecture calls for 25+ pages: three service pillars, up to nineteen leaf service pages, industries, case studies, products, and blog — and the stated intent is that each reads like its own landing page rather than a template.

Built the obvious way, that produces 25 bespoke page components with heavily duplicated markup. A change to how section spacing works becomes 25 edits, applied inconsistently, and the "each page feels custom" goal quietly becomes "each page is subtly broken in its own way."

## Decision

A page is **data**: an ordered array of `SectionInstance` objects, each naming a section `type`, a `variant`, a `theme`, and props. A single `<SectionRenderer />` maps type → component, applies `data-theme`, applies section spacing, and computes heading levels from document order.

Three enforced rules: a section never knows what page it's on; a new need becomes a new **variant** before it becomes a new **type**; sections own no vertical margin.

## Alternatives considered

**Bespoke page components.** Maximum per-page freedom. Rejected — it is the failure mode described above, and per-page freedom turns out not to be what makes pages feel custom (variant + theme + order does that).

**A single mega page template driven by config.** One component, many booleans. Rejected: config-driven templates collapse into unreadable conditional soup, and the "each page is its own landing page" requirement dies immediately.

**A visual page builder / CMS-driven layout.** Rejected as far too much machinery for a team of one, and it moves layout out of version control.

## Consequences

**Good:** ~24 section types cover every page in the IA. Reordering a page is editing an array. A spacing or theming change is one edit in the renderer. New pages take hours, not days. The variant-first rule keeps the type count from sprawling.

**Bad:** one level of indirection between a URL and its markup — "where does this section live?" needs the registry. A genuinely one-off section is slightly awkward (it becomes a variant used once). Discipline required: the rules only hold if code review holds them.

**Revisit when:** the type count passes ~30 despite the variant-first rule — that would mean the abstraction isn't matching the real page shapes, and the section boundaries need redrawing.
