"use client";

import { useEffect, useRef, useState } from "react";
import {
  contactEmail,
  type ContentBlock,
  type LinkItem,
  type Section,
} from "@/data/portfolio";

interface SectionContentProps {
  section: Section;
  /** Anchor to scroll to and flash, if the window was opened to one. */
  highlight?: string;
  /** Open another section from an in-content link (href starting with "#"). */
  onNavigate: (sectionId: string) => void;
}

export function SectionContent({
  section,
  highlight,
  onNavigate,
}: SectionContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll to and flash the highlighted anchor.
  useEffect(() => {
    if (!highlight || !rootRef.current) return;
    const el = rootRef.current.querySelector<HTMLElement>(
      `[data-anchor="${highlight}"]`,
    );
    if (!el) return;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    el.classList.add("anchor-flash");
    const t = setTimeout(() => el.classList.remove("anchor-flash"), 1700);
    return () => clearTimeout(t);
  }, [highlight]);

  return (
    <div ref={rootRef} className="space-y-4 text-[15px] leading-relaxed text-black/80">
      {section.id === "contact" && <EmailCopy />}

      {section.blocks.map((block, i) => (
        <Block key={i} block={block} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function Block({
  block,
  onNavigate,
}: {
  block: ContentBlock;
  onNavigate: (sectionId: string) => void;
}) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;

    case "heading":
      return (
        <h3
          data-anchor={block.anchor}
          className="scroll-mt-4 pt-1 font-[family-name:var(--font-display)] text-lg font-bold text-[color:var(--color-ink)]"
        >
          {block.text}
        </h3>
      );

    case "list":
      return (
        <ul className="ml-1 space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden="true" className="mt-[2px] text-blue-500">
                ▹
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "meta":
      return (
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 rounded-lg bg-black/[0.03] p-3 font-[family-name:var(--font-mono)] text-[13px]">
          {block.items.map((item, i) => (
            <div key={i} className="contents">
              <dt className="text-black/45">{item.label}</dt>
              <dd className="text-black/80">{item.value}</dd>
            </div>
          ))}
        </dl>
      );

    case "tags":
      return (
        <ul className="flex flex-wrap gap-2">
          {block.items.map((tag, i) => (
            <li
              key={i}
              className="rounded-full bg-blue-50 px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-blue-700 ring-1 ring-blue-200"
            >
              {tag}
            </li>
          ))}
        </ul>
      );

    case "links":
      return (
        <ul className="flex flex-wrap gap-2.5">
          {block.links.map((link, i) => (
            <li key={i}>
              <LinkChip link={link} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      );

    case "note":
      return (
        <p className="rounded-md border-l-2 border-amber-400 bg-amber-50 px-3 py-2 text-[13px] text-amber-900">
          {block.text}
        </p>
      );

    case "todo":
      return (
        <p className="rounded-md border border-dashed border-black/20 bg-black/[0.02] px-3 py-2 font-[family-name:var(--font-mono)] text-[13px] text-black/55">
          <span className="font-semibold text-black/70">TODO:</span>{" "}
          {block.text}
        </p>
      );
  }
}

function LinkChip({
  link,
  onNavigate,
}: {
  link: LinkItem;
  onNavigate: (sectionId: string) => void;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ring-1 transition-colors";
  const styled = link.todo
    ? `${base} bg-black/[0.03] text-black/45 ring-black/10`
    : `${base} bg-blue-600 text-white ring-blue-700 hover:bg-blue-700`;

  // Internal link to another section window.
  if (link.href.startsWith("#")) {
    return (
      <button
        type="button"
        onClick={() => onNavigate(link.href.slice(1))}
        className={styled}
      >
        {link.label} <span aria-hidden="true">→</span>
      </button>
    );
  }

  const external = /^https?:\/\//.test(link.href);
  return (
    <a
      href={link.href}
      className={styled}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {link.label}
      {link.todo && (
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase">
          (todo)
        </span>
      )}
    </a>
  );
}

function EmailCopy() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg bg-black/[0.03] p-3">
      <a
        href={`mailto:${contactEmail}`}
        className="font-[family-name:var(--font-mono)] text-sm text-blue-700 hover:underline"
      >
        {contactEmail}
      </a>
      <button
        type="button"
        onClick={copy}
        className="ml-auto rounded-md bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
