import type { Product } from "@/types/product";
import type { CartItem } from "@/store/cart";

const CURRENCY = "JPY";

type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>
) => void;

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { gtag?: GtagFn };
  return w.gtag ?? null;
}

type GtagItem = {
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  quantity: number;
};

function toItem(product: Product, quantity: number): GtagItem {
  return {
    item_id: product.id,
    item_name: product.name,
    item_category: product.category,
    price: product.price,
    quantity,
  };
}

export function trackAddToCart(product: Product, quantity: number): void {
  gtag()?.("event", "add_to_cart", {
    currency: CURRENCY,
    value: product.price * quantity,
    items: [toItem(product, quantity)],
  });
}

export function trackBeginCheckout(items: CartItem[]): void {
  const value = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  gtag()?.("event", "begin_checkout", {
    currency: CURRENCY,
    value,
    items: items.map((i) => toItem(i.product, i.quantity)),
  });
}

export function trackPurchase(params: {
  transactionId: string;
  value: number;
}): void {
  gtag()?.("event", "purchase", {
    transaction_id: params.transactionId,
    currency: CURRENCY,
    value: params.value,
  });
}
