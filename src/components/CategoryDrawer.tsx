"use client";

import { useCallback, useRef } from "react";
import { CATEGORIES } from "@/data/menu";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type CategoryDrawerProps = {
  open: boolean;
  activeCategory: string;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  onOpenAbout: () => void;
};

export function CategoryDrawer({
  open,
  activeCategory,
  onClose,
  onSelectCategory,
  onOpenAbout,
}: CategoryDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const handleEscape = useCallback(() => onClose(), [onClose]);
  useFocusTrap(panelRef, open, handleEscape);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start" role="dialog" aria-modal="true" aria-label="תפריט ניווט">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="relative bg-surface-elevated w-3/4 max-w-sm h-full shadow-2xl p-8 border-l border-brand/20 flex flex-col overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-display text-2xl font-bold text-brand">תפריט</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="סגור תפריט"
            className="text-white hover:text-red-400 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-brand p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="w-full text-right p-4 rounded-xl text-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand text-brand hover:bg-white/5 border border-brand/30 mb-4"
          >
            הסיפור שלי
          </button>

          {CATEGORIES.filter((cat) => cat !== "הכל").map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`w-full text-right p-4 rounded-xl text-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand ${
                activeCategory === cat
                  ? "bg-brand text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/5 hover:text-brand"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          La Hilula · מהמטבח של אילנית
        </div>
      </div>
    </div>
  );
}
