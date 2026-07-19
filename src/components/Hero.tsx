"use client";

import Image from "next/image";

type HeroProps = {
  onOpenMenu: () => void;
  onResetCategory: () => void;
  isMenuOpen: boolean;
};

export function Hero({ onOpenMenu, onResetCategory, isMenuOpen }: HeroProps) {
  return (
    <header className="max-w-2xl mx-auto pt-10 pb-10 text-center relative">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="פתח תפריט קטגוריות"
        aria-expanded={isMenuOpen}
        className="absolute top-10 right-2 z-50 p-2 text-brand hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={onResetCategory}
          className="relative group cursor-pointer rounded-full focus:outline-none focus:ring-4 focus:ring-brand/50"
          aria-label="חזור לדף הבית והצג את כל המנות"
        >
          <Image
            src="/logo.jpg"
            alt="La Hilula Logo"
            width={160}
            height={160}
            priority
            className="relative w-40 h-40 object-contain rounded-full border border-white/5 shadow-2xl"
          />
        </button>
      </div>

      <h1 className="font-display text-6xl sm:text-7xl font-black tracking-tight text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-brand">
          La Hilula
        </span>
      </h1>

      <p className="mt-4 text-sage font-semibold text-base leading-relaxed max-w-md mx-auto">
        מטבח בוטיק ביתי — מגשי אירוח וטעמים מהבית המרוקאי
      </p>

      <a
        href="#menu"
        className="inline-flex mt-7 px-8 py-3 rounded-xl bg-brand text-white font-bold text-sm hover:bg-accent-rose transition-colors focus:outline-none focus:ring-2 focus:ring-white motion-safe:animate-hero-cta"
      >
        לתפריט
      </a>

      <p className="mt-5 text-xs text-gray-500">
        <a href="tel:0506669062" className="hover:text-brand transition-colors">
          050-666-9062
        </a>
        <span aria-hidden="true"> · </span>
        אילנית ישראל
      </p>
    </header>
  );
}
