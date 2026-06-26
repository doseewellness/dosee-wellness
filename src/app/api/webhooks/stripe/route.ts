import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendOrderEmails, type OrderShipping } from "@/lib/email/order-confirmation";
import type { OrderStatus } from "@/types/database";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "署名がありません" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "設定エラー" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[Webhook] 署名検証失敗:", err);
    return NextResponse.json({ error: "署名検証失敗" }, { status: 400 });
  }

  // 支払い完了イベントのみ処理
  if (event.type === "checkout.session.completed") {
    await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const supabase = createAdminClient();

  // メタデータからカートアイテムを復元
  const cartItemsRaw = session.metadata?.cart_items;
  // 送料・割引は決済画面で確定するため、セッションの実値から取得する。
  const shippingAmount =
    session.shipping_cost?.amount_total ??
    session.total_details?.amount_shipping ??
    0;
  const discountAmount = session.total_details?.amount_discount ?? 0;

  if (!cartItemsRaw) {
    console.error("[Webhook] cart_items metadata が見つかりません", session.id);
    return;
  }

  type CartMetaItem = {
    product_id: string;
    product_name: string;
    product_image_url: string;
    price: number;
    quantity: number;
  };

  let cartItems: CartMetaItem[];
  try {
    cartItems = JSON.parse(cartItemsRaw);
  } catch {
    console.error("[Webhook] cart_items のパース失敗", cartItemsRaw);
    return;
  }

  const totalAmount = session.amount_total ?? 0;
  const customerEmail =
    session.customer_details?.email ??
    (typeof session.customer_email === "string" ? session.customer_email : "");

  // 冪等性: 同じセッションが二重処理されないようにチェック
  const { data: existing } = await supabase
    .from("orders")
    .select("id")
    .eq("stripe_session_id", session.id)
    .single();

  if (existing) {
    console.log("[Webhook] 注文は既に存在します:", session.id);
    return;
  }

  // ordersテーブルにINSERT
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      stripe_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null,
      customer_email: customerEmail,
      status: "paid" as OrderStatus,
      total_amount: totalAmount,
      shipping_amount: shippingAmount,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("[Webhook] orders INSERT 失敗:", orderError);
    return;
  }

  // order_itemsテーブルにINSERT
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    product_image_url: item.product_image_url,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("[Webhook] order_items INSERT 失敗:", itemsError);
    return;
  }

  console.log("[Webhook] 注文保存完了:", order.id, "| session:", session.id);

  // 注文確認メール送信。失敗しても注文記録は確定済みなので握りつぶす。
  try {
    const ship = session.collected_information?.shipping_details ?? null;
    const shipping: OrderShipping | null = ship
      ? {
          name: ship.name ?? "",
          postalCode: ship.address.postal_code ?? "",
          state: ship.address.state ?? "",
          city: ship.address.city ?? "",
          line1: ship.address.line1 ?? "",
          line2: ship.address.line2 ?? "",
          phone: session.customer_details?.phone ?? "",
        }
      : null;

    const subtotalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await sendOrderEmails({
      orderId: order.id,
      customerEmail,
      items: cartItems.map((item) => ({
        product_name: item.product_name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotalAmount,
      discountAmount,
      shippingAmount,
      totalAmount,
      shipping,
    });
    console.log("[Webhook] 確認メール送信完了:", order.id);
  } catch (mailErr) {
    console.error("[Webhook] 確認メール送信失敗（注文は保存済み）:", mailErr);
  }
}
