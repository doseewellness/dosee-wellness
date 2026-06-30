"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";
import { trackAddToCart } from "@/lib/analytics/ecommerce";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const t = useTranslations("commerce.product");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  function handleAdd() {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    trackAddToCart(product, quantity);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{t("quantity")}</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            aria-label={t("decrease")}
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="w-10 text-center font-semibold">{quantity}</span>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setQuantity(quantity + 1)}
            aria-label={t("increase")}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Add to cart */}
      <Button
        size="lg"
        className={`gap-2 transition-all duration-300 ${
          added
            ? "bg-brand-dark hover:bg-brand-dark text-white"
            : "bg-brand hover:bg-brand-dark text-white"
        }`}
        disabled={!product.inStock}
        onClick={handleAdd}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            {t("added")}
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            {product.inStock ? t("addToCart") : t("outOfStock")}
          </>
        )}
      </Button>
    </div>
  );
}
