import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "マルチビタミン プレミアム",
    description:
      "20種類以上のビタミン・ミネラルを配合。毎日の健康維持をサポートする高品質サプリメント。",
    price: 3980,
    originalPrice: 5280,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    category: "supplements",
    rating: 4.8,
    reviewCount: 342,
    badge: "ベストセラー",
    inStock: true,
  },
  {
    id: "2",
    name: "プロテインパウダー バニラ",
    description:
      "植物由来の高品質プロテイン。1食あたり25gのタンパク質を含む。",
    price: 5480,
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop",
    category: "nutrition",
    rating: 4.6,
    reviewCount: 218,
    inStock: true,
  },
  {
    id: "3",
    name: "オメガ3 フィッシュオイル",
    description: "EPA・DHAを豊富に含む高純度フィッシュオイル。心臓と脳の健康をサポート。",
    price: 2980,
    originalPrice: 3480,
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    category: "supplements",
    rating: 4.7,
    reviewCount: 156,
    badge: "新発売",
    inStock: true,
  },
  {
    id: "4",
    name: "ヨガマット エコプレミアム",
    description:
      "天然ゴム素材の高グリップヨガマット。6mm厚で関節への負担を軽減。",
    price: 8800,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    category: "fitness",
    rating: 4.9,
    reviewCount: 423,
    badge: "人気No.1",
    inStock: true,
  },
  {
    id: "5",
    name: "コラーゲン ビューティードリンク",
    description:
      "低分子コラーゲン5000mg配合。ヒアルロン酸・ビタミンCも含む美容ドリンク。",
    price: 4280,
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop",
    category: "beauty",
    rating: 4.5,
    reviewCount: 289,
    inStock: true,
  },
  {
    id: "6",
    name: "瞑想アロマセット",
    description:
      "ラベンダー・フランキンセンス・サンダルウッドのブレンド。深いリラクゼーションへ。",
    price: 3480,
    originalPrice: 4200,
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&h=400&fit=crop",
    category: "mindfulness",
    rating: 4.8,
    reviewCount: 167,
    inStock: true,
  },
  {
    id: "7",
    name: "グルテンフリー プロテインバー",
    description:
      "1本あたり20gのタンパク質。人工甘味料不使用の自然な甘さ。",
    price: 1980,
    image:
      "https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=400&h=400&fit=crop",
    category: "nutrition",
    rating: 4.4,
    reviewCount: 94,
    inStock: false,
  },
  {
    id: "8",
    name: "レジスタンスバンドセット",
    description:
      "5段階の負荷レベル。自宅でのトレーニングに最適なセラバンドセット。",
    price: 2480,
    image:
      "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=400&h=400&fit=crop",
    category: "fitness",
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
  },
];

export const categories = [
  { id: "supplements", label: "サプリメント", icon: "💊" },
  { id: "fitness", label: "フィットネス", icon: "🏋️" },
  { id: "beauty", label: "ビューティー", icon: "✨" },
  { id: "nutrition", label: "栄養食品", icon: "🥗" },
  { id: "mindfulness", label: "マインドフルネス", icon: "🧘" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
