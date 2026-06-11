/**
 * Supabase未設定時に使うモックカタログ。
 * 商品事実の単一ソースは src/data/products.json。ここから販売可能な商品だけを
 * 変換し、Supabase本番カタログと同じ Product 形に揃える（データ二重管理を回避）。
 */
import { Product } from "@/types/product";
import productsData from "@/data/products.json";

export const products: Product[] = productsData
  .filter((p) => !("comingSoon" in p && p.comingSoon))
  .map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.images.thumbnail,
    category: p.category as Product["category"],
    rating: p.rating ?? 0,
    reviewCount: p.reviewCount ?? 0,
    inStock: p.inStock,
  }));

export const categories = [
  { id: "wellcha", label: "WellCha", icon: "🍵" },
  { id: "dosee", label: "DoSee", icon: "⚡" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
