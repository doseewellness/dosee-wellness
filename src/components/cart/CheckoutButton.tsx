"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { trackBeginCheckout } from "@/lib/analytics/ecommerce";

export default function CheckoutButton() {
  const t = useTranslations("commerce.checkout");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const items = useCartStore((s) => s.items);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    trackBeginCheckout(items);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, locale }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("error"));

      // Stripe Hosted Checkout にリダイレクト
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : t("genericError"));
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        size="lg"
        className="w-full bg-brand hover:bg-brand-dark text-white gap-2 disabled:opacity-70"
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("processing")}
          </>
        ) : (
          <>
            {t("proceed")}
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
