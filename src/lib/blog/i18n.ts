import type { Locale } from '@/i18n/routing'
import type { BlogBlock, BlogPost } from './posts'
import { blogTranslationsEn } from './translations/en'
import { blogTranslationsZh } from './translations/zh'
import { blogTranslationsFr } from './translations/fr'
import { blogTranslationsEs } from './translations/es'

/**
 * 記事の翻訳可能フィールド。`body` は日本語版とブロック数・順序・type を一致させる。
 * 欠落したフィールド／ブロックは自動的に日本語版へフォールバックする。
 */
export interface BlogPostTranslation {
  title?: string
  subtitle?: string
  excerpt?: string
  heroAlt?: string
  productTie?: { label: string; lead: string }
  body?: BlogBlock[]
}

export type BlogTranslations = Record<string, BlogPostTranslation>

const registry: Partial<Record<Locale, BlogTranslations>> = {
  en: blogTranslationsEn,
  zh: blogTranslationsZh,
  fr: blogTranslationsFr,
  es: blogTranslationsEs,
}

function localizeBlock(base: BlogBlock, override?: BlogBlock): BlogBlock {
  if (!override || override.type !== base.type) return base
  return override
}

/** 記事を指定ロケールにローカライズする。ja またはデータ欠落時は原文を返す。 */
export function localizePost(post: BlogPost, locale: Locale): BlogPost {
  if (locale === 'ja') return post
  const t = registry[locale]?.[post.slug]
  if (!t) return post

  const body = t.body
    ? post.body.map((block, i) => localizeBlock(block, t.body?.[i]))
    : post.body

  return {
    ...post,
    title: t.title ?? post.title,
    subtitle: t.subtitle ?? post.subtitle,
    excerpt: t.excerpt ?? post.excerpt,
    heroAlt: t.heroAlt ?? post.heroAlt,
    productTie: post.productTie
      ? {
          ...post.productTie,
          label: t.productTie?.label ?? post.productTie.label,
          lead: t.productTie?.lead ?? post.productTie.lead,
        }
      : post.productTie,
    body,
  }
}
