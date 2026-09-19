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
  category: "AR/VR" | "Game" | "3D" | "Design" | "Mobile" | "Unreal";
  summary: string;
  description: string;
  client: string;
  year: string;
  image: string;
  imageAlt: string;
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
  bio: string;
  image: string;
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
    slug: "ar-vr",
    title: "AR / VR Experiences",
    kicker: "Spatial",
    summary:
      "Headset, mobile, and venue-scale experiences that put people inside the story.",
    description:
      "We design and ship spatial products for training, retail, live events, and entertainment. From first sketch to device store, the work is built to feel inevitable in the user’s hands.",
    outcomes: [
      "Quest, Vision Pro, and WebXR prototypes",
      "Venue-scale interactive installations",
      "Spatial UX research and playtesting",
    ],
    image:
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Person wearing a VR headset in a dark studio",
  },
  {
    slug: "game-development",
    title: "Game Development",
    kicker: "Play",
    summary:
      "Action, simulation, and branded games for consoles, PC, and live audiences.",
    description:
      "Infotainment Academy builds original titles and commissioned games with a producer’s eye for scope and a player’s eye for feel. Unity and Unreal pipelines, shipped with telemetry and live-ops in mind.",
    outcomes: [
      "Vertical slices and full production",
      "Multiplayer and event-driven gameplay",
      "Platform certification support",
    ],
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Esports arena with a glowing stage and crowd",
  },
  {
    slug: "3d-interactive",
    title: "3D Interactive",
    kicker: "Worlds",
    summary:
      "Real-time scenes for product reveals, museums, and architectural walkthroughs.",
    description:
      "If the space has to feel walkable, we build it that way. Photoreal lighting, interaction design, and performant streaming so stakeholders can move through a place before it exists.",
    outcomes: [
      "Real-time configurators",
      "Web and kiosk deployments",
      "Cinematic stills from the same scene",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Glass architecture at dusk with city lights",
  },
  {
    slug: "game-art",
    title: "Game Art",
    kicker: "Look",
    summary:
      "Characters, environments, and style frames that hold up in motion.",
    description:
      "Art direction that survives production. We ship concept, modeling, look-dev, and animation as one conversation so the game does not lose its face halfway through.",
    outcomes: [
      "Style bibles and production art",
      "Hero assets and environment kits",
      "Cinematic trailers and stills",
    ],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Abstract 3D art with fluid metallic forms",
  },
  {
    slug: "apps-web",
    title: "Apps & Web",
    kicker: "Product",
    summary:
      "Companion apps, studio sites, and content platforms that carry the same craft.",
    description:
      "The experience should not drop in quality when it leaves the headset. We build fast, accessible web and mobile products that match the cinematic work they support.",
    outcomes: [
      "iOS and Android companions",
      "Marketing and product sites",
      "CMS-backed content hubs",
    ],
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Hands holding a smartphone with a dark interface",
  },
  {
    slug: "archviz",
    title: "Architectural Visualization",
    kicker: "Place",
    summary:
      "Still, film, and real-time visualization for developers and design firms.",
    description:
      "We treat unbuilt space like a film set: light, material, and camera first. The result is work that sells a feeling, not just a floor plan.",
    outcomes: [
      "Hero stills and animation",
      "Interactive unit explorers",
      "VR site walkthroughs",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Modern interior with warm architectural lighting",
  },
];

export const projects: Project[] = [
  {
    slug: "northline-arena",
    title: "Northline Arena",
    category: "AR/VR",
    client: "Pacific League Partners",
    year: "2026",
    summary: "A venue-scale mixed-reality overlay for live American football.",
    description:
      "Fans see player trails, tactical ghosts, and sponsored moments aligned to the field in real time. Built for stadium LED, broadcast, and headset viewing of the same match.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Floodlit football stadium packed with spectators",
  },
  {
    slug: "ember-circuit",
    title: "Ember Circuit",
    category: "Game",
    client: "Infotainment Academy Original",
    year: "2026",
    summary: "A night-city racer built around handling, heat, and soundtrack.",
    description:
      "Arcade speed with simulation manners. Ember Circuit is a branded racing title designed for live activations and a consumer Steam release from the same codebase.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Sports car dashboard at night with neon reflections",
  },
  {
    slug: "halo-of-rooms",
    title: "Halo of Rooms",
    category: "3D",
    client: "Meridian Development",
    year: "2025",
    summary: "A real-time walkthrough of a waterfront residential tower.",
    description:
      "Buyers configure finishes and move room to room at 60fps in browser and on Quest. Lighting is physically based so dusk and noon feel like the actual site.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Luxury living room with floor-to-ceiling windows",
  },
  {
    slug: "paper-lantern",
    title: "Paper Lantern",
    category: "AR/VR",
    client: "Harbor Stories",
    year: "2025",
    summary: "An AR storybook that unfolds on the living-room floor.",
    description:
      "Children place paper boats, lanterns, and characters in their own space. Built with a calm art direction and parental controls from day one.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Soft glowing lights in a dark atmospheric scene",
  },
  {
    slug: "drift-protocol",
    title: "Drift Protocol",
    category: "Unreal",
    client: "Northwind Interactive",
    year: "2025",
    summary: "A co-op extraction shooter vertical slice in Unreal Engine 5.",
    description:
      "Four-player sessions, destructible interiors, and a lighting language that reads at a distance. Delivered as a playable vertical slice for publisher review.",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Gaming setup with neon lighting",
  },
  {
    slug: "night-market",
    title: "Night Market",
    category: "Mobile",
    client: "Kite & Co.",
    year: "2024",
    summary: "A tactile cooking game set in a neon street market.",
    description:
      "Short sessions, satisfying plating, and a live-ops calendar of seasonal stalls. Shipped on iOS and Android with a shared art pipeline from the 3D team.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Night market street food stall with warm lights",
  },
  {
    slug: "echo-garden",
    title: "Echo Garden",
    category: "AR/VR",
    client: "Lumen Health",
    year: "2024",
    summary: "A VR wellness space for clinics and at-home headsets.",
    description:
      "Breath-paced environments, accessibility-first locomotion, and clinician dashboards. Designed to be calm without feeling empty.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Misty forest landscape at dawn",
  },
  {
    slug: "signal-house",
    title: "Signal House",
    category: "Design",
    client: "Atelier Voss",
    year: "2024",
    summary: "Identity, UI, and motion for a spatial hardware launch.",
    description:
      "A complete visual system: product film, configurator UI, and launch site. The interface borrows from instrument panels rather than generic tech templates.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Abstract technology circuitry close-up",
  },
];

export const projectFilters = [
  "All",
  "AR/VR",
  "Game",
  "3D",
  "Design",
  "Mobile",
  "Unreal",
] as const;

export const stats = [
  { value: "80+", label: "Shipped experiences" },
  { value: "14", label: "Countries reached" },
  { value: "40", label: "Specialists" },
  { value: "4.9", label: "Client rating" },
] as const;

export const advantages = [
  {
    title: "For business",
    body: "Training, product demos, and live events that people remember because they were inside them.",
    points: [
      "Scoped to a commercial outcome, not a tech demo",
      "Hardware-agnostic from the first workshop",
      "Analytics that leadership can actually read",
    ],
  },
  {
    title: "For craft",
    body: "Art, code, and production sit in the same room. That is how worlds stay coherent under deadline.",
    points: [
      "Look-dev before feature creep",
      "Rapid prototypes you can play, not slides",
      "Pipelines that survive a sequel or a second venue",
    ],
  },
  {
    title: "For enterprise",
    body: "We plug into existing tools, security reviews, and rollout calendars without slowing the work down.",
    points: [
      "SSO and private deployments when needed",
      "Clear IP and asset handoff",
      "Support after opening night",
    ],
  },
] as const;

export const testimonials = [
  {
    quote:
      "The Unreal build landed on time and felt finished, not like a prototype wearing a suit. Communication was calm even when the hardware was not.",
    name: "Helena Park",
    role: "Head of Brand, Northline",
  },
  {
    quote:
      "Infotainment Academy treated our restaurant activation like a film shoot. Guests stayed longer than the slot we planned for.",
    name: "Marco Ellison",
    role: "Owner, Salt & Copper",
  },
  {
    quote:
      "They understood that an AR children’s app has to be delightful and boringly safe. Rare combination.",
    name: "Priya Menon",
    role: "Producer, Harbor Stories",
  },
  {
    quote:
      "Unity work was clean, the art direction held, and nobody disappeared at crunch. We already booked the next season.",
    name: "Jonah Hale",
    role: "CEO, Newface Live",
  },
] as const;

export const team: TeamMember[] = [
  {
    name: "Amara Voss",
    role: "Creative Director",
    bio: "Former cinematographer who now directs games and spatial work with the same camera grammar.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kenji Okada",
    role: "Head of Experience",
    bio: "Ships headset software that does not make people nauseous. Obsessed with locomotion and audio.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Laila Rahman",
    role: "Engineering Lead",
    bio: "Builds the boring parts so the spectacular parts stay up. Unity, Unreal, and web runtimes.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tomas Reeve",
    role: "Art Director",
    bio: "Environments first. If the light is wrong, nothing else matters.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sofia Berg",
    role: "Executive Producer",
    bio: "Keeps scope honest. Translates between clients, artists, and the calendar.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Malik Chen",
    role: "Spatial Technologist",
    bio: "Tracking, calibration, and the unglamorous physics of putting pixels in a real room.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
];

export const articles: Article[] = [
  {
    slug: "spatial-retail-is-a-pacing-problem",
    title: "Spatial retail is a pacing problem, not a polygon problem",
    excerpt:
      "Most AR shopping demos fail because they ask people to wait. Here is how we design for the three-second aisle.",
    date: "2026-08-12",
    author: "Amara Voss",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Retail interior with warm lighting",
    body: [
      "The headset is rarely the bottleneck. Attention is. Shoppers will forgive a slightly simpler model if the object appears instantly and behaves like a physical thing.",
      "We prototype with cardboard and a phone before we touch a high-poly asset. If the beat structure does not work in that crude form, Unreal will not save it.",
      "The teams that win treat AR as stage direction: entrance, reveal, decision, exit. Everything else is decoration.",
    ],
  },
  {
    slug: "heat-is-the-new-polygon-budget",
    title: "Heat is the new polygon budget",
    excerpt:
      "GPUs are not running out of triangles. They are running out of thermal headroom. That changes how we build worlds.",
    date: "2026-07-02",
    author: "Laila Rahman",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Close-up of a computer circuit board",
    body: [
      "A beautiful scene that thermal-throttles in minute four is a failed scene. We budget for sustained frame time, not peak.",
      "That means aggressive LODs, baked lighting where it does not hurt, and being honest about what needs to be dynamic.",
      "Players remember smoothness longer than they remember a reflection they saw once.",
    ],
  },
  {
    slug: "why-our-archviz-starts-with-sound",
    title: "Why our archviz still starts with sound",
    excerpt:
      "A silent apartment is a rendering. A space with air, footsteps, and street bleed is a place people can imagine living.",
    date: "2026-05-18",
    author: "Tomas Reeve",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Minimal modern house exterior",
    body: [
      "We record the actual site, even if the building is still a hole in the ground. Distant traffic, birds, and HVAC hum do more for belief than another bounce of GI.",
      "Clients sometimes ask to mute it. We show both versions. They almost never ship the silent one.",
    ],
  },
];

export const jobs: Job[] = [
  {
    slug: "unity-engineer",
    title: "Unity Engineer",
    location: "San Francisco / Remote",
    type: "Full-time",
    summary:
      "Ship gameplay and spatial features with a small team that cares about frame time.",
    duties: [
      "Own features from prototype to store submission",
      "Profile relentlessly on target hardware",
      "Collaborate with art on shader and lighting constraints",
    ],
  },
  {
    slug: "technical-artist",
    title: "Technical Artist",
    location: "San Francisco / Hybrid",
    type: "Full-time",
    summary:
      "Keep the look of the world intact when it has to run at 90Hz.",
    duties: [
      "Build look-dev and material libraries",
      "Bridge art and engineering on tools",
      "Set performance budgets the team will actually hit",
    ],
  },
  {
    slug: "producer",
    title: "Producer",
    location: "Remote",
    type: "Full-time",
    summary:
      "Protect the work and the people making it. Calendar, clients, and craft in that order.",
    duties: [
      "Run weekly production with honesty",
      "Translate client goals into playable milestones",
      "Spot scope risk before it becomes overtime",
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
