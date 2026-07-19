"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type CategoryCarouselProps = {
  children: ReactNode;
  label: string;
};

export function CategoryCarousel({ children, label }: CategoryCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 2) {
      setCanScrollStart(false);
      setCanScrollEnd(false);
      return;
    }

    const left = el.scrollLeft;
    // RTL browsers may report negative scrollLeft
    const absLeft = Math.abs(left);
    const atStart = absLeft <= 2;
    const atEnd = absLeft >= maxScroll - 2;

    setCanScrollStart(!atStart);
    setCanScrollEnd(!atEnd);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Defer so setState is not synchronous inside the effect body (eslint react-hooks)
    const frame = requestAnimationFrame(() => updateScrollState());
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateScrollState);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, children]);

  const scrollByPage = (direction: "start" | "end") => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.max(240, Math.floor(el.clientWidth * 0.85));
    const rtl = getComputedStyle(el).direction === "rtl";
    // In RTL, moving toward the end of the list is visually to the left
    const sign = rtl
      ? direction === "end"
        ? -1
        : 1
      : direction === "end"
        ? 1
        : -1;

    el.scrollBy({ left: sign * amount, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      <button
        type="button"
        onClick={() => scrollByPage("start")}
        disabled={!canScrollStart}
        aria-label={`גלול ימינה בקטגוריית ${label}`}
        className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-brand/40 bg-surface/90 text-brand shadow-lg flex items-center justify-center transition-opacity focus:outline-none focus:ring-2 focus:ring-brand ${
          canScrollStart
            ? "opacity-100 hover:bg-brand hover:text-white"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => scrollByPage("end")}
        disabled={!canScrollEnd}
        aria-label={`גלול שמאלה בקטגוריית ${label}`}
        className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-brand/40 bg-surface/90 text-brand shadow-lg flex items-center justify-center transition-opacity focus:outline-none focus:ring-2 focus:ring-brand ${
          canScrollEnd
            ? "opacity-100 hover:bg-brand hover:text-white"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 py-3 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        role="list"
        aria-label={label}
      >
        {children}
      </div>
    </div>
  );
}
