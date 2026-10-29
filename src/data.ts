// ============================================================
// SITE CONTENT — edit your info, projects, links and tools here.
// Pages read everything from this file.
// ============================================================
import prototypeImg from "@/assets/prototype.jpg.asset.json";
import conceptImg from "@/assets/dispenser-concept.jpg.asset.json";
import certificateImg from "@/assets/certificate.png.asset.json";
import portraitImg from "@/assets/portrait.png.asset.json";
import dargeLogo from "@/assets/darge-logo.png.asset.json";
import blackLionLogo from "@/assets/black-lion-logo.png.asset.json";

export const images = {
  prototype: prototypeImg.url,
  concept: conceptImg.url,
  certificate: certificateImg.url,
  portrait: portraitImg.url,
  dargeLogo: dargeLogo.url,
  blackLionLogo: blackLionLogo.url,
};

export const profile = {
  name: "Dachi Gulua",
  location: "Tbilisi, Georgia",
  status: "Student · Independent builder",
  headline: "Hardware. Software. Things that work.",
  intro:
    "I'm a builder from Tbilisi, Georgia, working across physical computing, backend development, and experimental products.",
  tags: ["ESP32", "Raspberry Pi", "C# / .NET", "Python", "Flask"],
  github: "https://github.com/olezazza",
  linkedin: "https://www.linkedin.com/in/dachigulua/",
  phone: "+995 574 0322 00",
  phoneHref: "tel:+995574032200",
  email: "guluadachi@gmail.com",
};

export const contactLinks = [
  { name: "Email", handle: profile.email, href: `mailto:${profile.email}`, external: false },
  { name: "Phone", handle: profile.phone, href: profile.phoneHref, external: false },
  { name: "GitHub", handle: "olezazza", href: profile.github, external: true },
  { name: "LinkedIn", handle: "dachigulua", href: profile.linkedin, external: true },
];

export type Category = "PRODUCT" | "HARDWARE" | "SOFTWARE";
export type ProjectLink = { label: string; href: string };
export type Project = {
  slug: string;
  num: string;
  title: string;
  short: string; // one line, used in the explorer
  category: Category;
  status: string;
  overview: string[];
  role: string;
  tech: string[];
  planned?: string[]; // vision — not necessarily implemented
  disclaimer?: string;
  next: string[]; // what I learned / would improve next
  links: ProjectLink[];
  photos?: { src: string; caption: string; isLogo?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: "chemiuni",
    num: "01",
    title: "ChemiUni",
    short: "University admissions assistant for Georgian students.",
    category: "PRODUCT",
    status: "In development",
    overview: [
      "Georgian high school students preparing for the Unified National Exams have to choose universities and order a priority list — with information spread across many places.",
      "ChemiUni aims to help them explore university programs, organize their priority lists, and make more informed decisions using relevant information and AI-assisted guidance.",
    ],
    role: "My own project — I'm building it and plan to develop it into a serious startup.",
    tech: ["Web app", "AI-assisted guidance"],
    disclaimer: "Still evolving: not every planned feature is finished, and it does not guarantee admission or grants.",
    next: ["Keep developing the core features and refining the guidance.", "Grow it from a project into a real product."],
    links: [
      { label: "Live demo", href: "https://chemiuni.lovable.app/" },
      { label: "GitHub", href: "https://github.com/olezazza/ChemiUni" },
    ],
  },
  {
    slug: "pill-dispenser",
    num: "02",
    title: "Smart Pill Dispenser",
    short: "Hackathon hardware prototype + companion app.",
    category: "HARDWARE",
    status: "Hackathon prototype",
    overview: [
      "Keeping track of several medications at different times is hard, especially for older adults.",
      "We built a prototype dispenser with a companion application: the app holds the schedule, the device is meant to give out the correct pills at the intended times.",
    ],
    role: "Built during a hackathon as part of a team.",
    tech: ["Microcontroller", "Electronics", "3D-printed parts", "Companion app"],
    next: ["Making the hardware mechanism and the software schedule agree reliably is the core engineering problem.", "Next: a more robust mechanism and enclosure."],
    links: [],
    photos: [
      { src: images.concept, caption: "Smart Pill Dispenser — real hackathon prototype" },
    ],
  },
  {
    slug: "anti-tremor",
    num: "03",
    title: "Anti-Tremor Device",
    short: "Affordable assistive-tech prototype for hand tremors.",
    category: "HARDWARE",
    status: "Hackathon prototype",
    overview: [
      "People with Parkinson's-related hand tremors can struggle with everyday tasks. Existing assistive devices help, but they can be expensive.",
      "Inspired by those technologies, our team built a prototype aimed at a more affordable alternative.",
    ],
    role: "Built during a hackathon as part of a team.",
    tech: ["Electronics", "Physical prototyping"],
    disclaimer: "A hackathon prototype with real limitations compared with advanced devices. Not a medically validated treatment or a replacement for clinically tested products.",
    next: ["Closing the gap with more advanced devices while keeping the cost low."],
    links: [],
    photos: [{ src: images.prototype, caption: "Anti-Tremor Device — real hackathon prototype" }],
  },
  {
    slug: "darge",
    num: "04",
    title: "DARGE",
    short: "Gardening & agriculture web app (GITA hackathon).",
    category: "SOFTWARE",
    status: "GITA hackathon project",
    overview: [
      "Hobbyist gardeners juggle many growing projects, tasks and timelines.",
      "DARGE helps them organize growing projects, manage tasks, and track progress.",
    ],
    role: "Developed for a GITA hackathon.",
    tech: ["C#", "ASP.NET Core MVC", "HTML / CSS / JS", "PostgreSQL"],
    planned: ["AI-assisted growing guidance", "More features from the broader project vision"],
    next: ["Implement the planned AI-assisted guidance."],
    links: [{ label: "GitHub", href: "https://github.com/olezazza/DARGE-Web" }],
    photos: [{ src: images.dargeLogo, caption: "DARGE logo", isLogo: true }],
  },
  {
    slug: "black-lion",
    num: "05",
    title: "Black Lion Rugby Club",
    short: "Python / Flask club platform — course final project.",
    category: "SOFTWARE",
    status: "Course project · not deployed",
    overview: [
      "A centralized platform idea for a Georgian rugby club.",
      "Includes account registration, profiles, news, comments, match information, and administrative functionality.",
    ],
    role: "My final project for TBC TechSchool's backend development course.",
    tech: ["Python", "Flask", "HTML / CSS / JS", "SQLite"],
    next: ["A learning project in full-stack development — deploying it would be the next step."],
    links: [{ label: "GitHub", href: "https://github.com/olezazza/black-lion-project" }],
    photos: [{ src: images.blackLionLogo, caption: "Black Lion logo", isLogo: true }],
  },
];

export const about = [
  profile.intro,
  "I enjoy building things from the ground up. Sometimes that means designing a backend system or developing an application; other times it means connecting components, programming a microcontroller, and getting a physical prototype to actually work.",
  "I'm interested in where hardware, software, automation and useful products meet. I'm still learning, experimenting, and picking harder engineering problems each time.",
  "Right now I'm developing ChemiUni while improving my backend skills and exploring more ambitious hardware projects.",
];

export const toolbox = [
  { group: "Backend", items: ["C#", ".NET / ASP.NET Core", "Python", "Flask", "SQL / PostgreSQL"] },
  { group: "Hardware", items: ["ESP32", "Raspberry Pi", "Microcontrollers & electronics", "Physical prototyping"] },
  { group: "Other", items: ["HTML, CSS, JavaScript", "Git & GitHub"] },
];

export const education = {
  school: "TBC TechSchool",
  course: "Website Programming — Back End: Python",
  dates: "October – December 2025",
};

// Colour per category (token names from styles.css)
export const catColor: Record<Category, string> = {
  PRODUCT: "var(--primary)",
  HARDWARE: "var(--accent)",
  SOFTWARE: "var(--info)",
};
