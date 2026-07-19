"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BG_IMAGES } from "@/data/menu";

export function BackgroundSlideshow() {
  const [bgIndex, setBgIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((current) => (current + 1) % BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {BG_IMAGES.map((src, index) => (
        // eslint-disable-next-line @next/next/no-img-element -- reliable full-bleed crossfade layers
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: index === bgIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
    </div>,
    document.body
  );
}
