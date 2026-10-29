import { createFileRoute } from "@tanstack/react-router";
import { Workbench, Terminal, ProjectExplorer, Label } from "@/components/lab";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Work — Dachi Gulua" },
      { name: "description", content: "Projects and prototypes by Dachi Gulua: an interactive workbench, a working terminal and five project entries." },
      { property: "og:title", content: "Work — Dachi Gulua" },
      { property: "og:description", content: "An interactive lab: projects, prototypes and a working terminal." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main className="page-in mx-auto grid max-w-[1440px] gap-4 px-4 py-4 md:px-8 lg:h-[calc(100vh-3.5rem)] lg:min-h-[700px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[minmax(0,1fr)_300px]">
      {/* Intro */}
      <section className="flex flex-col justify-center lg:row-span-1">
        <Label className="text-primary">01 / Work</Label>
        <h1 className="mt-2 font-display text-4xl leading-[1.05] tracking-wide md:text-5xl xl:text-6xl">The lab: things I've built & broken.</h1>
        <p className="mt-4 max-w-md text-muted-foreground">Five projects across hardware, backends and products. Play with the workbench, poke the terminal, or open a project below.</p>
      </section>

      {/* Interactive centerpiece */}
      <section className="h-[300px] lg:h-auto lg:min-h-0" aria-label="Workbench"><Workbench /></section>

      {/* Terminal */}
      <section className="h-[240px] lg:h-[300px]" aria-label="Terminal"><Terminal className="h-full" /></section>

      {/* Project explorer */}
      <section id="projects" className="scroll-mt-16 lg:h-[300px]" aria-label="Projects">
        <div className="mb-2 flex items-center justify-between"><Label className="text-foreground">Projects · hover to preview, click to open</Label><Label>05 entries</Label></div>
        <div className="lg:h-[calc(100%-1.5rem)]"><ProjectExplorer /></div>
      </section>
    </main>
  );
}
