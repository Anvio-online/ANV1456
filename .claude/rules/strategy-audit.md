# The strategy audit

**Run before presenting any plan, recommendation, roadmap, or proposal. Before — not after being challenged.**

This exists because a plan was once presented without it, and the pushback ("I hope whatever you plan is keeping our long term goal, our target customer, our services, our current situation in mind") was correct. Auditing surfaced three real errors that had already been missed.

---

## 1. The four tests

Test the plan against each, and **report where it fails, not only where it holds.**

| Test                  | Source                                                                 | Fails when                                                                                             |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Long-term goal**    | [positioning.md](../../docs/business/positioning.md) §5                | It doesn't build the content engine, ignores the India → UAE path, or makes Anvio read as a freelancer |
| **Target customer**   | [icp.md](../../docs/business/icp.md)                                   | It's aimed at enterprise, at technical buyers, or at nobody in particular                              |
| **Services**          | [services-and-pricing.md](../../docs/business/services-and-pricing.md) | It sells something outside Build / Automate / Grow, or prices below the floors                         |
| **Current situation** | [current-situation.md](../../docs/business/current-situation.md)       | It assumes proof, authority, or capacity that does not exist                                           |

---

## 2. The two traps this project sets repeatedly

Check these explicitly every time — they are the ones that actually recur.

**Capacity.** One person with a full-time job. A plan that only succeeds at 100% execution is a failed plan. **State a floor alongside the ambition** — the reduced version that still delivers value at ~40% completion. A rejected plan once scoped ~20,000 words of writing as if for a team.

**Proof.** The brand sells **Automate**; every verifiable delivered project is **Build**. Ask directly: _does this quietly assume automation proof, client names, or metrics we do not have?_ Cross-check against [evidence-and-claims.md](evidence-and-claims.md) §2.

---

## 3. Output format

Lead with what's wrong. Then the plan.

```markdown
## Strategy audit

**Long-term goal** — ✅ / ⚠️ / ❌ one line on where it lands
**Target customer** — …
**Services** — …
**Current situation** — …

**Capacity check:** ambition = X. Floor = Y (the version that still works at 40%).
**Proof check:** assumes nothing we can't evidence / assumes ⟨thing⟩, which we don't have.

### What's wrong with this plan

⟨The honest list. If it's empty, say why you're confident it's empty.⟩
```

A plan presented without this block is incomplete, regardless of quality.
