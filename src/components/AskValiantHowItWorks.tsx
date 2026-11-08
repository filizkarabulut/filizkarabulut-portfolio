"use client";

import { useEffect, useRef, useState } from "react";
import { AskValiantArchitecture } from "./AskValiantArchitecture";
import { CodeBlock } from "./CodeBlock";
import { NODE_DETAILS, type NodeId } from "./askValiantNodes";

/**
 * The interactive "How It Works" column: the architecture diagram plus a single
 * swappable detail area beneath it. By default that area shows the summary
 * bullets; clicking a component (router, an assistant, or faculty matching)
 * replaces them with that component's detail panel. Only one panel is open at a
 * time; selecting another swaps it, and Close (button or Esc) returns to the
 * bullets. Keeping both states in the same slot avoids layout jumps.
 */
export function AskValiantHowItWorks({ points }: { points: string[] }) {
  const [selected, setSelected] = useState<NodeId | null>(null);
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const select = (id: NodeId) => {
    setSelected((cur) => (cur === id ? null : id));
    setExpanded(false); // each component opens collapsed
  };

  // Esc closes the detail panel first (not the whole modal). Capture phase +
  // stopPropagation keeps the modal's own Esc handler from also firing.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setSelected(null);
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [selected]);

  // Move focus into the panel when it opens, for keyboard users. preventScroll
  // keeps selecting a component from shifting the modal's scroll position.
  useEffect(() => {
    if (selected) panelRef.current?.focus({ preventScroll: true });
  }, [selected]);

  const detail = selected ? NODE_DETAILS[selected] : null;
  const hasMore = Boolean(detail && (detail.details?.length || detail.code));

  return (
    <>
      <AskValiantArchitecture selected={selected} onSelect={select} />

      {/* Fixed-height slot so switching components never shifts the layout. */}
      <div className="av2-explore">
        {detail ? (
          <div
            className="av2-detail"
            ref={panelRef}
            tabIndex={-1}
            role="region"
            aria-label={`${detail.title} details`}
          >
            <div className="av2-detail__head">
              <h4 className="av2-detail__title">{detail.title}</h4>
              <button
                type="button"
                className="av2-detail__close mono"
                onClick={() => setSelected(null)}
                aria-label="Close details"
              >
                Close ✕
              </button>
            </div>
            <p className="av2-detail__summary">{detail.summary}</p>

            {hasMore && (
              <>
                <button
                  type="button"
                  className="av2-detail__toggle mono"
                  aria-expanded={expanded}
                  onClick={() => setExpanded((v) => !v)}
                >
                  <span aria-hidden="true">{expanded ? "▾" : "▸"}</span> View
                  technical details
                </button>
                {expanded && (
                  <div className="av2-detail__more">
                    {detail.details?.map((p, i) => (
                      <p key={i} className="av2-detail__p">
                        {p}
                      </p>
                    ))}
                    {detail.code && <CodeBlock code={detail.code} />}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <>
            {points.length > 0 && (
              <ul className="bullets av2-points">
                {points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            )}
            <p className="av2-hint mono" aria-hidden="true">
              Click the router, an assistant, or faculty matching to explore
              the implementation.
            </p>
          </>
        )}
      </div>
    </>
  );
}
