import { siteConfig } from "@/lib/constants/metadata";
import productsData from "@/data/products.json";

// Google Merchant Center 商品フィード（RSS 2.0 + g: 名前空間）。
// 商品事実の単一ソースは src/data/products.json。販売可能な商品のみ出力する。
// 国内送料は決済ロジック（api/checkout）と同じ。全国 500円、
// 北海道・沖縄・離島は 1000円。離島はprefecture指定できないため、
// 確実な離島対応は Merchant Center 側の配送設定で補う。
const SHIPPING_FEE = 500;
const SHIPPING_REMOTE_FEE = 1000;
// Google の shipping region は国コード接頭辞なしの ISO 3166-2 サブディビジョンコード。
const REMOTE_REGIONS = ["01", "47"]; // 北海道, 沖縄
const GOOGLE_PRODUCT_CATEGORY = "Food, Beverages & Tobacco > Beverages > Tea & Infusions";

type FeedProduct = {
  id: string;
  name: string;
  line?: string;
  price: number;
  currency: string;
  description: string;
  longDescription?: string;
  images: { hero?: string; thumbnail: string };
  inStock: boolean;
  comingSoon?: boolean;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function abs(path: string): string {
  return path.startsWith("http") ? path : `${siteConfig.url}${path}`;
}

function item(p: FeedProduct): string {
  const title = `${p.name}（${p.line ?? "WellCha"}） | DoSee Wellness`;
  const description = p.longDescription ?? p.description;
  const link = `${siteConfig.url}/shop/${p.id}`;
  const imageLink = abs(p.images.thumbnail);
  const availability = p.inStock ? "in_stock" : "out_of_stock";

  const shippingBlocks = [
    `      <g:shipping>
        <g:country>JP</g:country>
        <g:price>${SHIPPING_FEE}.00 ${escapeXml(p.currency)}</g:price>
      </g:shipping>`,
    ...REMOTE_REGIONS.map(
      (region) => `      <g:shipping>
        <g:country>JP</g:country>
        <g:region>${escapeXml(region)}</g:region>
        <g:price>${SHIPPING_REMOTE_FEE}.00 ${escapeXml(p.currency)}</g:price>
      </g:shipping>`
    ),
  ].join("\n");

  return `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(title)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(imageLink)}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${p.price}.00 ${escapeXml(p.currency)}</g:price>
      <g:brand>DoSee Wellness</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${escapeXml(GOOGLE_PRODUCT_CATEGORY)}</g:google_product_category>
${shippingBlocks}
    </item>`;
}

export async function GET() {
  const products = (productsData as FeedProduct[]).filter(
    (p) => p.inStock && !p.comingSoon
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>DoSee Wellness</title>
    <link>${siteConfig.url}</link>
    <description>DoSee Wellness 商品フィード（WellCha 日本茶ラテ）</description>
${products.map(item).join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
