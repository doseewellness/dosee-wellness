import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { USE_SHOPIFY } from '@/lib/constants/shop'
import { blogPosts, getPostBySlug, getProductUrlForPost, type BlogBlock } from '@/lib/blog/posts'
import '../../../styles/pages.css'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: '記事が見つかりません | DoSee Wellness Note' }

  const url = `https://doseewellness.com/blog/${post.slug}`
  return {
    title: `${post.title} | DoSee Wellness Note`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: `https://doseewellness.com${post.heroImage}`, alt: post.heroAlt }],
    },
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'lead':
      return <p className="blog-lead">{block.text}</p>
    case 'h2':
      return <h2>{block.text}</h2>
    case 'p':
      return <p>{block.text}</p>
    case 'list':
      return (
        <ul className="blog-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'quote':
      return <blockquote className="blog-quote">{block.text}</blockquote>
    case 'callout':
      return (
        <div className="blog-callout">
          {block.title && <p className="blog-callout-title">{block.title}</p>}
          <p>{block.text}</p>
        </div>
      )
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const productUrl = getProductUrlForPost(post)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://doseewellness.com${post.heroImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Organization', name: 'DoSee Wellness' },
    publisher: {
      '@type': 'Organization',
      name: 'DoSee Wellness',
      logo: { '@type': 'ImageObject', url: 'https://doseewellness.com/logo.png' },
    },
    mainEntityOfPage: `https://doseewellness.com/blog/${post.slug}`,
    keywords: post.keywords.join(', '),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://doseewellness.com' },
      { '@type': 'ListItem', position: 2, name: '読みもの', item: 'https://doseewellness.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://doseewellness.com/blog/${post.slug}`,
      },
    ],
  }

  return (
    <div className="page-container blog-page blog-article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navigation isScrolled={true} />

      <article>
        <header className="blog-article-hero">
          <div
            className="blog-article-hero-image"
            style={{ backgroundImage: `url('${post.heroImage}')` }}
            role="img"
            aria-label={post.heroAlt}
          />
          <div className="blog-article-hero-overlay" />
          <div className="blog-article-hero-content">
            <span className="blog-tag">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="blog-article-subtitle">{post.subtitle}</p>
            <div className="blog-meta blog-meta-light">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>・約{post.readingMinutes}分で読めます</span>
            </div>
          </div>
        </header>

        <div className="static-page-section">
          <div className="section-wrapper blog-article-body">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            {post.productTie && productUrl && (
              <div className="blog-product-cta">
                <p className="blog-product-cta-lead">{post.productTie.lead}</p>
                <Link
                  href={productUrl}
                  {...(USE_SHOPIFY ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="shop-button"
                >
                  {post.productTie.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>

      <section className="content-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="section-wrapper text-center">
          <Link href="/blog" className="back-button">
            ← 読みもの一覧に戻る
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
