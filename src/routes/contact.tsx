import { createFileRoute } from "@tanstack/react-router";
import { contactLinks } from "@/data";
import { PageShell, ext } from "@/components/lab";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Phone, Mail, Github, Linkedin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact — Dachi Gulua" },
      { name: "description", content: "Contact Dachi Gulua by email or phone, or find him on GitHub and LinkedIn." },
      { property: "og:title", content: "Contact — Dachi Gulua" },
      { property: "og:description", content: "Get in touch by email or phone, or connect on GitHub and LinkedIn." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const icons = { Email: Mail, Phone, GitHub: Github, LinkedIn: Linkedin };
  return (
    <PageShell code="04 / Contact" title="Got an idea worth building?">
      <p className="max-w-lg text-lg text-muted-foreground">Look through my code, follow what I'm working on, or reach out — always happy to talk hardware, backends, and new things to make.</p>
      <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
        {contactLinks.map((l) => {
          const Icon = icons[l.name as keyof typeof icons];
          return (
            <Button asChild variant="outline" key={l.name} className="press group h-auto min-w-0 justify-start whitespace-normal rounded-md border-border bg-panel p-5 hover:border-primary hover:bg-muted hover:text-foreground">
              <a href={l.href} {...(l.external ? ext : {})}>
                <span className="block min-w-0 w-full text-left">
                  <span className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"><span className="flex min-w-0 items-center gap-3 font-display text-3xl group-hover:text-primary"><Icon />{l.name}</span><ArrowUpRight className="text-primary" /></span>
                  <span className="mt-2 block break-words font-mono text-xs text-muted-foreground">{l.external ? "/" : ""}{l.handle}</span>
                </span>
              </a>
            </Button>
          );
        })}
      </div>
    </PageShell>
  );
}
