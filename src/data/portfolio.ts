/**
 * Single source of truth for the whole site.
 *
 * To update the portfolio you should only ever need to edit this file and drop
 * images into /public/stickers/. Components render this data; they do not hold
 * content of their own.
 *
 *   - `sections`  -> the content shown inside each macOS-style window.
 *   - `stickers`  -> the clickable stickers on the laptop lid.
 *
 * Anything still marked `todo:` below is a placeholder for Filiz to fill in.
 */

/* ------------------------------------------------------------------ */
/* Identity / links                                                   */
/* ------------------------------------------------------------------ */

export const siteName = "Filiz Karabulut";

/** Tagline shown in the header under the name. */
export const tagline = "CS + Applied Math, minoring in Engineering Management";

/** Contact email, shown with a copy button in the Contact window. */
export const contactEmail = "filiz.karabulut@vanderbilt.edu";

/** Profile + file links. Keep these as the one place to edit URLs. */
export const githubUrl = "https://github.com/"; // TODO: your GitHub profile URL
export const linkedinUrl = "https://www.linkedin.com/"; // TODO: your LinkedIn profile URL
export const resumeUrl = "/resume.pdf"; // TODO: add resume.pdf to /public/

/* ------------------------------------------------------------------ */
/* Sections (window content)                                          */
/* ------------------------------------------------------------------ */

/** A piece of content inside a window. Rendered by SectionContent. */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; anchor?: string }
  | { type: "list"; items: string[] }
  | { type: "meta"; items: { label: string; value: string }[] }
  | { type: "links"; links: LinkItem[] }
  | { type: "tags"; items: string[] }
  | { type: "note"; text: string }
  /** A clearly-marked placeholder for Filiz to fill in later. */
  | { type: "todo"; text: string };

export interface LinkItem {
  label: string;
  href: string;
  /** Marks a link whose URL is still a placeholder. */
  todo?: boolean;
}

export interface Section {
  /** Stable id, also used as the URL hash (e.g. "amplify" -> /#amplify). */
  id: string;
  /** Window title bar text. */
  title: string;
  /** Small mono label above the title (optional). */
  eyebrow?: string;
  /** Secondary line under the title, e.g. role or dates (optional). */
  subtitle?: string;
  blocks: ContentBlock[];
}

export const sections: Section[] = [
  {
    id: "about",
    title: "About",
    eyebrow: "{ FK }",
    subtitle: "Filiz Karabulut",
    blocks: [
      {
        type: "meta",
        items: [
          { label: "Studying", value: "CS + Applied Mathematics" },
          { label: "At", value: "Vanderbilt University" },
          { label: "Based in", value: "Nashville, TN (via Istanbul)" },
        ],
      },
      {
        type: "todo",
        text: "Write a 2-3 sentence personal intro: who you are, what you build, and what you care about.",
      },
      { type: "heading", text: "What I'm up to" },
      {
        type: "list",
        items: [
          "AI Engineer Intern at Vanderbilt's AMPLIFY GenAI Innovation Center",
          "President of VandyHacks",
          "Building AI tools like SpIQ and Ask VALIANT",
        ],
      },
    ],
  },
  {
    id: "amplify",
    title: "AMPLIFY GenAI Innovation Center",
    eyebrow: "Experience",
    subtitle: "AI Engineer Intern · Vanderbilt University",
    blocks: [
      {
        type: "meta",
        items: [
          { label: "Role", value: "AI Engineer Intern" },
          { label: "Org", value: "AMPLIFY GenAI Innovation Center" },
          { label: "Dates", value: "TODO: start – end" },
        ],
      },
      {
        type: "todo",
        text: "Describe what AMPLIFY is and what you do there in 1-2 sentences.",
      },
      { type: "heading", text: "Highlights" },
      {
        type: "todo",
        text: "List 2-4 concrete things you built or shipped (tools, models, pipelines, impact/metrics).",
      },
      {
        type: "tags",
        items: ["Generative AI", "TODO: tech", "TODO: tech"],
      },
    ],
  },
  {
    id: "spiq",
    title: "SpIQ",
    eyebrow: "Project",
    subtitle: "AI communication coach · Team OFSET",
    blocks: [
      {
        type: "meta",
        items: [
          { label: "Award", value: "1st Place & Hacker's Choice — HackMT 2026" },
          { label: "Team", value: "OFSET" },
          { label: "Role", value: "TODO: your role" },
        ],
      },
      {
        type: "paragraph",
        text: "SpIQ is an AI communication coach built with team OFSET. It won 1st Place and Hacker's Choice at HackMT 2026.",
      },
      {
        type: "todo",
        text: "Add 2-3 sentences: what SpIQ does, how it works, and the problem it solves.",
      },
      { type: "heading", text: "Built with" },
      { type: "tags", items: ["TODO: tech", "TODO: tech", "TODO: tech"] },
      {
        type: "links",
        links: [
          { label: "Live demo", href: "#", todo: true },
          { label: "Devpost / write-up", href: "#", todo: true },
          { label: "GitHub repo", href: "#", todo: true },
        ],
      },
    ],
  },
  {
    id: "leadership",
    title: "VandyHacks",
    eyebrow: "Leadership",
    subtitle: "President",
    blocks: [
      {
        type: "meta",
        items: [
          { label: "Role", value: "President" },
          { label: "Org", value: "VandyHacks — Vanderbilt's hackathon community" },
          { label: "Dates", value: "TODO: term" },
        ],
      },
      {
        type: "todo",
        text: "Describe your involvement: what VandyHacks is, what you lead, team size, event scale (attendees, sponsors).",
      },
      { type: "heading", text: "Impact" },
      {
        type: "todo",
        text: "List 2-3 highlights (events organized, growth, initiatives you started).",
      },
      {
        type: "links",
        links: [{ label: "vandyhacks.org", href: "#", todo: true }],
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    eyebrow: "Vanderbilt University",
    subtitle: "B.S. Computer Science & Applied Mathematics",
    blocks: [
      {
        type: "meta",
        items: [
          { label: "School", value: "Vanderbilt University" },
          { label: "Degree", value: "B.S. Computer Science & Applied Mathematics" },
          { label: "Minor", value: "Engineering Management" },
          { label: "Expected", value: "May 2029" },
        ],
      },
      { type: "heading", text: "Relevant coursework" },
      {
        type: "todo",
        text: "List notable courses (algorithms, ML, linear algebra, etc.).",
      },
      { type: "heading", text: "Honors & activities" },
      {
        type: "todo",
        text: "GPA (optional), scholarships, honors, clubs.",
      },
    ],
  },
  {
    id: "ai",
    title: "AI",
    eyebrow: "Interest",
    subtitle: "What draws me to artificial intelligence",
    blocks: [
      {
        type: "todo",
        text: "Write 2-4 sentences on what excites you about AI and the kind of problems you want to work on.",
      },
      { type: "heading", text: "My AI work" },
      {
        type: "list",
        items: [
          "SpIQ — AI communication coach (HackMT 2026 winner)",
          "Ask VALIANT — AI research discovery",
          "AMPLIFY — AI Engineer internship at Vanderbilt",
        ],
      },
      {
        type: "links",
        links: [
          { label: "SpIQ", href: "#spiq" },
          { label: "Ask VALIANT", href: "#valiant" },
          { label: "AMPLIFY", href: "#amplify" },
        ],
      },
    ],
  },
  {
    id: "valiant",
    title: "Ask VALIANT",
    eyebrow: "Project",
    subtitle: "AI research discovery",
    blocks: [
      {
        type: "paragraph",
        text: "Ask VALIANT is an AI research discovery project — a smarter way to search and surface research.",
      },
      {
        type: "todo",
        text: "Add 2-3 sentences: what Ask VALIANT does, who it's for, and how it works.",
      },
      { type: "heading", text: "Built with" },
      { type: "tags", items: ["TODO: tech", "TODO: tech", "TODO: tech"] },
      {
        type: "links",
        links: [
          { label: "Live", href: "#", todo: true },
          { label: "GitHub repo", href: "#", todo: true },
        ],
      },
    ],
  },
  {
    id: "vuit",
    title: "Vanderbilt University IT",
    eyebrow: "Experience",
    subtitle: "Vanderbilt University Information Technology (VUIT)",
    blocks: [
      {
        type: "meta",
        items: [
          { label: "Role", value: "TODO: your title" },
          { label: "Org", value: "Vanderbilt University Information Technology" },
          { label: "Dates", value: "TODO: start – end" },
        ],
      },
      {
        type: "todo",
        text: "Describe what you do at VUIT: support, systems, tooling, scripts, who you help.",
      },
      {
        type: "tags",
        items: ["TODO: tech", "TODO: tech"],
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    eyebrow: 'git commit -m "build cool things"',
    subtitle: "Things I've built",
    blocks: [
      { type: "heading", text: "SpIQ", anchor: "p-spiq" },
      {
        type: "paragraph",
        text: "AI communication coach · 1st Place & Hacker's Choice, HackMT 2026. See the SpIQ window for details.",
      },
      { type: "heading", text: "Ask VALIANT", anchor: "p-valiant" },
      {
        type: "paragraph",
        text: "AI research discovery. See the Ask VALIANT window for details.",
      },
      { type: "heading", text: "More", anchor: "p-more" },
      {
        type: "todo",
        text: "Add any other projects (name, one-line description, link).",
      },
      {
        type: "links",
        links: [{ label: "GitHub", href: githubUrl, todo: true }],
      },
    ],
  },
  {
    id: "off-the-clock",
    title: "Off the clock",
    eyebrow: "Interests",
    subtitle: "What I get up to away from the keyboard",
    blocks: [
      { type: "heading", text: "Violin", anchor: "violin" },
      {
        type: "todo",
        text: "A line or two about playing violin — how long, what you play, ensembles.",
      },
      { type: "heading", text: "Hiking", anchor: "hiking" },
      {
        type: "todo",
        text: "A line or two about hiking — favorite trails, parks, trips.",
      },
      { type: "heading", text: "Film", anchor: "film" },
      {
        type: "todo",
        text: "A line or two about films & series you love.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    eyebrow: "Say hello",
    subtitle: "Get in touch",
    blocks: [
      {
        type: "note",
        text: "Email has a copy button in this window.",
      },
      {
        type: "links",
        links: [
          { label: "GitHub", href: githubUrl, todo: true },
          { label: "LinkedIn", href: linkedinUrl, todo: true },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Stickers (clickable lid)                                           */
/* ------------------------------------------------------------------ */

/** Importance tier -> controls size. Sizes live in CSS, not here. */
export type SizeTier = "XL" | "L" | "M" | "S";

/** Placeholder silhouette used when no image is available. */
export type StickerShape = "circle" | "rounded" | "tag";

/**
 * The lid is a CSS grid; stickers are packed collage-style by placing each one
 * into a named grid area. `areas` is one string per row — each token is a
 * sticker `id` (so a sticker spans every cell showing its id) or "." for an
 * open cell. This is the whole layout: edit these strings to repack the lid.
 *
 * Tiers come out of how many cells a sticker covers: FK (XL) is the big 4×4
 * block dead-center, the four L stickers are 2×2 corners, the M stickers are
 * 2×1 / 1×2 pills, and the S stickers are single cells. No id may form a
 * non-rectangular region, and every id below must appear in each layout.
 */
export interface LidLayout {
  cols: number;
  rows: number;
  areas: string[];
}

export const lidLayout: { desktop: LidLayout; mobile: LidLayout } = {
  // 8 × 6, landscape. FK 4×4 centered; L in the four corners; M pills across
  // the top and bottom; S single cells tucked into the corners.
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
  // 6 × 8, portrait. Same idea, stacked taller; side M stickers become tall
  // 1×2 pills.
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
  /** Text shown on the placeholder and used in the aria-label. */
  label: string;
  /** Full accessible description, e.g. "VandyHacks sticker — opens Leadership". */
  ariaLabel: string;
  /** Path under /public, e.g. "/stickers/vandyhacks.svg". Optional. */
  image?: string;
  /** Importance tier (documents the hierarchy; sizing comes from the layout). */
  size: SizeTier;
  /** Placeholder silhouette / border-radius: circle, rounded rect, or pill. */
  shape: StickerShape;
  /** Soft fill color for the placeholder (CSS color). */
  color: string;
  /** Section id this sticker opens (omit for link stickers). */
  opens?: string;
  /** Optional anchor within the section to scroll to / highlight. */
  highlight?: string;
  /**
   * If set, the sticker is an external link that opens this URL in a new tab
   * instead of opening a window. (GitHub, LinkedIn, etc.)
   */
  href?: string;
}
export const stickers: Sticker[] = [
  {
    id: "fk",
    label: "{ FK }",
    ariaLabel: "FK logo sticker — opens About",
    image: "/stickers/fk.svg",
    size: "XL",
    shape: "rounded",
    color: "#1f2937",
    opens: "about",
  },
  {
    id: "amplify",
    label: "AMPLIFY",
    ariaLabel: "AMPLIFY sticker — opens my AMPLIFY internship experience",
    image: "/stickers/amplify.svg",
    size: "L",
    shape: "rounded",
    color: "#7c3aed",
    opens: "amplify",
  },
  {
    id: "spiq",
    label: "SpIQ",
    ariaLabel: "SpIQ sticker — opens the SpIQ project",
    image: "/stickers/spiq.svg",
    size: "L",
    shape: "circle",
    color: "#0ea5e9",
    opens: "spiq",
  },
  {
    id: "vandyhacks",
    label: "VandyHacks",
    ariaLabel: "VandyHacks sticker — opens Leadership",
    image: "/stickers/vandyhacks.svg",
    size: "L",
    shape: "rounded",
    color: "#f59e0b",
    opens: "leadership",
  },
  {
    id: "vanderbilt",
    label: "Vanderbilt",
    ariaLabel: "Vanderbilt sticker — opens Education",
    image: "/stickers/vanderbilt.svg",
    size: "L",
    shape: "rounded",
    color: "#b45309",
    opens: "education",
  },
  {
    id: "ai",
    label: "AI",
    ariaLabel: "Neural network sticker — opens my interest in AI",
    image: "/stickers/ai.svg",
    size: "M",
    shape: "circle",
    color: "#10b981",
    opens: "ai",
  },
  {
    id: "valiant",
    label: "Ask VALIANT",
    ariaLabel: "Ask VALIANT sticker — opens the Ask VALIANT project",
    image: "/stickers/valiant.svg",
    size: "M",
    shape: "rounded",
    color: "#6366f1",
    opens: "valiant",
  },
  {
    id: "vuit",
    label: "VUIT",
    ariaLabel: "IT sticker — opens my work with Vanderbilt University IT",
    image: "/stickers/vuit.svg",
    size: "M",
    shape: "rounded",
    color: "#334155",
    opens: "vuit",
  },
  {
    id: "git-commit",
    label: 'git commit -m "build cool things"',
    ariaLabel: "git commit sticker — opens Projects and my GitHub",
    image: "/stickers/git-commit.svg",
    size: "M",
    shape: "tag",
    color: "#0f172a",
    opens: "projects",
  },
  {
    id: "github",
    label: "GitHub",
    ariaLabel: "GitHub sticker — opens my GitHub profile in a new tab",
    image: "/stickers/github.svg",
    size: "M",
    shape: "circle",
    color: "#24292f",
    href: githubUrl,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    ariaLabel: "LinkedIn sticker — opens my LinkedIn profile in a new tab",
    image: "/stickers/linkedin.svg",
    size: "M",
    shape: "rounded",
    color: "#0a66c2",
    href: linkedinUrl,
  },
  {
    id: "violin",
    label: "Violin",
    ariaLabel: "Violin sticker — opens Off the clock, highlighting violin",
    image: "/stickers/violin.svg",
    size: "S",
    shape: "rounded",
    color: "#92400e",
    opens: "off-the-clock",
    highlight: "violin",
  },
  {
    id: "hiking",
    label: "Hiking",
    ariaLabel: "Mountain sticker — opens Off the clock, highlighting hiking",
    image: "/stickers/hiking.svg",
    size: "S",
    shape: "circle",
    color: "#15803d",
    opens: "off-the-clock",
    highlight: "hiking",
  },
  {
    id: "film",
    label: "Film",
    ariaLabel: "Film strip sticker — opens Off the clock, highlighting film",
    image: "/stickers/film.svg",
    size: "S",
    shape: "rounded",
    color: "#7e22ce",
    opens: "off-the-clock",
    highlight: "film",
  },
];

/** Look up helpers. */
export const sectionById = (id: string): Section | undefined =>
  sections.find((s) => s.id === id);

export const stickerForSection = (id: string): Sticker | undefined =>
  stickers.find((s) => s.opens === id);
