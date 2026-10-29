import { createFileRoute } from "@tanstack/react-router";
import { PersonalIntro } from "@/components/lab";
import { images } from "@/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dachi Gulua — Background & education" },
      { name: "description", content: "Get to know Dachi Gulua: a builder from Tbilisi, Georgia, his interests in hardware and software, and his education at TBC TechSchool." },
      { property: "og:title", content: "About Dachi Gulua — Background & education" },
      { property: "og:description", content: "Get to know Dachi Gulua: a builder from Tbilisi, Georgia, his interests in hardware and software, and his education at TBC TechSchool." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: images.portrait },
      { name: "twitter:image", content: images.portrait },
    ],
  }),
  component: PersonalIntro,
});
