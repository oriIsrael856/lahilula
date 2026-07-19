"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { CartLineItem } from "@/types/menu";

type CartBarProps = {
  subtotal: number;
  cartItems: CartLineItem[];
  showReview: boolean;
  selectedForDelete: Set<number>;
  checkoutError: string | null;
  onToggleReview: () => void;
  onCloseReview: () => void;
  onToggleSelect: (id: number) => void;
  onSelectAll: () => void;
  onDeleteSelected: () => void;
  onUpdateQty: (id: number, delta: number) => void;
  onGenerateQuote: () => void;
  onSendOrder: () => void;
};

export function CartBar({
  subtotal,
  cartItems,
  showReview,
  selectedForDelete,
  checkoutError,
  onToggleReview,
  onCloseReview,
  onToggleSelect,
  onSelectAll,
  onDeleteSelected,
  onUpdateQty,
  onGenerateQuote,
  onSendOrder,
}: CartBarProps) {
  const reviewRef = useRef<HTMLDivElement>(null);
  const handleEscape = useCallback(() => onCloseReview(), [onCloseReview]);
  useFocusTrap(reviewRef, showReview, handleEscape);

  useEffect(() => {
    if (!checkoutError) return;
    const el = document.getElementById("checkout-error");
    el?.focus();
  }, [checkoutError]);

  if (subtotal <= 0) return null;

  return (
    <>
      {showReview && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onCloseReview}
          aria-hidden="true"
        />
      )}

      {showReview && (
        <div
          className="fixed bottom-[5.5rem] left-0 right-0 px-3 z-50 pointer-events-none"
          role="dialog"
          aria-modal="true"
          aria-label="רשימת פריטים בעגלה"
        >
          <div
            ref={reviewRef}
            className="max-w-3xl mx-auto pointer-events-auto bg-surface-elevated/98 border border-brand/40 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] max-h-[45vh] flex flex-col overflow-hidden motion-safe:animate-cart-up"
          >
            <div className="px-3 py-2.5 border-b border-white/10 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white">העגלה שלי</h3>
              <button
                type="button"
                onClick={onCloseReview}
                className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
              >
                סגור
              </button>
            </div>

            <ul className="overflow-y-auto p-2 space-y-1 flex-1">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5">
                  <input
                    type="checkbox"
                    checked={selectedForDelete.has(item.id)}
                    onChange={() => onToggleSelect(item.id)}
                    className="w-4 h-4 accent-brand shrink-0"
                    aria-label={`בחר ${item.name} למחיקה`}
                  />
                  <span className="flex-1 min-w-0 text-sm text-white truncate">{item.name}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, -1)}
                      aria-label={`הפחת ${item.name}`}
                      className="w-7 h-7 rounded-lg bg-white/10 text-white text-sm font-bold hover:bg-white/20"
                    >
                      -
                    </button>
                    <span className="text-xs text-gray-300 min-w-6 text-center">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, 1)}
                      aria-label={`הוסף ${item.name}`}
                      className="w-7 h-7 rounded-lg bg-white/10 text-white text-sm font-bold hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-bold text-brand shrink-0 min-w-[3.5rem] text-left">
                    ₪{item.total}
                  </span>
                </li>
              ))}
            </ul>

            <div className="px-2 py-2 border-t border-white/10 flex gap-2">
              <button
                type="button"
                onClick={onSelectAll}
                className="flex-1 py-2 text-xs font-bold bg-white/10 border border-white/15 text-white rounded-xl hover:bg-white/20 transition-all"
              >
                בחר הכל
              </button>
              <button
                type="button"
                onClick={onDeleteSelected}
                disabled={selectedForDelete.size === 0}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedForDelete.size > 0
                    ? "bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30"
                    : "bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
                }`}
              >
                מחק נבחרים{selectedForDelete.size > 0 ? ` (${selectedForDelete.size})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-3 left-0 right-0 px-3 z-50 pointer-events-none">
        <div className="max-w-3xl mx-auto pointer-events-auto space-y-2">
          {checkoutError && (
            <p
              id="checkout-error"
              role="alert"
              tabIndex={-1}
              className="bg-red-500/20 border border-red-500/40 text-red-200 text-sm font-bold px-4 py-2.5 rounded-xl outline-none"
            >
              {checkoutError}
            </p>
          )}
          <div className="bg-surface/95 border border-brand/40 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] px-3 py-2.5 flex items-center gap-2 motion-safe:animate-cart-up">
            <button
              type="button"
              onClick={onToggleReview}
              aria-expanded={showReview}
              aria-label={`${showReview ? "סגור" : "פתח"} רשימת פריטים בעגלה`}
              className={`shrink-0 min-w-[5.5rem] ps-1 pe-2 py-1 rounded-xl text-right transition-all ${
                showReview ? "bg-brand/20" : "hover:bg-white/5"
              }`}
            >
              <p className="text-xs text-gray-400 font-bold leading-none mb-0.5">סה&quot;כ</p>
              <p className="text-xl font-black text-white leading-tight">₪{subtotal}</p>
              <p className="text-xs text-brand font-bold leading-none mt-0.5">
                {cartItems.length} פריטים
              </p>
            </button>
            <button
              type="button"
              onClick={onGenerateQuote}
              aria-label="הפקת הצעת מחיר להדפסה"
              className="flex-1 min-w-0 py-3 px-2 text-sm font-bold bg-white/10 border border-white/15 text-white rounded-xl hover:bg-white/20 transition-all truncate"
            >
              הצעת מחיר
            </button>
            <button
              type="button"
              onClick={onSendOrder}
              aria-label={`בצע הזמנה בוואטסאפ על סך ${subtotal} שקלים`}
              className="flex-[1.15] min-w-0 py-3 px-2 text-sm font-black bg-brand text-white rounded-xl hover:bg-accent-rose transition-all truncate"
            >
              להזמנה
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
