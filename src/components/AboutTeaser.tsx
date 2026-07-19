"use client";

import Image from "next/image";

type AboutTeaserProps = {
  onOpenStory: () => void;
};

export function AboutTeaser({ onOpenStory }: AboutTeaserProps) {
  return (
    <section className="mt-16 mb-8" aria-labelledby="about-heading">
      <div className="relative w-full overflow-hidden min-h-[320px] flex flex-col items-center justify-center p-8 border-y border-brand/25">
        <div className="absolute inset-0">
          <Image
            src="/about-bg.jpeg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover motion-safe:transition-transform motion-safe:duration-[2s] motion-safe:hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="relative w-24 h-24 mx-auto rounded-full border-2 border-brand shadow-xl overflow-hidden mb-5">
            <Image src="/profile.webp" alt="אילנית ישראל" fill sizes="96px" className="object-cover" />
          </div>

          <h2 id="about-heading" className="font-display text-3xl font-black text-white mb-3 tracking-wide">
            נעים להכיר, <span className="text-brand">אילנית</span>
          </h2>

          <p className="text-gray-200 leading-relaxed text-base font-light">
            &ldquo;המסע שלי התחיל במטבח של אמא, בין ריחות התבלינים והחום של הבית. היום אני מביאה אליכם את
            אותה אהבה, בכל מגש ובכל ביס.&rdquo;
          </p>

          <button
            type="button"
            onClick={onOpenStory}
            className="mt-6 inline-flex px-6 py-2.5 rounded-xl border border-brand/50 text-brand font-bold text-sm hover:bg-brand/15 transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
          >
            הסיפור המלא
          </button>
        </div>
      </div>
    </section>
  );
}
