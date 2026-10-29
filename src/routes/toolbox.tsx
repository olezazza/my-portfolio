import { createFileRoute } from "@tanstack/react-router";
import { toolbox } from "@/data";
import { PageShell, Label } from "@/components/lab";

export const Route = createFileRoute("/toolbox")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Toolbox — Dachi Gulua" },
      { name: "description", content: "Technologies Dachi Gulua works with: C#, .NET, Python, Flask, ESP32, Raspberry Pi and more." },
      { property: "og:title", content: "Toolbox — Dachi Gulua" },
      { property: "og:description", content: "Backend, hardware and other tools I use." },
    ],
  }),
  component: ToolboxPage,
});

function ToolboxPage() {
  return (
    <PageShell code="03 / Inventory" title="Toolbox">
      <div className="grid gap-4 md:grid-cols-3">
        {toolbox.map((g, gi) => (
          <div key={g.group} className="rounded-md border border-border bg-panel p-5">
            <Label className="text-primary">BIN-{gi + 1} / {g.group}</Label>
            <ul className="mt-3">
              {g.items.map((t, i) => (
                <li key={t} className="group flex justify-between border-b border-border py-2.5 font-mono text-sm last:border-0 hover:text-primary">
                  <span>{t}</span><span className="text-muted-foreground group-hover:text-primary">{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
