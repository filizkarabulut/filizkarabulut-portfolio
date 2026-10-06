"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface WindowProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  isMobile: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Window({
  title,
  eyebrow,
  subtitle,
  isMobile,
  onClose,
  children,
}: WindowProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [maximized, setMaximized] = useState(false);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const dragState = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const draggable = !isMobile && !maximized;

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Move focus into the dialog on open.
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!draggable) return;
      // Ignore drags that start on the traffic-light buttons.
      if ((e.target as HTMLElement).closest("button")) return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: drag.x,
        originY: drag.y,
      };
    },
    [draggable, drag.x, drag.y],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = dragState.current;
    if (!s) return;
    setDrag({
      x: s.originX + (e.clientX - s.startX),
      y: s.originY + (e.clientY - s.startY),
    });
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragState.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div
        className="backdrop-in absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`window-pop chrome-font relative flex flex-col overflow-hidden rounded-xl bg-white/95 shadow-2xl ring-1 ring-black/10 outline-none backdrop-blur-xl ${
          maximized
            ? "h-full w-full max-w-5xl"
            : "max-h-[85vh] w-full max-w-lg sm:max-w-xl"
        }`}
        style={
          draggable
            ? { transform: `translate(${drag.x}px, ${drag.y}px)` }
            : undefined
        }
      >
        {/* Title bar */}
        <div
          className={`flex items-center gap-3 border-b border-black/10 bg-gradient-to-b from-[#f6f6f7] to-[#e9eaec] px-3 py-2.5 select-none ${
            draggable ? "cursor-grab active:cursor-grabbing" : ""
          }`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Close window"
              onClick={onClose}
              className="group grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ff5f57] ring-1 ring-black/10"
            >
              <span className="text-[8px] leading-none text-black/50 opacity-0 group-hover:opacity-100">
                ✕
              </span>
            </button>
            <button
              type="button"
              aria-label="Close window"
              onClick={onClose}
              className="group grid h-3.5 w-3.5 place-items-center rounded-full bg-[#febc2e] ring-1 ring-black/10"
            >
              <span className="text-[8px] leading-none text-black/50 opacity-0 group-hover:opacity-100">
                −
              </span>
            </button>
            <button
              type="button"
              aria-label={maximized ? "Restore window size" : "Maximize window"}
              aria-pressed={maximized}
              onClick={() => setMaximized((m) => !m)}
              className="group grid h-3.5 w-3.5 place-items-center rounded-full bg-[#28c840] ring-1 ring-black/10"
            >
              <span className="text-[8px] leading-none text-black/50 opacity-0 group-hover:opacity-100">
                {maximized ? "–" : "+"}
              </span>
            </button>
          </div>

          <p
            id={titleId}
            className="flex-1 truncate text-center text-[13px] font-semibold text-black/70"
          >
            {title}
          </p>

          {/* Spacer to keep title centered against the traffic lights. */}
          <div className="w-[52px]" aria-hidden="true" />
        </div>

        {/* Content — the only scrollable region on the page. */}
        <div className="window-scroll px-5 py-5 sm:px-7 sm:py-6">
          {(eyebrow || subtitle) && (
            <header className="mb-4">
              {eyebrow && (
                <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-blue-600/80 uppercase">
                  {eyebrow}
                </p>
              )}
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-ink)]">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-0.5 text-sm text-black/60">{subtitle}</p>
              )}
            </header>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
