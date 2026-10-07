"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Laptop } from "@/components/Laptop";
import { Card } from "@/components/Card";
import { SectionContent } from "@/components/sections/SectionContent";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { sectionById, type Sticker } from "@/data/portfolio";

function isValidTarget(id: string): boolean {
  return Boolean(sectionById(id));
}

interface ActiveCard {
  id: string;
  highlight?: string;
}

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  // Below this width there is no room beside the lid -> use a bottom sheet.
  const sideBySide = useMediaQuery("(min-width: 900px)");
  const [active, setActive] = useState<ActiveCard | null>(null);

  // Element to return focus to when the card closes.
  const triggerRef = useRef<HTMLElement | null>(null);
  // Carries the highlight anchor across the hashchange round-trip.
  const pending = useRef<ActiveCard | null>(null);

  // Sync open card <-> URL hash (deep links + back/forward).
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
      if (!sticker.opens) return;
      // Clicking the sticker whose card is already open closes it again.
      if (active?.id === sticker.opens) {
        close();
      } else {
        open(sticker.opens, trigger, sticker.highlight);
      }
    },
    [active, open, close],
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
  const cardOpen = Boolean(active && section);

  // One Card node, rendered either beside the lid or as a bottom sheet. Keeping
  // it unkeyed means swapping sections updates props in place (no reopen); the
  // body is keyed internally so only its content cross-fades.
  const card =
    active && section ? (
      <Card
        variant={sideBySide ? "side" : "sheet"}
        contentKey={active.id}
        title={section.title}
        eyebrow={section.eyebrow}
        subtitle={section.subtitle}
        onClose={close}
      >
        <SectionContent
          section={section}
          highlight={active.highlight}
          onNavigate={onNavigate}
        />
      </Card>
    ) : null;

  return (
    <div
      className="desk"
      data-card-open={cardOpen ? "true" : "false"}
      style={{ "--ratio": isMobile ? "0.75" : "1.4" } as React.CSSProperties}
    >
      {/* Header + lid + hint share the lid's width and slide together. */}
      <div className="desk-shift">
        <div className="desk-header">
          <Header onOpenContact={onOpenContact} />
        </div>

        <div className="desk-row">
          <Laptop
            isMobile={isMobile}
            activeId={active?.id ?? null}
            onOpen={onStickerOpen}
          />
          {sideBySide && card}
        </div>

        <p className="desk-hint font-[family-name:var(--font-mono)] text-xs text-white/70 sm:text-sm">
          Click a sticker to learn more.
        </p>
      </div>

      {/* Bottom sheet (narrow screens) sits outside the sliding column. */}
      {!sideBySide && card}
    </div>
  );
}
