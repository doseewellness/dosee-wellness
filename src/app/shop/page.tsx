import { Suspense } from "react";
import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm tracking-widest text-emerald-700 uppercase mb-2">Products</p>
        <h1 className="text-3xl font-bold mb-1">商品一覧</h1>
        <p className="text-sm text-gray-500">{products.length}件の商品</p>
      </div>

      <Suspense fallback={<ProductGridSkeleton />}>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            商品がありません。
          </div>
        )}
      </Suspense>
    </main>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-xl bg-gray-100 animate-pulse aspect-[3/4]" />
      ))}
    </div>
  );
}
