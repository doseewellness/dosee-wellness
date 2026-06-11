import { beforeEach, describe, expect, it, vi } from "vitest";

const { constructEvent, createAdminClient } = vi.hoisted(() => ({
  constructEvent: vi.fn(),
  createAdminClient: vi.fn(),
}));

vi.mock("@/lib/stripe/server", () => ({
  stripe: { webhooks: { constructEvent } },
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => createAdminClient(),
}));

import { POST } from "./route";

/**
 * orders/order_items の insert を記録できる Supabase クライアントの簡易モック。
 * existingOrder=true のとき冪等性チェックで既存注文ありとして返す。
 */
function makeSupabase({ existingOrder }: { existingOrder: boolean }) {
  const calls: { insertOrders: unknown; insertItems: unknown } = {
    insertOrders: null,
    insertItems: null,
  };

  const ordersAfterSelect = {
    eq: () => ({
      single: async () => ({
        data: existingOrder ? { id: "existing" } : null,
        error: null,
      }),
    }),
  };

  const client = {
    from: (table: string) => {
      if (table === "orders") {
        return {
          select: () => ordersAfterSelect,
          insert: (row: unknown) => {
            calls.insertOrders = row;
            return {
              select: () => ({
                single: async () => ({ data: { id: "order-1" }, error: null }),
              }),
            };
          },
        };
      }
      // order_items
      return {
        insert: async (rows: unknown) => {
          calls.insertItems = rows;
          return { error: null };
        },
      };
    },
  };

  return { client, calls };
}

function makeRequest(body = "{}", sig: string | null = "sig_test") {
  const headers = new Headers();
  if (sig) headers.set("stripe-signature", sig);
  return new Request("http://localhost/api/webhooks/stripe", {
    method: "POST",
    body,
    headers,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
}

function completedEvent() {
  return {
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_1",
        amount_total: 4480,
        customer_details: { email: "buyer@example.com" },
        payment_intent: "pi_1",
        metadata: {
          shipping_amount: "500",
          cart_items: JSON.stringify([
            {
              product_id: "matcha-latte",
              product_name: "Matcha Latte",
              product_image_url: "/x.png",
              price: 3980,
              quantity: 1,
            },
          ]),
        },
      },
    },
  };
}

beforeEach(() => {
  constructEvent.mockReset();
  createAdminClient.mockReset();
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
});

describe("POST /api/webhooks/stripe", () => {
  it("returns 400 when the signature header is missing", async () => {
    const res = await POST(makeRequest("{}", null));
    expect(res.status).toBe(400);
  });

  it("returns 400 when signature verification fails", async () => {
    constructEvent.mockImplementation(() => {
      throw new Error("bad signature");
    });
    const res = await POST(makeRequest());
    expect(res.status).toBe(400);
  });

  it("inserts an order for a new completed session", async () => {
    constructEvent.mockReturnValue(completedEvent());
    const { client, calls } = makeSupabase({ existingOrder: false });
    createAdminClient.mockReturnValue(client);

    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(calls.insertOrders).toMatchObject({
      stripe_session_id: "cs_test_1",
      status: "paid",
      total_amount: 4480,
      shipping_amount: 500,
    });
    expect(calls.insertItems).toHaveLength(1);
  });

  it("is idempotent: skips insert when the order already exists", async () => {
    constructEvent.mockReturnValue(completedEvent());
    const { client, calls } = makeSupabase({ existingOrder: true });
    createAdminClient.mockReturnValue(client);

    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(calls.insertOrders).toBeNull();
  });
});
