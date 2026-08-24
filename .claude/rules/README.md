# `.claude/rules/` — modular conventions

Short, imperative rule files. `CLAUDE.md` links here rather than restating, so a rule is written once and changed in one place.

**These are rules, not documentation.** Each file says what to do and what fails. The reasoning lives in `docs/` and each rule links to it.

---

## Load order

| Rule                                             | Load when                                    | Applies to                                    |
| ------------------------------------------------ | -------------------------------------------- | --------------------------------------------- |
| [evidence-and-claims.md](evidence-and-claims.md) | **Always**                                   | Everything. Code, copy, email, proposal, plan |
| [strategy-audit.md](strategy-audit.md)           | Before presenting any plan or recommendation | Business + engineering plans                  |
| [agent-outputs.md](agent-outputs.md)             | Before an agent writes a file                | All `.claude/agents/` output                  |
| [code-style.md](code-style.md)                   | Writing TypeScript or React                  | `apps/web/src/**`                             |
| [styling.md](styling.md)                         | Writing any `className`                      | `apps/web/src/**`                             |
| [sections.md](sections.md)                       | Touching `sections/` or a page composition   | `apps/web/src/sections/**`, `app/**`          |
| [seo-and-a11y.md](seo-and-a11y.md)               | Any user-facing page change                  | `apps/web/src/**`                             |
| [content-authoring.md](content-authoring.md)     | Writing MDX                                  | `apps/web/content/**`                         |
| [git-and-docs.md](git-and-docs.md)               | Committing, or changing a decision           | Everything                                    |

---

## Adding a rule

A new file here needs: a real failure it prevents, a link to the `docs/` page that reasons about it, and a row in the table above. If it's a decision rather than a rule, it's an ADR — see [git-and-docs.md](git-and-docs.md).
