# IDD Manifesto Docs Site — Design Spec

**Date:** 2026-03-26
**Status:** Approved

## Overview

Turn the IDD manifesto and interactive JSX overview into a documentation website using Docusaurus 3, compatible with GitHub Pages deployment.

## Framework & Deployment

- **Docusaurus 3** with TypeScript and MDX
- **GitHub Pages** compatible (deployment configured separately by user)

## Site Structure

```
Home (landing)          ← Interactive JSX overview component
├── Manifesto           ← Part I: Core beliefs, what we leave behind
├── Framework
│   ├── Intent Discovery    ← Propose → Vote → Promote, signal sources, anti-patterns
│   ├── The Core Loop       ← 5-phase overview
│   └── Phase Details       ← Intent → Generate → Evaluate → Decide → Learn
├── Playbook
│   ├── Roles               ← Intent Architect, Taste Keeper, Context Curator
│   ├── Rituals             ← Intent Review, Decision Digest, Taste Sync, etc.
│   ├── Artifacts           ← Intent Queue, Decision Log, Context Files, etc.
│   └── Metrics             ← Convergence rate, redirect ratio, etc.
├── Adoption Guide          ← Week 1–4 rollout
└── Appendix                ← Intent Document Template
```

## Directory Layout

```
website/
├── docusaurus.config.ts
├── package.json
├── tsconfig.json
├── src/
│   ├── components/
│   │   └── IDDFramework.tsx    ← Interactive JSX component (from shared conversation)
│   ├── css/
│   │   └── custom.css
│   └── pages/
│       └── index.tsx           ← Landing page wrapping the component
├── docs/
│   ├── manifesto.mdx
│   ├── framework/
│   │   ├── _category_.json
│   │   ├── intent-discovery.mdx
│   │   ├── core-loop.mdx
│   │   └── phase-details.mdx
│   ├── playbook/
│   │   ├── _category_.json
│   │   ├── roles.mdx
│   │   ├── rituals.mdx
│   │   ├── artifacts.mdx
│   │   └── metrics.mdx
│   ├── adoption-guide.mdx
│   └── appendix.mdx
├── static/
│   └── img/
├── sidebars.ts
└── babel.config.js
```

## Theme & Styling

- **Dark mode default** (matching the `#0D0D1A` aesthetic of the JSX component)
- **Custom color palette** from the interactive component:
  - Primary: `#E94560` (red/pink)
  - Secondary: `#F5A623` (amber)
  - Accent: `#0F3460` (deep blue)
  - Success: `#2ECC71` (green)
  - Highlight: `#9B59B6` (purple)
- **Navbar:** Site title + links to docs sections
- **Sidebar:** Auto-generated from docs directory structure with `_category_.json` for ordering
- **Footer:** "Intent-Driven Development Framework v1.0 — For AI-native teams"

## Landing Page

The custom React landing page (`src/pages/index.tsx`) wraps the interactive `IDDFramework` component. It is NOT a docs page — it's a standalone page using the Docusaurus layout.

## Content Pages

Each MDX file contains the corresponding manifesto prose, formatted for web readability:
- Tables use Docusaurus markdown tables
- Code blocks and templates use fenced code blocks
- Cross-references use Docusaurus doc links
- The interactive component may be embedded in docs pages via MDX imports where useful

## Key Decisions

1. **`website/` subdirectory** — keeps Docusaurus separate from the project root
2. **No GitHub Actions in scope** — deployment configured separately by user
3. **MDX over MD** — allows embedding React components in content pages
4. **TypeScript** — consistent with the JSX component
5. **Dark mode default** — matches the component's dark aesthetic
