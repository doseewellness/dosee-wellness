"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart";
import CheckoutButton from "@/components/cart/CheckoutButton";

export default function CartSheet() {
  const t = useTranslations("commerce.sheet");
  const { items, totalItems, totalPrice } = useCart();
  const { isOpen, closeCart, removeItem, updateQuantity } = useCartStore();

  const shippingThreshold = 5000;
  const remainingForFreeShipping = shippingThreshold - totalPrice;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" showCloseButton={false} className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-base font-semibold">
            <ShoppingBag className="h-5 w-5 text-brand" />
            {t("title")}
            {totalItems > 0 && (
              <span className="ml-1 bg-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center px-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">{t("emptyBody")}</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-colors mt-2"
            >
              {t("viewProducts")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* 送料無料バー */}
            {remainingForFreeShipping > 0 && (
              <div className="px-6 py-3 bg-brand-soft border-b">
                <p className="text-xs text-brand-dark">
                  {t.rich("remainingForFreeShipping", {
                    amount: remainingForFreeShipping.toLocaleString(),
                    b: (chunks) => <span className="font-bold">{chunks}</span>,
                  })}
                </p>
                <div className="mt-1.5 h-1.5 rounded-full bg-brand/20 overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((totalPrice / shippingThreshold) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
            {remainingForFreeShipping <= 0 && (
              <div className="px-6 py-2.5 bg-brand-soft border-b">
                <p className="text-xs text-brand-dark font-medium">{t("freeShippingApplied")}</p>
              </div>
            )}

            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6">
              <div className="divide-y">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="py-4 flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-muted/30">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug line-clamp-2 mb-1">
                        {product.name}
                      </p>
                      <p className="text-sm font-bold text-foreground mb-2">
                        ¥{(product.price * quantity).toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between">
                        {/* Quantity control */}
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon-xs"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label={t("decrease")}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-7 text-center text-sm font-medium">
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
                        {/* Remove */}
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(product.id)}
                          aria-label={t("remove")}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t px-6 py-5 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("subtotal", { count: totalItems })}</span>
                  <span>¥{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("shipping")}</span>
                  <span>{totalPrice >= shippingThreshold ? t("free") : "¥500"}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-base">
                  <span>{t("total")}</span>
                  <span>
                    ¥{(totalPrice + (totalPrice >= shippingThreshold ? 0 : 500)).toLocaleString()}
                  </span>
                </div>
              </div>
              <CheckoutButton />
              <Button
                variant="outline"
                className="w-full"
                onClick={closeCart}
              >
                {t("continueShopping")}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
