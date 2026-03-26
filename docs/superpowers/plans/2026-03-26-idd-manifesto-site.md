# IDD Manifesto Docs Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Docusaurus 3 docs site for the IDD manifesto with an interactive JSX landing page and long-form content pages.

**Architecture:** Docusaurus 3 in a `website/` subdirectory. Landing page is a custom React page wrapping the interactive IDDFramework component. Content pages are MDX files organized by manifesto sections. Dark theme default with custom color palette.

**Tech Stack:** Docusaurus 3, React 18, TypeScript, MDX

**Design Spec:** `docs/superpowers/specs/2026-03-26-idd-manifesto-site-design.md`

---

## Execution Groups

```
Group 1 (sequential):  Task 1 — Scaffold
Group 2 (parallel):    Task 2, 3 — Theme/landing + Sidebar
Group 3 (parallel):    Task 4, 5, 6, 7 — All content pages
Group 4 (sequential):  Task 8 — Build verification
```

---

### Task 1: Scaffold Docusaurus Project

**Blocks:** All other tasks

**Step 1: Create Docusaurus project**

Run:
```bash
cd /home/mattiasthalen/repos/intent-driven-development
npx create-docusaurus@latest website classic --typescript
```

Expected: `website/` directory created with Docusaurus boilerplate.

**Step 2: Verify it builds**

Run:
```bash
cd website && npm run build
```

Expected: Build succeeds, output in `website/build/`.

**Step 3: Clean up boilerplate**

Remove default blog and tutorial content that ships with the classic template:
- Delete `website/blog/` directory
- Delete all files in `website/docs/` (we'll create our own)
- Delete `website/src/components/HomepageFeatures/` (replaced by our component)
- Delete `website/src/pages/index.tsx` (we'll rewrite it)
- Delete `website/src/pages/index.module.css`

**Step 4: Configure for GitHub Pages**

Modify `website/docusaurus.config.ts`:
- Set `url` to `https://mattiasthalen.github.io`
- Set `baseUrl` to `/intent-driven-development/`
- Set `organizationName` to `mattiasthalen`
- Set `projectName` to `intent-driven-development`
- Set `trailingSlash` to `false`
- Remove the `blog` plugin from presets (set `blog: false`)
- Set navbar title to `Intent-Driven Development`
- Set navbar items: link to `/docs/manifesto` labeled "Manifesto", link to `/docs/framework/core-loop` labeled "Framework", link to `/docs/playbook/roles` labeled "Playbook", link to `/docs/adoption-guide` labeled "Adoption", GitHub link to `https://github.com/mattiasthalen/intent-driven-development`
- Set footer: style `dark`, copyright `Intent-Driven Development Framework v1.0 — For AI-native teams`
- Set `colorMode.defaultMode` to `dark`
- Set `colorMode.respectPrefersColorScheme` to `true`

**Step 5: Commit**

```bash
git add website/
git commit -m "feat(website): scaffold Docusaurus project

Set up Docusaurus 3 with TypeScript, configured for GitHub Pages,
removed boilerplate content."
```

---

### Task 2: Theme, Custom CSS, and Landing Page

**Blocked by:** Task 1
**Files:**
- Create: `website/src/css/custom.css`
- Create: `website/src/components/IDDFramework.tsx`
- Create: `website/src/pages/index.tsx`

**Step 1: Write custom CSS**

Create `website/src/css/custom.css` with:

```css
:root {
  --ifm-color-primary: #E94560;
  --ifm-color-primary-dark: #d6304d;
  --ifm-color-primary-darker: #c92843;
  --ifm-color-primary-darkest: #a52137;
  --ifm-color-primary-light: #ec5e75;
  --ifm-color-primary-lighter: #ee6b80;
  --ifm-color-primary-lightest: #f3919f;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(233, 69, 96, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #E94560;
  --ifm-color-primary-dark: #d6304d;
  --ifm-color-primary-darker: #c92843;
  --ifm-color-primary-darkest: #a52137;
  --ifm-color-primary-light: #ec5e75;
  --ifm-color-primary-lighter: #ee6b80;
  --ifm-color-primary-lightest: #f3919f;
  --ifm-background-color: #0D0D1A;
  --ifm-background-surface-color: #131325;
  --ifm-navbar-background-color: #0D0D1A;
  --ifm-footer-background-color: #0D0D1A;
}

/* Landing page fills viewport without Docusaurus chrome */
.landing-page {
  background: #0D0D1A;
}
```

**Step 2: Create IDDFramework component**

Create `website/src/components/IDDFramework.tsx` — port the JSX component from the conversation. Changes from the original:
- Convert to TypeScript (add types for `phases`, `metrics`, state)
- Add `React.CSSProperties` types to inline styles
- Keep all content, colors, and interactivity identical
- Export as default

The component content is defined in the design spec's source conversation. Port it verbatim, only adding TypeScript types.

Here is the full component:

```tsx
import React, { useState } from "react";

interface Phase {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  color: string;
  details: string[];
  role: string;
}

interface Metric {
  name: string;
  desc: string;
  good: string;
}

const phases: Phase[] = [
  {
    id: "intend",
    num: "01",
    title: "INTENT",
    subtitle: "Define what should exist",
    color: "#E94560",
    details: [
      "Write an Intent Document",
      "Desired outcome, not implementation",
      "Acceptance criteria = definition of done",
      "Explicit non-goals prevent drift",
    ],
    role: "Intent Architect",
  },
  {
    id: "generate",
    num: "02",
    title: "GENERATE",
    subtitle: "AI produces candidates",
    color: "#0F3460",
    details: [
      "Feed full context to AI",
      "Request multiple options when uncertain",
      "Don't over-constrain — let AI surprise you",
      "TDD: AI writes tests first, then code",
    ],
    role: "AI Agent",
  },
  {
    id: "evaluate",
    num: "03",
    title: "EVALUATE",
    subtitle: "Human judges the output",
    color: "#F5A623",
    details: [
      "Correctness: meets acceptance criteria?",
      "Taste: feels right for users?",
      "Simplicity: simplest thing that works?",
      "Coherence: fits existing patterns?",
    ],
    role: "Taste Keeper",
  },
  {
    id: "decide",
    num: "04",
    title: "DECIDE",
    subtitle: "Accept, redirect, or rethink",
    color: "#2ECC71",
    details: [
      "ACCEPT → ship it, merge, move on",
      "REDIRECT → right intent, wrong approach",
      "RETHINK → intent itself was flawed",
      "PARK → timing is wrong, shelve it",
    ],
    role: "Team",
  },
  {
    id: "learn",
    num: "05",
    title: "LEARN",
    subtitle: "Update shared context",
    color: "#9B59B6",
    details: [
      "Update CLAUDE.md with new patterns",
      "Add regression tests from failures",
      "Refine intent template",
      "Capture taste decisions as principles",
    ],
    role: "Context Curator",
  },
];

const metrics: Metric[] = [
  { name: "Convergence Rate", desc: "Loops from INTENT → ACCEPT", good: "1–3" },
  { name: "Redirect Ratio", desc: "% redirected vs accepted", good: "20–40%" },
  { name: "Intent Clarity", desc: "Team rating of intent docs", good: "4.0+" },
  { name: "Context Freshness", desc: "Days since CLAUDE.md update", good: "< 7d" },
  { name: "Decision Latency", desc: "Evaluated → Decided", good: "< 4hr" },
];

export default function IDDFramework(): React.ReactElement {
  const [active, setActive] = useState<number | null>(null);
  const [view, setView] = useState<string>("loop");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D0D1A",
        color: "#E8E8ED",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "40px 24px",
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: 6,
            color: "#666",
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          Post-Scrum Operating System
        </div>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #E94560, #F5A623)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}
        >
          Intent-Driven Development
        </h1>
        <p style={{ color: "#888", fontSize: 14, margin: 0 }}>
          For AI-native teams building developer tools
        </p>
      </div>

      {/* View Toggle */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        {[
          { id: "discovery", label: "Discovery" },
          { id: "loop", label: "The Loop" },
          { id: "compare", label: "vs Scrum" },
          { id: "metrics", label: "Metrics" },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            style={{
              padding: "8px 20px",
              borderRadius: 24,
              border:
                view === v.id ? "1px solid #E94560" : "1px solid #333",
              background:
                view === v.id
                  ? "rgba(233,69,96,0.15)"
                  : "transparent",
              color: view === v.id ? "#E94560" : "#888",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* DISCOVERY VIEW */}
      {view === "discovery" && (
        <div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#E94560",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Intent Discovery
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#777",
              textAlign: "center",
              marginBottom: 28,
              lineHeight: 1.5,
            }}
          >
            Where intents come from, before they enter the loop
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "PROPOSE", desc: "Anyone, anytime", color: "#E94560" },
              {
                label: "VOTE",
                desc: "Team, at Intent Review",
                color: "#F5A623",
              },
              {
                label: "PROMOTE",
                desc: "Write full Intent Doc",
                color: "#2ECC71",
              },
            ].map((step, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div
                  style={{
                    padding: "14px 20px",
                    borderRadius: 10,
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}44`,
                    textAlign: "center",
                    minWidth: 140,
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: step.color,
                      marginBottom: 2,
                    }}
                  >
                    {step.label}
                  </div>
                  <div style={{ fontSize: 10, color: "#888" }}>
                    {step.desc}
                  </div>
                </div>
                {i < 2 && (
                  <span style={{ color: "#444", fontSize: 16 }}>→</span>
                )}
              </div>
            ))}
          </div>

          <h3
            style={{ fontSize: 14, fontWeight: 700, color: "#ccc", marginBottom: 12 }}
          >
            Signal Sources
          </h3>
          <div style={{ display: "grid", gap: 8, marginBottom: 28 }}>
            {[
              {
                source: "GitHub Issues",
                signal:
                  "Bug reports, feature requests, confusion signals",
                capture: "Tag with 'intent-candidate' label",
                icon: "🐙",
              },
              {
                source: "Dogfooding",
                signal:
                  "Internal friction — moments your own team fights the tool",
                capture: "Running 'papercuts' list",
                icon: "🐕",
              },
              {
                source: "Discussions / Discord",
                signal: "Recurring pain, workaround patterns",
                capture: "3+ people hit same wall → candidate",
                icon: "💬",
              },
              {
                source: "Pull Requests",
                signal:
                  "Contributors building the same workaround independently",
                capture: "Note repeated patterns in reviews",
                icon: "🔀",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid #222",
                  borderRadius: 10,
                  padding: "14px 16px",
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: 12,
                  alignItems: "start",
                }}
              >
                <div
                  style={{ fontSize: 20, textAlign: "center", paddingTop: 2 }}
                >
                  {s.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#ddd",
                      marginBottom: 2,
                    }}
                  >
                    {s.source}
                  </div>
                  <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>
                    {s.signal}
                  </div>
                  <div style={{ fontSize: 11, color: "#2ECC71" }}>
                    → {s.capture}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3
            style={{ fontSize: 14, fontWeight: 700, color: "#ccc", marginBottom: 12 }}
          >
            Anti-Patterns
          </h3>
          <div style={{ display: "grid", gap: 6 }}>
            {[
              [
                "Proposal hoarding",
                "One person submits 15/week. Cap at 3–5 per person per review.",
              ],
              [
                "Phantom consensus",
                "Everyone votes yes on everything. Add an approval budget.",
              ],
              [
                "Source tunnel vision",
                "Only watching GitHub, ignoring internal friction (or vice versa).",
              ],
              [
                "Voting without reading",
                "Proposals too long or cadence too fast. Simplify.",
              ],
            ].map(([name, fix], i) => (
              <div
                key={i}
                style={{
                  padding: "10px 14px",
                  background:
                    i % 2 === 0 ? "rgba(233,69,96,0.06)" : "transparent",
                  borderRadius: 8,
                  display: "flex",
                  gap: 8,
                  alignItems: "baseline",
                }}
              >
                <span style={{ color: "#E94560", fontSize: 12 }}>⚠</span>
                <div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#E94560",
                    }}
                  >
                    {name}:{" "}
                  </span>
                  <span style={{ fontSize: 12, color: "#888" }}>{fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* THE LOOP VIEW */}
      {view === "loop" && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 6,
              marginBottom: 32,
            }}
          >
            {phases.map((p, i) => (
              <div
                key={p.id}
                onClick={() => setActive(active === i ? null : i)}
                style={{
                  flex: 1,
                  cursor: "pointer",
                  borderRadius: 12,
                  padding: "20px 12px",
                  background:
                    active === i
                      ? `linear-gradient(180deg, ${p.color}22, ${p.color}11)`
                      : "rgba(255,255,255,0.03)",
                  border:
                    active === i
                      ? `1px solid ${p.color}66`
                      : "1px solid #222",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: p.color,
                    fontWeight: 700,
                    letterSpacing: 2,
                    marginBottom: 6,
                  }}
                >
                  {p.num}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: active === i ? p.color : "#ccc",
                    marginBottom: 4,
                    transition: "color 0.3s",
                  }}
                >
                  {p.title}
                </div>
                <div style={{ fontSize: 10, color: "#666", lineHeight: 1.3 }}>
                  {p.subtitle}
                </div>
                {i < phases.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      right: -9,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#444",
                      fontSize: 14,
                      zIndex: 2,
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              color: "#444",
              fontSize: 12,
              marginBottom: 32,
              position: "relative",
            }}
          >
            <div
              style={{
                borderBottom: "1px dashed #333",
                borderLeft: "1px dashed #333",
                borderRight: "1px dashed #333",
                borderRadius: "0 0 20px 20px",
                height: 24,
                margin: "0 40px",
              }}
            />
            <span
              style={{
                background: "#0D0D1A",
                padding: "0 12px",
                position: "relative",
                top: -2,
                color: "#666",
              }}
            >
              ↺ continuous loop — minutes to days
            </span>
          </div>

          {active !== null && (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${phases[active].color}33`,
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: phases[active].color,
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {phases[active].title}
                </h3>
                <span
                  style={{
                    fontSize: 11,
                    padding: "4px 12px",
                    borderRadius: 20,
                    background: `${phases[active].color}22`,
                    color: phases[active].color,
                    fontWeight: 600,
                  }}
                >
                  {phases[active].role}
                </span>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {phases[active].details.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 13,
                      color: "#bbb",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: phases[active].color,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      •
                    </span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === null && (
            <div
              style={{
                textAlign: "center",
                color: "#555",
                fontSize: 13,
                padding: 20,
              }}
            >
              ↑ Tap a phase to explore
            </div>
          )}
        </div>
      )}

      {/* VS SCRUM VIEW */}
      {view === "compare" && (
        <div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#E94560",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            What Changes
          </h2>
          {[
            [
              "Sprint Planning",
              "Intent Sessions",
              "From rationing capacity → sharpening specification",
            ],
            [
              "Story Points",
              "Acceptance Criteria",
              "From estimating effort → defining correctness",
            ],
            [
              "Daily Standup",
              "Async Decision Log",
              "From syncing status → recording judgment",
            ],
            [
              "Sprint Review",
              "Per-Change Evaluation",
              "From batched demos → continuous quality gates",
            ],
            [
              "Velocity",
              "Convergence Rate",
              "From output volume → speed to right answer",
            ],
            [
              "Backlog",
              "Intent Queue",
              "From dumping ground → curated priorities",
            ],
            [
              "Scrum Master",
              "Dissolved",
              "From process enforcer → team culture",
            ],
            [
              "Retrospective",
              "Framework Tuning",
              "From periodic reflection → continuous adaptation",
            ],
          ].map(([old, neu, why], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background:
                  i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                borderRadius: 8,
                marginBottom: 2,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#888",
                    textDecoration: "line-through",
                  }}
                >
                  {old}
                </div>
              </div>
              <div style={{ color: "#444", fontSize: 16 }}>→</div>
              <div>
                <div
                  style={{ fontSize: 13, color: "#2ECC71", fontWeight: 600 }}
                >
                  {neu}
                </div>
                <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>
                  {why}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* METRICS VIEW */}
      {view === "metrics" && (
        <div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#F5A623",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Metrics That Matter
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid #222",
                  borderRadius: 12,
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#ddd",
                      marginBottom: 2,
                    }}
                  >
                    {m.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#777" }}>{m.desc}</div>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#2ECC71",
                    background: "rgba(46,204,113,0.1)",
                    padding: "6px 14px",
                    borderRadius: 20,
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.good}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 24,
              padding: 16,
              background: "rgba(233,69,96,0.08)",
              borderRadius: 12,
              border: "1px solid rgba(233,69,96,0.2)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#E94560",
                marginBottom: 6,
              }}
            >
              What NOT to measure
            </div>
            <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
              Lines of code • Commits per day • Story points • Velocity •
              Sprint burndown • Number of PRs • Time spent coding — these
              measure activity, not progress toward the right answer.
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px solid #222",
          color: "#444",
          fontSize: 11,
        }}
      >
        Intent-Driven Development Framework v1.0 — For AI-native teams
      </div>
    </div>
  );
}
```

**Step 3: Create landing page**

Create `website/src/pages/index.tsx`:

```tsx
import React from "react";
import Layout from "@theme/Layout";
import IDDFramework from "../components/IDDFramework";

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Intent-Driven Development"
      description="A Post-Scrum Operating System for AI-Native Teams"
    >
      <IDDFramework />
    </Layout>
  );
}
```

**Step 4: Verify build**

Run:
```bash
cd website && npm run build
```

Expected: Build succeeds with custom landing page.

**Step 5: Commit**

```bash
git add website/src/
git commit -m "feat(website): add interactive landing page and theme

Port IDDFramework JSX component to TypeScript, create landing page,
configure dark theme with IDD color palette."
```

---

### Task 3: Sidebar Configuration

**Blocked by:** Task 1

**Step 1: Create sidebar config**

Modify `website/sidebars.ts`:

```ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    "manifesto",
    {
      type: "category",
      label: "Framework",
      link: { type: "generated-index", title: "The Framework" },
      items: ["framework/intent-discovery", "framework/core-loop", "framework/phase-details"],
    },
    {
      type: "category",
      label: "Playbook",
      link: { type: "generated-index", title: "The Playbook" },
      items: ["playbook/roles", "playbook/rituals", "playbook/artifacts", "playbook/metrics"],
    },
    "adoption-guide",
    "appendix",
  ],
};

export default sidebars;
```

**Step 2: Create category metadata files**

Create `website/docs/framework/_category_.json`:
```json
{
  "label": "Framework",
  "position": 2
}
```

Create `website/docs/playbook/_category_.json`:
```json
{
  "label": "Playbook",
  "position": 3
}
```

**Step 3: Commit**

```bash
git add website/sidebars.ts website/docs/
git commit -m "feat(website): configure sidebar navigation

Add sidebar config with manifesto, framework, playbook sections,
adoption guide, and appendix."
```

---

### Task 4: Manifesto Page (Part I)

**Blocked by:** Task 1

**Files:**
- Create: `website/docs/manifesto.mdx`

**Step 1: Write manifesto.mdx**

Create `website/docs/manifesto.mdx` containing the full Part I content from the manifesto:
- Title: "The Manifesto"
- Sidebar position: 1
- Opening prose about the era of commodity code generation
- Core Beliefs (all 7, as numbered list with bold titles)
- "What We Leave Behind" table (Old World → Why It Existed → What Replaces It)

Use Docusaurus frontmatter:
```yaml
---
sidebar_position: 1
title: The Manifesto
description: Core beliefs of Intent-Driven Development
---
```

Full content from Part I of the manifesto, formatted as clean MDX with markdown tables.

**Step 2: Verify build**

Run:
```bash
cd website && npm run build
```

**Step 3: Commit**

```bash
git add website/docs/manifesto.mdx
git commit -m "docs(website): add manifesto page (Part I)

Core beliefs and what IDD replaces from traditional frameworks."
```

---

### Task 5: Framework Pages (Part II)

**Blocked by:** Task 1

**Files:**
- Create: `website/docs/framework/intent-discovery.mdx`
- Create: `website/docs/framework/core-loop.mdx`
- Create: `website/docs/framework/phase-details.mdx`

**Step 1: Write intent-discovery.mdx**

Frontmatter:
```yaml
---
sidebar_position: 1
title: Intent Discovery
description: How to find and promote intents worth acting on
---
```

Content from the "Intent Discovery: Feeding the Loop" section:
- Opening prose
- Sources table (GitHub Issues, Discussions/Discord, Dogfooding, Pull Requests)
- The Propose → Vote → Promote Flow (all 3 steps with descriptions)
- "What Makes a Good Proposal" bullet list
- "Anti-Patterns to Watch For" bullet list

**Step 2: Write core-loop.mdx**

Frontmatter:
```yaml
---
sidebar_position: 2
title: The Core Loop
description: The five-phase continuous loop that replaces sprints
---
```

Content from "The Core Loop" section:
- Opening prose about replacing sprints
- Overview of the 5 phases (Intent → Generate → Evaluate → Decide → Learn) as a table or styled list

**Step 3: Write phase-details.mdx**

Frontmatter:
```yaml
---
sidebar_position: 3
title: Phase Details
description: Deep dive into each phase of the IDD loop
---
```

Content from "Phase Details" section:
- Phase 1: Intent (what an Intent Document contains, what it is NOT)
- Phase 2: Generate (key practices list)
- Phase 3: Evaluate (evaluation dimensions table)
- Phase 4: Decide (decision vocabulary: ACCEPT, REDIRECT, RETHINK, PARK)
- Phase 5: Learn (update actions list)

**Step 4: Verify build**

Run:
```bash
cd website && npm run build
```

**Step 5: Commit**

```bash
git add website/docs/framework/
git commit -m "docs(website): add framework pages (Part II)

Intent Discovery, Core Loop overview, and Phase Details with all
five phases documented."
```

---

### Task 6: Playbook Pages (Part III)

**Blocked by:** Task 1

**Files:**
- Create: `website/docs/playbook/roles.mdx`
- Create: `website/docs/playbook/rituals.mdx`
- Create: `website/docs/playbook/artifacts.mdx`
- Create: `website/docs/playbook/metrics.mdx`

**Step 1: Write roles.mdx**

Frontmatter:
```yaml
---
sidebar_position: 1
title: Roles
description: The three archetypes that cover IDD responsibilities
---
```

Content: Opening prose about fluid roles, then the 3 archetypes table (Intent Architect, Taste Keeper, Context Curator) with Core Responsibility and Not Responsible For columns. Include team sizing guidance.

**Step 2: Write rituals.mdx**

Frontmatter:
```yaml
---
sidebar_position: 2
title: Rituals
description: Fewer, more purposeful rituals than Scrum
---
```

Content: Rituals table (Intent Review, Decision Digest, Taste Sync, Context Refresh, Direction Check) with Cadence, Purpose, and Output columns.

**Step 3: Write artifacts.mdx**

Frontmatter:
```yaml
---
sidebar_position: 3
title: Artifacts
description: Living documents that replace Jira boards and burndown charts
---
```

Content: Description of each artifact (Intent Queue, Decision Log, Context Files, Design Principles, Convergence Dashboard) with their purposes.

**Step 4: Write metrics.mdx**

Frontmatter:
```yaml
---
sidebar_position: 4
title: Metrics
description: Metrics that actually tell you something
---
```

Content: Metrics table (Convergence rate, Redirect ratio, Rethink ratio, Intent clarity score, Context freshness, Decision latency, Park decay) with What It Measures and Healthy Range columns. Include "What NOT to measure" callout.

**Step 5: Verify build**

Run:
```bash
cd website && npm run build
```

**Step 6: Commit**

```bash
git add website/docs/playbook/
git commit -m "docs(website): add playbook pages (Part III)

Roles, Rituals, Artifacts, and Metrics documentation."
```

---

### Task 7: Adoption Guide and Appendix (Part IV + Appendix)

**Blocked by:** Task 1

**Files:**
- Create: `website/docs/adoption-guide.mdx`
- Create: `website/docs/appendix.mdx`

**Step 1: Write adoption-guide.mdx**

Frontmatter:
```yaml
---
sidebar_position: 4
title: Adoption Guide
description: Week-by-week guide to adopting IDD
---
```

Content from Part IV:
- Week 1: Foundation (4 bullet points)
- Week 2: Practice (4 bullet points)
- Week 3: Calibrate (4 bullet points)
- Week 4: Own It (4 bullet points)

**Step 2: Write appendix.mdx**

Frontmatter:
```yaml
---
sidebar_position: 5
title: Appendix
description: Intent Document Template
---
```

Content from Appendix:
- Intent Document Template as a code block
- Closing quote: "The goal is not to write more code faster. The goal is to converge on the right thing faster."

**Step 3: Verify build**

Run:
```bash
cd website && npm run build
```

**Step 4: Commit**

```bash
git add website/docs/adoption-guide.mdx website/docs/appendix.mdx
git commit -m "docs(website): add adoption guide and appendix

Week-by-week adoption guide (Part IV) and Intent Document Template."
```

---

### Task 8: Full Build Verification

**Blocked by:** Tasks 2, 3, 4, 5, 6, 7

**Step 1: Full build**

Run:
```bash
cd website && npm run build
```

Expected: Clean build, no warnings or errors.

**Step 2: Verify locally**

Run:
```bash
cd website && npx docusaurus serve
```

Verify:
- Landing page loads with interactive component
- All 4 views work (Discovery, Loop, vs Scrum, Metrics)
- Sidebar navigation works
- All docs pages render correctly
- Dark theme is default
- Links between pages work

**Step 3: Final commit if any fixes needed**

Only if issues found during verification.
