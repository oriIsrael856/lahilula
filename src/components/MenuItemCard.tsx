"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  COUSCOUS_DEFAULT_QTY,
  isBulkMenuItem,
  isCouscousItem,
} from "@/data/menu";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { MenuItem } from "@/types/menu";

type MenuItemCardProps = {
  item: MenuItem;
  qty: number;
  update: (id: number, delta: number) => void;
  /** Compact fixed-width card for horizontal category carousels */
  variant?: "list" | "carousel";
};

function normalizeSrc(src: string): string {
  return src.startsWith("/") ? src : `/${src}`;
}

export function MenuItemCard({ item, qty, update, variant = "list" }: MenuItemCardProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const isBulkItem = isBulkMenuItem(item);
  const isCouscous = isCouscousItem(item);
  const images = item.images.map(normalizeSrc);
  const isCarousel = variant === "carousel";

  useEffect(() => {
    if (reducedMotion || images.length <= 1) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const delay = Math.random() * 2000;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
      }, 3500);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [images.length, reducedMotion]);

  return (
    <article
      role={isCarousel ? "listitem" : undefined}
      className={
        isCarousel
          ? "snap-start shrink-0 w-[260px] sm:w-[300px] bg-surface-elevated/80 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 group"
          : "border-b border-white/10 py-5 flex flex-col sm:flex-row gap-4 group"
      }
    >
      {images.length > 0 && (
        <div
          className={
            isCarousel
              ? "w-full h-40 relative overflow-hidden flex-shrink-0 bg-black/40 rounded-xl"
              : "w-full sm:w-36 h-48 sm:h-36 relative overflow-hidden flex-shrink-0 bg-black/40 rounded-xl"
          }
        >
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={item.name}
              fill
              sizes={isCarousel ? "300px" : "(max-width: 640px) 100vw, 144px"}
              className={`object-cover transition-opacity duration-1000 motion-reduce:transition-none motion-safe:group-hover:scale-[1.02] ${
                index === currentImg ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1" aria-hidden="true">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentImg ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3
            className={`font-display font-bold group-hover:text-accent-rose transition-colors ${
              isCarousel ? "text-lg line-clamp-2" : "text-xl"
            }`}
          >
            {item.name}
          </h3>
          <p
            className={`text-gray-400 mt-1 leading-relaxed ${
              isCarousel ? "text-xs line-clamp-3" : "text-sm"
            }`}
          >
            {item.desc}
          </p>
        </div>

        <div className="flex items-end justify-between mt-4 gap-3">
          <div className="flex flex-col min-w-0">
            <span
              className="text-brand font-black text-lg"
              aria-label={`מחיר: ${item.price} שקלים${isCouscous ? " למנה" : ""}`}
            >
              ₪{item.price}
              {isCouscous && (
                <span className="text-sm font-bold text-gray-400">/מנה</span>
              )}
            </span>
            {isCouscous && (
              <span className="text-[11px] text-sage mt-1">
                ברירת מחדל {COUSCOUS_DEFAULT_QTY} מנות · ₪
                {item.price * COUSCOUS_DEFAULT_QTY}
              </span>
            )}
            {isBulkItem && (
              <span className="text-[11px] text-sage mt-1">מינימום 30 יח&apos;</span>
            )}
          </div>

          <div className="flex items-center gap-2 bg-surface-elevated/90 p-1.5 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => update(item.id, 1)}
              aria-label={`הוסף ${item.name}`}
              className="w-10 h-10 bg-gradient-to-br from-sage to-sage-deep rounded-xl font-bold text-xl active:scale-90 transition-transform text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              +
            </button>
            <span className="font-black text-lg min-w-8 text-center" aria-live="polite">
              {qty || 0}
            </span>
            <button
              type="button"
              onClick={() => update(item.id, -1)}
              disabled={!qty}
              aria-label={`הפחת ${item.name}`}
              className={`w-10 h-10 bg-[#222] text-gray-400 rounded-xl font-bold text-xl active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                qty ? "opacity-100 hover:bg-white hover:text-black" : "opacity-20 cursor-not-allowed"
              }`}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
