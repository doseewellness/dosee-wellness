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

  it("offers paid shipping options below the free-shipping threshold", async () => {
    const res = await POST(makeRequest({ items: [makeItem("a", 3480, 1)] }));
    expect(res.status).toBe(200);

    const arg = create.mock.calls[0][0];
    expect(arg.line_items).toHaveLength(1); // product only; 送料は shipping_options
    const amounts = arg.shipping_options.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (o: any) => o.shipping_rate_data.fixed_amount.amount
    );
    expect(amounts).toEqual([500, 1000]); // 通常 / 北海道・沖縄
    expect(arg.allow_promotion_codes).toBe(true);
  });

  it("offers free shipping at or above the threshold", async () => {
    const res = await POST(makeRequest({ items: [makeItem("a", 3480, 2)] }));
    expect(res.status).toBe(200);

    const arg = create.mock.calls[0][0];
    expect(arg.shipping_options).toHaveLength(1);
    expect(arg.shipping_options[0].shipping_rate_data.fixed_amount.amount).toBe(0);
  });

  it("returns the Stripe session url", async () => {
    const res = await POST(makeRequest({ items: [makeItem("a", 3480, 1)] }));
    const json = await res.json();
    expect(json.url).toBe("https://stripe.test/checkout");
  });
});
