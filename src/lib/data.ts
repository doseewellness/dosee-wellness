/**
 * SUPABASE_URLが設定済みかどうかで実データ/モックを切り替えるファサード。
 * Supabase接続設定後は supabase/products.ts が呼ばれる。
 */
import { Product } from "@/types/product";

const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_project_url";

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured) {
    const { getProducts } = await import("@/lib/supabase/products");
    return getProducts();
  }
  const { products } = await import("@/lib/products");
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isSupabaseConfigured) {
    const { getProductById } = await import("@/lib/supabase/products");
    return getProductById(id);
  }
  const { getProductById: mockGet } = await import("@/lib/products");
  return mockGet(id) ?? null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (isSupabaseConfigured) {
    const { getProductsByCategory } = await import("@/lib/supabase/products");
    return getProductsByCategory(category);
  }
  const { getProductsByCategory: mockGet } = await import("@/lib/products");
  return mockGet(category);
}

export async function getCategories() {
  if (isSupabaseConfigured) {
    const { getCategories } = await import("@/lib/supabase/products");
    return getCategories();
  }
  const { categories } = await import("@/lib/products");
  return categories.map((c, i) => ({
    id: c.id,
    label: c.label,
    icon: c.icon,
    sort_order: i,
  }));
}
