import { SHOGUN_CROP_SCALE, SHOGUN_GAMEPLAY_LOOP } from "@/lib/media";

export type Service = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  description: string;
  outcomes: string[];
  image: string;
  imageAlt: string;
};

export type Project = {
  slug: string;
  title: string;
  category: "Game demo" | "Ready codebase";
  summary: string;
  description: string;
  client: string;
  year: string;
  image?: string;
  imageAlt?: string;
  // cropScale zooms past letterbox bars baked into the footage.
  video?: {
    webm: string;
    mp4: string;
    cropScale?: number;
    loop?: { start: number; end: number };
  };
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string;
  author: string;
  image: string;
  imageAlt: string;
};

export type TeamMember = {
  name: string;
  role: string;
  // Optional until real photos are ready; a placeholder silhouette is shown instead.
  image?: string;
};

export type Job = {
  slug: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  duties: string[];
};

export const services: Service[] = [
  {
    slug: "unreal-gameplay-engineering",
    title: "Unreal Gameplay Engineering",
    kicker: "Code",
    summary:
      "C++ and Blueprint gameplay systems for PC games, built to your design docs and coding standards.",
    description:
      "Our engineers work inside your Unreal Engine 5 project: characters, combat, AI, UI, save systems, and the tools your designers need. We follow your branching, review, and naming rules from the first commit.",
    outcomes: [
      "Gameplay features in C++ and Blueprints",
      "AI, combat, and progression systems",
      "Editor tools that speed up your designers",
    ],
    image: "/images/services/unreal-gameplay-engineering.jpg",
    imageAlt: "An Infotainment Academy workstation with Unreal Engine work on screen",
  },
  {
    slug: "co-development-teams",
    title: "Co-development Teams",
    kicker: "Team",
    summary:
      "A dedicated team of 4–5 Unreal developers that plugs into your pipeline and your sprint calendar.",
    description:
      "Instead of hiring one contractor at a time, you get a small team that already works together. We join your tools, attend your stand-ups, and report on the same cadence as your in-house team.",
    outcomes: [
      "A team lead as your single point of contact",
      "Weekly builds and honest progress reports",
      "Time-zone overlap with Europe and the US",
    ],
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Developers reviewing code together at a desk",
  },
  {
    slug: "technical-art",
    title: "Technical Art",
    kicker: "Look",
    summary:
      "Environments, materials, lighting, and the technical art that keeps them running in Unreal.",
    description:
      "We build assets and scenes to your style guide, then make them work in the engine: material libraries, lighting, Niagara effects, and LODs that hold their look at target frame rates.",
    outcomes: [
      "Environment art and level dressing",
      "Materials, shaders, and Niagara effects",
      "Lighting with Lumen or baked setups",
    ],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Abstract 3D art with fluid metallic forms",
  },
  {
    slug: "qa-optimization",
    title: "QA and Optimization",
    kicker: "Polish",
    summary:
      "Testing, profiling, and performance work so your PC build runs well on the hardware players own.",
    description:
      "We profile with Unreal Insights, cut frame-time spikes, reduce memory use and load times, and run structured test passes with clear bug reports your team can act on.",
    outcomes: [
      "Profiling and frame-time budgets",
      "Structured test passes and bug reports",
      "Scalability settings across PC hardware tiers",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Close-up of a computer circuit board",
  },
];

export const alsoOffered = ["AR/VR", "apps and web", "architectural visualization"] as const;

export const projects: Project[] = [
  {
    slug: "shogun",
    title: "Shogun",
    category: "Game demo",
    client: "Infotainment Academy Original",
    year: "2026",
    summary: "Our own Unreal Engine 5 PC game. The gameplay demo plays at the top of the home page.",
    description:
      "Shogun is built by our team in Unreal Engine 5, from gameplay code to lighting. It shows the quality and the pipeline a client team gets when they work with us.",
    video: {
      webm: "/videos/shogen_game_demo.webm?v=20260920b",
      mp4: "/videos/shogen_game_demo.mp4?v=20260920b",
      cropScale: SHOGUN_CROP_SCALE,
      loop: SHOGUN_GAMEPLAY_LOOP,
    },
  },
  {
    slug: "shooter-codebase",
    title: "Shooter Codebase",
    category: "Ready codebase",
    client: "Ready to adapt to your brief",
    year: "2026",
    summary: "An Unreal Engine shooter codebase with core gameplay systems already in place.",
    description:
      "Instead of starting from an empty project, your shooter starts from working code. We adapt the existing systems to your brief, art style, and design, so the first milestone is about your game rather than the basics.",
  },
  {
    slug: "rpg-codebase",
    title: "RPG Codebase",
    category: "Ready codebase",
    client: "Ready to adapt to your brief",
    year: "2026",
    summary: "An Unreal Engine RPG codebase ready to be shaped around your world and mechanics.",
    description:
      "Core RPG systems are already built. We adapt them to your brief, so your budget goes into what makes your game different.",
  },
];

export const projectFilters = ["All", "Game demo", "Ready codebase"] as const;

export const stats = [
  { value: "3", label: "Game codebases ready" },
  { value: "UE5", label: "Unreal Engine 5" },
  { value: "4–5", label: "Developers per project team" },
  { value: "4–6 wk", label: "Paid pilot" },
] as const;

export const advantages = [
  {
    title: "For studios",
    body: "Add Unreal capacity without a long hiring cycle. You get a team that already works together.",
    points: [
      "Starts from ready code, not an empty project",
      "Works in your tools and your sprint rhythm",
      "Scales up or down with your milestones",
    ],
  },
  {
    title: "For craft",
    body: "Engineering, art, and QA sit in one team, so the build stays coherent under deadline.",
    points: [
      "Unreal Engine 5 specialists",
      "Playable builds every week, not slides",
      "Performance budgets set early and kept",
    ],
  },
  {
    title: "For producers",
    body: "Clear scope, honest reporting, and a single point of contact who answers in your working hours.",
    points: [
      "Time-zone overlap with Europe and the US",
      "Clear IP and asset handoff",
      "Start small with a paid pilot",
    ],
  },
] as const;

export const howWeWork = [
  {
    step: "01",
    title: "Scope",
    body: "We read your brief, agree on one clear goal, and fix the budget and timeline before work starts.",
  },
  {
    step: "02",
    title: "Onboard",
    body: "The team joins your repository, tools, and channels, and learns your coding and art standards.",
  },
  {
    step: "03",
    title: "Build",
    body: "We work in short sprints with a playable build and a progress report every week.",
  },
  {
    step: "04",
    title: "Deliver",
    body: "You get the finished work, the source, and the documentation, with a clean IP handoff.",
  },
] as const;

export const team: TeamMember[] = [
  { name: "Waqas Wasi", role: "Co-founder & CEO" },
  { name: "Areej Wasi", role: "Co-founder & COO" },
  { name: "Maheen Asif", role: "HR" },
  { name: "Muhammad Haris", role: "Unreal Developer" },
  { name: "Aleena Hafeez", role: "Unreal Developer" },
  { name: "Mohammed Usamah", role: "Python Developer, Unreal Engine" },
  { name: "Shariq Waris", role: "3D Modeler" },
  { name: "Habiba Noor", role: "Content Writer" },
  { name: "Ubaid Raza", role: "Video Editor" },
];

export const articles: Article[] = [
  {
    slug: "why-studios-are-moving-to-unreal-5",
    title: "Why studios are moving to Unreal 5",
    excerpt:
      "Lumen, Nanite, and a mature toolchain changed what a small PC team can ship. Here is what that means for studios planning their next game.",
    date: "2026-10-01",
    author: "Infotainment Academy team",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Gaming stage with dramatic lighting",
    body: [
      "Unreal Engine 5 lowered the cost of high-end visuals. Lumen gives dynamic global illumination without long light bakes, and Nanite lets artists use dense geometry without hand-building every LOD.",
      "For studios, the bigger change is the hiring market. More developers now learn Unreal first, and more ready-made systems exist, so a project can start from working code instead of an empty level.",
      "The trade-off is performance. Those features need careful budgets on the PC hardware players actually own, which is why we set frame-time targets in the first week of every project.",
    ],
  },
  {
    slug: "working-with-a-pakistan-based-unreal-team",
    title: "Working with a Pakistan-based Unreal team",
    excerpt:
      "Time zones, communication, and IP: what to expect when you add an Unreal team in Lahore to your production.",
    date: "2026-09-15",
    author: "Infotainment Academy team",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Team working on laptops around a shared table",
    body: [
      "Pakistan Standard Time is UTC+5. A team in Lahore shares the full working day with the UK and Europe, and the morning with the US East Coast, so stand-ups and reviews happen live.",
      "We work in English, inside your tools, and report every week with a playable build. You always have one team lead who knows the state of every task.",
      "Code, art, and documentation are delivered with a clear IP handoff. The easiest way to test the fit is a paid pilot: one Unreal task, four to six weeks, with a fixed scope.",
    ],
  },
];

export const jobs: Job[] = [
  {
    slug: "unreal-developer",
    title: "Unreal Developer",
    location: "Lahore / Remote",
    type: "Full-time",
    summary:
      "Build gameplay systems in Unreal Engine 5 for PC games with a small team that cares about frame time.",
    duties: [
      "Own gameplay features from prototype to release",
      "Write clean C++ and Blueprints that others can maintain",
      "Profile on target PC hardware and fix what you find",
    ],
  },
  {
    slug: "technical-artist",
    title: "Technical Artist",
    location: "Lahore / Hybrid",
    type: "Full-time",
    summary: "Keep the look of the game intact when it has to run at a stable frame rate.",
    duties: [
      "Build materials, shaders, and Niagara effects",
      "Bridge art and engineering on tools",
      "Set performance budgets the team will actually hit",
    ],
  },
  {
    slug: "video-editor",
    title: "Video Editor",
    location: "Lahore",
    type: "Full-time",
    summary:
      "Turn gameplay captures into trailers, demo reels, and social clips that show our work well.",
    duties: [
      "Capture and edit gameplay footage from Unreal",
      "Cut trailers and short clips for social channels",
      "Keep a consistent look across studio videos",
    ],
  },
];

export function getService(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((item) => item.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}

export function getJob(slug: string) {
  return jobs.find((item) => item.slug === slug);
}
