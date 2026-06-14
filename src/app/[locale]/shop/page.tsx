import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/lib/data";
import { localizeProductCopy } from "@/lib/products/i18n";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const locale = (await getLocale()) as Locale;
  const products = (await getProducts()).map((p) => ({
    ...p,
    description: localizeProductCopy(p.id, locale).description ?? p.description,
  }));
  const t = await getTranslations("shopPage");

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-sm tracking-widest text-brand-dark uppercase mb-2">{t("eyebrow")}</p>
        <h1 className="text-3xl font-bold mb-1">{t("heading")}</h1>
        <p className="text-sm text-muted-foreground">{t("productCount", { count: products.length })}</p>
      </div>

      <Suspense fallback={<ProductGridSkeleton />}>
        {products.length > 0 ? (
          <div className="mx-auto grid max-w-3xl grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            {t("empty")}
          </div>
        )}
      </Suspense>
    </main>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 sm:grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="rounded-xl bg-muted animate-pulse aspect-[3/4]" />
      ))}
    </div>
  );
}
