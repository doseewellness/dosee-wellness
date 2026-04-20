import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center max-w-lg">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <XCircle className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold mb-3">決済がキャンセルされました</h1>
      <p className="text-muted-foreground mb-8">
        カートの内容は保持されています。引き続きご購入いただけます。
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link
          href="/cart"
          className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          カートに戻る
        </Link>
        <Link
          href="/shop"
          className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          買い物を続ける
        </Link>
      </div>
    </main>
  );
}
