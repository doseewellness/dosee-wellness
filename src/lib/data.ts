/**
 * 商品データのファサード。
 * Supabaseが設定済みかつ到達可能ならそちらを、未設定/エラー時はモック
 * (products.json由来) に自動フォールバックする。
 * これにより Supabase 不在でも /shop と購入導線が動作する。
 */
import { Product } from "@/types/product";

const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_project_url";

function warnFallback(fn: string, err: unknown) {
  console.warn(
    `[data] Supabase ${fn} に失敗したためモックにフォールバック:`,
    (err as Error).message
  );
}

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured) {
    try {
      const { getProducts } = await import("@/lib/supabase/products");
      return await getProducts();
    } catch (err) {
      warnFallback("getProducts", err);
    }
  }
  const { products } = await import("@/lib/products");
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isSupabaseConfigured) {
    try {
      const { getProductById } = await import("@/lib/supabase/products");
      return await getProductById(id);
    } catch (err) {
      warnFallback("getProductById", err);
    }
  }
  const { getProductById: mockGet } = await import("@/lib/products");
  return mockGet(id) ?? null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (isSupabaseConfigured) {
    try {
      const { getProductsByCategory } = await import("@/lib/supabase/products");
      return await getProductsByCategory(category);
    } catch (err) {
      warnFallback("getProductsByCategory", err);
    }
  }
  const { getProductsByCategory: mockGet } = await import("@/lib/products");
  return mockGet(category);
}

export async function getCategories() {
  if (isSupabaseConfigured) {
    try {
      const { getCategories } = await import("@/lib/supabase/products");
      return await getCategories();
    } catch (err) {
      warnFallback("getCategories", err);
    }
  }
  const { categories } = await import("@/lib/products");
  return categories.map((c, i) => ({
    id: c.id,
    label: c.label,
    icon: c.icon,
    sort_order: i,
  }));
}
