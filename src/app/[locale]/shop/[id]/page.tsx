import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Star, ArrowLeft, Shield, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductById, getProducts } from "@/lib/data";
import { getPostsForProduct } from "@/lib/blog/related";
import productsData from "@/data/products.json";
import { localizeProductCopy } from "@/lib/products/i18n";
import { buildAlternates } from "@/lib/i18n/alternates";
import { siteConfig } from "@/lib/constants/metadata";
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

// ISR: 商品詳細は60秒ごとに再生成（Supabase更新は最大60秒遅れで反映）
export const revalidate = 60;

// ビルド時に既知の商品を各ロケールで事前生成。未知のidは初回アクセス時に生成される。
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

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
  const relatedPosts = getPostsForProduct(id);
  const copy = localizeProductCopy(id, locale);
  const nutrition = rich?.nutritionFacts;
  const nutritionRows = nutrition
    ? NUTRITION_KEYS.filter((key) => nutrition[key] != null)
    : [];

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const productImageUrl = product.image.startsWith("http")
    ? product.image
    : `${siteConfig.url}${product.image}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: copy.longDescription ?? copy.description ?? product.description,
    image: productImageUrl,
    brand: { "@type": "Brand", name: "DoSee Wellness" },
    category: "Health & Wellness > Tea",
    sku: id,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/shop/${id}`,
      priceCurrency: "JPY",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      seller: { "@type": "Organization", name: "DoSee Wellness" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "500",
          currency: "JPY",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "JP",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "JP",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnShippingFees",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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

      {relatedPosts.length > 0 && (
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-6">{t("relatedArticles")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-xl border border-border/60 bg-muted/30 p-5 transition-colors hover:border-brand/50 hover:bg-muted/50"
              >
                <p className="text-xs text-brand font-medium mb-2 uppercase tracking-wide">
                  {post.category}
                </p>
                <h3 className="font-medium leading-snug">{post.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
      </main>
    </>
  );
}
