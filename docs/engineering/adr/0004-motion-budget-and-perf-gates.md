# ADR-0004: Per-page motion budget and CI performance gates

**Status:** Accepted
**Date:** 2026-08-07
**Deciders:** Anshika

## Context

The design direction depends on motion — it's what makes the site feel expensive, and the two signature scenes (the pinned process, the live workflow graph) are the most memorable things on the site.

But Anvio **sells performance optimization, technical audits, and SEO.** Our own site is the first thing a technical buyer audits. A site that scores 55 on Lighthouse while selling Core Web Vitals work is a credibility failure no copy repairs.

The reference material makes this worse, not better: the Framer templates in `design_reference.md` animate nearly everything, because that is how templates demo. Copying their density copies their performance profile.

## Decision

Two coupled constraints, both enforced.

**A motion budget per page:** exactly 1 signature (Tier 1) scene, 3–4 supporting (Tier 2), unlimited ambient (Tier 3 — a 320ms fade-up) and micro (Tier 4). Adding a Tier 2 to a page already at four means demoting something else.

**Performance gates in CI, failing the build:** LCP < 2.0s, CLS < 0.02, INP < 150ms, Lighthouse mobile ≥ 92, per-route first-load JS < 180KB gzip, fonts ≤ 110KB. Checked by Lighthouse CI and `size-limit` against the PR's preview URL.

Supporting rules: transform/opacity only; hero renders complete without JS; Tier 1 scenes dynamically imported and intersection-gated; no text in canvas or WebGL; everything paused offscreen; every animation has a reduced-motion and a mobile path.

## Alternatives considered

**Budgets as guidance, not gates.** Rejected — an advisory budget is not a budget. Performance regresses one 15KB library at a time, and nobody notices until the score is 60.

**No budget; optimize when it becomes a problem.** Rejected: by then the motion is designed in, and removing it is a design conversation under deadline. Cheaper to constrain up front.

**Match the reference templates' motion density.** Rejected on the credibility argument above.

## Consequences

**Good:** the site can be used as a portfolio piece for the Grow service. The scarcity makes the signature scenes actually feel signature. Performance conversations happen at design time, when they're cheap.

**Bad:** genuinely good animation ideas will get cut for budget reasons. CI is slower and occasionally flaky (Lighthouse varies run to run — use median-of-3). Some Framer-reference effects simply cannot be reproduced within budget, which will feel like a loss when comparing side by side.

**Revisit when:** a measured business case shows a specific animation drives conversion enough to justify raising a budget — and then raise that one number deliberately in a new ADR, rather than letting the gate quietly erode.
