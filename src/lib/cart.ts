import {
  COUSCOUS_DEFAULT_QTY,
  isBulkMenuItem,
  isCouscousItem,
  MENU,
} from "@/data/menu";
import type { Cart, CartLineItem, MenuItem } from "@/types/menu";

export function findMenuItem(id: number): MenuItem | undefined {
  return MENU.find((item) => item.id === id);
}

export function nextCartQuantity(item: MenuItem, currentQty: number, delta: number): number {
  if (isCouscousItem(item)) {
    if (currentQty === 0 && delta > 0) return COUSCOUS_DEFAULT_QTY;
    return Math.max(0, currentQty + delta);
  }

  const step = isBulkMenuItem(item) ? 30 : 1;
  return Math.max(0, currentQty + delta * step);
}

export function applyCartDelta(cart: Cart, id: number, delta: number): Cart {
  const item = findMenuItem(id);
  if (!item) return cart;

  const currentQty = cart[id] || 0;
  const newQty = nextCartQuantity(item, currentQty, delta);

  if (newQty === 0) {
    const next = { ...cart };
    delete next[id];
    return next;
  }

  return { ...cart, [id]: newQty };
}

export function cartSubtotal(cart: Cart): number {
  return Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = findMenuItem(Number(id));
    return acc + (item ? item.price * qty : 0);
  }, 0);
}

export function cartLineItems(cart: Cart): CartLineItem[] {
  return Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = findMenuItem(Number(id));
      if (!item) return null;
      return { ...item, qty, total: item.price * qty };
    })
    .filter((item): item is CartLineItem => item !== null);
}
