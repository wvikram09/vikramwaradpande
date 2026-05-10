# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a minimal, professional single-page personal site for Vikram Waradpande to Vercel, replacing the existing wvik.github.io site.

**Architecture:** Next.js 15 App Router single-page site. All content hardcoded in `app/page.tsx`. Light/dark theme toggle via `next-themes` with system-preference fallback. Static assets (headshot, resume) live in `/public`. Deploys to Vercel via GitHub integration.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS v4, next-themes, Inter font via `next/font/google`.

**Working directory:** `/Users/vwaradpande/devPersonal/website`

**Spec:** `docs/superpowers/specs/2026-05-09-personal-website-design.md`

---

## Notes for executor

- Each task ends with a commit. Use Conventional Commits (`feat:`, `chore:`, etc.).
- This site has no automated tests — verification is `npm run build` succeeding and a brief manual visual check via `npm run dev`. The plan does not use TDD because there is no behavior to test beyond rendering static markup; visual confirmation is the equivalent verification.
- Use `npm` (Node ≥ 20). If `pnpm` or `yarn` is preferred, swap commands accordingly — output is identical.
- Don't run `git init` if the directory is already a git repo; check first.

---

### Task 1: Initialize Next.js project

**Files:**
- Create: `website/package.json`, `website/tsconfig.json`, `website/next.config.ts`, `website/postcss.config.mjs`, `website/app/layout.tsx`, `website/app/page.tsx`, `website/app/globals.css`, `website/.gitignore`, `website/eslint.config.mjs`, `website/next-env.d.ts`

- [ ] **Step 1: Verify the website directory is empty (or only contains the docs folder)**

Run:
```bash
ls -la /Users/vwaradpande/devPersonal/website
```
Expected: only `docs/` (and dotfiles like `.`, `..`). If other files exist, stop and check with the user.

- [ ] **Step 2: Scaffold Next.js project non-interactively**

Run from `/Users/vwaradpande/devPersonal/website`:
```bash
npx --yes create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --use-npm \
  --turbopack \
  --no-install \
  --skip-install
```

If `create-next-app` prompts despite the flags (newer versions sometimes ignore `--no-install`), accept the defaults — TypeScript yes, Tailwind yes, ESLint yes, App Router yes, no `src/` dir, default import alias.

Expected output ends with: `Success! Created...`

- [ ] **Step 3: Install dependencies**

Run:
```bash
npm install
```

Expected: completes without error. `node_modules/` and `package-lock.json` appear.

- [ ] **Step 4: Verify dev server starts**

Run:
```bash
npm run build
```

Expected: `✓ Compiled successfully`. If it fails, fix before continuing.

- [ ] **Step 5: Commit the scaffold**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with TypeScript and Tailwind"
```

Note: `create-next-app` typically `git init`s automatically. If `git status` shows "not a git repository", run `git init` first, then commit.

---

### Task 2: Install runtime dependencies

**Files:**
- Modify: `website/package.json` (via npm install)

- [ ] **Step 1: Install next-themes**

Run from `/Users/vwaradpande/devPersonal/website`:
```bash
npm install next-themes
```

Expected: package added, no errors.

- [ ] **Step 2: Verify build still works**

Run: `npm run build`

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add next-themes for theme switching"
```

---

### Task 3: Add static assets (headshot + resume)

**Files:**
- Create: `website/public/headshot.jpg`, `website/public/resume.pdf`

- [ ] **Step 1: Download headshot from existing site**

Run:
```bash
curl -fsSL "https://wvik.github.io/images/ProfilePic.jpg" -o /Users/vwaradpande/devPersonal/website/public/headshot.jpg
```

Expected: file exists, ≥ 5KB.

Verify:
```bash
ls -la /Users/vwaradpande/devPersonal/website/public/headshot.jpg
file /Users/vwaradpande/devPersonal/website/public/headshot.jpg
```

Expected: file exists; `file` reports JPEG image data.

- [ ] **Step 2: Copy resume from Downloads**

Run:
```bash
cp "/Users/vwaradpande/Downloads/VikramWaradpande-Resume.pdf" /Users/vwaradpande/devPersonal/website/public/resume.pdf
```

Verify:
```bash
ls -la /Users/vwaradpande/devPersonal/website/public/resume.pdf
file /Users/vwaradpande/devPersonal/website/public/resume.pdf
```

Expected: file exists; `file` reports PDF.

- [ ] **Step 3: Delete the default Next.js scaffold assets we won't use**

Run from `/Users/vwaradpande/devPersonal/website`:
```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

(If any of these don't exist, that's fine — `-f` won't error.)

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "chore: add headshot and resume static assets"
```

---

### Task 4: Configure root layout (font, metadata, theme provider)

**Files:**
- Modify: `website/app/layout.tsx` (full rewrite)

- [ ] **Step 1: Replace `app/layout.tsx` with the final version**

Write to `website/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vikram Waradpande",
  description:
    "Senior Software Engineer at Intuit. ML, backend systems, and the messy parts in between.",
  openGraph: {
    title: "Vikram Waradpande",
    description:
      "Senior Software Engineer at Intuit. ML, backend systems, and the messy parts in between.",
    images: ["/headshot.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build still works**

Run: `npm run build`

Expected: success. (Tailwind config will be wired in Task 5; build can still pass before that since the new layout uses no Tailwind classes that depend on theme variables yet.)

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure root layout with Inter font and theme provider"
```

---

### Task 5: Configure Tailwind theme tokens and globals

**Files:**
- Modify: `website/app/globals.css` (full rewrite)

- [ ] **Step 1: Replace `app/globals.css` with the final version**

Write to `website/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --color-bg: #fafafa;
  --color-fg: #111111;
  --color-muted: #666666;
}

@layer base {
  :root {
    --bg: #fafafa;
    --fg: #111111;
    --muted: #666666;
  }

  html.dark {
    --bg: #0a0a0a;
    --fg: #ededed;
    --muted: #888888;
  }

  html,
  body {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-sans);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
}

.text-muted {
  color: var(--muted);
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

Expected: success. CSS compiles without errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: define light/dark theme tokens and base styles"
```

---

### Task 6: Build the ThemeToggle component

**Files:**
- Create: `website/components/ThemeToggle.tsx`

- [ ] **Step 1: Create the components directory**

Run:
```bash
mkdir -p /Users/vwaradpande/devPersonal/website/components
```

- [ ] **Step 2: Write `components/ThemeToggle.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";
  const label = mounted
    ? `Switch to ${next} mode`
    : "Toggle theme";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(next)}
      className="fixed top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    >
      {mounted && isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

The `mounted` flag prevents hydration mismatch — the theme isn't known on the server, so we render a neutral icon until the client takes over.

- [ ] **Step 3: Verify build**

Run: `npm run build`

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add components/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle button with hydration-safe icon"
```

---

### Task 7: Build the page content

**Files:**
- Modify: `website/app/page.tsx` (full rewrite)

- [ ] **Step 1: Replace `app/page.tsx` with the final version**

Write to `website/app/page.tsx`:

```tsx
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

type Role = {
  company: string;
  location: string;
  dates: string;
  title: string;
  bullets: string[];
};

const roles: Role[] = [
  {
    company: "Intuit",
    location: "Mountain View, CA",
    dates: "Feb 2024 – Present",
    title: "Senior Software Engineer",
    bullets: [
      "Led a 3-engineer team to ship a real-time AI agent in QuickBooks that detects recurring transactions and automates manual workflows — 70%+ suggestion acceptance rate, reaching 4M+ customers.",
      "Drove QuickBooks' Java/REST → Kotlin/GraphQL migration with AI agents that auto-detect and fix gaps across 200+ features.",
    ],
  },
  {
    company: "Aleth, Inc.",
    location: "Berkeley, CA",
    dates: "Jun – Aug 2023",
    title: "Machine Learning Intern",
    bullets: [
      "Built Aleth's full-stack platform (Python, React, GraphQL, AWS) as sole engineer; ML matching system; 100+ customers within weeks of launch.",
    ],
  },
  {
    company: "Goldman Sachs",
    location: "Bangalore, India",
    dates: "Aug 2020 – Aug 2022",
    title: "Software Engineer II (Associate)",
    bullets: [
      "Built a real-time rule-based classification and routing system for trade requests (15+ req/sec) and a pricing engine for 10K ETFs/sec, enabling ~$3B/year of additional trading flow.",
    ],
  },
  {
    company: "L3S Research Center, Leibniz University",
    location: "Hannover, Germany",
    dates: "Jul 2019 – Jul 2020",
    title: "Research Engineer",
    bullets: [
      "Published a deep RL algorithm for discrete state-spaces using graph embeddings; 2.7× faster than baseline RL methods.",
    ],
  },
  {
    company: "Microsoft",
    location: "Hyderabad, India",
    dates: "May – Jul 2018",
    title: "Software Engineer Intern",
    bullets: [
      "Built an LSTM-based classifier powering Bing's “overview” search results section; +4% classification accuracy over the existing model.",
    ],
  },
];

const talks = [
  {
    title: "Fundamentals of differential privacy in Python",
    venue: "PyCon US 2024",
    href: "https://www.youtube.com/watch?v=OefuzbVmnkY",
  },
  {
    title: "Parallel programming using MPI in Python",
    venue: "PyCon Italia 2023",
    href: "https://www.youtube.com/watch?v=n7-XdEl_Ehs",
  },
  {
    title: "Graph-based State Representations for Deep Reinforcement Learning",
    venue: "MLG-KDD 2020",
    href: "https://arxiv.org/abs/2004.13965",
  },
];

const projects = [
  {
    name: "SumItUp",
    description:
      "GPT-powered tool for extracting insights from interview notes (built during Aleth internship).",
  },
  {
    name: "PolInc",
    description:
      "Haskell simulation modeling how social-network influencers spread political preferences.",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs uppercase tracking-[0.18em] text-muted mb-6">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <main className="mx-auto max-w-[640px] px-6 py-16 sm:py-24">
        <header className="flex flex-col sm:flex-row sm:items-start gap-6 mb-16">
          <Image
            src="/headshot.jpg"
            alt="Vikram Waradpande"
            width={96}
            height={96}
            priority
            className="h-24 w-24 rounded-md object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              Vikram Waradpande
            </h1>
            <p className="mt-3 text-[17px] leading-relaxed">
              Senior Software Engineer at Intuit. ML, backend systems, and the
              messy parts in between.
            </p>
            <p className="mt-4 text-sm text-muted">
              <a href="mailto:wvikram11@gmail.com">email</a>
              <span aria-hidden="true"> · </span>
              <a
                href="https://linkedin.com/in/vikram-waradpande"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
              <span aria-hidden="true"> · </span>
              <a
                href="https://github.com/wvik"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
              <span aria-hidden="true"> · </span>
              <a
                href="https://scholar.google.com/citations?user=KR26HHIAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                scholar
              </a>
              <span aria-hidden="true"> · </span>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                resume
              </a>
            </p>
          </div>
        </header>

        <section className="mb-16">
          <SectionHeading>Experience</SectionHeading>
          <ol className="space-y-8">
            {roles.map((role) => (
              <li key={role.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-medium">
                    {role.company}
                    <span className="text-muted font-normal">
                      {" — "}
                      {role.location}
                    </span>
                  </h3>
                  <span className="text-sm text-muted">{role.dates}</span>
                </div>
                <p className="text-sm text-muted italic mt-1">{role.title}</p>
                <ul className="mt-3 space-y-2 text-[15px] leading-relaxed">
                  {role.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden="true" className="text-muted">
                        •
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16">
          <SectionHeading>Talks &amp; Publications</SectionHeading>
          <ul className="space-y-3 text-[15px]">
            {talks.map((t) => (
              <li key={t.title}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4"
                >
                  {t.title}
                </a>
                <span className="text-muted"> — {t.venue}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <SectionHeading>Projects</SectionHeading>
          <ul className="space-y-4 text-[15px]">
            {projects.map((p) => (
              <li key={p.name}>
                <span className="font-medium">{p.name}</span>
                <span className="text-muted"> — {p.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <SectionHeading>Misc</SectionHeading>
          <p className="text-[15px] text-muted">More soon.</p>
        </section>

        <footer className="text-xs text-muted pt-8">
          © {new Date().getFullYear()} Vikram Waradpande
        </footer>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

Expected: success, no TypeScript errors, no Next image warnings.

- [ ] **Step 3: Visual smoke test**

Run in one terminal:
```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Confirm:
- Headshot loads on the left, name + tagline + links on the right.
- Theme toggle in the top-right switches light ↔ dark and persists across reload.
- Each experience entry shows company, dates, title, bullets.
- Talk and project links open in new tabs.
- On mobile width (DevTools < 640px), photo stacks above the name.

Stop the dev server (Ctrl-C) when done.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build single-page personal site content"
```

---

### Task 8: Add favicon

**Files:**
- Create: `website/app/icon.tsx`

- [ ] **Step 1: Write `app/icon.tsx`**

Next.js will turn this into a generated favicon at build time.

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "#111",
          color: "#fafafa",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          letterSpacing: "-0.05em",
        }}
      >
        V
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Remove the default favicon from the scaffold (if present)**

Run:
```bash
rm -f /Users/vwaradpande/devPersonal/website/app/favicon.ico
```

- [ ] **Step 3: Verify build**

Run: `npm run build`

Expected: success. Build output should include a generated `/icon` route.

- [ ] **Step 4: Commit**

```bash
git add app/icon.tsx
git rm -f app/favicon.ico 2>/dev/null || true
git add -A
git commit -m "feat: add generated V favicon"
```

---

### Task 9: Write README

**Files:**
- Modify: `website/README.md` (replace the create-next-app default)

- [ ] **Step 1: Write `README.md`**

```markdown
# vikramwaradpande.com (working title)

Personal site — single page, Next.js 15 + Tailwind, deployed to Vercel.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Deploy

Push to GitHub and import the repo at https://vercel.com/new — Next.js is auto-detected. First deploy lands on `<repo-name>.vercel.app`.

## Edit content

All content is hardcoded in `app/page.tsx`. Update the `roles`, `talks`, and `projects` arrays and redeploy.

The headshot is `public/headshot.jpg`. The resume is `public/resume.pdf`.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: replace scaffold README with project notes"
```

---

### Task 10: Final build + deploy prep

**Files:** none (verification only)

- [ ] **Step 1: Run a clean build**

```bash
rm -rf /Users/vwaradpande/devPersonal/website/.next
npm run build
```

Expected: `✓ Compiled successfully`. No TypeScript errors. No ESLint errors that fail the build.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: no errors. Fix any that appear before continuing.

- [ ] **Step 3: One last visual check**

```bash
npm run start
```

Visit `http://localhost:3000`. Confirm everything renders identically to the dev-mode check from Task 7. Stop the server.

- [ ] **Step 4: Print deploy instructions for the user**

Tell the user:

> The site is ready. To deploy:
> 1. Create a new GitHub repo (e.g. `personal-site`).
> 2. From `website/`: `git remote add origin <repo-url> && git push -u origin main`
> 3. Go to https://vercel.com/new, import the repo, accept the defaults, and click Deploy.
> 4. The site will be live at `<repo-name>.vercel.app` within ~30 seconds.

No commit needed for this task.

---

## Self-review

**Spec coverage:**
- Stack (Next 15, TS, Tailwind v4, next-themes, Inter) → Tasks 1, 2, 4, 5.
- File structure → Tasks 1, 6, 7.
- Layout (centered 640px column, hero, four sections, footer) → Task 7.
- Theme toggle (light default, system fallback, no FOUC, a11y label) → Tasks 4, 5, 6.
- Typography & color tokens → Task 5.
- Hero content (name, tagline, photo, five inline links) → Task 7.
- Five experience entries with dates and bullets → Task 7.
- Three talks/pubs with external links → Task 7.
- Two projects → Task 7.
- Misc placeholder ("More soon.") → Task 7.
- Footer copyright → Task 7.
- SEO/OG metadata → Task 4.
- Favicon (V on dark square) → Task 8.
- Static assets (headshot, resume) → Task 3.
- README with dev/deploy instructions → Task 9.
- Vercel deploy instructions to user → Task 10.

**Placeholder scan:** No "TBD"/"TODO"/"implement later" patterns. Each step contains the actual code or command. The "Misc" section's `"More soon."` copy is intentional spec content, not a plan placeholder.

**Type consistency:** `Role` type defined in Task 7 is used only there. `talks` and `projects` are inferred-shape arrays, also only used inline. `ThemeToggle` is a default export imported via `@/components/ThemeToggle` — alias matches the `tsconfig.json` default from `create-next-app`.

**No tests:** intentional — site is static markup, equivalent verification is `npm run build` + a visual check; both are required steps in Tasks 7 and 10.
