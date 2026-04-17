import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { AgentOrchestration } from '@/components/landing/AgentOrchestration';
import { Marquee } from '@/components/landing/Marquee';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Specialists, not soloists',
    body: 'Five purpose-built agents — each fluent in one craft of hiring — coordinated by a conductor that knows when to hand off.',
  },
  {
    num: '02',
    title: 'Editorial judgment',
    body: 'Every job description, rubric, and evaluation reads like it was written by your sharpest hiring partner. Considered. Specific. Defensible.',
  },
  {
    num: '03',
    title: 'A studio, not a chatbot',
    body: 'Artifacts that persist. Decisions you can revisit. A workspace that respects the weight of choosing who joins your company.',
  },
];

const AGENTS = [
  { tag: 'I.', name: 'The Writer', role: 'Composes job descriptions with voice, structure, and inclusive precision.' },
  { tag: 'II.', name: 'The Architect', role: 'Translates requirements into scoring rubrics with weighted criteria.' },
  { tag: 'III.', name: 'The Reader', role: 'Screens resumes against the rubric, surfacing signal and skepticism alike.' },
  { tag: 'IV.', name: 'The Interviewer', role: 'Conducts structured product, technical, and behavioral conversations.' },
  { tag: 'V.', name: 'The Critic', role: 'Synthesizes interview transcripts into evidence-backed recommendations.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen grain bg-background text-foreground">
      {/* ===== Nav ===== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center">
              <span className="font-display italic text-base leading-none">h</span>
            </div>
            <span className="font-display text-xl">Hiremagic</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#studio" className="text-muted-foreground hover:text-foreground transition-colors">Studio</a>
            <a href="#agents" className="text-muted-foreground hover:text-foreground transition-colors">Agents</a>
            <a href="#principles" className="text-muted-foreground hover:text-foreground transition-colors">Principles</a>
          </nav>

          <Link to="/app">
            <Button variant="default" className="rounded-full px-5 gap-2 bg-foreground text-background hover:bg-foreground/90">
              Open studio
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="container pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="flex flex-col items-start gap-8 max-w-5xl">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              An orchestration studio for hiring
            </span>
          </div>

          <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight text-balance">
            Hiring, written
            <br />
            <span className="italic text-accent">by a studio of</span>
            <br />
            specialist agents.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed text-balance">
            Hiremagic is an editorial workspace where five AI agents — a writer, an architect, a reader, an interviewer, and a critic —
            collaborate on every role you open. You direct. They draft, debate, and deliver.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/app">
              <Button size="lg" className="rounded-full px-7 h-12 bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow gap-2">
                Start a hiring session
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#studio">
              <Button size="lg" variant="outline" className="rounded-full px-7 h-12 border-foreground/20 hover:bg-foreground/5">
                See how it works
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-6 pt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            <span>Vol. 01</span>
            <span className="h-3 w-px bg-border" />
            <span>Issue 04 · 2026</span>
            <span className="h-3 w-px bg-border" />
            <span className="text-accent">Now in preview</span>
          </div>
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <Marquee
        items={[
          'Job descriptions',
          'Evaluation rubrics',
          'Resume screening',
          'Structured interviews',
          'Hiring decisions',
          'Bias auditing',
          'Calibration sessions',
        ]}
      />

      {/* ===== Studio / Orchestration ===== */}
      <section id="studio" className="container py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
              § The studio floor
            </span>
            <h2 className="font-display text-5xl md:text-6xl leading-[1] mt-4 text-balance">
              Five agents.
              <br />
              <span className="italic">One conducted score.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground leading-relaxed">
            Watch the conductor route work through the pipeline — each handoff a deliberate
            editorial choice, not a black box.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-8 md:p-14 shadow-medium">
          <AgentOrchestration />
        </div>
      </section>

      {/* ===== Agents ===== */}
      <section id="agents" className="border-t border-border bg-card/40">
        <div className="container py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                § The cast
              </span>
              <h2 className="font-display text-5xl md:text-6xl leading-[1] mt-4">
                A roster of <span className="italic">specialists.</span>
              </h2>
            </div>
            <p className="md:col-span-7 md:col-start-6 text-lg text-muted-foreground leading-relaxed">
              Each agent has a single job and does it with conviction. They know what they don't
              know — and ask the conductor for help when they need it.
            </p>
          </div>

          <div className="border-t border-border">
            {AGENTS.map((a) => (
              <article
                key={a.name}
                className="group grid md:grid-cols-12 gap-6 py-10 border-b border-border hover:bg-background/40 transition-colors"
              >
                <div className="md:col-span-1 font-mono text-[11px] tracking-[0.25em] text-muted-foreground pt-2">
                  {a.tag}
                </div>
                <h3 className="md:col-span-4 font-display text-3xl md:text-4xl leading-tight italic group-hover:text-accent transition-colors">
                  {a.name}
                </h3>
                <p className="md:col-span-6 text-muted-foreground leading-relaxed pt-2">
                  {a.role}
                </p>
                <div className="md:col-span-1 flex md:justify-end pt-2">
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Principles ===== */}
      <section id="principles" className="container py-24 md:py-32">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            § Editorial line
          </span>
          <h2 className="font-display text-5xl md:text-6xl leading-[1] mt-4 text-balance">
            What we believe about <span className="italic">hiring well.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRINCIPLES.map((p) => (
            <div
              key={p.num}
              className="group p-8 rounded-2xl border border-border bg-card/60 hover:bg-card hover:shadow-medium transition-all"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] text-accent">{p.num}</span>
              <h3 className="font-display text-3xl mt-3 mb-4 leading-tight">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="border-t border-border">
        <div className="container py-24 md:py-32 text-center">
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1] tracking-tight text-balance">
            Open the studio.
            <br />
            <span className="italic text-accent">Make your next hire your best.</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app">
              <Button size="lg" className="rounded-full px-8 h-12 bg-foreground text-background hover:bg-foreground/90 gap-2">
                Begin a session
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
              No setup · Live in seconds
            </span>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border">
        <div className="container py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center">
              <span className="font-display italic text-sm leading-none">h</span>
            </div>
            <span className="font-display text-lg">Hiremagic</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground ml-3">
              The Editorial Hiring Studio
            </span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            © 2026 — Composed with care.
          </p>
        </div>
      </footer>
    </div>
  );
}
