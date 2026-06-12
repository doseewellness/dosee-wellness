import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { getAllPosts } from '@/lib/blog/posts'
import { localizePost } from '@/lib/blog/i18n'
import { buildAlternates } from '@/lib/i18n/alternates'
import '../../../styles/pages.css'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, '/blog'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: 'https://doseewellness.com/blog',
      type: 'website',
    },
  }
}

const formatDate = (iso: string, locale: Locale) =>
  new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })

  const posts = getAllPosts().map((p) => localizePost(p, locale))
  const [featured, ...rest] = posts

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'DoSee Wellness Note',
    url: 'https://doseewellness.com/blog',
    description: t('metaDescription'),
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      datePublished: p.publishedAt,
      url: `https://doseewellness.com/blog/${p.slug}`,
    })),
  }

  return (
    <div className="page-container blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <Navigation isScrolled={true} />

      <section className="static-page-hero blog-hero">
        <div className="static-page-content">
          <p className="product-category">{t('eyebrow')}</p>
          <h1>{t('title')}</h1>
          <p className="subtitle">{t('subtitle')}</p>
        </div>
      </section>

      <section className="static-page-section blog-list-section">
        <div className="section-wrapper">
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="blog-featured">
              <div
                className="blog-featured-image"
                style={{ backgroundImage: `url('${featured.heroImage}')` }}
                aria-hidden="true"
              />
              <div className="blog-featured-body">
                <span className="blog-tag">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p className="blog-featured-excerpt">{featured.excerpt}</p>
                <div className="blog-meta">
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt, locale)}</time>
                  <span>・{t('readingTime', { minutes: featured.readingMinutes })}</span>
                </div>
              </div>
            </Link>
          )}

          <div className="blog-grid">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div
                  className="blog-card-image"
                  style={{ backgroundImage: `url('${post.heroImage}')` }}
                  aria-hidden="true"
                />
                <div className="blog-card-body">
                  <span className="blog-tag">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                    <span>・{t('readingTimeShort', { minutes: post.readingMinutes })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="section-wrapper text-center">
          <Link href="/" className="back-button">
            {t('backToTop')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
