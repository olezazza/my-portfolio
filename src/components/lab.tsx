// Shared interactive pieces: nav, workbench, terminal, project explorer.
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { profile, projects, toolbox, about, education, images, catColor, type Project } from "@/data";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight, Menu, X, Github, Linkedin } from "lucide-react";

export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[10px] uppercase tracking-normal text-muted-foreground ${className}`}>{children}</span>;
}

/* ---------------- NAV ---------------- */
export function Nav() {
  const [open, setOpen] = useState(false);
  const items = [
    { to: "/work", label: "Work" },
    { to: "/", label: "About me" },
    { to: "/toolbox", label: "Toolbox" },
    { to: "/contact", label: "Contact" },
  ] as const;
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav aria-label="Main" className="mx-auto grid h-14 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 md:flex md:justify-between md:px-8">
        <Link to="/" aria-label="Dachi Gulua — home" className="font-display text-lg whitespace-nowrap tracking-wide sm:text-xl md:text-2xl">
          DACHI<span className="text-primary mx-[0.35em]">·</span>GULUA
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {items.map((it, i) => (
            <li key={it.to}>
              <Link to={it.to} activeOptions={{ exact: true }}
                className="press rounded-sm px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground data-[status=active]:bg-muted data-[status=active]:text-primary">
                <span className="text-primary/70">0{i + 1}</span> {it.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <span className="led h-2 w-2 rounded-full bg-primary" aria-hidden />
          <Label>Online · {profile.location.split(",")[0]}</Label>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </nav>
      {open && (
        <ul id="mobile-nav" className="border-t border-border px-4 py-2 md:hidden">
          {items.map((it) => (
            <li key={it.to}><Link to={it.to} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl">{it.label}</Link></li>
          ))}
        </ul>
      )}
    </header>
  );
}

/* ---------------- WORKBENCH ---------------- */
type Part = { id: string; label: string; detail: string; x: number; y: number; depth: number };
const initialParts: Part[] = [
  { id: "mcu", label: "MCU / ESP32", detail: "The brain: reads inputs, drives outputs.", x: 22, y: 30, depth: 14 },
  { id: "term", label: "Backend", detail: "C# / .NET or Python / Flask service.", x: 74, y: 24, depth: 8 },
  { id: "cube", label: "Prototype", detail: "Physical form — enclosures, 3D prints.", x: 70, y: 72, depth: 20 },
  { id: "status", label: "Status", detail: "Live link between device and software.", x: 26, y: 76, depth: 10 },
];
const links: [string, string][] = [["mcu", "term"], ["mcu", "status"], ["term", "cube"], ["status", "cube"], ["mcu", "cube"]];

function WireCube({ tilt }: { tilt: { x: number; y: number } }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const loop = (ms: number) => { setT(ms / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const ay = t * 0.6 + tilt.x * 1.2, ax = 0.5 + tilt.y * 1.2;
  const v: [number, number, number][] = [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z] as [number, number, number])));
  const p = v.map(([x, y, z]) => {
    const x1 = x * Math.cos(ay) - z * Math.sin(ay), z1 = x * Math.sin(ay) + z * Math.cos(ay);
    const y1 = y * Math.cos(ax) - z1 * Math.sin(ax);
    return [40 + x1 * 20, 40 + y1 * 20];
  });
  const edges: [number, number][] = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
      {edges.map(([a, b], i) => <line key={i} x1={p[a]![0]} y1={p[a]![1]} x2={p[b]![0]} y2={p[b]![1]} stroke="var(--accent)" strokeWidth="1.2" />)}
      {p.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.8" fill="var(--foreground)" />)}
    </svg>
  );
}

function MiniLog() {
  const lines = ["boot ok", "wifi: linked", "GET /api/schedule 200", "servo → slot 3", "sensor: 0.42", "commit: fix enclosure"];
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((n) => n + 1), 1400); return () => clearInterval(id); }, []);
  return (
    <div className="w-36 font-mono text-[10px] leading-4 text-muted-foreground">
      {[0, 1, 2].map((k) => <div key={k} className={k === 2 ? "text-primary" : ""}>&gt; {lines[(i + k) % lines.length]}</div>)}
    </div>
  );
}

function Board() {
  return (
    <svg viewBox="0 0 120 70" className="h-16 w-28" aria-hidden>
      <rect x="2" y="2" width="116" height="66" rx="3" fill="oklch(0.28 0.05 160)" stroke="var(--primary)" strokeWidth="1" />
      <rect x="40" y="18" width="40" height="32" fill="var(--background)" stroke="var(--muted-foreground)" />
      <text x="60" y="38" textAnchor="middle" fontSize="7" fill="var(--muted-foreground)" fontFamily="monospace">ESP32</text>
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i}><rect x={8 + i * 9} y="5" width="4" height="4" fill="var(--primary)" opacity=".8" /><rect x={8 + i * 9} y="61" width="4" height="4" fill="var(--primary)" opacity=".8" /></g>
      ))}
      <circle cx="16" cy="35" r="3" className="led" fill="var(--accent)" />
    </svg>
  );
}

function StatusDisplay({ pulses }: { pulses: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">{[0, 1, 2, 3].map((k) => <span key={k} className="h-6 w-1.5 bg-primary" style={{ opacity: (pulses + k) % 4 === 0 ? 1 : 0.25, transition: "opacity .3s" }} />)}</div>
      <div className="font-mono text-[10px] leading-4"><div className="text-primary">LINK OK</div><div className="text-muted-foreground">pings: {pulses}</div></div>
    </div>
  );
}

export function Workbench() {
  const ref = useRef<HTMLDivElement>(null);
  const [parts, setParts] = useState(initialParts);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [pulses, setPulses] = useState(0);

  const toPct = (cx: number, cy: number) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: Math.min(90, Math.max(10, ((cx - r.left) / r.width) * 100)), y: Math.min(88, Math.max(12, ((cy - r.top) / r.height) * 100)) };
  };
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
    if (drag) { const p = toPct(e.clientX, e.clientY); setParts((ps) => ps.map((q) => (q.id === drag ? { ...q, ...p } : q))); }
  };
  const pos = (id: string) => parts.find((p) => p.id === id)!;
  const content: Record<string, ReactNode> = { mcu: <Board />, term: <MiniLog />, cube: <WireCube tilt={tilt} />, status: <StatusDisplay pulses={pulses} /> };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerUp={() => setDrag(null)} onPointerLeave={() => { setDrag(null); setTilt({ x: 0, y: 0 }); }}
      className="relative h-full min-h-[260px] select-none overflow-hidden rounded-md border border-border bg-panel touch-none"
      role="group" aria-label="Interactive workbench: drag the components around">
      <div className="grid-lines bg-drift absolute inset-0 opacity-70" aria-hidden />
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {links.map(([a, b]) => {
          const A = pos(a), B = pos(b); const active = hover === a || hover === b || drag === a || drag === b;
          return <line key={a + b} x1={`${A.x}%`} y1={`${A.y}%`} x2={`${B.x}%`} y2={`${B.y}%`} className="trace"
            stroke={active ? "var(--primary)" : "var(--border)"} strokeWidth={active ? 1.6 : 1} />;
        })}
      </svg>
      {parts.map((p) => (
        <button key={p.id} type="button"
          onPointerDown={(e) => { e.preventDefault(); setDrag(p.id); setPulses((n) => n + 1); }}
          onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(p.id)} onBlur={() => setHover(null)}
          onKeyDown={(e) => {
            const d = { ArrowLeft: [-3, 0], ArrowRight: [3, 0], ArrowUp: [0, -3], ArrowDown: [0, 3] }[e.key];
            if (d) { e.preventDefault(); setParts((ps) => ps.map((q) => q.id === p.id ? { ...q, x: Math.min(90, Math.max(10, q.x + d[0]!)), y: Math.min(88, Math.max(12, q.y + d[1]!)) } : q)); }
          }}
          aria-label={`${p.label}: ${p.detail} Use arrow keys to move.`}
          className={`absolute cursor-grab rounded-md border bg-background/90 p-2 shadow-lg transition-[border-color,box-shadow] active:cursor-grabbing ${hover === p.id || drag === p.id ? "border-primary shadow-[0_0_24px_-6px_var(--primary)]" : "border-border"}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `translate(-50%,-50%) translate(${drag ? 0 : -tilt.x * p.depth}px, ${drag ? 0 : -tilt.y * p.depth}px) ${drag === p.id ? "scale(1.05)" : ""}` }}>
          <div className="mb-1 flex items-center justify-between gap-3"><Label className="text-[9px] text-foreground">{p.label}</Label><span className="h-1.5 w-1.5 rounded-full bg-primary" /></div>
          {content[p.id]}
          {hover === p.id && !drag && (
            <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-44 -translate-x-1/2 rounded-sm bg-foreground px-2 py-1 text-left font-mono text-[10px] text-background">{p.detail}</div>
          )}
        </button>
      ))}
      <div className="absolute bottom-2 left-3"><Label>WORKBENCH v2 · drag the parts</Label></div>
      <button type="button" onClick={() => setParts(initialParts)} className="press absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">reset ↺</button>
    </div>
  );
}

/* ---------------- TERMINAL ---------------- */
const commands: Record<string, () => string[]> = {
  help: () => ["commands: help, about, projects, stack, contact, whoami, clear", "tip: 'open <n>' opens project n (1-5)"],
  about: () => [about[0]!],
  whoami: () => [`${profile.name} — ${profile.status.toLowerCase()}, ${profile.location}`],
  projects: () => projects.map((p) => `${p.num}  ${p.title.padEnd(22)} [${p.category.toLowerCase()}] ${p.status}`),
  stack: () => toolbox.map((g) => `${g.group.toLowerCase()}: ${g.items.join(", ")}`),
  contact: () => [`github   ${profile.github}`, `linkedin ${profile.linkedin}`],
};

export function Terminal({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const [hist, setHist] = useState<{ cmd: string; out: string[] }[]>([{ cmd: "help", out: commands["help"]!() }]);
  const [val, setVal] = useState("");
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => { body.current?.scrollTo({ top: body.current.scrollHeight }); }, [hist]);
  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") return setHist([]);
    const m = cmd.match(/^open\s+(\d)$/);
    if (m) {
      const p = projects[Number(m[1]) - 1];
      if (p) { setHist((h) => [...h, { cmd, out: [`opening ${p.title}…`] }]); setTimeout(() => navigate({ to: "/work/$slug", params: { slug: p.slug } }), 350); return; }
    }
    const out = commands[cmd]?.() ?? [`command not found: ${cmd} — try 'help'`];
    setHist((h) => [...h, { cmd, out }]);
  };
  return (
    <div className={`flex flex-col overflow-hidden rounded-md border border-border bg-background/90 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-accent" /><span className="h-2 w-2 rounded-full bg-primary" /><span className="h-2 w-2 rounded-full bg-info" />
        <Label className="ml-2">dachi@lab:~</Label>
      </div>
      <div ref={body} className="min-h-0 flex-1 overflow-y-auto px-3 py-2 font-mono text-[11px] leading-5" onClick={() => document.getElementById("term-in")?.focus()}>
        {hist.map((h, i) => (
          <div key={i}>
            <div><span className="text-primary">❯</span> {h.cmd}</div>
            {h.out.map((l, j) => <div key={j} className="whitespace-pre-wrap text-muted-foreground">{l}</div>)}
          </div>
        ))}
        <form onSubmit={(e) => { e.preventDefault(); run(val); setVal(""); }} className="flex gap-2">
          <span className="text-primary">❯</span>
          <input id="term-in" value={val} onChange={(e) => setVal(e.target.value)} aria-label="Terminal command"
            className="min-w-0 flex-1 bg-transparent text-foreground caret-primary outline-none focus-visible:outline-none" autoComplete="off" spellCheck={false} style={{ outline: "none" }} />
        </form>
      </div>
      <div className="flex flex-wrap gap-1 border-t border-border px-2 py-1.5">
        {["about", "projects", "stack", "contact", "clear"].map((c) => (
          <button key={c} type="button" onClick={() => run(c)} className="press rounded-sm px-2 py-0.5 font-mono text-[10px] text-muted-foreground hover:bg-muted hover:text-primary">{c}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- PROJECT EXPLORER ---------------- */
function Preview({ p }: { p: Project }) {
  // tiny animated glyph per category
  if (p.category === "PRODUCT")
    return (
      <div className="space-y-1.5" aria-hidden>
        {["1. Program A", "2. Program B"].map((r, i) => (
          <div key={r} className="flex items-center gap-2 rounded-sm bg-muted px-2 py-1 font-mono text-[10px]" style={{ animation: `fadeUp .4s ${i * 0.1}s both` }}>
            <span className="text-primary">⋮⋮</span>{r}
          </div>
        ))}
        <Label className="block pt-1">example priority list (illustrative)</Label>
      </div>
    );
  if (p.category === "HARDWARE")
    return (
      <svg viewBox="0 0 160 70" className="h-20 w-full" aria-hidden>
        <path d="M0 35 H30 L38 15 L46 55 L54 25 L62 45 L70 35 H160" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="trace" />
        <rect x="95" y="15" width="50" height="40" fill="none" stroke="var(--muted-foreground)" />
        <circle cx="120" cy="35" r="10" fill="none" stroke="var(--accent)" />
        <circle cx="105" cy="22" r="2" className="led" fill="var(--primary)" />
      </svg>
    );
  return (
    <div className="font-mono text-[10px] leading-4 text-muted-foreground" aria-hidden>
      <div><span className="text-info">GET</span> /projects <span className="text-primary">200</span></div>
      <div><span className="text-info">POST</span> /login <span className="text-primary">302</span></div>
      <div>{"{ "}<span className="text-foreground">"stack"</span>: "{p.tech[0]}" {"}"}</div>
    </div>
  );
}

export function ProjectExplorer() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const p = projects[active]!;
  const color = catColor[p.category];
  return (
    <div className="grid h-full min-h-0 gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <ul className="flex flex-col gap-1 lg:justify-between" role="listbox" aria-label="Projects">
        {projects.map((q, i) => {
          const on = i === active; const c = catColor[q.category];
          return (
            <li key={q.slug}>
              <button type="button" role="option" aria-selected={on}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                onClick={() => (on ? navigate({ to: "/work/$slug", params: { slug: q.slug } }) : setActive(i))}
                className={`press group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-l-2 px-3 py-2 lg:py-1 text-left transition-colors ${on ? "bg-muted" : "hover:bg-muted/50"}`}
                style={{ borderColor: on ? c : "transparent" }}>
                <span className="font-mono text-xs" style={{ color: c }}>{q.num}</span>
                <span className="min-w-0">
                  <span className={`block truncate font-display text-lg tracking-wide ${q.category === "SOFTWARE" ? "md:text-base" : ""}`}>{q.title}</span>
                  <span className="block truncate text-xs text-muted-foreground lg:hidden xl:block">{q.short}</span>
                </span>
                <span className={`font-mono text-[9px] tracking-widest ${q.category === "HARDWARE" ? "rounded-none border px-1" : q.category === "PRODUCT" ? "rounded-sm px-1 text-primary-foreground" : "underline"}`}
                  style={{ borderColor: c, color: q.category === "PRODUCT" ? undefined : c, background: q.category === "PRODUCT" ? c : undefined }}>
                  {q.category}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div key={p.slug} className="page-in relative flex flex-col justify-between overflow-hidden rounded-md border bg-panel p-4" style={{ borderColor: color }}>
        <div className="absolute -right-6 -top-8 font-display text-[7rem] leading-none opacity-10" style={{ color }} aria-hidden>{p.num}</div>
        <div>
          <Label className="!text-foreground">● {p.status}</Label>
          <h3 className="mt-1 font-display text-3xl tracking-wide" style={{ color }}>{p.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.short}</p>
        </div>
        <div className="my-2"><Preview p={p} /></div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">{p.tech.slice(0, 3).map((t) => <span key={t} className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{t}</span>)}</div>
          <Link to="/work/$slug" params={{ slug: p.slug }} className="press rounded-sm px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-background" style={{ background: color }}>
            Open project →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* Simple page shell for secondary routes */
export function PageShell({ code, title, children }: { code: string; title: string; children: ReactNode }) {
  return (
    <main className="page-in mx-auto min-w-0 max-w-[1200px] px-4 py-7 md:px-8 md:py-14">
      <Label className="text-primary">{code}</Label>
      <h1 className="mt-2 font-display text-4xl tracking-wide md:text-5xl">{title}</h1>
      <div className="mt-6 min-w-0 md:mt-8">{children}</div>
    </main>
  );
}

export function PersonalIntro() {
  return (
    <PageShell code="About me" title="Hi, I'm Dachi.">
      <div className="grid min-w-0 gap-7 md:grid-cols-[260px_minmax(0,1fr)] md:gap-10">
        <figure className="min-w-0">
          <div className="grid grid-cols-[112px_minmax(0,1fr)] items-center gap-4 md:block">
            <div className="portrait-frame relative">
              <img src={images.portrait} alt={`Portrait of ${profile.name}`} className="aspect-square w-full rounded-md object-cover grayscale transition duration-500 hover:grayscale-0" />
              <span className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-primary" aria-hidden />
            </div>
            <div className="min-w-0 md:mt-5">
              <p className="font-mono text-xs text-primary">{profile.status}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{profile.headline}</p>
              <ul className="mt-3 flex gap-1.5" aria-hidden>
                <li className="h-1 w-7 bg-primary" /><li className="h-1 w-7 bg-accent" /><li className="h-1 w-7 bg-info" />
              </ul>
            </div>
          </div>
          <figcaption className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2 border-b border-border pb-3"><Label>{profile.location}</Label><Label className="text-info">41.71°N</Label></figcaption>
        </figure>
        <div className="min-w-0">
          <div className="max-w-2xl space-y-4 text-base leading-relaxed md:text-lg">{about.map((a) => <p key={a}>{a}</p>)}</div>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            <Button asChild className="press col-span-2 h-11 rounded-sm font-mono text-xs sm:col-span-1"><Link to="/work">See my work <ArrowRight /></Link></Button>
            <Button asChild variant="outline" className="press h-11 rounded-sm border-border font-mono text-xs hover:border-info hover:bg-muted hover:text-info"><a href={profile.github} {...ext}><Github /> GitHub <ArrowUpRight /></a></Button>
            <Button asChild variant="outline" className="press h-11 rounded-sm border-border font-mono text-xs hover:border-info hover:bg-muted hover:text-info"><a href={profile.linkedin} {...ext}><Linkedin /> LinkedIn <ArrowUpRight /></a></Button>
          </div>
          <div className="mt-8 grid min-w-0 items-start gap-5 border-t border-border pt-6 sm:grid-cols-[minmax(0,1fr)_auto] md:mt-10">
            <div className="min-w-0 border-l-2 border-accent pl-3">
              <Label className="text-accent">Education</Label>
              <p className="mt-2 font-display text-2xl">{education.school}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{education.course}</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">{education.dates}</p>
            </div>
            <a href={images.certificate} {...ext} className="group block w-full max-w-60 rounded-md border border-border p-2 transition-colors hover:border-info" aria-label="Open certificate full size">
              <img src={images.certificate} alt="TBC TechSchool certificate — Website Programming (Back End: Python)" loading="lazy" className="w-full" />
              <Label className="mt-2 block group-hover:text-info">View full size ↗</Label>
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
