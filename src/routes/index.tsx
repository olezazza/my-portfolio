import { createFileRoute } from "@tanstack/react-router";
import { PersonalIntro } from "@/components/lab";
import { images } from "@/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dachi Gulua — Student builder in Tbilisi" },
      { name: "description", content: "Meet Dachi Gulua, a student and independent builder from Tbilisi, Georgia, working across hardware, software and experimental products." },
      { property: "og:title", content: "Dachi Gulua — Student builder in Tbilisi" },
      { property: "og:description", content: "Meet Dachi Gulua, a student and independent builder from Tbilisi, Georgia, working across hardware, software and experimental products." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: images.portrait },
      { name: "twitter:image", content: images.portrait },
    ],
  }),
  component: PersonalIntro,
});
