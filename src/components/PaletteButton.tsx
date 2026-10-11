"use client";

/** The "⌘K" hint button — opens the command palette via a window event. */
export function PaletteButton() {
  return (
    <button
      type="button"
      className="kbd-hint"
      onClick={() =>
        window.dispatchEvent(new CustomEvent("open-command-palette"))
      }
      aria-label="Open command palette"
    >
      <span aria-hidden="true">⌘K</span>
    </button>
  );
}
