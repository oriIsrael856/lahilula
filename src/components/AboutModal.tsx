"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AboutModal({ open, onClose }: AboutModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const handleEscape = useCallback(() => onClose(), [onClose]);
  useFocusTrap(panelRef, open, handleEscape);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        className="relative w-full max-w-4xl h-[85vh] bg-surface-elevated rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border border-brand/20 motion-safe:animate-fade-in"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-bg.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-surface-elevated/80 to-transparent" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="סגור"
          className="absolute top-6 left-6 z-20 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-brand"
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

        <div className="relative z-10 flex flex-col h-full overflow-y-auto">
          <div className="p-8 md:p-16 text-center max-w-2xl mx-auto">
            <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-brand shadow-2xl overflow-hidden mb-8">
              <Image src="/profile.webp" alt="אילנית" fill sizes="128px" className="object-cover" />
            </div>

            <h2 id="about-modal-title" className="font-display text-4xl md:text-5xl font-black text-white mb-2">
              המסע שלי
            </h2>
            <p className="text-brand text-lg font-bold tracking-widest mb-8">מהמטבח של אמא אליכם</p>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed text-right md:text-center font-light">
              <p>
                המסע הקולינרי שלי לא התחיל בבתי ספר גבוהים לבישול בפריז, וגם לא במסעדות יוקרה. הוא התחיל
                במקום הכי חם, אמיתי ומלא נשמה שיש –{" "}
                <strong className="text-white font-bold">המטבח של אמא.</strong>
              </p>
              <p>
                גדלתי בבית מרוקאי שבו האוכל הוא השפה הרשמית. אמא שלי, אישה עם ידי זהב ולב ענק, לימדה אותי
                שבישול לא עושים עם כוסות מדידה או משקלים, אלא עם הרגש. היא לימדה אותי להקשיב לסיר, להרגיש
                את הבצק בקצות האצבעות, ולדעת בדיוק מתי התבלינים נפתחים ומשחררים את הקסם שלהם.
              </p>
              <p>
                היום, ב-<strong>La Hilula</strong>, אני מביאה את כל הידע העתיק הזה, שעבר מדור לדור, ומשלבת
                אותו עם אסתטיקה מודרנית ואירוח ברמה הגבוהה ביותר. כל מגש שיוצא מהמטבח שלי, כל עוגייה וכל
                סיר קוסקוס, נעשים באותה אהבה ותשומת לב שאמא שלי הייתה נותנת לארוחת שישי.
              </p>
              <p>
                עבורי, האוכל הוא רק התירוץ – המטרה האמיתית היא לשמח אנשים, לחבר ביניהם, ולייצר רגעים של
                אושר טהור.
                <br />
                <span className="text-brand font-bold block mt-4 text-xl">בתיאבון, אילנית.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
