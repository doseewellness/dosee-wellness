import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product";
import { ProductRow } from "@/types/database";

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    image: row.image_url,
    category: row.category as Product["category"],
    rating: row.rating,
    reviewCount: row.review_count,
    badge: row.badge ?? undefined,
    inStock: row.in_stock,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    // 行なし(PGRST116)は通常の「商品が無い」→ null。
    // それ以外（接続不可など）は投げてファサード側でモックにフォールバックさせる。
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  return toProduct(data);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toProduct);
}

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}
