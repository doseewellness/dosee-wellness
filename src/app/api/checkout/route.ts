import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { CartItem } from "@/store/cart";

const SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 500;
const SHIPPING_REMOTE_FEE = 1000;

// サイトの対応ロケールはすべてStripe Checkoutがサポートする。それ以外は"auto"に落とす。
const STRIPE_SUPPORTED_LOCALES = ["ja", "en", "zh", "fr", "es"] as const;
type StripeCheckoutLocale = (typeof STRIPE_SUPPORTED_LOCALES)[number] | "auto";

const toStripeLocale = (locale: unknown): StripeCheckoutLocale =>
  STRIPE_SUPPORTED_LOCALES.includes(locale as never)
    ? (locale as StripeCheckoutLocale)
    : "auto";

export async function POST(req: NextRequest) {
  try {
    const { items, locale }: { items: CartItem[]; locale?: string } =
      await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "カートが空です" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    // Stripeは画像に絶対URLを要求するため、相対パスをappUrl基準で絶対化する。
    const toAbsoluteUrl = (src: string): string | null => {
      if (!src) return null;
      if (/^https?:\/\//.test(src)) return src;
      return `${appUrl}${src.startsWith("/") ? "" : "/"}${src}`;
    };

    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const freeShipping = subtotal >= SHIPPING_THRESHOLD;

    // 商品の line_items を構築
    const productLineItems = items.map((item) => {
      const imageUrl = toAbsoluteUrl(item.product.image);
      return {
        price_data: {
          currency: "jpy" as const,
          product_data: {
            name: item.product.name,
            description: item.product.description.slice(0, 255),
            ...(imageUrl ? { images: [imageUrl] } : {}),
            metadata: { product_id: item.product.id },
          },
          unit_amount: item.product.price,
        },
        quantity: item.quantity,
      };
    });

    // 送料は決済画面でお客様が選択する shipping_options で提示。
    // 小計が無料ライン以上なら¥0の単一オプション、未満なら通常¥500／北海道・沖縄¥1,000。
    const fixedRate = (amount: number, label: string) => ({
      shipping_rate_data: {
        type: "fixed_amount" as const,
        display_name: label,
        fixed_amount: { amount, currency: "jpy" as const },
      },
    });

    const shippingOptions = freeShipping
      ? [fixedRate(0, "送料無料")]
      : [
          fixedRate(SHIPPING_FEE, "通常配送（全国）"),
          fixedRate(SHIPPING_REMOTE_FEE, "北海道・沖縄・離島"),
        ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: productLineItems,
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
      },
      locale: toStripeLocale(locale),
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["JP"] },
      shipping_options: shippingOptions,
      allow_promotion_codes: true,
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
