import type { Cart, EventInfo } from "@/types/menu";
import { cartLineItems, cartSubtotal } from "@/lib/cart";

export const WHATSAPP_PHONE = "972506669062";

export function buildWhatsAppOrderText(cart: Cart, info: EventInfo): string {
  const items = cartLineItems(cart)
    .map((item) => `• ${item.name} (${item.qty} יח') - ₪${item.total}`)
    .join("\n");

  const noteLine = info.note.trim() ? `\n\nהערות:\n${info.note.trim()}` : "";
  const subtotal = cartSubtotal(cart);

  return `הזמנה חדשה מ-La Hilula 🌿\n\nפירוט המנות:\n${items}\n\nסה"כ לתשלום: ₪${subtotal}\n\nפרטי האירוע:\nשם המזמין: ${info.name}\nמיקום/כתובת: ${info.address}\nמספר אורחים: ${info.guests}${noteLine}`;
}

export function buildWhatsAppOrderUrl(cart: Cart, info: EventInfo): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildWhatsAppOrderText(cart, info))}`;
}
