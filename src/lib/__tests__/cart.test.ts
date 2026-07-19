import { describe, expect, it } from "vitest";
import { applyCartDelta, cartSubtotal, nextCartQuantity } from "@/lib/cart";
import { MENU } from "@/data/menu";

describe("cart", () => {
  const bulkItem = MENU.find((i) => i.id === 3)!;
  const couscous = MENU.find((i) => i.id === 17)!;
  const normal = MENU.find((i) => i.id === 1)!;

  it("increments regular items by 1", () => {
    expect(nextCartQuantity(normal, 0, 1)).toBe(1);
    expect(nextCartQuantity(normal, 2, 1)).toBe(3);
  });

  it("increments bulk items by 30", () => {
    expect(nextCartQuantity(bulkItem, 0, 1)).toBe(30);
    expect(nextCartQuantity(bulkItem, 30, -1)).toBe(0);
  });

  it("starts couscous at default 30 portions", () => {
    expect(nextCartQuantity(couscous, 0, 1)).toBe(30);
    expect(nextCartQuantity(couscous, 30, 1)).toBe(31);
  });

  it("computes subtotal from cart quantities", () => {
    const cart = applyCartDelta({}, normal.id, 1);
    const withBulk = applyCartDelta(cart, bulkItem.id, 1);
    expect(cartSubtotal(withBulk)).toBe(normal.price * 1 + bulkItem.price * 30);
  });
});
