/**
 * Single source of truth for the whole site.
 *
 * Layout lives in components; everything a human would want to edit — copy,
 * links, case-study content, the sticker lid — lives here. Anything marked
 * `TODO:` is a placeholder for Filiz to fill in. Do not invent facts or metrics.
 */

/* ------------------------------------------------------------------ */
/* Identity / links                                                   */
/* ------------------------------------------------------------------ */

export const siteName = "Filiz Karabulut";

/** Tagline shown under the name in the left column. */
export const tagline = "CS + Applied Math @ Vanderbilt University";

/** One-line intro under the tagline in the left column (keep it to a sentence). */
export const intro =
  "SWE, AI, and a little bit of everything in between.";

/** Small status line in the left column, shown after a ● dot. */
export const location = "Nashville, TN";

/** Contact email, shown with a copy button in the Contact section. */
export const contactEmail = "filizkarabulutf@gmail.com";

/** Profile + file links. The one place to edit URLs. */
export const githubUrl = "https://github.com/filizkarabulut";
export const linkedinUrl = "https://www.linkedin.com/in/filizkarabulut";
export const resumeUrl = "/resume.pdf";
export const repoUrl = "https://github.com/filizkarabulut/filizkarabulut-portfolio";

/* ------------------------------------------------------------------ */
/* Navigation sections (anchors on the home page)                     */
/* ------------------------------------------------------------------ */

export interface NavSection {
  id: string;
  label: string;
}

/** Order here = order of sections below the hero, and in the command palette. */
export const navSections: NavSection[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "leadership", label: "Leadership" },
  { id: "education", label: "Education" },
  { id: "play", label: "Off the clock" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/* About                                                              */
/* ------------------------------------------------------------------ */

export const about = {
  /** 2–3 sentences, read in a narrow column. */
  lead: "I'm a Computer Science and Applied Mathematics student at Vanderbilt University, interested in software engineering and AI/ML. I'm currently an AI Research Intern at Amplify, an open-source AI platform serving 10,000+ users and piloted by 40+ institutions. I also co-lead VandyHacks, Vanderbilt's student-run hackathon organization, which brings together 200+ participants annually.",
};

/* ------------------------------------------------------------------ */
/* Case studies (Selected Work + /work/[slug] pages)                  */
/* ------------------------------------------------------------------ */

export interface CaseStudyLink {
  label: string;
  href: string;
  todo?: boolean;
}

/** A box in an architecture diagram, placed in the diagram's viewBox space. */
export interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  /** Dashed = a secondary / feedback path. */
  dashed?: boolean;
}

export interface Diagram {
  /** SVG viewBox, e.g. "0 0 1320 240". */
  viewBox: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  /** Short caption; also used as the diagram's accessible description. */
  caption: string;
}

/** A tradeoff: what was chosen, why, and what it cost. */
export interface Decision {
  choice: string;
  why: string;
  cost: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** One-line summary used on the card and the detail header. */
  summary: string;
  role: string;
  /** Monospace, e.g. a date range or event. */
  timeline: string;
  team?: string;
  /** Monospace stack tags. */
  stack: string[];
  links?: CaseStudyLink[];
  /** Optional screenshot/GIF shown under the summary (only when set). */
  image?: string;
  imageAlt?: string;
  /** Show on the home "Selected Work" list. */
  featured?: boolean;

  /* Detail page ------------------------------------------------ */
  /** What needed solving and why it mattered. One string per paragraph. */
  problem: string[];
  architecture: {
    diagram?: Diagram;
    explanation: string[];
  };
  decisions: Decision[];
  challenges: string[];
  results: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "amplify-collab",
    title: "AMPLIFY Collab",
    summary:
      "Real-time room intelligence: AI agents that listen, watch the whiteboard, and contribute ideas live.",
    role: "AI Engineer Intern",
    timeline: "May 2026 – Present",
    team: "AMPLIFY GenAI Innovation Center · 12-person dev team",
    stack: [
      "Python",
      "AWS Bedrock",
      "Nova Sonic 2",
      "GPT Realtime",
      "faster-whisper",
      "OpenCV",
      "Amazon Polly",
    ],
    links: [
      { label: "Demo", href: "#", todo: true },
      { label: "Repo", href: "#", todo: true },
    ],
    featured: true,
    problem: [
      "Collab is a real-time room intelligence tool: AI agents listen to a meeting, watch a whiteboard through a webcam, and proactively contribute ideas and build artifacts while the conversation is still happening.",
      "TODO: Add the motivating problem — who this is for and why proactive, multimodal agents beat a passive transcript or a chat you have to prompt.",
    ],
    architecture: {
      diagram: {
        viewBox: "0 0 1320 240",
        nodes: [
          { id: "mic", label: "Microphone", x: 0, y: 24, w: 150, h: 56 },
          { id: "cam", label: "Webcam", x: 0, y: 150, w: 150, h: 56 },
          {
            id: "trans",
            label: "Transcription — Nova Sonic 2 (Bedrock)",
            x: 200,
            y: 24,
            w: 240,
            h: 56,
          },
          {
            id: "wb",
            label: "Whiteboard — OpenCV frame diff",
            x: 200,
            y: 150,
            w: 240,
            h: 56,
          },
          {
            id: "trigger",
            label: "Event-driven trigger loop",
            x: 490,
            y: 88,
            w: 180,
            h: 56,
          },
          {
            id: "gate",
            label: "Topic maturity gate (2-stage)",
            x: 720,
            y: 88,
            w: 200,
            h: 56,
          },
          { id: "agents", label: "Agents", x: 970, y: 88, w: 120, h: 56 },
          {
            id: "artifacts",
            label: "Artifacts",
            x: 1140,
            y: 24,
            w: 180,
            h: 56,
          },
          {
            id: "tts",
            label: "TTS — Polly (priority queue)",
            x: 1140,
            y: 150,
            w: 180,
            h: 56,
          },
        ],
        edges: [
          { from: "mic", to: "trans" },
          { from: "cam", to: "wb" },
          { from: "trans", to: "trigger" },
          { from: "wb", to: "trigger" },
          { from: "trigger", to: "gate" },
          { from: "gate", to: "agents" },
          { from: "agents", to: "artifacts" },
          { from: "agents", to: "tts" },
        ],
        caption:
          "Audio and webcam feeds are processed in parallel, merged into an event-driven trigger loop, gated by a two-stage topic-maturity check, then handed to agents that produce artifacts and speak back through a priority-queued TTS.",
      },
      explanation: [
        "Two input streams run in parallel: audio is transcribed (now Nova Sonic 2 on AWS Bedrock) and the whiteboard is tracked with OpenCV frame differencing so only real changes register.",
        "An event-driven trigger loop decides when something is worth acting on. A two-stage topic-maturity gate holds agents back until a topic is developed enough to contribute to, which keeps them from interrupting with half-formed ideas.",
        'An "agent" wake word lets people ask the agents a direct question at any time. Spoken responses go through Amazon Polly behind a priority queue so urgent replies are not stuck behind long ones.',
      ],
    },
    decisions: [
      {
        choice:
          "Migrated transcription from self-hosted faster-whisper → GPT Realtime → Amazon Nova Sonic 2 on AWS Bedrock.",
        why: "TODO: why Nova Sonic 2 won — latency, streaming quality, accuracy, cost, or ops burden?",
        cost: "TODO: what the migration cost — rework, vendor lock-in, tuning, or behavior changes.",
      },
      {
        choice:
          "Tracked the whiteboard with OpenCV frame differencing instead of streaming every frame to a vision model.",
        why: "TODO: confirm the reason (e.g. only react to real changes; avoid per-frame model cost and latency).",
        cost: "TODO: what it gives up (sensitivity to lighting/motion, no semantic understanding of the drawing).",
      },
      {
        choice:
          "Gated contributions behind a two-stage topic-maturity check before any agent speaks.",
        why: "TODO: confirm — reduce interruptions and avoid low-value or premature suggestions.",
        cost: "TODO: added latency before the agent can contribute; risk of missing a fast-moving moment.",
      },
      {
        choice:
          'Added an "agent" wake word for direct questions and a priority queue in front of Polly TTS.',
        why: "TODO: confirm — give people an explicit way in, and keep urgent speech from queueing behind long replies.",
        cost: "TODO: wake-word false positives/misses; queue policy complexity.",
      },
    ],
    challenges: [
      "TODO: the hardest bug or problem in the event-driven trigger loop (races, duplicate triggers, ordering) and how you solved it.",
      "TODO: tuning the topic-maturity gate so agents felt helpful rather than noisy.",
      "TODO: anything tricky in synchronizing audio, transcription, and whiteboard events in real time.",
    ],
    results: [
      "TODO: outcomes — who used it, what it enabled, any latency or quality numbers (don't estimate; leave blank until measured).",
      "TODO: what you'd do next.",
    ],
  },
  {
    slug: "code-interpreter-migration",
    title: "Code Interpreter Migration",
    summary:
      "Replaced an OpenAI Assistants code interpreter with sandboxed Python on AWS AgentCore.",
    role: "AI Research Engineer Intern",
    timeline: "May 2026 – Present",
    team: "AMPLIFY GenAI Innovation Center · 12-person dev team",
    stack: ["Python", "AWS AgentCore", "Amazon DynamoDB", "Amazon S3"],
    links: [{ label: "Repo", href: "#", todo: true }],
    featured: true,
    problem: [
      "The product relied on OpenAI's Assistants API for its code interpreter. This project replaced it with sandboxed Python execution on AWS AgentCore.",
      "TODO: Add why the migration mattered — control, cost, data residency, consistency with the rest of the AWS stack, or limits you hit with Assistants.",
    ],
    architecture: {
      diagram: {
        viewBox: "0 0 1200 240",
        nodes: [
          { id: "agent", label: "Agent / LLM", x: 0, y: 92, w: 150, h: 56 },
          {
            id: "loop",
            label: "Multi-round tool loop",
            x: 200,
            y: 92,
            w: 180,
            h: 56,
          },
          {
            id: "sandbox",
            label: "Sandboxed Python — AgentCore",
            x: 430,
            y: 92,
            w: 230,
            h: 56,
          },
          {
            id: "dynamo",
            label: "DynamoDB — session state",
            x: 710,
            y: 24,
            w: 200,
            h: 56,
          },
          {
            id: "s3",
            label: "S3 — file persistence",
            x: 710,
            y: 160,
            w: 200,
            h: 56,
          },
          {
            id: "renew",
            label: "Session renewal + context rebuild",
            x: 960,
            y: 92,
            w: 230,
            h: 56,
          },
        ],
        edges: [
          { from: "agent", to: "loop" },
          { from: "loop", to: "sandbox" },
          { from: "sandbox", to: "dynamo" },
          { from: "sandbox", to: "s3" },
          { from: "dynamo", to: "renew" },
          { from: "s3", to: "renew" },
          { from: "renew", to: "sandbox", label: "restore", dashed: true },
        ],
        caption:
          "An agent drives a multi-round tool loop over sandboxed Python on AgentCore; session state lives in DynamoDB and files in S3, and on expiry the session is renewed by restoring files and rebuilding context.",
      },
      explanation: [
        "The agent drives a multi-round tool loop: it calls the sandbox, reads results, and calls again until the task is done. Execution runs in sandboxed Python on AWS AgentCore.",
        "Session state is tracked in DynamoDB and generated files are persisted to S3, so a session's work survives beyond a single call. When a session expires it is renewed and its context is rebuilt.",
        "Key finding: in-memory Python state can't survive session expiry. Rather than trying to serialize a live interpreter, the system restores the persisted files and rebuilds context from them.",
      ],
    },
    decisions: [
      {
        choice:
          "Rebuilt the interpreter as a multi-round tool loop over sandboxed Python on AgentCore.",
        why: "TODO: confirm — move execution into the AWS stack with real sandboxing and control over the loop.",
        cost: "TODO: owning sandbox lifecycle, tool-loop orchestration, and error handling you previously got for free.",
      },
      {
        choice:
          "Stored session state in DynamoDB and persisted files to S3 instead of keeping state in the process.",
        why: "Durable session state and files that outlive any single execution or a sandbox restart.",
        cost: "TODO: extra round-trips and the complexity of keeping DynamoDB/S3 consistent with the sandbox.",
      },
      {
        choice:
          "On session expiry, restore files and rebuild context instead of persisting in-memory interpreter state.",
        why: "In-memory Python state can't survive session expiry, so persisting files and rebuilding is the reliable path.",
        cost: "TODO: rebuild latency on renewal and any state that can't be reconstructed from files alone.",
      },
    ],
    challenges: [
      "In-memory Python state is lost when a session expires — solved by persisting files to S3 and rebuilding context on renewal rather than trying to keep the interpreter alive.",
      "TODO: the hardest bug in the multi-round tool loop or session renewal (timeouts, partial writes, re-entrancy) and how you fixed it.",
    ],
    results: [
      "TODO: outcomes — parity with the old interpreter, reliability across session renewals, cost or latency differences (measure before claiming).",
      "TODO: what you'd do next.",
    ],
  },
  {
    slug: "spiq",
    title: "SpIQ",
    summary: "AI communication coach — 1st Place & Hacker's Choice at HackMT 2026.",
    role: "Founder",
    timeline: "Jan 2026",
    team: "Team of 6",
    stack: ["Python", "MediaPipe", "OpenCV", "Flask"],
    links: [
      { label: "Repo", href: "https://github.com/devmutfak/devmutfak-repo" },
    ],
    featured: true,
    problem: [
      "SpIQ is an AI communication coach, built with a team of 6 at HackMT 2026, where it won 1st Place and Hacker's Choice.",
      "It gives real-time feedback on interview and presentation delivery from webcam video.",
    ],
    architecture: {
      explanation: [
        "The computer-vision backend (Python, MediaPipe, OpenCV, Flask) tracks 9 behavioral signals — eye contact, gestures, blink rate, head stability, body sway, and more — over 15-second windows and reports them as JSON scores.",
      ],
    },
    decisions: [],
    challenges: [],
    results: ["1st Place & Hacker's Choice at HackMT 2026."],
  },
  {
    slug: "ask-valiant",
    title: "Ask VALIANT",
    summary:
      "A multi-agent research assistant that routes industry questions to matching Vanderbilt AI faculty.",
    role: "Sole developer",
    timeline: "Nov 2025 – May 2026",
    team: "Solo · Vanderbilt VALIANT Lab",
    stack: ["Python", "Flask", "TinyDB", "bcrypt"],
    links: [
      { label: "Repo", href: "https://github.com/filizkarabulut/ask-valiant" },
    ],
    featured: true,
    problem: [
      "Ask VALIANT is a multi-agent research assistant for Vanderbilt's VALIANT lab. It routes industry questions through router, research, and knowledge agents to match them with 134 AI faculty and their 6K+ PubMed papers.",
    ],
    architecture: {
      explanation: [
        "Shipped end to end in Flask: bcrypt session auth, TinyDB persistence, and an admin dashboard that flags failures across four severity levels — e.g., no faculty match or missing citation — and tracks satisfaction KPIs.",
      ],
    },
    decisions: [],
    challenges: [],
    results: [],
  },
];

/* ------------------------------------------------------------------ */
/* Experience (timeline)                                              */
/* ------------------------------------------------------------------ */

/** A numbered highlight (01 / Title + description) in an experience entry. */
/** One bullet item in an experience entry. */
export interface ExperienceItem {
  /** Optional item title (primary text). Omit for untitled bullets (e.g. VUIT). */
  title?: string;
  /** Item description (secondary text). */
  description?: string;
  /** This item's own tech tags. */
  tags?: string[];
  /** Marks an in-flight project — shows a quiet "In Progress" pill by the title. */
  inProgress?: boolean;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  /** If set, the org name becomes a link opening in a new tab. */
  orgHref?: string;
  /** Monospace, right-aligned. */
  dates: string;
  /** Subtle secondary line under the role (e.g. a prior title in the same org). */
  note?: string;
  /** Short muted description of the org/work (context line). */
  context?: string;
  /** Headline numbers shown as chips on the context line (unchanged wording). */
  chips?: string[];
  /** Entry-level tags under the context line — only for entries whose tags can't
   *  be attributed to a specific item (fallback; prefer per-item `tags`). */
  contextTags?: string[];
  /** Bullet items. */
  items: ExperienceItem[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "AI Research Intern",
    org: "AMPLIFY GenAI Innovation Center",
    orgHref: "https://www.amplifygenai.org/",
    dates: "May 2026 – Present",
    items: [
      {
        title: "Real-Time Multimodal AI Agent",
        inProgress: true,
        description:
          "Developing a real-time AI collaboration agent that combines live speech, visual context, and OpenCV-based whiteboard change detection to support context-aware interactions with configurable AI agents.",
        tags: ["Python", "Node.js", "FastAPI", "OpenCV", "GPT Live", "Nova Sonic", "Amazon Bedrock"],
      },
      {
        title: "License Review & Redlining",
        description:
          "Enhanced a multi-tenant licensing plugin by redesigning the interface and enabling users to define custom standards for automated license review, redlining, and Word document generation.",
        tags: ["TypeScript", "Node.js", "React", "OOXML"],
      },
      {
        title: "AgentCore Code Interpreter Migration",
        description:
          "Migrated Amplify's sandboxed AI code execution from OpenAI Code Interpreter to AWS Bedrock AgentCore, implementing session management, multi-round tool execution, and persistent file storage.",
        tags: ["Python", "JavaScript", "AWS Bedrock AgentCore", "AWS Lambda", "DynamoDB", "S3"],
      },
      {
        title: "AI Actions Frontend",
        description:
          "Redesigned and rebuilt Amplify's Actions interface, streamlining how users connect AI assistants to external APIs and configure integrations.",
        tags: ["TypeScript", "React"],
      },
    ],
  },
  {
    role: "IT Systems & Operations Assistant",
    org: "Vanderbilt University IT",
    dates: "Jan 2026 – May 2026",
    items: [
      {
        title: "IT Operations Automation",
        description:
          "Developed Python and SQL automation workflows to reconcile timesheet, network-device, and classroom records, replacing manual CSV review and streamlining operational reporting.",
        tags: ["Python", "pandas", "SQL"],
      },
      {
        title: "Systems Integration",
        description:
          "Integrated TDX ticketing with Crestron Fusion monitoring to improve campus-wide classroom AV visibility.",
        tags: ["Python", "Microsoft SQL Server", "Crestron Fusion", "TDX"],
      },
      {
        title: "Technical Support & Troubleshooting",
        description:
          "Resolved 50+ classroom AV, network, and control-system issues, supporting reliable classroom technology operations across campus.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Leadership (own section, same timeline shape as Experience)        */
/* ------------------------------------------------------------------ */

export const leadership: ExperienceEntry[] = [
  {
    role: "Co-President",
    org: "VandyHacks",
    orgHref: "https://vandyhacks.org",
    dates: "Feb 2026 – Present",
    note: "Previously Director of Hackathon Experience",
    items: [
      {
        description:
          "Co-lead Vanderbilt's student-run hackathon organization and manage a 15-member executive board.",
      },
      {
        description:
          "Oversee sponsorships, finances, event operations, website development, and hackathon track design for events with 200+ participants.",
      },
      {
        description:
          "Expanded programming through a Y Combinator event and an Oracle-partnered hackathon.",
      },
    ],
  },
  {
    role: "Social Chair",
    org: "VU-WiSE",
    dates: "Sep 2026 – Present",
    items: [
      {
        description:
          "Plan and coordinate social and community-building events for VU-WiSE, supporting a network of 400+ women in science, engineering, and mathematics.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                          */
/* ------------------------------------------------------------------ */

export const education = {
  school: "Vanderbilt University",
  degree: "B.S. in Computer Science and Applied Mathematics",
  minor: "Minor in Engineering Management",
  dates: "Expected May 2029",
  /** Achievements — rendered as accent-tinted chips (stand out from coursework). */
  chips: ["GPA 3.96/4.00", "Dean's List: Fall 2025 & Spring 2026"],
  /** Relevant coursework — rendered as quiet outline tags, in this order. */
  coursework: [
    "Data Structures",
    "Algorithms",
    "Intermediate Software Design",
    "Linear Algebra",
    "Multivariable Calculus",
    "Data Science",
  ],
};

/* ------------------------------------------------------------------ */
/* Off the clock                                                      */
/* ------------------------------------------------------------------ */

export const offTheClock =
  "When I'm not at my keyboard, you'll probably find me playing the violin, hiking, swimming, sidequesting with friends, or watching (probably too many) films.";

/** Letterboxd profile — the word "films" above links here. */
export const letterboxdUrl = "https://letterboxd.com/flzkrblt/";

/* ------------------------------------------------------------------ */
/* Stickers (clickable lid) — now shortcuts that scroll to a section  */
/* ------------------------------------------------------------------ */

/** Importance tier -> controls size (via the layout). */
export type SizeTier = "XL" | "L" | "M" | "S";

/** Placeholder silhouette used when no image is available. */
export type StickerShape = "circle" | "rounded" | "tag";

/* The board layout is a no-overlap flex grid built in `Laptop.tsx` (three
 * columns of slots); each sticker's column, width, and rotation live there. */

export interface Sticker {
  /** Stable id — also the key the board grid uses to place this sticker. */
  id: string;
  label: string;
  ariaLabel: string;
  image?: string;
  size: SizeTier;
  shape: StickerShape;
  color: string;
  /** Home-page section id this sticker scrolls to (omit for link stickers). */
  opens?: string;
  /** If set, the sticker is an external link opened in a new tab. */
  href?: string;
}

// Sticker art lives in /public/stickers and is matched to a sticker by its `id`
// (see src/lib/stickerImages.ts, which scans the folder on the server). Drop in
// a file named after the id in ANY format — fk.png, fk.svg, fk.webp, fk.jpg… —
// and it's picked up on the next build/dev start, no code change needed. Keep
// ONE file per id (if both fk.svg and fk.png exist, svg wins — delete the other).
// Any sticker with no matching file shows its colored label placeholder instead.
export const stickers: Sticker[] = [
  {
    id: "fk",
    image: "/stickers/fk",
    label: "{ FK }",
    ariaLabel: "FK logo sticker — jump to About",
    size: "XL",
    shape: "rounded",
    color: "#1f2937",
    opens: "about",
  },
  {
    id: "amplify",
    image: "/stickers/amplify",
    label: "AMPLIFY",
    ariaLabel: "AMPLIFY sticker — jump to Experience",
    size: "L",
    shape: "rounded",
    color: "#7c3aed",
    opens: "experience",
  },
  {
    id: "spiq",
    image: "/stickers/spiq",
    label: "SpIQ",
    ariaLabel: "SpIQ sticker — jump to Projects",
    size: "L",
    shape: "circle",
    color: "#0ea5e9",
    opens: "projects",
  },
  {
    id: "vandyhacks",
    image: "/stickers/vandyhacks",
    label: "VandyHacks",
    ariaLabel: "VandyHacks sticker — jump to Leadership",
    size: "L",
    shape: "rounded",
    color: "#f59e0b",
    opens: "leadership",
  },
  {
    id: "vanderbilt",
    image: "/stickers/vanderbilt",
    label: "Vanderbilt",
    ariaLabel: "Vanderbilt sticker — jump to Education",
    size: "L",
    shape: "rounded",
    color: "#b45309",
    opens: "education",
  },
  {
    id: "valiant",
    image: "/stickers/valiant",
    label: "Ask VALIANT",
    ariaLabel: "Ask VALIANT sticker — jump to Projects",
    size: "M",
    shape: "rounded",
    color: "#6366f1",
    opens: "projects",
  },
  {
    id: "git-commit",
    image: "/stickers/git-commit",
    label: 'git commit -m "build cool things"',
    ariaLabel: "git commit sticker — jump to Projects",
    size: "M",
    shape: "tag",
    color: "#0f172a",
    opens: "projects",
  },
  {
    id: "violin",
    image: "/stickers/violin",
    label: "Violin",
    ariaLabel: "Violin sticker — jump to Off the clock",
    size: "S",
    shape: "rounded",
    color: "#92400e",
    opens: "play",
  },
  {
    id: "hiking",
    image: "/stickers/hiking",
    label: "Hiking",
    ariaLabel: "Mountain sticker — jump to Off the clock",
    size: "S",
    shape: "circle",
    color: "#15803d",
    opens: "play",
  },
  {
    id: "film",
    image: "/stickers/film",
    label: "Film",
    ariaLabel: "Film strip sticker — jump to Off the clock",
    size: "S",
    shape: "rounded",
    color: "#7e22ce",
    opens: "play",
  },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                            */
/* ------------------------------------------------------------------ */

export const caseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);

export const featuredCaseStudies = (): CaseStudy[] =>
  caseStudies.filter((c) => c.featured);

/** Slugs shown, in order, in the home-page "Projects" section. */
export const projectSlugs = ["spiq", "ask-valiant"] as const;

/** The case studies featured in the "Projects" section. */
export const projects = (): CaseStudy[] =>
  projectSlugs
    .map((slug) => caseStudyBySlug(slug))
    .filter((c): c is CaseStudy => Boolean(c));

/* ------------------------------------------------------------------ */
/* Projects — scannable card data (home "Projects" section)           */
/* ------------------------------------------------------------------ */

/** An external link shown as a text link (e.g. "Code ↗"). */
export interface ProjectLink {
  label: string;
  href: string;
}

/** A label/value pair on the meta line (Role, Team, Built for…). */
export interface ProjectMetaPair {
  label: string;
  value: string;
}

/** One project card. Any field may be omitted and renders cleanly. */
export interface ProjectCard {
  name: string;
  /** Role · team, shown as a quiet subtitle under the name (e.g. "Co-Founder · Team of 6"). */
  subtitle?: string;
  /** Phrases in `subtitle` to emphasise (e.g. an award) — same wording, brighter. */
  subtitleEmphasis?: string[];
  /** Monospace, right-aligned. */
  dates: string;
  /** One-line description (body text). */
  description: string;
  /** Award/result labels shown as chips on the highlights row. */
  awards?: string[];
  /** Muted event label shown after the award chips (e.g. "HackMT 2026"). */
  event?: string;
  /** Legacy meta pairs. Prefer `subtitle`; kept optional for flexibility. */
  meta?: ProjectMetaPair[];
  /** Strongest/most-specific tags first (what's implied, like "Python", goes last). */
  tags: string[];
  /** External links (e.g. Code); shown next to the title, each opens in a new tab. */
  links?: ProjectLink[];
  /**
   * Thumbnail shown on the card's right side (a screenshot or short demo loop).
   * Path under /public (e.g. "/projects/spiq.png"); omit for a placeholder box.
   */
  thumbnail?: string;
  thumbnailAlt?: string;
  /** If set, "Learn more →" opens the project popup at /projects/<slug>. */
  caseStudySlug?: string;
  /** Résumé detail shown under an "Overview" heading inside the popup/full page. */
  overview?: string[];
}

export const projectCards: ProjectCard[] = [
  {
    name: "SpIQ",
    subtitle: "Co-Founder · 1st Place & Hacker's Choice at HackMT 2026",
    subtitleEmphasis: ["1st Place & Hacker's Choice"],
    dates: "Jan 2026",
    description:
      "Built an AI-powered communication coach that analyzes visual cues to provide feedback on interview and presentation delivery.",
    tags: ["Python", "MediaPipe", "OpenCV", "Flask", "OpenAI API"],
    links: [
      { label: "Code", href: "https://github.com/devmutfak/devmutfak-repo" },
    ],
    // TODO: add a short SpIQ webcam-feedback screenshot/demo at /public/projects/spiq.*
    caseStudySlug: "spiq",
    overview: [
      "Founded an AI communication coach that gives real-time feedback on interview and presentation delivery from webcam video.",
      "Built the computer-vision backend (Python, MediaPipe, OpenCV, Flask) that tracks 9 behavioral signals (eye contact, gestures, blink rate, head stability, body sway etc.) over 15s windows as JSON scores.",
    ],
  },
  {
    name: "Ask VALIANT",
    subtitle: "Sole Developer · Vanderbilt VALIANT Lab",
    dates: "Nov 2025 – May 2026",
    description:
      "Built a multi-agent research assistant that connects industry research needs with relevant Vanderbilt AI researchers and expertise.",
    tags: ["Python", "Flask", "TinyDB", "Amplify API"],
    links: [
      { label: "Code", href: "https://github.com/filizkarabulut/ask-valiant" },
    ],
    // TODO: add a short Ask VALIANT chat screenshot/demo at /public/projects/ask-valiant.*
    caseStudySlug: "ask-valiant",
    overview: [
      "Built a multi-agent research assistant for Vanderbilt's VALIANT lab that routes industry questions through router, research, and knowledge agents to match them with 134 AI faculty and their 6K+ PubMed papers.",
      "Shipped the full stack in Flask: bcrypt session auth, TinyDB persistence, and an admin dashboard that flags failures across four severity levels (e.g., no faculty match, missing citation) and tracks satisfaction KPIs.",
    ],
  },
];

/** Look up a project card by its case-study slug. */
export const projectCardBySlug = (slug: string): ProjectCard | undefined =>
  projectCards.find((p) => p.caseStudySlug === slug);
