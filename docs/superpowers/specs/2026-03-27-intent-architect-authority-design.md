# Intent Architect Authority — Design Spec

**Date:** 2026-03-27
**Status:** Approved

## Problem

The current framework gives the Intent Architect ownership of "what" and "why," but then uses majority voting to decide which intents are promoted. This contradicts itself — the person who owns product direction can be outvoted. In teams of 10+, this leads to unfocused product development where everything gets approved and no one owns coherence.

## Design

### Principle

The Intent Architect has final authority on intent promotion. Team voting is advisory — it surfaces concerns and signals support, but the Intent Architect makes the call.

### Changes

**1. Roles doc — Intent Architect description**

Add to core responsibility: "Has final authority on which intents are promoted. May designate a delegate when unavailable."

**2. Intent Discovery — Step 2 (Vote)**

Reframe from "Majority wins" to advisory. The vote surfaces concerns and signals support, but doesn't decide. Timeboxing and mechanics stay the same.

**3. Intent Discovery — Step 3 (Promote)**

Make explicit that the Intent Architect makes the final call, informed by the team's vote and discussion.

**4. Anti-patterns**

Update "Phantom consensus" to reflect the new model — unanimous agreement should be scrutinized, not celebrated.

Add "Absent authority" anti-pattern: Intent Architect unavailable with no delegate designated causes work to stall.

### What doesn't change

- Anyone can still propose intents (low friction ideation stays)
- The vote still happens (team input is valuable)
- Intent Review cadence stays the same (2x/week)
- The three role archetypes remain unchanged
- The core loop is unaffected

## Rationale

- Mirrors how real organizations work — someone always has final say (PO, CPO, COO, founder)
- IDD shouldn't prescribe what to call this person, just require that the Intent Architect role carries this authority
- Delegation prevents the Intent Architect from becoming a bottleneck
- Keeping the vote as advisory preserves team engagement without diluting ownership
