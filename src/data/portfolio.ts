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
export const tagline = "CS + Applied Math, minoring in Engineering Management";

/** Contact email, shown with a copy button in the Contact section. */
export const contactEmail = "filiz.karabulut@vanderbilt.edu";

/** Profile + file links. The one place to edit URLs. */
export const githubUrl = "https://github.com/"; // TODO: your GitHub profile URL
export const linkedinUrl = "https://www.linkedin.com/"; // TODO: your LinkedIn profile URL
export const resumeUrl = "/resume.pdf"; // TODO: add resume.pdf to /public/
export const repoUrl = "https://github.com/"; // TODO: this repository's URL ("view source")

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
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "play", label: "Off the clock" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/* About                                                              */
/* ------------------------------------------------------------------ */

export const about = {
  /** 2–3 sentences, read in a narrow column. */
  lead: "TODO: 2–3 sentence intro — who you are, what you build, and what you care about. Keep it plain and specific.",
  /** A small, easily-updated status line. */
  currently:
    "AI Engineer Intern at Vanderbilt's AMPLIFY GenAI Innovation Center.",
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
    timeline: "TODO: start – end",
    team: "AMPLIFY GenAI Innovation Center · TODO: team size",
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
    role: "AI Engineer Intern",
    timeline: "TODO: start – end",
    team: "AMPLIFY GenAI Innovation Center · TODO: team size",
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
    role: "TODO: your role",
    timeline: "HackMT 2026",
    team: "OFSET",
    stack: ["TODO: stack", "TODO: stack"],
    links: [
      { label: "Live demo", href: "#", todo: true },
      { label: "Devpost", href: "#", todo: true },
      { label: "Repo", href: "#", todo: true },
    ],
    featured: true,
    problem: [
      "SpIQ is an AI communication coach, built with team OFSET at HackMT 2026, where it won 1st Place and Hacker's Choice.",
      "TODO: What does SpIQ coach, for whom, and what problem does it solve? 2–3 sentences.",
    ],
    architecture: {
      explanation: [
        "TODO: Describe how SpIQ works end to end — inputs, models, and how feedback is produced.",
      ],
    },
    decisions: [
      {
        choice: "TODO: a key technical choice you made",
        why: "TODO: why",
        cost: "TODO: what it cost",
      },
    ],
    challenges: [
      "TODO: the hardest problem you solved during the hackathon.",
    ],
    results: [
      "1st Place & Hacker's Choice, HackMT 2026.",
      "TODO: what you'd build next if you kept going.",
    ],
  },
  {
    slug: "ask-valiant",
    title: "Ask VALIANT",
    summary: "AI research discovery. TODO: one-line summary.",
    role: "TODO: your role",
    timeline: "TODO: start – end",
    team: "TODO: team",
    stack: ["TODO: stack"],
    links: [{ label: "Repo", href: "#", todo: true }],
    featured: true,
    problem: [
      "TODO: What is Ask VALIANT, who is it for, and what research-discovery problem does it solve?",
    ],
    architecture: {
      explanation: ["TODO: Describe the architecture and how it works."],
    },
    decisions: [
      {
        choice: "TODO: a key technical choice",
        why: "TODO: why",
        cost: "TODO: what it cost",
      },
    ],
    challenges: ["TODO: the hardest problem and how you solved it."],
    results: ["TODO: outcomes and next steps."],
  },
];

/* ------------------------------------------------------------------ */
/* Experience (timeline)                                              */
/* ------------------------------------------------------------------ */

export interface ExperienceEntry {
  role: string;
  org: string;
  /** Monospace, right-aligned. */
  dates: string;
  /** 1–2 short lines. */
  lines: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "AI Engineer Intern",
    org: "AMPLIFY GenAI Innovation Center",
    dates: "TODO: dates",
    lines: [
      "Build real-time, multimodal AI agents for meetings (Collab) and migrated the product's code interpreter to sandboxed Python on AWS AgentCore.",
    ],
  },
  {
    role: "TODO: your title",
    org: "Vanderbilt University IT (VUIT)",
    dates: "TODO: dates",
    lines: ["TODO: 1–2 lines on what you do at VUIT."],
  },
  {
    role: "President",
    org: "VandyHacks",
    dates: "TODO: dates",
    lines: [
      "Lead Vanderbilt's student hackathon community.",
      "TODO: scale — team size, event attendance, sponsors, or initiatives you started.",
    ],
  },
  {
    role: "Social Chair",
    org: "VUWiSE",
    dates: "TODO: dates",
    lines: ["TODO: 1–2 lines on what you organize for VUWiSE."],
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                          */
/* ------------------------------------------------------------------ */

export const education = {
  school: "Vanderbilt University",
  degree: "B.S. Computer Science & Applied Mathematics",
  minor: "Minor in Engineering Management",
  dates: "Expected May 2029",
  honors: ["VALIANT AI Scholar"],
  /** Optional extra line. */
  note: "TODO: notable coursework, GPA, or other honors (optional).",
};

/* ------------------------------------------------------------------ */
/* Off the clock                                                      */
/* ------------------------------------------------------------------ */

export const offTheClock =
  "Away from the keyboard: playing violin, getting out on hiking trails, and watching (probably too much) film.";

/* ------------------------------------------------------------------ */
/* Stickers (clickable lid) — now shortcuts that scroll to a section  */
/* ------------------------------------------------------------------ */

/** Importance tier -> controls size (via the layout). */
export type SizeTier = "XL" | "L" | "M" | "S";

/** Placeholder silhouette used when no image is available. */
export type StickerShape = "circle" | "rounded" | "tag";

/**
 * The lid is a CSS grid; stickers are packed collage-style by placing each one
 * into a named grid area. `areas` is one string per row — each token is a
 * sticker `id` or "." for an open cell. Edit these strings to repack the lid.
 */
export interface LidLayout {
  cols: number;
  rows: number;
  areas: string[];
}

export const lidLayout: { desktop: LidLayout; mobile: LidLayout } = {
  desktop: {
    cols: 8,
    rows: 6,
    areas: [
      "violin  ai       ai         valiant     valiant   vuit      vuit      hiking",
      "amplify amplify  fk         fk          fk        fk        vanderbilt vanderbilt",
      "amplify amplify  fk         fk          fk        fk        vanderbilt vanderbilt",
      "spiq    spiq     fk         fk          fk        fk        vandyhacks vandyhacks",
      "spiq    spiq     fk         fk          fk        fk        vandyhacks vandyhacks",
      "film    github   github     git-commit  git-commit linkedin linkedin  .",
    ],
  },
  mobile: {
    cols: 6,
    rows: 8,
    areas: [
      "amplify amplify ai         ai         vanderbilt vanderbilt",
      "amplify amplify git-commit git-commit vanderbilt vanderbilt",
      "valiant fk      fk         fk         fk         vuit",
      "valiant fk      fk         fk         fk         vuit",
      "violin  fk      fk         fk         fk         film",
      "hiking  fk      fk         fk         fk         .",
      "spiq    spiq    github     github     vandyhacks vandyhacks",
      "spiq    spiq    linkedin   linkedin   vandyhacks vandyhacks",
    ],
  },
};

export interface Sticker {
  /** Stable id — also its grid-area name in `lidLayout`. */
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

// To use real sticker art: drop files in /public/stickers and add e.g.
//   image: "/stickers/fk.svg"
// to a sticker below. Until then the colored placeholders are shown.
export const stickers: Sticker[] = [
  {
    id: "fk",
    label: "{ FK }",
    ariaLabel: "FK logo sticker — jump to About",
    size: "XL",
    shape: "rounded",
    color: "#1f2937",
    opens: "about",
  },
  {
    id: "amplify",
    label: "AMPLIFY",
    ariaLabel: "AMPLIFY sticker — jump to Experience",
    size: "L",
    shape: "rounded",
    color: "#7c3aed",
    opens: "experience",
  },
  {
    id: "spiq",
    label: "SpIQ",
    ariaLabel: "SpIQ sticker — jump to Work",
    size: "L",
    shape: "circle",
    color: "#0ea5e9",
    opens: "work",
  },
  {
    id: "vandyhacks",
    label: "VandyHacks",
    ariaLabel: "VandyHacks sticker — jump to Experience",
    size: "L",
    shape: "rounded",
    color: "#f59e0b",
    opens: "experience",
  },
  {
    id: "vanderbilt",
    label: "Vanderbilt",
    ariaLabel: "Vanderbilt sticker — jump to Education",
    size: "L",
    shape: "rounded",
    color: "#b45309",
    opens: "education",
  },
  {
    id: "ai",
    label: "AI",
    ariaLabel: "Neural network sticker — jump to Work",
    size: "M",
    shape: "circle",
    color: "#10b981",
    opens: "work",
  },
  {
    id: "valiant",
    label: "Ask VALIANT",
    ariaLabel: "Ask VALIANT sticker — jump to Work",
    size: "M",
    shape: "rounded",
    color: "#6366f1",
    opens: "work",
  },
  {
    id: "vuit",
    label: "VUIT",
    ariaLabel: "IT sticker — jump to Experience",
    size: "M",
    shape: "rounded",
    color: "#334155",
    opens: "experience",
  },
  {
    id: "git-commit",
    label: 'git commit -m "build cool things"',
    ariaLabel: "git commit sticker — jump to Work",
    size: "M",
    shape: "tag",
    color: "#0f172a",
    opens: "work",
  },
  {
    id: "github",
    label: "GitHub",
    ariaLabel: "GitHub sticker — opens my GitHub profile in a new tab",
    size: "M",
    shape: "circle",
    color: "#24292f",
    href: githubUrl,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    ariaLabel: "LinkedIn sticker — opens my LinkedIn profile in a new tab",
    size: "M",
    shape: "rounded",
    color: "#0a66c2",
    href: linkedinUrl,
  },
  {
    id: "violin",
    label: "Violin",
    ariaLabel: "Violin sticker — jump to Off the clock",
    size: "S",
    shape: "rounded",
    color: "#92400e",
    opens: "play",
  },
  {
    id: "hiking",
    label: "Hiking",
    ariaLabel: "Mountain sticker — jump to Off the clock",
    size: "S",
    shape: "circle",
    color: "#15803d",
    opens: "play",
  },
  {
    id: "film",
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
