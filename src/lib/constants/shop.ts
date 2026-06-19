/**
 * Shopify Store URLs
 * Central configuration for all shop.doseewellness.com links
 */

export const SHOP_URLS = {
  base: 'https://shop.doseewellness.com',
  
  products: {
    matchaLatte: '/products/matcha-latte',
    hojichaLatte: '/products/hojicha-latte',
  },
  
  collections: {
    wellcha: '/collections/wellcha',
    dosee: '/collections/dosee',
  },
  
  pages: {
    about: '/pages/dosee-とは',
    blog: '/blogs/dosee-wellness-note',
    contact: '/pages/contact',
  }
} as const

/**
 * Shopifyを販売チャネルとして使うかどうかのフラグ。
 * false の間は購入導線を内部Stripeショップ(/shop)へ向ける。
 * 将来Shopifyを再開する場合は true にするだけで切り替わる（定数はすべて温存）。
 */
export const USE_SHOPIFY = false

/** 商品キー（matchaLatte / hojichaLatte） */
export type ProductKey = keyof typeof SHOP_URLS.products

/**
 * Shopify商品キー → 内部ショップのスラッグ（/shop/[id]）対応表。
 */
const INTERNAL_PRODUCT_SLUGS: Record<keyof typeof SHOP_URLS.products, string> = {
  matchaLatte: 'matcha-latte',
  hojichaLatte: 'hojicha-latte',
}

/** ProductKey → 内部ショップのスラッグ（/shop/[id]）。対応がなければ null。 */
export function productKeyToSlug(product: ProductKey): string {
  return INTERNAL_PRODUCT_SLUGS[product]
}

/**
 * Helper function to get full product URL
 */
export function getProductUrl(product: keyof typeof SHOP_URLS.products): string {
  return `${SHOP_URLS.base}${SHOP_URLS.products[product]}`
}

/**
 * 現在の販売チャネルに応じた購入URLを返す。
 * USE_SHOPIFY=true ならShopify、falseなら内部ショップの商品ページ。
 */
export function getPurchaseUrl(product: keyof typeof SHOP_URLS.products): string {
  return USE_SHOPIFY
    ? getProductUrl(product)
    : `/shop/${INTERNAL_PRODUCT_SLUGS[product]}`
}

/**
 * Helper function to get full collection URL
 */
export function getCollectionUrl(collection: keyof typeof SHOP_URLS.collections): string {
  return `${SHOP_URLS.base}${SHOP_URLS.collections[collection]}`
}