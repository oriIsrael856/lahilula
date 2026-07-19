import { describe, expect, it } from "vitest";
import { buildWhatsAppOrderText } from "@/lib/whatsapp";

describe("buildWhatsAppOrderText", () => {
  it("includes items, total, event details and optional note", () => {
    const text = buildWhatsAppOrderText(
      { 1: 2 },
      {
        name: "דני",
        address: "ירושלים",
        guests: "40",
        note: "ללא גלוטן",
      }
    );

    expect(text).toContain("סביצ'ה דג");
    expect(text).toContain("שם המזמין: דני");
    expect(text).toContain("מיקום/כתובת: ירושלים");
    expect(text).toContain("מספר אורחים: 40");
    expect(text).toContain("הערות:\nללא גלוטן");
    expect(text).toContain('סה"כ לתשלום:');
  });
});
