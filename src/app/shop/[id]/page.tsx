import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, Shield, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductById } from "@/lib/data";
import AddToCartButton from "@/components/products/AddToCartButton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <main className="container mx-auto px-4 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        商品一覧に戻る
      </Link>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.badge && (
            <Badge className="absolute top-4 left-4 bg-emerald-600 text-white">
              {product.badge}
            </Badge>
          )}
          {discountPercent && (
            <Badge variant="destructive" className="absolute top-4 right-4">
              -{discountPercent}%OFF
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm text-emerald-600 font-medium mb-2 uppercase tracking-wide">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount}件のレビュー)
            </span>
          </div>

          <Separator className="my-4" />

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold">
              ¥{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          {/* CTA */}
          <div className="mb-8">
            <AddToCartButton product={product} />
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-3 bg-muted/40 rounded-xl p-4">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>¥5,000以上のご購入で送料無料</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>30日間返金保証</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
