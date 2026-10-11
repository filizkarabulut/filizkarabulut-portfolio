"use client";

import { useEffect } from "react";
import { repoUrl } from "@/data/portfolio";

/** A friendly note in the devtools console for curious engineers. */
export function ConsoleGreeting() {
  useEffect(() => {
    const title =
      "color:#8ab4ff;font-size:13px;font-weight:700;font-family:ui-monospace,monospace";
    const body = "color:#9aa3af;font-size:12px;font-family:ui-monospace,monospace";
    console.log(
      "%cHi there, fellow engineer 👋%c\nPoking around the console? I like you already.\nSource: " +
        repoUrl +
        "\nSay hi — press ⌘K / Ctrl+K to copy my email.",
      title,
      body,
    );
  }, []);

  return null;
}
