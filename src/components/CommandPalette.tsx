"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { goToSection } from "@/lib/nav";
import {
  caseStudies,
  contactEmail,
  githubUrl,
  linkedinUrl,
  navSections,
  resumeUrl,
} from "@/data/portfolio";

type Item =
  | { kind: "section"; label: string; hint: string; run: () => void }
  | { kind: "case"; label: string; hint: string; run: () => void }
  | { kind: "action"; label: string; hint: string; run: () => void };

const GROUP_LABEL: Record<Item["kind"], string> = {
  section: "Jump to",
  case: "Case studies",
  action: "Actions",
};

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    restoreFocus.current?.focus?.();
  }, []);

  const navigateSection = useCallback(
    (id: string) => {
      if (pathname === "/") {
        goToSection(id);
      } else {
        router.push(`/#${id}`);
      }
    },
    [pathname, router],
  );

  // All available commands.
  const items = useMemo<Item[]>(() => {
    const sections: Item[] = navSections.map((s) => ({
      kind: "section",
      label: s.label,
      hint: "section",
      run: () => navigateSection(s.id),
    }));
    const cases: Item[] = caseStudies.map((c) => ({
      kind: "case",
      label: c.title,
      hint: "case study",
      run: () => router.push(`/projects/${c.slug}`),
    }));
    const actions: Item[] = [
      {
        kind: "action",
        label: "Copy email",
        hint: contactEmail,
        run: () => {
          void navigator.clipboard?.writeText(contactEmail);
        },
      },
      {
        kind: "action",
        label: "Open résumé",
        hint: "new tab",
        run: () => window.open(resumeUrl, "_blank", "noopener,noreferrer"),
      },
      {
        kind: "action",
        label: "GitHub",
        hint: "new tab",
        run: () => window.open(githubUrl, "_blank", "noopener,noreferrer"),
      },
      {
        kind: "action",
        label: "LinkedIn",
        hint: "new tab",
        run: () => window.open(linkedinUrl, "_blank", "noopener,noreferrer"),
      },
    ];
    return [...sections, ...cases, ...actions];
  }, [navigateSection, router]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q));
  }, [items, query]);

  // Open on ⌘K / Ctrl+K and on the custom event from the header hint. Selection
  // is reset here (in event callbacks, not an effect body) to avoid cascading
  // renders.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSelected(0);
        setOpen((o) => !o);
      }
    };
    const onOpenEvent = () => {
      setSelected(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, []);

  // Focus the input when opening; remember what to restore focus to.
  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement;
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (visible.length ? (s + 1) % visible.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) =>
        visible.length ? (s - 1 + visible.length) % visible.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = visible[selected];
      if (item) {
        item.run();
        close();
      }
    }
  };

  // Scroll the selected row into view.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${selected}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [selected, open]);

  if (!open) return null;

  let lastKind: Item["kind"] | null = null;

  return (
    <div
      className="cmdk-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="cmdk"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <input
          ref={inputRef}
          className="cmdk-input"
          type="text"
          placeholder="Jump to a section, open a case study, copy email…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          onKeyDown={onInputKey}
          aria-label="Command palette search"
          aria-controls="cmdk-list"
          autoComplete="off"
          spellCheck={false}
        />

        <ul ref={listRef} id="cmdk-list" className="cmdk-list" role="listbox">
          {visible.length === 0 && <li className="cmdk-empty">No matches</li>}
          {visible.map((item, i) => {
            const showGroup = item.kind !== lastKind;
            lastKind = item.kind;
            return (
              <li key={`${item.kind}-${item.label}`} role="presentation">
                {showGroup && (
                  <div className="cmdk-group" aria-hidden="true">
                    {GROUP_LABEL[item.kind]}
                  </div>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === selected}
                  data-index={i}
                  className={`cmdk-item${i === selected ? " is-selected" : ""}`}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => {
                    item.run();
                    close();
                  }}
                >
                  <span className="cmdk-item__label">{item.label}</span>
                  <span className="cmdk-item__hint">{item.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="cmdk-footer" aria-hidden="true">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
