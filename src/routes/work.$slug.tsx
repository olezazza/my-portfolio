import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { projects, catColor, type Project } from "@/data";
import { Label, ext } from "@/components/lab";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — Dachi Gulua` : "Project — Dachi Gulua";
    const desc = p ? p.short : "Project by Dachi Gulua";
    const cover = p?.photos?.[0]?.src;
    return { meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, ...(cover?.startsWith("https://") ? [{ property: "og:image", content: cover }, { name: "twitter:image", content: cover }] : []), { title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Project not found</h1>
      <Link to="/work" className="mt-6 inline-block font-mono text-sm text-primary">← Back to projects</Link>
    </main>
  ),
  component: ProjectPage,
});

/* Conceptual demo: rotating compartment wheel driven by a schedule */
function DispenserDemo() {
  const slots = ["08:00", "12:00", "16:00", "20:00", "22:00", "—", "—", "—"];
  const [sel, setSel] = useState(0);
  return (
    <div className="rounded-md border border-dashed border-accent p-4">
      <Label className="text-accent">Conceptual demo — illustrates the idea, not the prototype's real firmware</Label>
      <div className="mt-4 grid items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)]">
        <svg viewBox="-60 -60 120 120" className="mx-auto h-40 w-40" aria-hidden>
          <g style={{ transform: `rotate(${-sel * 45}deg)`, transition: "transform .6s cubic-bezier(.5,1.6,.4,1)" }}>
            {slots.map((_, i) => {
              const a = (i * 45 - 90 - 22.5) * Math.PI / 180, b = ((i + 1) * 45 - 90 - 22.5) * Math.PI / 180;
              return <path key={i} d={`M0 0 L${50 * Math.cos(a)} ${50 * Math.sin(a)} A50 50 0 0 1 ${50 * Math.cos(b)} ${50 * Math.sin(b)} Z`}
                fill={i === sel ? "var(--accent)" : "var(--muted)"} stroke="var(--background)" strokeWidth="2" />;
            })}
          </g>
          <circle r="12" fill="var(--background)" stroke="var(--accent)" />
          <path d="M0 -58 L-5 -50 L5 -50 Z" fill="var(--primary)" />
        </svg>
        <div>
          <p className="text-sm text-muted-foreground">Pick a scheduled time: the wheel turns that compartment to the outlet (▲).</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {slots.slice(0, 5).map((t, i) => (
              <button key={t} onClick={() => setSel(i)} className={`press rounded-sm border px-2.5 py-1 font-mono text-xs ${sel === i ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"}`}>{t}</button>
            ))}
          </div>
          <p className="mt-3 font-mono text-xs text-primary">→ dispense: compartment {sel + 1}</p>
        </div>
      </div>
    </div>
  );
}

/* Conceptual demo: dampening a tremor signal */
function TremorDemo() {
  const [damp, setDamp] = useState(0);
  const pts = Array.from({ length: 120 }, (_, i) => {
    const x = i * 2.5, y = 40 + Math.sin(i * 0.9) * 22 * (1 - damp / 100) + Math.sin(i * 0.15) * 6;
    return `${x},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <div className="rounded-md border border-dashed border-accent p-4">
      <Label className="text-accent">Conceptual demo — shows the idea of reducing shake, not measured results</Label>
      <svg viewBox="0 0 300 80" className="mt-3 h-24 w-full" aria-hidden><polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="1.5" /></svg>
      <label className="mt-2 flex items-center gap-3 font-mono text-xs">
        stabilisation <input type="range" min={0} max={80} value={damp} onChange={(e) => setDamp(+e.target.value)} className="flex-1 accent-[var(--accent)]" />
      </label>
    </div>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((q) => q.slug === p.slug);
  const prev = projects[(idx + projects.length - 1) % projects.length]!;
  const next = projects[(idx + 1) % projects.length]!;
  const color = catColor[p.category];
  const [tab, setTab] = useState<"overview" | "build" | "next">("overview");

  return (
    <main key={p.slug} className="page-in mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <Link to="/work" hash="projects" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">← All projects</Link>

      <header className="mt-6 grid gap-6 border-b border-border pb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-sm px-2 py-0.5 font-mono text-[10px] tracking-widest text-background" style={{ background: color }}>{p.category}</span>
            <Label className="!text-foreground">● {p.status}</Label>
          </div>
          <h1 className="mt-3 font-display text-5xl tracking-wide md:text-6xl" style={{ color }}>{p.title}</h1>
          <p className="mt-2 max-w-xl text-lg text-muted-foreground">{p.short}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} {...ext} className="press rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-wider hover:text-background" style={{ borderColor: color }}
              onMouseEnter={(e) => (e.currentTarget.style.background = color)} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>{l.label} ↗</a>
          ))}
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <section>
          <div role="tablist" className="flex gap-1 border-b border-border">
            {(["overview", "build", "next"] as const).map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                className={`press -mb-px border-b-2 px-3 py-2 font-mono text-xs uppercase tracking-widest ${tab === t ? "text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                style={{ borderColor: tab === t ? color : "transparent" }}>
                {t === "overview" ? "Problem & idea" : t === "build" ? "Role & stack" : "Learned / next"}
              </button>
            ))}
          </div>
          <div key={tab} className="page-in space-y-4 pt-5 text-lg leading-relaxed">
            {tab === "overview" && p.overview.map((o) => <p key={o}>{o}</p>)}
            {tab === "build" && (
              <>
                <p>{p.role}</p>
                <ul className="flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded-sm border border-border px-2 py-1 font-mono text-xs text-muted-foreground">{t}</li>)}</ul>
                {p.planned && (
                  <div><Label className="text-accent">Planned / vision — not necessarily built</Label>
                    <ul className="mt-2 text-base text-muted-foreground">{p.planned.map((x) => <li key={x}>○ {x}</li>)}</ul></div>
                )}
              </>
            )}
            {tab === "next" && <ul className="space-y-2">{p.next.map((x) => <li key={x} className="flex gap-3"><span style={{ color }}>→</span>{x}</li>)}</ul>}
          </div>
          {p.disclaimer && <p className="mt-6 border-l-2 border-accent pl-3 font-mono text-xs text-muted-foreground">{p.disclaimer}</p>}
        </section>

        <aside className="space-y-4">
          {p.slug === "pill-dispenser" && <DispenserDemo />}
          {p.slug === "anti-tremor" && <TremorDemo />}
          {p.photos?.map((ph) => (
            <figure key={ph.src} className="group min-w-0">
              <a href={ph.src} {...ext} aria-label={`Open ${ph.caption} full size`} className={`project-photo relative block overflow-hidden rounded-md border border-border bg-panel p-2 ${ph.isLogo ? "project-logo" : ""}`}>
                <img src={ph.src} alt={ph.caption} loading="lazy" className="aspect-[4/3] w-full object-contain transition-transform duration-500 motion-reduce:transition-none" />
                <span className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-sm border border-border bg-background/90 text-primary transition-colors group-hover:border-primary" aria-hidden>↗</span>
              </a>
              <figcaption className="mt-2"><Label className="text-primary">{ph.caption}</Label></figcaption>
            </figure>
          ))}
          {!p.photos && p.slug !== "anti-tremor" && (
            <div className="grid-lines rounded-md border border-border p-6">
              <p className="font-display text-7xl opacity-20" style={{ color }}>{p.num}</p>
              <ul className="mt-2 space-y-1 font-mono text-xs text-muted-foreground">{p.tech.map((t) => <li key={t}>├─ {t}</li>)}</ul>
            </div>
          )}
        </aside>
      </div>

      <nav className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border" aria-label="Other projects">
        {[{ q: prev, d: "← Previous" }, { q: next, d: "Next →" }].map(({ q, d }) => (
          <Link key={d} to="/work/$slug" params={{ slug: q.slug }} className={`group bg-background p-4 hover:bg-muted ${d.startsWith("Next") ? "text-right" : ""}`}>
            <Label>{d}</Label>
            <p className="mt-1 font-display text-xl tracking-wide group-hover:text-primary">{q.title}</p>
          </Link>
        ))}
      </nav>
    </main>
  );
}
