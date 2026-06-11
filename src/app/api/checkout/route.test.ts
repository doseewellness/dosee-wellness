import { beforeEach, describe, expect, it, vi } from "vitest";

const { create } = vi.hoisted(() => ({ create: vi.fn() }));

vi.mock("@/lib/stripe/server", () => ({
  stripe: { checkout: { sessions: { create } } },
}));

import { POST } from "./route";

function makeItem(id: string, price: number, quantity: number) {
  return {
    product: {
      id,
      name: `Product ${id}`,
      description: "test product",
      price,
      image: "/x.png",
      category: "wellcha",
      rating: 5,
      reviewCount: 1,
      inStock: true,
    },
    quantity,
  };
}

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/checkout", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
}

beforeEach(() => {
  create.mockReset();
  create.mockResolvedValue({ url: "https://stripe.test/checkout" });
});

describe("POST /api/checkout", () => {
  it("returns 400 when the cart is empty", async () => {
    const res = await POST(makeRequest({ items: [] }));
    expect(res.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it("adds a shipping line item below the free-shipping threshold", async () => {
    const res = await POST(makeRequest({ items: [makeItem("a", 3980, 1)] }));
    expect(res.status).toBe(200);

    const arg = create.mock.calls[0][0];
    expect(arg.line_items).toHaveLength(2); // product + shipping
    expect(arg.line_items[1].price_data.unit_amount).toBe(500);
    expect(arg.metadata.shipping_amount).toBe("500");
  });

  it("waives shipping at or above the threshold", async () => {
    const res = await POST(makeRequest({ items: [makeItem("a", 3980, 2)] }));
    expect(res.status).toBe(200);

    const arg = create.mock.calls[0][0];
    expect(arg.line_items).toHaveLength(1); // product only, no shipping
    expect(arg.metadata.shipping_amount).toBe("0");
  });

  it("returns the Stripe session url", async () => {
    const res = await POST(makeRequest({ items: [makeItem("a", 3980, 1)] }));
    const json = await res.json();
    expect(json.url).toBe("https://stripe.test/checkout");
  });
});
