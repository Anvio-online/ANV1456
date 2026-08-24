---
description: Find drift between the docs and the shipped code, and report it as a fix list
---

Audit for drift between what `docs/` claims and what the code actually does. $ARGUMENTS

This project has caught real defects this way before — a `breadcrumbSchema` pointing at a 404, two service leaves linking to a page that was never built. Look for the same class of thing.

Check, at minimum:

1. **Every internal link resolves.** `nav.tsx`, `footer.tsx`, `sitemap.ts`, MDX `relatedLinks` frontmatter, and inline links in guide and leaf bodies, against the routes that actually exist under `apps/web/src/app/`. **Never link to an unbuilt page** — this is the rule that keeps getting broken.
2. **`docs/README.md`'s status table** against what's really built.
3. **`docs/business/services-and-pricing.md`** against the real tiers in `apps/web/src/app/(marketing)/services/build/page.tsx`. The page is canonical.
4. **`docs/engineering/repo-structure.md`** against the real directory tree — especially top-level directories, which are supposed to be a change to that document.
5. **Open items and gates** in `docs/README.md` — any that are silently resolved, or newly blocked.
6. **`.claude/rules/`** against the docs they condense — a rule that has drifted from its source is worse than no rule.

Report as a table: what drifted, where, which is correct, and the fix. **Don't fix anything yet** — show the list first, then ask what to fix.
