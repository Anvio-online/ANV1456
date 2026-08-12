# Anvio — Business Context

**Status:** v1 · **Audience:** humans and AI agents · **Purpose:** the factual base every business decision and every agent output is checked against.

`docs/Initial/Brand_strategy.md` is where this thinking started and stays as the record. **This directory supersedes it** as the living version, the same way `system/design-system.md` supersedes `Initial/design_direction.md`.

---

## The files

| File                                               | Answers                                                  | Changes when                                      |
| -------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------- |
| [positioning.md](positioning.md)                   | What Anvio is, what it refuses to be, the one-line claim | Positioning shifts — rare, and it's an ADR        |
| [icp.md](icp.md)                                   | Who we sell to, who we decline, the buying triggers      | We learn something from a real sales conversation |
| [services-and-pricing.md](services-and-pricing.md) | The three pillars, what's in each, real price floors     | A tier or price changes on the site               |
| [current-situation.md](current-situation.md)       | What is actually true today — proof, authority, capacity | Monthly, or when a constraint lifts               |
| [competitors.md](competitors.md)                   | Who we're compared against and how we differ             | A competitor scan runs                            |
| [voice-and-tone.md](voice-and-tone.md)             | How Anvio writes, in any channel                         | Rarely                                            |

---

## The rule that makes this useful

**Every agent in `.claude/agents/` reads from here and never invents around it.** If an agent needs a fact that isn't in these files, the correct output is _"this is unknown"_ — not a plausible guess. See [`.claude/rules/evidence-and-claims.md`](../../.claude/rules/evidence-and-claims.md).

**Every plan gets audited against four of these before it is presented** — the long-term goal ([positioning.md](positioning.md)), the target customer ([icp.md](icp.md)), the services ([services-and-pricing.md](services-and-pricing.md)), and the current situation ([current-situation.md](current-situation.md)). That audit is [`.claude/rules/strategy-audit.md`](../../.claude/rules/strategy-audit.md) and it runs _before_ presenting, not after being challenged.

---

## Where facts live when they're also in code

A price on the site is owned by the site. This directory restates a few such facts for agents that can't reasonably read a route file, and each one names the canonical source. **If a restatement disagrees with its source, the source wins and the restatement is a bug** — fix it in the same PR that changed the source.
