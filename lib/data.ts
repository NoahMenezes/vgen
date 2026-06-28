export const services = [
  {
    id: "web",
    category: "01",
    title: "Web Design & Development",
    tagline: "Sites that sell while you sleep.",
    description:
      "From brand-new builds to ground-up redesigns, we craft fast, conversion-focused websites that reflect exactly who you are — and what makes people choose you.",
    deliverables: [
      "Bespoke storefront design + development",
      "Landing page systems",
      "CMS integration & training",
      "Performance & Core Web Vitals audit",
    ],
    accent: "#C8B8A2",
  },
  {
    id: "app",
    category: "02",
    title: "Product & App Development",
    tagline: "From zero to shipped.",
    description:
      "We turn your product vision into a working, scalable application — handling design, architecture, and deployment so you can stay focused on your users.",
    deliverables: [
      "UX / UI improvements",
      "Full-stack web app development",
      "API design & integrations",
      "Mobile-responsive PWAs",
    ],
    accent: "#7B9E87",
  },
  {
    id: "ai",
    category: "03",
    title: "AI Agent Services",
    tagline: "Automate the work. Keep the edge.",
    description:
      "We build AI-powered agents and workflows that handle repetitive tasks, surface insights, and let your team operate at a higher level without adding headcount.",
    deliverables: [
      "Custom AI agent development",
      "LLM integration & prompt engineering",
      "Workflow automation",
      "RAG & knowledge-base systems",
    ],
    accent: "#8B7BAB",
  },
];

export const works = [
  {
    id: "watchhouse",
    client: "WatchHouse",
    year: "2024",
    tags: ["Web", "UX/UI"],
    headline: "Translating craft into a high-converting digital flagship.",
    description:
      "WatchHouse came to us with a beautiful brand and a website that wasn't keeping up. We redesigned their entire digital presence — tightening the purchase funnel and surfacing the brand's distinctive character at every touchpoint.",
    outcome: "42% increase in online conversion rate",
    image: "/work/watchhouse.jpg",
    dark: true,
  },
  {
    id: "meridian",
    client: "Meridian Labs",
    year: "2025",
    tags: ["App", "AI"],
    headline: "An AI research assistant that actually understands context.",
    description:
      "We built a custom RAG-powered research tool for Meridian's team, replacing a tangle of spreadsheets and ad-hoc searches with a single intelligent interface.",
    outcome: "3× faster research cycles",
    image: "/work/meridian.jpg",
    dark: false,
  },
  {
    id: "forma",
    client: "Forma Studio",
    year: "2025",
    tags: ["Web", "App"],
    headline: "A portfolio platform that moves as fast as the work it shows.",
    description:
      "Forma needed a system to publish client-facing case studies and proposals without involving a developer each time. We delivered a custom CMS and template system built around their workflow.",
    outcome: "Proposal time cut from 3 days to 4 hours",
    image: "/work/forma.jpg",
    dark: false,
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Vgen quickly understood what makes our brand distinctive and translated it into a high-performing digital experience — streamlining the path to purchase while staying true to who we are.",
    author: "Sasha Berkeley",
    role: "Brand + Marketing Director, WatchHouse",
    avatar: "/avatars/sasha.jpg",
  },
  {
    id: 2,
    quote:
      "The AI agent they built handles what used to take our team two hours every morning. It just runs — and it's accurate.",
    author: "James Okafor",
    role: "CTO, Meridian Labs",
    avatar: "/avatars/james.jpg",
  },
];

export const processSteps = [
  {
    label: "Discovery",
    body: "We start by understanding your business, your users, and what success looks like. No templates, no guessing.",
  },
  {
    label: "Strategy + Design",
    body: "We map the solution — wireframes, flows, visual direction — before a single line of production code is written.",
  },
  {
    label: "Build",
    body: "Development in the open, with regular check-ins so there are no surprises at launch.",
  },
  {
    label: "Launch + Iterate",
    body: "We ship, monitor, and optimize. Most clients stay with us because the relationship doesn't end at go-live.",
  },
];