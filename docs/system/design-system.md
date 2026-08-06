# Anvio — Design System

**Status:** v1, locked for Phase 1 (Home + Automate)
**Theme:** Dark-anchored hybrid
**Accent:** Signal Amber `#FF9130`

---

## 1. Design principles

These are the tie-breakers. When two options both look fine, the one that satisfies more of these wins.

1. **Sophistication through space, not decoration.** Whitespace, type scale, and rhythm carry the premium feel. No gradient meshes, no glassmorphism, no floating 3D blobs.
2. **Every visual explains something.** A diagram beats an illustration. A real workflow beats an abstract network graphic.
3. **Warm, not cold.** Pure `#000` and pure `#FFF` are banned. Every neutral carries a warm bias. This is what keeps "technical" from becoming "clinical" — and it's the whole reason we chose amber.
4. **Mono is our credibility layer.** Labels, section numbers, metrics, node names, and code fragments are monospace. This signals engineering company, not design shop, at almost zero cost.
5. **Prove, don't claim.** Any section that says "we're experts" without showing something should be cut or replaced.
6. **Performance is a design constraint, not an afterthought.** We sell performance optimization. See [motion-system.md](motion-system.md) §6.

---

## 2. Color

### 2.1 Dark canvas (default)

| Token | Hex | Use |
|---|---|---|
| `--d-bg` | `#0A0A0B` | Page background |
| `--d-surface` | `#131315` | Cards, raised panels |
| `--d-surface-2` | `#1C1C1F` | Nested surfaces, hover state on cards |
| `--d-border` | `#26262A` | Standard 1px borders |
| `--d-border-soft` | `rgba(245,244,242,0.08)` | Hairlines, dividers |
| `--d-text` | `#F5F4F2` | Headlines, primary body |
| `--d-text-2` | `#A3A19D` | Secondary body, descriptions |
| `--d-text-3` | `#6E6C68` | Muted, captions, disabled |

Note `--d-text` is a warm off-white, never `#FFFFFF`. On a dark screen pure white vibrates and reads cheap.

### 2.2 Light canvas

| Token | Hex | Use |
|---|---|---|
| `--l-bg` | `#FAFAF8` | Section background (warm paper) |
| `--l-surface` | `#FFFFFF` | Cards |
| `--l-sunken` | `#F1F0EC` | Inset panels, code blocks, table stripes |
| `--l-border` | `#E2E0DA` | Standard borders |
| `--l-text` | `#121212` | Headlines, primary body |
| `--l-text-2` | `#57544E` | Secondary body |
| `--l-text-3` | `#8A8781` | Muted, captions |

### 2.3 Accent — Signal Amber

| Token | Hex | Use |
|---|---|---|
| `--accent` | `#FF9130` | Primary accent on **dark only** |
| `--accent-hover` | `#FFA954` | Hover on dark |
| `--accent-ink` | `#9A4D06` | Accent **text** on light surfaces |
| `--accent-press` | `#E5761A` | Active/pressed fills |
| `--accent-on` | `#1A0E03` | Text/icon sitting *on* an amber fill |
| `--accent-wash` | `rgba(255,145,48,0.12)` | Tinted backgrounds, glow, focus halo |
| `--accent-line` | `rgba(255,145,48,0.30)` | Accent borders, active node strokes |

**Contrast — verified, do not deviate:**

| Pair | Ratio | Verdict |
|---|---|---|
| `#FF9130` on `#0A0A0B` | **8.78:1** | ✅ Any text size |
| `#FF9130` on `#FAFAF8` | **2.15:1** | ❌ **Never use as text on light** |
| `#9A4D06` on `#FAFAF8` | **5.82:1** | ✅ Body text on light |
| `#1A0E03` on `#FF9130` | **8.5:1** | ✅ Button labels |
| `#F5F4F2` on `#0A0A0B` | 17.9:1 | ✅ |
| `#A3A19D` on `#0A0A0B` | 7.6:1 | ✅ |
| `#6E6C68` on `#0A0A0B` | 3.5:1 | ⚠️ Large/caption only, never body |

On light surfaces, `--accent` is permitted as **fills, strokes, and icon shapes only** — never as text. This one rule prevents the most common accessibility failure in warm-accent systems.

### 2.4 Semantic

| Token | Dark | Light |
|---|---|---|
| `--success` | `#4ADE80` | `#15803D` |
| `--warning` | `#FACC15` | `#A16207` |
| `--error` | `#F87171` | `#B91C1C` |
| `--info` | `#60A5FA` | `#1D4ED8` |

Semantic colors appear **only** in product UI, forms, and the agent demo. They never decorate marketing sections — amber is the only color in the marketing layer. This restraint is what makes the accent feel owned.

### 2.5 Theming mechanism

Sections carry the theme, not the page. Every section root gets `data-theme="dark" | "light"`, which remaps a single set of neutral tokens:

```css
[data-theme="dark"]  { --bg: var(--d-bg); --surface: var(--d-surface); --text: var(--d-text); /* … */ --accent-text: var(--accent); }
[data-theme="light"] { --bg: var(--l-bg); --surface: var(--l-surface); --text: var(--l-text); /* … */ --accent-text: var(--accent-ink); }
```

Every component consumes only the neutral aliases (`--bg`, `--text`, `--accent-text`). No component hardcodes a hex or branches on theme. This is what lets any section drop into either canvas.

---

## 3. Typography

### 3.1 Faces

| Role | Face | Fallback stack |
|---|---|---|
| Display | **Cabinet Grotesk** (Fontshare, free) | `"Cabinet Grotesk", "Satoshi", system-ui, sans-serif` |
| Body / UI | **Satoshi** (Fontshare, free) | `"Satoshi", -apple-system, "Segoe UI", sans-serif` |
| Mono | **JetBrains Mono** (OFL) | `"JetBrains Mono", ui-monospace, "SF Mono", monospace` |

Alternates if you want a different flavour: Display → Clash Display or General Sans; Mono → Geist Mono.

**Why not Inter for everything:** Inter-only is the visual signature of a template. The three-role split is the cheapest way to look bespoke.

**Loading rules (non-negotiable, these are LCP):**
- Self-host `.woff2` variable files. No Google Fonts CDN, no Fontshare CDN at runtime.
- Subset to `latin` + `latin-ext`.
- `<link rel="preload">` **only** Display and Body. Mono loads normally.
- `font-display: swap` with a `size-adjust`-tuned fallback so the swap causes no CLS.
- Total font payload budget: **≤ 110KB**.

### 3.2 Scale

Fluid, `clamp()`-based. Never define a font-size outside this table.

| Token | Size | Line-height | Tracking | Weight | Face |
|---|---|---|---|---|---|
| `display-xl` | `clamp(3.5rem, 1.8rem + 7vw, 7.5rem)` | 0.92 | -0.03em | 500 | Display |
| `display-l` / h1 | `clamp(2.75rem, 1.6rem + 4.6vw, 5rem)` | 0.96 | -0.025em | 500 | Display |
| `h2` | `clamp(2rem, 1.3rem + 2.8vw, 3.5rem)` | 1.02 | -0.02em | 500 | Display |
| `h3` | `clamp(1.5rem, 1.15rem + 1.4vw, 2.25rem)` | 1.15 | -0.015em | 500 | Display |
| `h4` | `1.25rem` | 1.3 | -0.01em | 600 | Body |
| `body-l` | `1.125rem` | 1.6 | 0 | 400 | Body |
| `body` | `1rem` | 1.65 | 0 | 400 | Body |
| `body-s` | `0.875rem` | 1.55 | 0 | 400 | Body |
| `label` | `0.75rem` | 1.4 | **0.08em** | 500 | **Mono**, uppercase |
| `metric` | `clamp(2.25rem, 1.5rem + 3vw, 4rem)` | 1.0 | -0.02em | 500 | **Mono**, `tabular-nums` |
| `code` | `0.875rem` | 1.5 | 0 | 400 | Mono |

### 3.3 Rules

- Body copy max width **68ch**. Headline max width **18ch** (display) / **24ch** (h2–h3).
- Never center a paragraph longer than two lines.
- Section eyebrows are always `label` mono uppercase in `--accent-text`, prefixed with a two-digit index where the section is part of a numbered sequence (`01 / DISCOVER`).
- Numbers in metrics, prices, timelines, and node counts use `metric` with `tabular-nums`. Never let a counter animation reflow.

---

## 4. Space, grid, shape

### 4.1 Spacing scale

4px base. Tokens: `1=4 · 2=8 · 3=12 · 4=16 · 5=20 · 6=24 · 8=32 · 10=40 · 12=48 · 16=64 · 20=80 · 24=96 · 32=128 · 40=160`

Vertical section padding: `--section-y: clamp(5rem, 3rem + 7vw, 10rem)`
Compact sections (proof bar, marquee): `clamp(2.5rem, 2rem + 2vw, 4rem)`

### 4.2 Container & grid

```
--container:    1280px   /* outer max */
--content:      1120px   /* text/card content max */
--measure:      68ch     /* prose */
--gutter:       clamp(1.25rem, 0.75rem + 2.5vw, 3rem)
```

12 columns ≥1024px · 6 columns 640–1023px · 4 columns <640px. Gutter 24px desktop, 16px mobile.

Full-bleed is reserved for: hero, marquees, the process scroll scene, and dark↔light transition bands.

### 4.3 Radius & shape

| Token | Value | Use |
|---|---|---|
| `--r-none` | `0` | Section bands, marquee items, table cells |
| `--r-sm` | `6px` | Inputs, badges, small chips |
| `--r-md` | `10px` | Buttons |
| `--r-lg` | `16px` | Cards, panels |
| `--r-xl` | `24px` | Hero media, feature cards, the agent demo shell |
| `--r-full` | `999px` | Pills, avatars, icon buttons |

Restraint rule: at most **two** radii visible in one section.

### 4.4 Elevation

**On dark, do not use drop shadows** — they're invisible and just cost paint time. Depth comes from:
1. Surface step (`--d-bg` → `--d-surface` → `--d-surface-2`)
2. A 1px `--d-border` or `--d-border-soft`
3. Optionally a `1px` top inset highlight: `inset 0 1px 0 rgba(245,244,242,0.06)`

**On light**, two shadow levels only:
- `--shadow-1: 0 1px 2px rgba(18,18,18,0.04), 0 4px 12px rgba(18,18,18,0.05)`
- `--shadow-2: 0 2px 4px rgba(18,18,18,0.05), 0 12px 32px rgba(18,18,18,0.08)`

Amber glow (`0 0 40px var(--accent-wash)`) is permitted on **at most one element per viewport** — the active process node or the primary CTA. It is a focal device, not a style.

---

## 5. Motion tokens

Full doctrine in [motion-system.md](motion-system.md). Tokens live here so they're versioned with the rest.

```css
--dur-instant: 120ms;   --dur-fast: 200ms;    --dur-base: 320ms;
--dur-slow:    520ms;   --dur-scene: 800ms;

--ease-out:    cubic-bezier(0.16, 1, 0.30, 1);    /* default — the "expensive" curve */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);    /* symmetric moves, theme shifts */
--ease-soft:   cubic-bezier(0.33, 1, 0.68, 1);    /* hover, micro */

--stagger: 60ms;        /* between siblings in a reveal group */
--reveal-y: 24px;       /* fade-up travel — never more than 32px */
```

---

## 6. Components

Every component ships in both themes and consumes only neutral aliases.

### 6.1 Button

| Variant | Dark | Light |
|---|---|---|
| **Primary** | `--accent` fill, `--accent-on` label | `--accent` fill, `--accent-on` label |
| **Secondary** | transparent, `--d-border` 1px, `--d-text` label | `--l-surface` fill, `--l-border` 1px, `--l-text` label |
| **Ghost** | text + arrow, underline on hover | same |
| **Link/arrow** | `--accent-text` label + `→` that translates `4px` on hover | same |

Sizes: `sm 36px` · `md 44px` · `lg 52px`. Horizontal padding = 1.5× vertical. Label is Body 500, `0.9375rem`.
Primary CTA is `lg` and appears **once per viewport**. Two competing primaries is the fastest way to look like a template.

Focus ring, all interactive elements: `outline: 2px solid var(--accent); outline-offset: 2px`. Never removed.

### 6.2 Card

Base: `--surface` bg, 1px `--border`, `--r-lg`, padding `--space-8`.
Hover (pointer devices only): border → `--accent-line`, background → `--d-surface-2`, `translateY(-2px)`, `--dur-fast --ease-soft`. No scale, no tilt, no shadow bloom.

Variants: `service` (large, holds a visual), `case-study` (media + metric row), `insight` (blog), `stat`, `faq` (accordion), `industry` (compact, icon + label), `integration` (logo tile).

### 6.3 Badge / eyebrow

Mono `label`, uppercase, `--accent-text`. Optional `--accent-wash` pill with `--accent-line` border, `--r-full`, padding `6px 12px`.

### 6.4 Section heading block

```
[eyebrow — mono label, accent]
[h2 — display, max 18ch]
[body-l — --text-2, max 60ch]        (optional)
[link/arrow CTA]                      (optional)
```
Left-aligned by default. Centered only for closing CTA and FAQ sections.

### 6.5 Nav

Reference: agero. Sticky, `72px` tall, transparent over hero → on scroll past `80px` it gains `rgba(10,10,11,0.72)` + `backdrop-filter: blur(12px)` + bottom hairline, over `--dur-base`.
Structure: `Anvio` wordmark · Services (mega-menu: Build / Automate / Grow, three columns with descriptions) · Products · Case Studies · About · Blog · `[Book a call]` primary button.
Mobile: full-screen overlay, sections stagger in at `--stagger`, body scroll locked.
Nav must render server-side and be usable before hydration.

### 6.6 Footer

Four link columns (Services / Company / Resources / Legal) + oversized `ANVIO` wordmark as a graphic band + contact block + socials. Dark, always. Include the Automate/Build/Grow leaf links here — it's real internal-linking equity, see [seo-strategy.md](seo-strategy.md) §5.

### 6.7 Form / input

`44px` min height, `--r-sm`, 1px `--border`, `--surface` bg. Focus: `--accent-line` border + `--accent-wash` 3px halo. Labels above, mono `label` style. Errors inline below in `--error`, never as a toast, never color-only — always with an icon and text.

### 6.8 Other

`Accordion` (FAQ, height-animated with `grid-template-rows: 0fr → 1fr`), `Marquee` (integration logos, CSS-only), `Testimonial`, `Stat block`, `Node` (workflow graph atom), `Tab bar`, `Breadcrumb` (service leaf pages only).

---

## 7. Iconography & visual language

- Line icons, **1.5px stroke**, 24px grid, rounded caps. Lucide as the base set, custom only where Lucide has no equivalent.
- Icons are `--text-2` by default, `--accent-text` when active or when they *are* the visual subject.
- **No emoji anywhere in the UI.** (Your `design_direction.md` already rejected 🤖💻📈 — enforcing it here.)

Per-pillar visual language, per `design_direction.md`:

| Pillar | Language | Concrete devices |
|---|---|---|
| **Build** | architecture, grids | Browser chrome frames, wireframe-to-render transitions, component grids assembling |
| **Automate** | workflows, nodes | Directed node graphs, connector paths with traveling pulses, agent message streams |
| **Grow** | analytics, ascent | Line/area charts drawing in, ranking positions climbing, dashboard tiles counting up |

All three share the same node/frame/line vocabulary — same stroke weight, same radii, same amber for "active." That's what keeps them one brand instead of three.

---

## 8. Responsive

**Mobile-first is a build order, not just a media query.** Author the small layout, then add breakpoints upward. Roughly half of SMB decision-makers in India will first see this site on a phone, often from a WhatsApp link.

### Breakpoints

| Name | Range | Grid | Notes |
|---|---|---|---|
| `sm` | < 640px | 4 col | Single column. Buttons full-width. Nav → overlay |
| `md` | 640–1023px | 6 col | Two-up cards. Still no scroll-pinning |
| `lg` | 1024–1279px | 12 col | Full layout. Pinning enabled |
| `xl` | ≥ 1280px | 12 col | Container caps at 1280 — the layout stops growing, whitespace absorbs the rest |

### Per-component behaviour

| Component | < 1024px | < 720px |
|---|---|---|
| Nav | Full-screen overlay, staggered links, scroll locked | — |
| Pillar cards | Stack 1-up | Micro-visuals autoplay in view instead of on hover |
| Agent demo | Chat and plan diagram stack vertically | Presets wrap; plan renders below the transcript |
| Process (Tier 1) | **Unpins → `stickyStack`** | Plain vertical list |
| Workflow graph | Horizontal scroll within its own container | Nodes stack vertically, connectors rotate 90° |
| Contrast tables | `overflow-x: auto` on a wrapper | Consider stacked label/value pairs |
| Featured work | 1-up | — |
| Stat row | 2-up | 1-up |
| Footer | 2 columns | 2 columns |

### Rules

- **The page body never scrolls horizontally.** Wide content (tables, graphs, code) scrolls inside its own `overflow-x: auto` container.
- Touch targets ≥ 44×44px, with ≥ 8px between adjacent targets.
- Type is fluid via `clamp()` — no per-breakpoint font-size overrides.
- Test at **375 / 768 / 1280 / 1920**, and on a real mid-range Android, not just a desktop devtools emulator. The pinned scene and `backdrop-filter` are where cheap devices fall over.
- Hover-only affordances always have a tap or in-view equivalent. Never hide information behind `:hover`.
- `100vh` on mobile is a trap (browser chrome) — use `100dvh`.
- Images: `next/image` with correct `sizes`; art-direct the hero if the desktop crop doesn't work at 375px.

---

## 9. Accessibility floor

- Body text ≥ 4.5:1, large text ≥ 3:1 — the §2.3 table is the source of truth.
- Never encode meaning in color alone (active nodes get a label or a shape change too).
- Full keyboard operation, visible focus, logical tab order, skip-to-content link.
- One `<h1>` per page; heading levels never skip.
- All decorative motion honours `prefers-reduced-motion`. All auto-playing motion (marquees, node cascades) stops.
- Hit targets ≥ 44×44px.
- Every interactive graphic (process scene, agent demo, workflow graph) has an accessible text equivalent in the DOM.

---

## 10. Implementation

**Stack:** Next.js (App Router) · TypeScript · Tailwind v4 · Motion (framer-motion) · Lenis · MDX for content (migrate to Sanity/Payload when a writer joins) · Vercel · Plausible + GA4.

Tokens are defined once as CSS custom properties in `app/styles/tokens.css` and exposed to Tailwind via `@theme`. **Tailwind arbitrary values (`text-[#FF9130]`, `p-[37px]`) are a code-review rejection.** If a value isn't in this document, it doesn't go in the codebase — that's the only thing that keeps 25 pages consistent.

See [section-library.md](section-library.md) for how these components compose into pages.
