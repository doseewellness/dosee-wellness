import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Star, ArrowLeft, Shield, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductById } from "@/lib/data";
import productsData from "@/data/products.json";
import { localizeProductCopy } from "@/lib/products/i18n";
import { buildAlternates } from "@/lib/i18n/alternates";
import AddToCartButton from "@/components/products/AddToCartButton";
import type { Metadata } from "next";

interface ProductDetailPageProps {
  params: Promise<{ locale: Locale; id: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const product = await getProductById(id);
  if (!product) return {};
  const copy = localizeProductCopy(id, locale);
  return {
    title: `${product.name} | DoSee Wellness`,
    description: copy.description ?? product.description,
    alternates: buildAlternates(locale, `/shop/${id}`),
  };
}

type RichProduct = {
  id: string;
  longDescription?: string;
  benefits?: { title: string; description: string }[];
  ingredients?: string[];
  howToUse?: string[];
  nutritionFacts?: {
    servingSize?: string;
    calories?: number;
    protein?: string;
    fat?: string;
    carbohydrates?: string;
    caffeine?: string;
  };
};

const NUTRITION_KEYS: (keyof NonNullable<RichProduct["nutritionFacts"]>)[] = [
  "servingSize",
  "calories",
  "protein",
  "fat",
  "carbohydrates",
  "caffeine",
];

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("commerce.product");
  const tn = await getTranslations("commerce.nutritionLabels");
  const product = await getProductById(id);

  if (!product) notFound();

  const rich = (productsData as RichProduct[]).find((p) => p.id === id);
  const copy = localizeProductCopy(id, locale);
  const nutrition = rich?.nutritionFacts;
  const nutritionRows = nutrition
    ? NUTRITION_KEYS.filter((key) => nutrition[key] != null)
    : [];

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
        {t("backToList")}
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
            <Badge className="absolute top-4 left-4 bg-brand text-white">
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
          <p className="text-sm text-brand font-medium mb-2 uppercase tracking-wide">
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
              ({t("reviewCount", { count: product.reviewCount })})
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
            {copy.longDescription ?? copy.description ?? product.description}
          </p>

          {/* CTA */}
          <div className="mb-8">
            <AddToCartButton product={product} />
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-3 bg-muted/40 rounded-xl p-4">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 text-brand shrink-0" />
              <span>{t("freeShipping")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-brand shrink-0" />
              <span>{t("moneyBack")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 詳細情報 */}
      {rich && (
        <div className="mt-16 max-w-3xl mx-auto flex flex-col gap-12">
          {copy.benefits && copy.benefits.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-6">{t("features")}</h2>
              <div className="grid gap-5 sm:grid-cols-3">
                {copy.benefits.map((b) => (
                  <div
                    key={b.title}
                    className="rounded-xl border border-border/60 bg-muted/30 p-5"
                  >
                    <h3 className="font-medium text-brand-dark mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {copy.howToUse && copy.howToUse.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">{t("howToUse")}</h2>
              <ul className="flex flex-col gap-2">
                {copy.howToUse.map((step) => (
                  <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-brand shrink-0">・</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {copy.ingredients && copy.ingredients.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">{t("ingredients")}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {copy.ingredients.join(locale === "ja" ? "、" : ", ")}
              </p>
            </section>
          )}

          {nutritionRows.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">{t("nutrition")}</h2>
              <dl className="rounded-xl border border-border/60 overflow-hidden">
                {nutritionRows.map((key, i) => (
                  <div
                    key={key}
                    className={`flex justify-between px-4 py-3 text-sm ${
                      i % 2 === 0 ? "bg-muted/30" : ""
                    }`}
                  >
                    <dt className="text-muted-foreground">{tn(key)}</dt>
                    <dd className="font-medium">{String(nutrition?.[key])}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
