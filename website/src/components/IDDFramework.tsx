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
                view === v.id ? "rgba(233,69,96,0.15)" : "transparent",
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
              { label: "VOTE", desc: "Team, at Intent Review", color: "#F5A623" },
              { label: "PROMOTE", desc: "Write full Intent Doc", color: "#2ECC71" },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                  <div style={{ fontSize: 14, fontWeight: 800, color: step.color, marginBottom: 2 }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: 10, color: "#888" }}>{step.desc}</div>
                </div>
                {i < 2 && <span style={{ color: "#444", fontSize: 16 }}>{"\u2192"}</span>}
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#ccc", marginBottom: 12 }}>
            Signal Sources
          </h3>
          <div style={{ display: "grid", gap: 8, marginBottom: 28 }}>
            {[
              { source: "GitHub Issues", signal: "Bug reports, feature requests, confusion signals", capture: "Tag with 'intent-candidate' label", icon: "\uD83D\uDC19" },
              { source: "Dogfooding", signal: "Internal friction \u2014 moments your own team fights the tool", capture: "Running 'papercuts' list", icon: "\uD83D\uDC15" },
              { source: "Discussions / Discord", signal: "Recurring pain, workaround patterns", capture: "3+ people hit same wall \u2192 candidate", icon: "\uD83D\uDCAC" },
              { source: "Pull Requests", signal: "Contributors building the same workaround independently", capture: "Note repeated patterns in reviews", icon: "\uD83D\uDD00" },
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
                <div style={{ fontSize: 20, textAlign: "center", paddingTop: 2 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#ddd", marginBottom: 2 }}>{s.source}</div>
                  <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{s.signal}</div>
                  <div style={{ fontSize: 11, color: "#2ECC71" }}>{"\u2192"} {s.capture}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#ccc", marginBottom: 12 }}>
            Anti-Patterns
          </h3>
          <div style={{ display: "grid", gap: 6 }}>
            {[
              ["Proposal hoarding", "One person submits 15/week. Cap at 3\u20135 per person per review."],
              ["Phantom consensus", "Everyone votes yes on everything. Add an approval budget."],
              ["Source tunnel vision", "Only watching GitHub, ignoring internal friction (or vice versa)."],
              ["Voting without reading", "Proposals too long or cadence too fast. Simplify."],
            ].map(([name, fix], i) => (
              <div
                key={i}
                style={{
                  padding: "10px 14px",
                  background: i % 2 === 0 ? "rgba(233,69,96,0.06)" : "transparent",
                  borderRadius: 8,
                  display: "flex",
                  gap: 8,
                  alignItems: "baseline",
                }}
              >
                <span style={{ color: "#E94560", fontSize: 12 }}>{"\u26A0"}</span>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#E94560" }}>{name}: </span>
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
          <div style={{ display: "flex", alignItems: "stretch", gap: 6, marginBottom: 32 }}>
            {phases.map((p, i) => (
              <div
                key={p.id}
                onClick={() => setActive(active === i ? null : i)}
                style={{
                  flex: 1,
                  cursor: "pointer",
                  borderRadius: 12,
                  padding: "20px 12px",
                  background: active === i
                    ? `linear-gradient(180deg, ${p.color}22, ${p.color}11)`
                    : "rgba(255,255,255,0.03)",
                  border: active === i ? `1px solid ${p.color}66` : "1px solid #222",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: 10, color: p.color, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>
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
                <div style={{ fontSize: 10, color: "#666", lineHeight: 1.3 }}>{p.subtitle}</div>
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
                    {"\u2192"}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", color: "#444", fontSize: 12, marginBottom: 32, position: "relative" }}>
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
            <span style={{ background: "#0D0D1A", padding: "0 12px", position: "relative", top: -2, color: "#666" }}>
              {"\u21BA"} continuous loop — minutes to days
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0, color: phases[active].color, fontSize: 18, fontWeight: 700 }}>
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
                    <span style={{ color: phases[active].color, fontWeight: 700, flexShrink: 0 }}>{"\u2022"}</span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === null && (
            <div style={{ textAlign: "center", color: "#555", fontSize: 13, padding: 20 }}>
              {"\u2191"} Tap a phase to explore
            </div>
          )}
        </div>
      )}

      {/* VS SCRUM VIEW */}
      {view === "compare" && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#E94560", marginBottom: 20, textAlign: "center" }}>
            What Changes
          </h2>
          {[
            ["Sprint Planning", "Intent Sessions", "From rationing capacity \u2192 sharpening specification"],
            ["Story Points", "Acceptance Criteria", "From estimating effort \u2192 defining correctness"],
            ["Daily Standup", "Async Decision Log", "From syncing status \u2192 recording judgment"],
            ["Sprint Review", "Per-Change Evaluation", "From batched demos \u2192 continuous quality gates"],
            ["Velocity", "Convergence Rate", "From output volume \u2192 speed to right answer"],
            ["Backlog", "Intent Queue", "From dumping ground \u2192 curated priorities"],
            ["Scrum Master", "Dissolved", "From process enforcer \u2192 team culture"],
            ["Retrospective", "Framework Tuning", "From periodic reflection \u2192 continuous adaptation"],
          ].map(([old, neu, why], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                borderRadius: 8,
                marginBottom: 2,
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#888", textDecoration: "line-through" }}>{old}</div>
              </div>
              <div style={{ color: "#444", fontSize: 16 }}>{"\u2192"}</div>
              <div>
                <div style={{ fontSize: 13, color: "#2ECC71", fontWeight: 600 }}>{neu}</div>
                <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{why}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* METRICS VIEW */}
      {view === "metrics" && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5A623", marginBottom: 20, textAlign: "center" }}>
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
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#ddd", marginBottom: 2 }}>{m.name}</div>
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
            <div style={{ fontSize: 12, fontWeight: 700, color: "#E94560", marginBottom: 6 }}>
              What NOT to measure
            </div>
            <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
              Lines of code {"\u2022"} Commits per day {"\u2022"} Story points {"\u2022"} Velocity {"\u2022"} Sprint burndown {"\u2022"}
              Number of PRs {"\u2022"} Time spent coding — these measure activity, not progress toward the right answer.
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
