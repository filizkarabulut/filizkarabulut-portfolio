"use client";

import { memo, useEffect, useRef, useState } from "react";

/**
 * A muted, looping preview video for a project card. It plays automatically
 * (muted, so browsers allow it) and pauses when scrolled out of view to save
 * work — without ever resetting its position, so unrelated re-renders don't make
 * it stutter. If the visitor prefers reduced motion, it shows the poster image
 * instead and never plays. Memoized so parent re-renders don't recreate it.
 */
export const CardVideo = memo(function CardVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Play only while on screen; pausing (not reloading) keeps the current frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reducedMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="pj-thumb__media" src={poster} alt={alt} loading="lazy" />;
  }

  return (
    <video
      ref={videoRef}
      className="pj-thumb__media"
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
});
