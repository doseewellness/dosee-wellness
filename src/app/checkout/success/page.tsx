import Link from "next/link";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";
import { stripe } from "@/lib/stripe/server";
import ClearCartOnMount from "@/components/cart/ClearCartOnMount";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  let email = "";
  let orderAmount = 0;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email ?? "";
      orderAmount = session.amount_total ?? 0;
    } catch {
      // Stripe未設定時はスキップ
    }
  }

  return (
    <>
      <ClearCartOnMount />
      <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center max-w-lg">
        <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold mb-3">ご注文ありがとうございます！</h1>
        <p className="text-muted-foreground mb-2">ご注文が確定しました。確認メールをお送りします。</p>
        {email && <p className="text-sm font-medium mb-2">{email}</p>}
        {orderAmount > 0 && (
          <p className="text-2xl font-bold text-emerald-600 mb-6">
            ¥{orderAmount.toLocaleString()}
          </p>
        )}
        <div className="w-full bg-muted/40 rounded-xl p-5 mb-8 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">発送について</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                通常1〜3営業日以内に発送いたします。発送後に追跡番号をメールでお送りします。
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/shop"
            className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
          >
            買い物を続ける
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium transition-colors"
          >
            トップへ戻る
          </Link>
        </div>
      </main>
    </>
  );
}
