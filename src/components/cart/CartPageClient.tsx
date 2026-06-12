"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart";
import CheckoutButton from "@/components/cart/CheckoutButton";

export default function CartPageClient() {
  const t = useTranslations("commerce.cart");
  const { items, totalItems, totalPrice } = useCart();
  const { removeItem, updateQuantity, clearCart } = useCartStore();

  const shippingThreshold = 5000;
  const shipping = totalPrice >= shippingThreshold ? 0 : 500;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <ShoppingBag className="h-20 w-20 text-muted-foreground/30 mb-6" />
        <h1 className="text-2xl font-bold mb-2">{t("emptyTitle")}</h1>
        <p className="text-muted-foreground mb-8">
          {t("emptyBody")}
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("toProducts")}
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <span className="text-sm text-muted-foreground">{t("itemCount", { count: totalItems })}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-1">
          <div className="flex justify-end mb-2">
            <button
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              onClick={clearCart}
            >
              {t("clearAll")}
            </button>
          </div>

          <div className="rounded-xl border overflow-hidden divide-y">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 p-4 bg-card">
                <Link href={`/products/${product.id}`} className="shrink-0">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted/30">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2 mb-1">
                    <Link href={`/products/${product.id}`}>
                      <p className="text-sm font-medium leading-snug hover:text-brand transition-colors line-clamp-2">
                        {product.name}
                      </p>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(product.id)}
                      aria-label={t("remove")}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t("unitPrice")}: ¥{product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={t("decrease")}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label={t("increase")}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="font-bold text-sm">
                      ¥{(product.price * quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("continueShopping")}
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-card p-6 sticky top-24">
            <h2 className="font-bold text-base mb-4">{t("summary")}</h2>

            {/* 送料無料バー */}
            {shipping > 0 && (
              <div className="mb-4 p-3 bg-brand-soft rounded-lg">
                <p className="text-xs text-brand-dark mb-1.5">
                  {t.rich("remainingForFreeShipping", {
                    amount: (shippingThreshold - totalPrice).toLocaleString(),
                    b: (chunks) => <span className="font-bold">{chunks}</span>,
                  })}
                </p>
                <div className="h-1.5 rounded-full bg-brand/20 overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all"
                    style={{ width: `${Math.min((totalPrice / shippingThreshold) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>{t("subtotal", { count: totalItems })}</span>
                <span>¥{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t("shipping")}</span>
                <span className={shipping === 0 ? "text-brand font-medium" : ""}>
                  {shipping === 0 ? t("free") : `¥${shipping.toLocaleString()}`}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-base">
                <span>{t("totalWithTax")}</span>
                <span>¥{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6">
              <CheckoutButton />
            </div>

            <p className="text-xs text-center text-muted-foreground mt-3">
              {t("securePayment")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
