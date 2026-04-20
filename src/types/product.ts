export type ProductCategory =
  | "supplements"
  | "fitness"
  | "beauty"
  | "nutrition"
  | "mindfulness";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
