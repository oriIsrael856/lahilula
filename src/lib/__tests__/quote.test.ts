import { describe, expect, it } from "vitest";
import { buildQuoteHtml } from "@/lib/quote";
import { escapeHtml } from "@/lib/html";

describe("escapeHtml", () => {
  it("escapes dangerous characters", () => {
    expect(escapeHtml(`<script>"&'</script>`)).toBe(
      "&lt;script&gt;&quot;&amp;'&lt;/script&gt;"
    );
  });
});

describe("buildQuoteHtml", () => {
  it("includes escaped customer details and note", () => {
    const html = buildQuoteHtml({
      items: [
        {
          name: "סלט <בדיקה>",
          desc: "תיאור & יותר",
          price: 120,
          qty: 2,
          total: 240,
        },
      ],
      info: {
        name: 'Ori <test>',
        address: "Tel Aviv",
        guests: "20",
        note: "הנחה 10%",
      },
      subtotal: 240,
      logoUrl: "https://example.com/logo.jpg",
    });

    expect(html).toContain("Ori &lt;test&gt;");
    expect(html).toContain("סלט &lt;בדיקה&gt;");
    expect(html).toContain("הנחה 10%");
    expect(html).toContain("Assistant");
    expect(html).not.toContain("Ori <test>");
  });
});
