# Intent Architect Authority Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clarify that the Intent Architect has final authority on intent promotion, with team voting as advisory.

**Architecture:** Three targeted edits to two existing docs in the manifesto site worktree. No new files, no structural changes.

**Tech Stack:** Docusaurus MDX content files

**Design Spec:** `docs/superpowers/specs/2026-03-27-intent-architect-authority-design.md`

---

### Task 1: Update Intent Architect role description

Can be done in parallel with Task 2.

**Files:**
- Modify: `.worktrees/idd-manifesto-site/website/docs/playbook/roles.mdx:13`

**Step 1: Edit the Intent Architect table row**

Replace:
```
| **Intent Architect** | Defining what to build and why. Writes intent docs. Owns the "what" and "why." Holds strategic context. | Writing code. Managing timelines. Approving PRs for code correctness. |
```

With:
```
| **Intent Architect** | Defining what to build and why. Writes intent docs. Owns the "what" and "why." Holds strategic context. Has final authority on which intents are promoted. May designate a delegate when unavailable. | Writing code. Managing timelines. Approving PRs for code correctness. |
```

**Step 2: Commit**

```bash
git add website/docs/playbook/roles.mdx
git commit -m "docs(roles): clarify Intent Architect has final authority on intent promotion"
```

---

### Task 2: Reframe voting as advisory and update anti-patterns

Can be done in parallel with Task 1.

**Files:**
- Modify: `.worktrees/idd-manifesto-site/website/docs/framework/intent-discovery.mdx:22,26-28,43`

**Step 1: Update the intro paragraph**

On line 22, replace:
```
Anyone on the team can propose an intent at any time. Proposals are cheap — a few sentences, not a full intent document. The team then decides together what gets promoted into the active queue.
```

With:
```
Anyone on the team can propose an intent at any time. Proposals are cheap — a few sentences, not a full intent document. The team votes to surface concerns and signal support, but the Intent Architect makes the final call on what gets promoted.
```

**Step 2: Update Step 2 (Vote)**

On line 26, replace:
```
**Step 2: Vote.** At Intent Review (twice weekly), the team reviews open proposals. Each person gets a simple yes/no/abstain on each proposal. Majority wins. Discussion is timeboxed: 5 minutes per proposal maximum. If it can't be resolved in 5 minutes, it needs more thinking — send it back for a sharper proposal.
```

With:
```
**Step 2: Vote.** At Intent Review (twice weekly), the team reviews open proposals. Each person gets a simple yes/no/abstain on each proposal. Discussion is timeboxed: 5 minutes per proposal maximum. If it can't be resolved in 5 minutes, it needs more thinking — send it back for a sharper proposal. The vote is advisory — it surfaces concerns and signals support, but doesn't decide.
```

**Step 3: Update Step 3 (Promote)**

On line 28, replace:
```
**Step 3: Promote.** Approved proposals get assigned an author who writes the full intent document using the template. The author doesn't have to be the proposer — it should be whoever has the most context on the problem.
```

With:
```
**Step 3: Promote.** The Intent Architect makes the final call on which proposals are promoted, informed by the team's vote and discussion. Approved proposals get assigned an author who writes the full intent document using the template. The author doesn't have to be the proposer — it should be whoever has the most context on the problem.
```

**Step 4: Update anti-patterns**

On line 43, replace:
```
- **Phantom consensus:** Everyone votes yes on everything. Introduce a budget: each person can only approve N intents per review cycle.
```

With:
```
- **Phantom consensus:** Everyone votes yes on everything. The Intent Architect should treat unanimous agreement with the same scrutiny as disagreement — ask what's being overlooked.
- **Absent authority:** The Intent Architect is unavailable and no delegate is designated. Work stalls. Always have a delegate named before going on leave.
```

**Step 5: Commit**

```bash
git add website/docs/framework/intent-discovery.mdx
git commit -m "docs(framework): reframe intent voting as advisory to Intent Architect"
```

---

### Task 3: Verify site builds

Depends on Task 1 and Task 2.

**Step 1: Run the Docusaurus build**

```bash
cd .worktrees/idd-manifesto-site/website && npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Commit (if any fixes needed)**

Only if the build revealed issues.
