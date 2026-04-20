import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { CartItem } from "@/store/cart";

const SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 500;

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "カートが空です" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";

    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

    // 商品の line_items を構築
    const productLineItems = items.map((item) => ({
      price_data: {
        currency: "jpy" as const,
        product_data: {
          name: item.product.name,
          description: item.product.description.slice(0, 255),
          images: [item.product.image],
          metadata: { product_id: item.product.id },
        },
        unit_amount: item.product.price,
      },
      quantity: item.quantity,
    }));

    // 送料を別行で追加
    const shippingLineItem =
      shipping > 0
        ? [
            {
              price_data: {
                currency: "jpy" as const,
                product_data: { name: "送料" },
                unit_amount: shipping,
              },
              quantity: 1,
            },
          ]
        : [];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [...productLineItems, ...shippingLineItem],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
      metadata: {
        cart_items: JSON.stringify(
          items.map((item) => ({
            product_id: item.product.id,
            product_name: item.product.name,
            product_image_url: item.product.image,
            price: item.product.price,
            quantity: item.quantity,
          }))
        ),
        shipping_amount: String(shipping),
      },
      locale: "ja",
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["JP"] },
      payment_method_types: ["card"],
      phone_number_collection: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[/api/checkout]", err);
    return NextResponse.json(
      { error: "決済セッションの作成に失敗しました" },
      { status: 500 }
    );
  }
}
