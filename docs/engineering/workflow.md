# Anvio — Workflow & Change Tracking

**Status:** v1
**Purpose:** every change is traceable to a reason, and every decision to a document.

---

## 1. Four places a change gets recorded

Each answers a different question. None substitutes for another.

| Artifact | Answers | Written |
|---|---|---|
| **Commit message** | What changed, and why *this* change | Every commit |
| **Pull request** | What this batch of work does, and how it was verified | Every PR |
| **`CHANGELOG.md`** | What a user or stakeholder would notice | Every user-visible change |
| **[ADR](adr/)** | Why the architecture is the way it is | Every significant technical decision |

The commonest failure is stopping at commits. Six months on, "why is content behind an adapter?" is unanswerable from `git log` — that's what ADRs exist for.

---

## 2. Git

**Repository:** `git init` at the project root. `main` is protected — no direct pushes, PR + green CI required.

**Branches:** `<type>/<short-description>` — `feat/agent-demo-backend`, `fix/nav-blur-safari`, `docs/seo-strategy`, `chore/upgrade-next`.

One branch, one concern. A branch touching the hero *and* the CI config is two PRs.

**Commits — Conventional Commits, enforced by commitlint:**

```
<type>(<scope>): <subject>

<body — the why, wrapped at 72>

<footer — Closes #12 / BREAKING CHANGE:>
```

Types: `feat` · `fix` · `docs` · `style` · `refactor` · `perf` · `test` · `build` · `ci` · `chore` · `revert`
Scopes: `home` · `automate` · `sections` · `motion` · `agent` · `seo` · `db` · `ui` · `content` · `deps`

```
feat(agent): stream conversational turns from the plan generation call

Streaming a schema-constrained response means parsing partial JSON,
which made the diagram flicker and occasionally render half a node.
Split into two calls: streamed text for the Q&A turns, one structured
call for the plan. The client animates from the finished object, so
the build-as-it-thinks effect is now deterministic.

Closes #34
```

The subject says what; the body says why. If the why is obvious, no body. If it isn't, a body is required — that paragraph is the most valuable thing in the commit.

**Rules:** commit working code (broken commits break `bisect`) · never commit secrets or `.env` · never force-push a shared branch · rebase your own branch onto `main`, merge PRs with squash so `main` reads as one entry per PR.

---

## 3. Pull requests

Template (`.github/PULL_REQUEST_TEMPLATE.md`):

```markdown
## What
One or two sentences.

## Why
The problem, or the decision this implements. Link the spec/ADR/issue.

## How
Notable implementation choices a reviewer wouldn't guess.

## Verification
- [ ] `pnpm verify` passes
- [ ] Both themes checked (if visual)
- [ ] 375 / 768 / 1280 / 1920
- [ ] Reduced-motion + mobile degradation
- [ ] Keyboard + visible focus
- [ ] Lighthouse ≥ budget on the preview URL
- [ ] Route within JS budget

## Screenshots / recording
Before and after, both themes.

## Docs
- [ ] Docs updated, or: not needed because…
- [ ] CHANGELOG entry, or: not user-visible
- [ ] ADR written, or: no architectural decision
```

Keep PRs under ~400 changed lines where you can. Large PRs get rubber-stamped, which is the same as not reviewing them. Every PR gets a Vercel preview — review the preview, not just the diff.

---

## 4. CHANGELOG

`CHANGELOG.md` at the root, [Keep a Changelog](https://keepachangelog.com) format, newest first. Written for a human deciding whether they care — not a `git log` dump.

```markdown
## [Unreleased]
### Added
- Automate page: live workflow graph showing a WhatsApp → CRM automation

## [0.2.0] — 2026-09-14
### Added
- Home page: scroll-pinned process scene (desktop), sticky-stack below 1024px
### Changed
- Accent on light surfaces is now #9A4D06 — #FF9130 failed contrast at 2.15:1
### Fixed
- Nav backdrop blur no longer flickers on Safari during momentum scroll
```

Update it in the same PR as the change. A CHANGELOG updated at release time is fiction.

---

## 5. ADRs

An Architecture Decision Record captures a decision that was **not obvious** and would be **expensive to reverse**.

**Write one when:** picking between real alternatives (MDX vs CMS, monorepo vs single app), setting a constraint others must follow (the motion budget, the no-arbitrary-values rule), reversing an earlier decision, or making a call with a non-obvious tradeoff.

**Don't write one for:** which library formats dates, naming preferences, or anything a comment covers.

Format, numbering, and the four already written are in [adr/README.md](adr/README.md). ADRs are **immutable** — a decision that changes gets a new ADR that supersedes the old one. The old one stays, marked Superseded. The record of what you used to believe is the point.

---

## 6. Environments

| Environment | Branch | URL | Data |
|---|---|---|---|
| Local | any | `localhost:3000` | Local `.env`, dev Neon branch |
| Preview | every PR | auto Vercel URL | Preview Neon branch, **`noindex`** |
| Production | `main` | anvio.online | Production |

**Preview deploys must send `X-Robots-Tag: noindex`.** An indexed preview URL competing with production is a self-inflicted SEO wound that's tedious to undo.

Database changes: generate the migration locally → commit it → apply to preview → verify → merge → apply to production. Never `drizzle-kit push` against production.

---

## 7. Releases

Tagged from `main`, semver-ish for a website:

- **patch** — fixes, copy edits, content
- **minor** — a new section, a new page, a new capability
- **major** — a redesign or a breaking structural change

`git tag -a v0.2.0 -m "Home page complete"` → push tags → CHANGELOG heading gets the version and date.

---

## 8. Dependencies

Dependabot weekly, grouped: patch + minor auto-merge on green CI; major opens a PR for a human. Next.js and React majors are their own PR with a full regression pass.

Before adding a dependency: is it a few lines we could own? Is it maintained? What does it cost the bundle (`size-limit` will tell you)? Every dependency is a future migration.

---

## 9. Definition of ready

Before starting work on a section or page:

- [ ] The spec exists in `docs/specs/`
- [ ] Copy is drafted (placeholder copy produces placeholder layouts)
- [ ] Design tokens cover it — no new colours or sizes needed
- [ ] Its motion tier is assigned and within the page budget
- [ ] Content dependencies exist (a case study section needs case studies)
- [ ] The open items it depends on are answered

If any box is unchecked, that's the work — not the implementation.

---

## 10. Rollback

If production breaks: **revert first, diagnose second.** Vercel's instant rollback is one click; use it. Then `git revert` the merge commit on `main`, open a fix PR, and add a regression test. A revert is not a failure — it's the cheapest possible outcome.
