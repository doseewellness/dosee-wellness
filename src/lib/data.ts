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

// Supabaseが到達不能（プロジェクト削除/一時停止など）だと接続タイムアウトまで
// 数秒ブロックしてしまうため、短いタイムアウトで打ち切って即モックへ倒す。
const SUPABASE_TIMEOUT_MS = 1500;

function withTimeout<T>(promise: Promise<T>, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(`${label} が ${SUPABASE_TIMEOUT_MS}ms でタイムアウト`)),
        SUPABASE_TIMEOUT_MS
      )
    ),
  ]);
}

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
      return await withTimeout(getProducts(), "getProducts");
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
      return await withTimeout(getProductById(id), "getProductById");
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
      return await withTimeout(getProductsByCategory(category), "getProductsByCategory");
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
      return await withTimeout(getCategories(), "getCategories");
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
