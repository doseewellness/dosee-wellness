import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants/metadata'
import { locales } from '@/i18n/routing'
import { getAllPosts } from '@/lib/blog/posts'
import productsData from '@/data/products.json'

const DEFAULT_LOCALE = 'ja'
const base = siteConfig.url

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency']

function urlFor(locale: string, path: string): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  return `${base}${prefix}${path}`
}

function entry(
  path: string,
  opts: {
    priority?: number
    changeFrequency?: ChangeFrequency
    lastModified?: string | Date
  } = {}
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {}
  for (const l of locales) languages[l] = urlFor(l, path)

  return {
    url: urlFor(DEFAULT_LOCALE, path),
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? 'monthly',
    priority: opts.priority ?? 0.7,
    alternates: { languages },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: {
    path: string
    priority: number
    changeFrequency: ChangeFrequency
  }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/wellcha', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/shop', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/commerce', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const staticEntries = staticPaths.map((s) => entry(s.path, s))

  const blogEntries = getAllPosts().map((p) =>
    entry(`/blog/${p.slug}`, {
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: p.publishedAt,
    })
  )

  const productEntries = (productsData as { id: string }[]).map((p) =>
    entry(`/shop/${p.id}`, { priority: 0.8, changeFrequency: 'weekly' })
  )

  return [...staticEntries, ...blogEntries, ...productEntries]
}
