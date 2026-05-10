# Personal Website — Design Spec

**Author:** Vikram Waradpande
**Date:** 2026-05-09
**Status:** Approved for planning

## Goal

Build a minimal, professional personal site that serves as a recruiter-friendly landing page and a personal hub for talks, projects, and a touch of personality. Replace the existing GitHub Pages site at `wvik.github.io` with a Next.js site deployed to Vercel.

Success looks like: a visitor lands on the page, in 10 seconds knows who Vikram is and how to contact him, and can comfortably scroll through experience, talks, and projects without scroll fatigue.

## Non-goals

- No blog or MDX scaffolding.
- No CMS — content lives in component code, edits go through git.
- No analytics, contact form, or animations.
- No custom domain in v1 (Vercel subdomain is fine; custom domain can be added later via Vercel dashboard with no code changes).

## Stack

- **Next.js 15** (App Router) — Vercel default, zero-config deploy.
- **TypeScript** — strict mode.
- **Tailwind CSS v4** — utility styling, no separate UI lib.
- **next-themes** — light/dark toggle with `localStorage` persistence and system-preference fallback.
- **Inter** font (variable) via `next/font/google`.

No state management, no data layer, no API routes.

## Repository

- Location: `/Users/vwaradpande/devPersonal/website/`
- Initialize as a git repo; push to a new GitHub repo (name TBD by user at deploy time).
- License: not required for a personal site; omit `LICENSE` unless user requests one.

## File structure

```
website/
  app/
    layout.tsx          # font setup, theme provider, <html lang>, metadata
    page.tsx            # full single-page site, all sections inline
    globals.css         # Tailwind directives + small custom rules
  components/
    ThemeToggle.tsx     # sun/moon button, top-right of viewport
  public/
    headshot.jpg        # pulled from wvik.github.io
    resume.pdf          # copy of VikramWaradpande-Resume.pdf
  package.json
  tsconfig.json
  next.config.ts
  postcss.config.mjs
  .gitignore
  README.md             # local dev + deploy notes
```

`page.tsx` keeps all section content inline (hero, experience, talks, projects, misc). Sections are not extracted into components in v1 — content is short enough that inlining is more readable than splitting.

## Layout

Single scrolling page. Centered column, max-width ~640px, generous vertical rhythm between sections.

```
┌──────────────────────────────────────────────┐
│                                       [☀/🌙] │
│                                              │
│   [photo]   Vikram Waradpande                │
│             Senior Software Engineer at      │
│             Intuit. ML, backend systems,     │
│             and the messy parts in between.  │
│             email · linkedin · github ·      │
│             scholar · resume                 │
│                                              │
│   ─── Experience ──────────────────────      │
│   ...                                        │
│                                              │
│   ─── Talks & Publications ────────          │
│   ...                                        │
│                                              │
│   ─── Projects ─────────────────────         │
│   ...                                        │
│                                              │
│   ─── Misc ─────────────────────             │
│   ...                                        │
│                                              │
│   © 2026 Vikram Waradpande                   │
└──────────────────────────────────────────────┘
```

### Responsive behavior

- **≥640px:** photo and name+tagline sit side-by-side in the hero.
- **<640px:** photo stacks above the name; column padding tightens; same content otherwise.
- No hamburger nav (single page, no nav links needed beyond on-page anchors — none in v1).

## Typography & color

- **Font:** Inter variable, all weights via `next/font/google`.
- **Size scale:** 14 (caption), 16 (body), 18 (lead), 24 (section title), 32 (name).
- **Light theme:** background `#fafafa`, foreground `#111`, muted `#666`.
- **Dark theme:** background `#0a0a0a`, foreground `#ededed`, muted `#888`.
- **Links:** inherit foreground color, underline on hover only.
- **Section dividers:** generous whitespace + small uppercase tracked label (e.g., `EXPERIENCE`); no horizontal rules.

## Theme toggle

- Component: `ThemeToggle.tsx`, fixed top-right (`top-4 right-4`), 32×32px button.
- Icons: simple inline SVG sun/moon (no icon library).
- Behavior: light by default; on first visit, respect `prefers-color-scheme`; subsequent state persists via `next-themes` (`localStorage` key `theme`).
- Accessible: `aria-label` toggles between "Switch to dark mode" / "Switch to light mode".
- No flash of wrong theme: rely on `next-themes` `ThemeProvider` with `attribute="class"` + `defaultTheme="system"` + `enableSystem`.

## Content

All content is hardcoded in `page.tsx`. Source of truth for v1: the resume PDF and the existing wvik.github.io site.

### Hero

- **Name:** Vikram Waradpande
- **Tagline:** "Senior Software Engineer at Intuit. ML, backend systems, and the messy parts in between."
- **Photo:** pulled from `wvik.github.io` (96×96px, rounded square, `object-cover`).
- **Links (inline, separated by `·`):**
  - email → `mailto:wvikram11@gmail.com`
  - linkedin → `https://linkedin.com/in/vikram-waradpande`
  - github → `https://github.com/wvik`
  - scholar → `https://scholar.google.com/citations?user=KR26HHIAAAAJ&hl=en`
  - resume → `/resume.pdf`

### Experience

Each role: company (bold) and date range on one line; role title on the next; 1–2 bullets below. Most recent first. Bullets pulled verbatim or lightly tightened from the resume.

1. **Intuit — Mountain View, CA** (Feb 2024 – Present), *Senior Software Engineer*
   - Led a 3-engineer team to ship a real-time AI agent in QuickBooks that detects recurring transactions and automates manual workflows — 70%+ suggestion acceptance rate, reaching 4M+ customers.
   - Drove QuickBooks' Java/REST → Kotlin/GraphQL migration with AI agents that auto-detect and fix gaps across 200+ features.

2. **Aleth, Inc. — Berkeley, CA** (Jun – Aug 2023), *Machine Learning Intern*
   - Built Aleth's full-stack platform (Python, React, GraphQL, AWS) as sole engineer; ML matching system; 100+ customers within weeks of launch.

3. **Goldman Sachs — Bangalore, India** (Aug 2020 – Aug 2022), *Software Engineer II (Associate)*
   - Built a real-time rule-based classification and routing system for trade requests (15+ req/sec) and a pricing engine for 10K ETFs/sec, enabling ~$3B/year of additional trading flow.

4. **L3S Research Center, Leibniz University — Hannover, Germany** (Jul 2019 – Jul 2020), *Research Engineer*
   - Published a deep RL algorithm for discrete state-spaces using graph embeddings; 2.7× faster than baseline RL methods.

5. **Microsoft — Hyderabad, India** (May – Jul 2018), *Software Engineer Intern*
   - Built an LSTM-based classifier powering Bing's "overview" search results section; +4% classification accuracy over the existing model.

### Talks & Publications

- **PyCon US 2024** — Fundamentals of differential privacy in Python.
- **PyCon Italia 2023** — Parallel programming using MPI in Python.
- **MLG-KDD 2020** — *Graph-based State Representations for Deep Reinforcement Learning* (Waradpande, D.K., Khosla).

External links: carry over the URLs already on `wvik.github.io` for talk videos / slides / paper. If a link is missing on the existing site, leave the item as text-only in v1.

### Projects

- **SumItUp** — GPT-powered tool for extracting insights from interview notes (built during Aleth internship).
- **PolInc** — Haskell simulation modeling how social-network influencers spread political preferences.

External links: carry over from `wvik.github.io`.

### Misc

One-line placeholder for now: *"More soon."* User will fill in later.

### Footer

`© 2026 Vikram Waradpande`. No additional links.

## Metadata / SEO

- `<title>`: "Vikram Waradpande"
- `<meta name="description">`: tagline from hero.
- `<meta property="og:title">`, `og:description`, `og:image` (use headshot).
- `<link rel="icon">`: simple text favicon (initial "V" on a dark square) generated as a static asset; can be swapped later.

## Accessibility

- All interactive elements reachable by keyboard.
- `ThemeToggle` has `aria-label`.
- Photo `alt` text: "Vikram Waradpande".
- Color contrast ≥ WCAG AA in both themes (verified by spot-check, not automated tooling in v1).

## Deployment

- Push repo to GitHub (user creates the repo at deploy time).
- Connect to Vercel via "Import Project" — Next.js is auto-detected, no configuration needed.
- First deploy lands on `<repo-name>.vercel.app`. User can rename via Vercel dashboard.
- Custom domain: out of scope for v1; user can attach via Vercel dashboard later with no code changes.

## Local development

- `npm install`
- `npm run dev` → `http://localhost:3000`
- `npm run build && npm start` to verify production build before deploying.

## Risks & open items

- **Headshot copyright:** image is the user's own from `wvik.github.io`, no licensing concern.
- **Talk/project URLs:** if any links on `wvik.github.io` 404, item renders as plain text in v1.
- **Misc section:** intentionally a placeholder; not blocking.
- **Resume drift:** resume PDF in `/public/resume.pdf` will go stale if the source resume updates. Acceptable for v1 — re-deploy is one command.

## Future-friendly hooks (not built in v1)

- Section anchors are easy to add later if a top nav becomes useful.
- Adding MDX/blog later is a clean diff: add `app/blog/[slug]/page.tsx` + `content/`. Not in scope now.
- Custom domain attaches via Vercel dashboard, no code changes.
