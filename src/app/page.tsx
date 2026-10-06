"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Laptop } from "@/components/Laptop";
import { Window } from "@/components/Window";
import { SectionContent } from "@/components/sections/SectionContent";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { sectionById, type Sticker } from "@/data/portfolio";

function isValidTarget(id: string): boolean {
  return Boolean(sectionById(id));
}

interface ActiveWindow {
  id: string;
  highlight?: string;
}

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const [active, setActive] = useState<ActiveWindow | null>(null);

  // Element to return focus to when the window closes.
  const triggerRef = useRef<HTMLElement | null>(null);
  // Carries the highlight anchor across the hashchange round-trip.
  const pending = useRef<ActiveWindow | null>(null);

  // Sync open window <-> URL hash (deep links + back/forward).
  useEffect(() => {
    const applyHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (h && isValidTarget(h)) {
        const highlight =
          pending.current?.id === h ? pending.current.highlight : undefined;
        setActive({ id: h, highlight });
      } else {
        setActive(null);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const open = useCallback(
    (id: string, trigger?: HTMLElement | null, highlight?: string) => {
      if (!isValidTarget(id)) return;
      if (trigger) triggerRef.current = trigger;
      pending.current = { id, highlight };
      if (window.location.hash.slice(1) === id) {
        setActive({ id, highlight });
      } else {
        window.location.hash = id;
      }
    },
    [],
  );

  const close = useCallback(() => {
    pending.current = null;
    // Drop the hash without leaving a "#" or a dangling history entry.
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    setActive(null);
    const t = triggerRef.current;
    triggerRef.current = null;
    t?.focus();
  }, []);

  const onStickerOpen = useCallback(
    (sticker: Sticker, trigger: HTMLButtonElement) => {
      if (sticker.opens) open(sticker.opens, trigger, sticker.highlight);
    },
    [open],
  );

  const onOpenContact = useCallback(
    (trigger: HTMLButtonElement) => {
      open("contact", trigger);
    },
    [open],
  );

  const onNavigate = useCallback(
    (sectionId: string) => {
      open(sectionId);
    },
    [open],
  );

  const section = active ? sectionById(active.id) : null;

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <Header onOpenContact={onOpenContact} />

      {/* At least 24px of clear space between the header row and the laptop. */}
      <main className="laptop-area flex min-h-0 flex-1 items-center justify-center px-2 pt-[clamp(1.5rem,3vh,2rem)] sm:px-3">
        <Laptop isMobile={isMobile} onOpen={onStickerOpen} />
      </main>

      <footer className="shrink-0 px-4 pt-1.5 pb-3 text-center">
        <p className="font-[family-name:var(--font-mono)] text-xs text-white/70 sm:text-sm">
          Click a sticker to learn more.
        </p>
      </footer>

      {active && section && (
        <Window
          title={section.title}
          eyebrow={section.eyebrow}
          subtitle={section.subtitle}
          isMobile={isMobile}
          onClose={close}
        >
          <SectionContent
            section={section}
            highlight={active.highlight}
            onNavigate={onNavigate}
          />
        </Window>
      )}
    </div>
  );
}
