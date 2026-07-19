"use client";

import type { RefObject } from "react";
import type { EventInfo, EventInfoErrors } from "@/types/menu";

type EventFormProps = {
  info: EventInfo;
  errors: EventInfoErrors;
  onChange: (next: EventInfo) => void;
  onClearError: (field: keyof EventInfoErrors) => void;
  formRef: RefObject<HTMLFormElement | null>;
};

export function EventForm({ info, errors, onChange, onClearError, formRef }: EventFormProps) {
  return (
    <form
      id="event-form"
      ref={formRef}
      className="pt-10 space-y-4 pb-10"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="font-display text-lg font-bold text-white mb-2">פרטי האירוע</h2>

      <div>
        <label htmlFor="name" className="sr-only">
          שם המזמין
        </label>
        <input
          id="name"
          type="text"
          value={info.name}
          placeholder="שם המזמין *"
          autoComplete="name"
          aria-invalid={errors.name}
          className={`w-full bg-surface-elevated/90 border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-brand ${
            errors.name
              ? "border-red-500/50 ring-1 ring-red-500/30"
              : "border-white/10 focus:border-accent-rose/50"
          }`}
          onChange={(e) => {
            onChange({ ...info, name: e.target.value });
            if (e.target.value) onClearError("name");
          }}
        />
        {errors.name && (
          <p role="alert" className="text-red-400 text-xs mt-1 mr-2">
            נא למלא שם המזמין
          </p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="sr-only">
          מיקום האירוע / כתובת למשלוח
        </label>
        <input
          id="address"
          type="text"
          value={info.address}
          placeholder="מיקום האירוע / כתובת למשלוח *"
          autoComplete="street-address"
          aria-invalid={errors.address}
          className={`w-full bg-surface-elevated/90 border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-brand ${
            errors.address
              ? "border-red-500/50 ring-1 ring-red-500/30"
              : "border-white/10 focus:border-accent-rose/50"
          }`}
          onChange={(e) => {
            onChange({ ...info, address: e.target.value });
            if (e.target.value) onClearError("address");
          }}
        />
        {errors.address && (
          <p role="alert" className="text-red-400 text-xs mt-1 mr-2">
            נא למלא מיקום
          </p>
        )}
      </div>

      <div>
        <label htmlFor="guests" className="sr-only">
          מספר אורחים
        </label>
        <input
          id="guests"
          type="number"
          value={info.guests}
          placeholder="מספר משתתפים באירוע *"
          aria-invalid={errors.guests}
          className={`w-full bg-surface-elevated/90 border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-brand ${
            errors.guests
              ? "border-red-500/50 ring-1 ring-red-500/30"
              : "border-white/10 focus:border-accent-rose/50"
          }`}
          onChange={(e) => {
            onChange({ ...info, guests: e.target.value });
            if (e.target.value) onClearError("guests");
          }}
        />
        {errors.guests && (
          <p role="alert" className="text-red-400 text-xs mt-1 mr-2">
            נא למלא מספר אורחים
          </p>
        )}
      </div>

      <div>
        <label htmlFor="note" className="sr-only">
          הערה להצעת מחיר
        </label>
        <textarea
          id="note"
          rows={3}
          value={info.note}
          placeholder="הערה להצעת מחיר (אופציונלי) — למשל תנאי תשלום, הנחה, הערות לאירוע"
          className="w-full bg-surface-elevated/90 border border-white/10 p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-brand focus:border-accent-rose/50 resize-y min-h-[5rem]"
          onChange={(e) => onChange({ ...info, note: e.target.value })}
        />
      </div>
    </form>
  );
}
