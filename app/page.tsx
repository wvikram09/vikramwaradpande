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
