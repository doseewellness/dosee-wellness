import { productKeyToSlug } from '@/lib/constants/shop'
import { getAllPosts, type BlogPost } from './posts'

/** 指定商品（/shop/[id] のスラッグ）に紐づくブログ記事を新着順で返す。 */
export function getPostsForProduct(productId: string, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.productTie && productKeyToSlug(p.productTie.key) === productId)
    .slice(0, limit)
}
