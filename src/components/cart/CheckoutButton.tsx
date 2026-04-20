"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const items = useCartStore((s) => s.items);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "決済エラー");

      // Stripe Hosted Checkout にリダイレクト
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        size="lg"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 disabled:opacity-70"
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            処理中...
          </>
        ) : (
          <>
            レジに進む
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
      {error && (
        <p className="text-xs text-destructive text-center">{error}</p>
      )}
    </div>
  );
}
