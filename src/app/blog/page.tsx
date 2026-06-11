import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { getAllPosts } from '@/lib/blog/posts'
import '../../styles/pages.css'

export const metadata: Metadata = {
  title: 'DoSee Wellness Note - 日本茶とウェルネスの読みもの',
  description:
    '抹茶・ほうじ茶の文化や成分、続けやすいウェルネス習慣のヒントを届ける読みもの。DoSee Wellness が大切にする「整える時間」をやさしく綴ります。',
  keywords: ['抹茶 文化', '日本茶 ウェルネス', '抹茶 美容', 'ほうじ茶 カフェイン', 'ウェルネス 習慣', 'DoSee Wellness Note'],
  alternates: { canonical: 'https://doseewellness.com/blog' },
  openGraph: {
    title: 'DoSee Wellness Note - 日本茶とウェルネスの読みもの',
    description: '抹茶・ほうじ茶の文化や成分、続けやすいウェルネス習慣のヒントを届ける読みもの。',
    url: 'https://doseewellness.com/blog',
    type: 'website',
  },
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'DoSee Wellness Note',
    url: 'https://doseewellness.com/blog',
    description: '抹茶・ほうじ茶の文化や成分、続けやすいウェルネス習慣のヒントを届ける読みもの。',
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
          <p className="product-category">DOSEE WELLNESS NOTE</p>
          <h1>読みもの</h1>
          <p className="subtitle">
            日本茶の文化と、続けやすいウェルネスのヒントを。
          </p>
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
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                  <span>・約{featured.readingMinutes}分で読めます</span>
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
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    <span>・約{post.readingMinutes}分</span>
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
            ← トップページに戻る
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
