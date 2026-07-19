import { escapeHtml } from "@/lib/html";
import type { EventInfo, QuoteLineItem } from "@/types/menu";

export function buildQuoteHtml(params: {
  items: QuoteLineItem[];
  info: EventInfo;
  subtotal: number;
  logoUrl: string;
}): string {
  const { items, info, subtotal, logoUrl } = params;

  const noteSection = info.note.trim()
    ? `<div class="note-section"><div class="label">הערות</div><div class="note-text">${escapeHtml(info.note.trim())}</div></div>`
    : "";

  const rows = items
    .map(
      (item) => `
                <tr>
                  <td>
                    <strong>${escapeHtml(item.name)}</strong>
                    <div style="font-size: 12px; color: #666;">${escapeHtml(item.desc || "")}</div>
                  </td>
                  <td>${item.qty}</td>
                  <td>₪${item.price}</td>
                  <td>₪${item.total}</td>
                </tr>`
    )
    .join("");

  return `
      <html dir="rtl" lang="he">
        <head>
          <title>הצעת מחיר - La Hilula</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Assistant', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #C48F65; padding-bottom: 20px; margin-bottom: 30px; }
            .logo-img { max-width: 150px; height: auto; margin-bottom: 10px; display: block; margin: 0 auto; }
            .details { display: flex; justify-content: space-between; background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
            .col { flex: 1; }
            .label { font-weight: bold; font-size: 14px; color: #888; margin-bottom: 5px; }
            .value { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { text-align: right; padding: 15px; border-bottom: 2px solid #eee; color: #C48F65; }
            td { padding: 15px; border-bottom: 1px solid #eee; }
            .total-row { font-size: 24px; font-weight: bold; color: #C48F65; text-align: left; margin-top: 30px; }
            .note-section { background: #fff8f0; border: 1px solid rgba(196, 143, 101, 0.3); border-radius: 10px; padding: 16px 20px; margin-bottom: 30px; margin-top: 24px; }
            .note-text { font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #444; }
            .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
            @media print { body { padding: 0; } .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${escapeHtml(logoUrl)}" alt="La Hilula" class="logo-img" onload="setTimeout(function(){window.print()}, 500)" onerror="window.print();" />
            <div style="font-size: 18px; font-weight: bold; color: #C48F65; margin-top: 5px;">La Hilula</div>
            <div style="margin-top: 5px; font-size: 14px;">מטבח בוטיק וקייטרינג לאירועים</div>
            <div style="margin-top: 5px;">050-666-9062</div>
          </div>
          <div class="details">
            <div class="col">
              <div class="label">לכבוד</div>
              <div class="value">${escapeHtml(info.name)}</div>
              <div class="label">תאריך הפקה</div>
              <div class="value">${escapeHtml(new Date().toLocaleDateString("he-IL"))}</div>
            </div>
            <div class="col">
              <div class="label">מיקום האירוע</div>
              <div class="value">${escapeHtml(info.address)}</div>
              <div class="label">מספר משתתפים</div>
              <div class="value">${escapeHtml(info.guests)} אורחים</div>
            </div>
          </div>
          <h3>פירוט ההזמנה</h3>
          <table>
            <thead>
              <tr>
                <th>תיאור הפריט</th>
                <th>כמות</th>
                <th>מחיר יחידה</th>
                <th>סה"כ</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
          <div class="total-row">סה"כ לתשלום: ₪${subtotal}</div>
          ${noteSection}
          <div class="footer">תודה שבחרתם בנו! La Hilula - אילנית ישראל<br/>ט.ל.ח | הצעת המחיר תקפה ל-14 יום</div>
        </body>
      </html>
    `;
}

export function openQuotePrintWindow(html: string): void {
  const win = window.open("", "", "width=900,height=800");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}
