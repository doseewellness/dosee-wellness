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
 * Helper function to get full product URL
 */
export function getProductUrl(product: keyof typeof SHOP_URLS.products): string {
  return `${SHOP_URLS.base}${SHOP_URLS.products[product]}`
}

/**
 * Helper function to get full collection URL
 */
export function getCollectionUrl(collection: keyof typeof SHOP_URLS.collections): string {
  return `${SHOP_URLS.base}${SHOP_URLS.collections[collection]}`
}