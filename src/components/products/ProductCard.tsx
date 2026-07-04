"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();
  const t = useTranslations("commerce.product");

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/60">
      <Link href={`/shop/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-brand hover:bg-brand-dark text-white text-xs">
              {product.badge}
            </Badge>
          )}
          {discountPercent && (
            <Badge variant="destructive" className="absolute top-3 right-3 text-xs">
              -{discountPercent}%
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">{t("outOfStock")}</span>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-medium text-sm leading-snug mb-1 hover:text-brand transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">¥{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ¥{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className={`w-full gap-2 text-sm transition-all duration-300 ${
            added
              ? "bg-brand-dark hover:bg-brand-dark text-white"
              : "bg-brand hover:bg-brand-dark text-white"
          }`}
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              {t("added")}
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              {product.inStock ? t("addToCart") : t("outOfStock")}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
