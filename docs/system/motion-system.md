# Anvio — Motion System

**Status:** v1, locked for Phase 1
**Governing rule:** Motion explains something, or it doesn't ship.

---

## 1. Why this document is strict

We sell **performance optimization, SEO, and technical audits**. If anvio.online scores 55 on Lighthouse because of a scroll-jacked hero, no amount of copy repairs that. Our own site is the first thing a technical buyer audits.

The Framer templates in `design_reference.md` (hanzo, risenix, sadewa, grovia, landio) are the right *idea* library and the wrong *density* model. They animate almost everything because that's how templates demo. We borrow their concepts and cut the volume by roughly two-thirds.

---

## 2. The motion budget

Per page, hard cap:

| Tier | Count | What it is |
|---|---|---|
| **Tier 1 — Signature** | **1** | The one thing people remember. Scroll-driven, custom, expensive. |
| **Tier 2 — Supporting** | **3–4** | Purposeful section-level motion: node cascades, counters, marquees, staged reveals. |
| **Tier 3 — Ambient** | unlimited | The default 320ms fade-up on scroll entry. Applies to everything not in Tier 1/2. |
| **Tier 4 — Micro** | unlimited | Hover, focus, press, accordion. ≤200ms, transform/opacity only. |

If a section wants Tier 2 motion and the page already has four, **something else must be demoted to Tier 3**. This forces the signature piece to stand alone, which is exactly what makes it feel signature.

**Assigned Tier 1 pieces:**
- **Home** → The Process scene (horizontal, scroll-pinned, 5 stages)
- **Automate** → The Live Workflow Graph (nodes activating in sequence along connector paths)
- **Build** (Phase 1) → Wireframe-to-render assembly
- **Grow** (Phase 1) → Metrics dashboard evolving

---

## 3. Primitive library

Every animation on the site is one of these, or a documented composition of them. Implemented once in `components/motion/`, never re-authored per section.

### Tier 3 — ambient

| Primitive | Spec |
|---|---|
| `fadeUp` | `opacity 0→1`, `translateY 24px→0`. `--dur-base` / `--ease-out`. Triggers at 15% viewport entry. **Fires once**, never on scroll-out. |
| `fadeUpGroup` | `fadeUp` across children with `--stagger` (60ms). Cap at 6 children — beyond that the last item feels broken. |
| `maskReveal` | Text reveals under a clip mask, per line. `--dur-slow` / `--ease-out`, 80ms stagger per line. **Headlines only, max 2 per page.** |
| `borderDraw` | 1px border scales from 0→100% width. `--dur-slow`. For section dividers and card entry. |

### Tier 2 — supporting

| Primitive | Spec |
|---|---|
| `counterRoll` | Number counts to target over `--dur-scene`, `--ease-out`, `tabular-nums` so nothing reflows. Fires once at 40% entry. |
| `marqueeLoop` | Infinite horizontal scroll, **CSS `@keyframes` + `translate3d` only** — no JS, no rAF. Duplicated track, 40–60s cycle. Pauses on hover and on `prefers-reduced-motion`. |
| `nodeCascade` | Nodes in a graph activate in sequence: border → `--accent-line`, glow → `--accent-wash`, label → `--accent`. 240ms per node, 120ms overlap. Connector path draws via `stroke-dashoffset`. |
| `pathPulse` | A 3px amber dot travels a connector `<path>` using `offset-path`. 1.2s per segment, loops. Max **one active pulse per viewport**. |
| `stickyStack` | Cards stack with `position: sticky`, each scaling to `0.96` and dimming as the next overlaps. Used for Process on mobile (the Tier 1 fallback) and Case Studies. |
| `themeShift` | Background + text colors transition dark↔light across a section boundary over `--dur-scene` / `--ease-in-out`, driven by an IntersectionObserver on the boundary. |
| `horizontalPin` | Section pins; vertical scroll maps to horizontal translate. **Tier 1 only.** See §4. |

### Tier 4 — micro

| Primitive | Spec |
|---|---|
| `hoverLift` | `translateY(-2px)` + border → `--accent-line`. 200ms `--ease-soft`. Pointer devices only (`@media (hover: hover)`). |
| `arrowSlide` | `→` translates `4px` on link hover. 200ms. |
| `magneticCTA` | Primary CTA translates up to `6px` toward cursor. **Max travel 6px** — beyond that it feels broken, not premium. Desktop pointer only. |
| `accordionOpen` | `grid-template-rows: 0fr → 1fr` + content fade. 320ms `--ease-out`. Never animate `height: auto`. |
| `navCondense` | Nav gains blur + hairline past 80px scroll. 320ms. |

---

## 4. Scroll behaviour

**Smooth scroll:** Lenis, `lerp: 0.1`, `duration: 1.2`. Disabled entirely on touch devices (native momentum is better than anything we'd emulate) and under `prefers-reduced-motion`.

**Scroll-jacking is banned** except inside `horizontalPin`, and there under these conditions:
- Pin duration ≤ **250vh** of scroll. Longer and users feel trapped.
- Progress is always visible (stage indicator `01 — 05` and a progress rail).
- The section is skippable — an anchor link past it, and `Esc`/keyboard nav works.
- **Desktop ≥1024px only.** Below that it degrades to `stickyStack` or a plain vertical list.

**Trigger thresholds:**
- Ambient reveals: 15% of element in viewport.
- Tier 2 scenes: 40%.
- Tier 1 pinned scenes: on pin start.
- Everything fires **once**. Re-animating on scroll-back is the fastest way to make a site feel cheap and to burn CPU.

---

## 5. Reduced motion & degradation

`prefers-reduced-motion: reduce` is not a nice-to-have; treat it as a supported rendering mode.

| Motion | Reduced-motion behaviour |
|---|---|
| `fadeUp` / groups | Opacity only, 150ms. No translate. |
| `maskReveal` | Instant, fully visible. |
| `counterRoll` | Final value rendered immediately. |
| `marqueeLoop` | Static, wraps to a flex-wrap grid. |
| `nodeCascade` / `pathPulse` | All nodes render in final active state. No traveling pulse. |
| `horizontalPin` | Unpinned; becomes a vertical list of all 5 stages. |
| `themeShift` | Instant switch at boundary. |
| `magneticCTA` | Disabled. |
| Lenis | Disabled. |

**Mobile (<768px) degradation, independent of reduced-motion:** no pinning, no `pathPulse`, no `magneticCTA`, no Lenis. Ambient reveals stay — they're cheap and they carry the rhythm.

---

## 6. Performance contract

These are ship gates, checked on every PR that touches a page.

| Metric | Target | Fail |
|---|---|---|
| LCP (mobile, 4G throttled) | < 2.0s | > 2.5s |
| CLS | < 0.02 | > 0.05 |
| INP | < 150ms | > 200ms |
| Lighthouse Performance (mobile) | ≥ 92 | < 85 |
| Total JS (first load, per route) | < 180KB gzip | > 220KB |
| Fonts | ≤ 110KB | — |

**Rules that make those numbers achievable:**

1. **The hero renders complete without JS.** Server-rendered HTML + CSS. Hero motion is CSS-only or a post-hydration enhancement. The hero headline must never be the thing waiting on a JS bundle — it is almost always the LCP element.
2. **Animate `transform` and `opacity` only.** Never `width`, `height`, `top`, `left`, `margin`, `box-shadow`, `filter`, or `background-position` in a loop.
3. **`will-change` is applied on interaction start and removed on end.** Never left in a stylesheet.
4. **Tier 1 scenes are dynamically imported** with `ssr: false` and an IntersectionObserver-gated load. The Process scene's JS must not be in the homepage's initial bundle.
5. **No text inside `<canvas>` or WebGL.** All copy is real DOM, server-rendered. A beautiful scene that hides your H2 from Google is a net loss. This applies to the Process scene and the Workflow Graph — both are DOM+SVG, not canvas.
6. **Reserve space for everything.** Explicit `width`/`height` or `aspect-ratio` on all media and animation containers. CLS from a late-loading scene is unacceptable.
7. **One compositor-heavy element per viewport.** `backdrop-filter` (nav) + amber glow + a pinned scene simultaneously is a dropped-frame recipe on mid-range Android.
8. **Budget check:** if a section's animation costs more than ~15KB of JS, it needs to justify itself as Tier 1 or 2. Otherwise it's a fade-up.

---

## 7. Signature scene specs

### 7.1 Home — Process (Tier 1)

Five stages: `01 DISCOVER · 02 STRATEGIZE · 03 BUILD · 04 LAUNCH · 05 GROW`.

- **Desktop:** section pins for 220vh. Scroll maps to horizontal translate across five full-height panels. A fixed progress rail at the bottom fills amber; the active stage number sits at `display-l` in `--accent`, inactive at `--d-text-3`. Each panel carries: number, title, one-line promise, 3 bullet deliverables, and a small stage-specific diagram built from the shared node/frame vocabulary.
- **Transition:** panels don't just slide — the outgoing panel's diagram morphs its connector line into the incoming one, so the five stages read as one continuous pipeline. That continuity *is* the message.
- **Tablet/mobile:** `stickyStack` — five cards stacking vertically.
- **Reduced motion:** plain vertical list, all content visible.
- **DOM:** all five stages present in HTML at all times, regardless of visual state. Never mount/unmount panels for the animation — that's both an SEO and an a11y failure.

### 7.2 Automate — Live Workflow Graph (Tier 1)

A directed graph: `Customer → AI Agent → CRM → WhatsApp → Team`, plus a branch to `Knowledge Base` and back.

- SVG connectors, DOM nodes positioned in a CSS grid. `nodeCascade` activates nodes in sequence; `pathPulse` sends a single amber dot along the active edge.
- Each node shows a mono label and a one-line status that updates as it activates (`AI Agent · classifying intent`).
- **Interactive layer:** hovering/tapping a node pauses the cascade and expands a short explainer. This turns a decorative loop into a product explanation — and it's the difference between "we do automation" and "here's how it works."
- Loop length ~9s, then restarts. Pauses when out of viewport (`IntersectionObserver`) — never animate offscreen.
- **Reduced motion / mobile:** static graph, all nodes in active state, explainers as a stacked list below.
- **DOM:** node labels and explainer text are real text. This section is a genuine SEO asset for "AI agent workflow" queries.

---

## 8. Section-to-motion map (Phase 1)

| Page | Section | Tier | Primitives |
|---|---|---|---|
| Home | Hero | 3 | `maskReveal` (headline), `fadeUpGroup` (sub + CTAs), CSS-only ambient grid |
| Home | Proof bar | 2 | `marqueeLoop` |
| Home | Services (Build/Automate/Grow) | 2 | `hoverLift` + per-card looping micro-visual, plays on hover only |
| Home | Agent demo | 2 | Message stream stagger, typing indicator |
| Home | Featured work | 3 | `fadeUpGroup`, `hoverLift` |
| Home | **Process** | **1** | `horizontalPin` + `borderDraw` + `counterRoll` |
| Home | How we work / pricing | 3 | `fadeUpGroup` |
| Home | Why us | 3 | `fadeUpGroup` |
| Home | Industries | 4 | `hoverLift` only |
| Home | Closing CTA | 3 | `fadeUp`, `magneticCTA` |
| Automate | Hero | 3 | `maskReveal`, `fadeUpGroup` |
| Automate | Problems we solve | 2 | `fadeUpGroup` + a before/after state toggle |
| Automate | Capability clusters | 3 | `fadeUpGroup`, accordion for sub-items |
| Automate | **Workflow graph** | **1** | `nodeCascade` + `pathPulse` |
| Automate | Process | 3 | `stickyStack` (deliberately *not* the Home treatment — the signature piece stays unique to Home) |
| Automate | Integrations | 2 | `marqueeLoop`, dual-row opposing direction |
| Automate | Case studies | 3 | `fadeUpGroup`, `counterRoll` on result metrics |
| Automate | Why us | 3 | `fadeUpGroup` |
| Automate | FAQ | 4 | `accordionOpen` |
| Automate | Closing CTA | 3 | `fadeUp`, `magneticCTA` |
| Build | Hero | 3 | `maskReveal`, `fadeUpGroup` |
| Build | Proof bar | 2 | `counterRoll` |
| Build | What goes wrong (pain grid) | 2 | `fadeUpGroup`, 6 cells — at the primitive's cap |
| Build | Capability clusters | 3 | `fadeUpGroup`, `accordionOpen` |
| Build | **Wireframe-to-render** | **1** | `borderDraw` + staged layer opacity/transform, ~180vh pin |
| Build | Process | 3 | `stickyStack` |
| Build | Tech stack | 2 | `fadeUpGroup` per category, `hoverLift` (deliberately *not* a marquee — that's Automate's Integrations) |
| Build | Selected work | 3 | `fadeUpGroup`, `hoverLift` |
| Build | Pricing tiers | 3 | `fadeUpGroup` |
| Build | FAQ | 4 | `accordionOpen` |
| Build | Closing CTA | 3 | `fadeUp`, `magneticCTA` |
| Grow | Hero | 3 | `maskReveal`, `fadeUpGroup` |
| Grow | Proof bar | 2 | `counterRoll` |
| Grow | Cost calculator | 2 | `counterRoll` on outputs, debounced ~300ms; real number inputs |
| Grow | Capability clusters | 3 | `fadeUpGroup`, `accordionOpen` |
| Grow | **Dashboard evolve** | **1** | `stroke-dashoffset` line draw + `counterRoll` per month state, ~180vh pin |
| Grow | Process | 3 | `stickyStack` |
| Grow | Free audit | 3 | `fadeUp` |
| Grow | What we report | 2 | `fadeUpGroup` — definitions, so explicitly **no** `counterRoll` |
| Grow | FAQ | 4 | `accordionOpen` |
| Grow | Closing CTA | 3 | `fadeUp`, `magneticCTA` |
| About | *(all sections)* | 3–4 | `maskReveal` on the hero, `fadeUpGroup` throughout, hovers. **No Tier 1 or 2** |
| Contact | *(all sections)* | 3–4 | `fadeUp` on the copy column, `magneticCTA` on submit. **No Tier 1 or 2** — the form never animates in |

Home: 1 signature + 3 supporting. Automate: 1 signature + 3 supporting. Build: 1 + 3. Grow: 1 + 3. All within budget.

**About and Contact carry no signature scene, deliberately.** §2 assigns Tier 1 pieces to the four pages that have to sell. About's job is credibility and Contact's is conversion — a scroll-jacked scene on either works against the page. Restraint there is the design decision, not an omission.

---

## 9. Review checklist

Before any animated section merges:

- [ ] Does it explain something? If it's decorative, it's cut or demoted to Tier 3.
- [ ] Within the page's tier budget?
- [ ] `transform`/`opacity` only?
- [ ] Reduced-motion path implemented and tested?
- [ ] Mobile degradation implemented and tested?
- [ ] All text in the DOM, server-rendered?
- [ ] Space reserved — no CLS?
- [ ] Paused when offscreen?
- [ ] Keyboard-operable and has a text equivalent?
- [ ] Route still under the JS budget?
