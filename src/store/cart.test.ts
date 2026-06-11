// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "./cart";
import type { Product } from "@/types/product";

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "matcha-latte",
    name: "Matcha Latte",
    description: "test",
    price: 3980,
    image: "/x.png",
    category: "wellcha",
    rating: 5,
    reviewCount: 1,
    inStock: true,
    ...overrides,
  };
}

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
  localStorage.clear();
});

describe("cart store", () => {
  it("adds a new item with quantity 1", () => {
    useCartStore.getState().addItem(makeProduct());
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(1);
  });

  it("increments quantity when the same product is added again", () => {
    const p = makeProduct();
    useCartStore.getState().addItem(p);
    useCartStore.getState().addItem(p);
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("keeps distinct products separate", () => {
    useCartStore.getState().addItem(makeProduct({ id: "matcha-latte" }));
    useCartStore.getState().addItem(makeProduct({ id: "hojicha-latte" }));
    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it("removes an item", () => {
    useCartStore.getState().addItem(makeProduct());
    useCartStore.getState().removeItem("matcha-latte");
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("updateQuantity with 0 or less removes the item", () => {
    useCartStore.getState().addItem(makeProduct());
    useCartStore.getState().updateQuantity("matcha-latte", 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("updateQuantity sets a new quantity", () => {
    useCartStore.getState().addItem(makeProduct());
    useCartStore.getState().updateQuantity("matcha-latte", 3);
    expect(useCartStore.getState().items[0].quantity).toBe(3);
  });

  it("computes totalItems and totalPrice", () => {
    useCartStore.getState().addItem(makeProduct({ id: "a", price: 1000 }));
    useCartStore.getState().addItem(makeProduct({ id: "a", price: 1000 }));
    useCartStore.getState().addItem(makeProduct({ id: "b", price: 500 }));
    expect(useCartStore.getState().totalItems()).toBe(3);
    expect(useCartStore.getState().totalPrice()).toBe(2500);
  });

  it("clearCart empties the cart", () => {
    useCartStore.getState().addItem(makeProduct());
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
