'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import ProductImageSlider from '../../components/ProductImageSlider'
import { getPurchaseUrl, USE_SHOPIFY } from '../../lib/constants/shop'
import { getAllPosts } from '../../lib/blog/posts'
import { localizePost } from '../../lib/blog/i18n'
import type { Locale } from '@/i18n/routing'
import { shipporiMincho } from './fonts'
import '../../styles/home.css'

interface Review {
  body: string
  name: string
  role: string
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const t = useTranslations('home')
  const locale = useLocale()
  const latestPosts = getAllPosts()
    .slice(0, 3)
    .map((p) => localizePost(p, locale as Locale))
  const reviews = t.raw('reviews.items') as Review[]
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const externalProps = USE_SHOPIFY
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {}

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DoSee Wellness',
    url: 'https://doseewellness.com',
    logo: 'https://doseewellness.com/logo.png',
    description: '忙しい毎日をやさしく整える日本茶ベースのウェルネスブランド',
    sameAs: ['https://www.instagram.com/wellchamatcha'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@dosee-wellness.com',
      contactType: 'Customer Service',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://doseewellness.com',
      },
    ],
  }

  return (
    <div className={`home-v2 ${shipporiMincho.className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navigation isScrolled={isScrolled} />

      {/* HERO */}
      <header className="ed-hero">
        <div className="ed-hero-bg" aria-hidden="true" />
        <div className="ed-hero-inner">
          <p className="ed-hero-eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="ed-hero-title serif">{t('hero.title')}</h1>
          <p className="ed-hero-tagline">{t('hero.tagline')}</p>
          <p className="ed-hero-intro">{t('hero.intro')}</p>
          <a href="#product" className="ed-btn-light">{t('hero.cta')}</a>
        </div>
        <span className="ed-scroll">{t('hero.scroll')}</span>
      </header>

      {/* STORY */}
      <section id="story" className="ed-section ed-story">
        <div className="ed-wrap">
          <div className="ed-story-grid">
            <div>
              <p className="ed-eyebrow">{t('story.eyebrow')}</p>
              <h2 className="ed-title serif">{t('story.title')}</h2>
            </div>
            <div>
              <p className="ed-lead">{t('story.body')}</p>
            </div>
          </div>
          <div className="ed-story-keywords">
            <div className="ed-kw">
              <h3 className="serif">{t('story.keyword1Title')}</h3>
              <p>{t('story.keyword1Body')}</p>
            </div>
            <div className="ed-kw">
              <h3 className="serif">{t('story.keyword2Title')}</h3>
              <p>{t('story.keyword2Body')}</p>
            </div>
            <div className="ed-kw">
              <h3 className="serif">{t('story.keyword3Title')}</h3>
              <p>{t('story.keyword3Body')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section id="product" className="ed-section ed-product">
        <div className="ed-wrap">
          <p className="ed-eyebrow">{t('product.eyebrow')}</p>
          <h2 className="ed-title serif">{t('product.title')}</h2>
          <p className="ed-lead">{t('product.description')}</p>

          <div className="ed-product-cards">
            <a href={getPurchaseUrl('matchaLatte')} {...externalProps} className="ed-pcard">
              <div className="ed-pcard-img">
                <ProductImageSlider
                  images={[
                    '/images/products/wellcha-matcha-1.jpg',
                    '/images/products/wellcha-matcha-2.jpg',
                  ]}
                  alt={t('product.matchaName')}
                  priority
                />
              </div>
              <div className="ed-pcard-body">
                <h3 className="serif">{t('product.matchaName')}</h3>
                <p>{t('product.matchaCopy')}</p>
              </div>
            </a>

            <a href={getPurchaseUrl('hojichaLatte')} {...externalProps} className="ed-pcard">
              <div className="ed-pcard-img">
                <ProductImageSlider
                  images={[
                    '/images/products/wellcha-hojicha-1.jpg',
                    '/images/products/wellcha-hojicha-2.jpg',
                  ]}
                  alt={t('product.hojichaName')}
                  delay={2250}
                />
              </div>
              <div className="ed-pcard-body">
                <h3 className="serif">{t('product.hojichaName')}</h3>
                <p>{t('product.hojichaCopy')}</p>
              </div>
            </a>
          </div>

          <Link href="/wellcha" className="ed-btn">{t('product.cta')}</Link>
        </div>
      </section>

      {/* WHY */}
      <section className="ed-section ed-why">
        <div className="ed-wrap">
          <p className="ed-eyebrow">{t('why.eyebrow')}</p>
          <h2 className="ed-title serif">{t('why.title')}</h2>
          <p className="ed-lead">{t('why.lead')}</p>
          <div className="ed-why-grid">
            <div className="ed-why-item">
              <div className="ed-why-ring" aria-hidden="true" />
              <h3 className="serif">Mind</h3>
              <p>{t('why.mind')}</p>
            </div>
            <div className="ed-why-item">
              <div className="ed-why-ring" aria-hidden="true" />
              <h3 className="serif">Body</h3>
              <p>{t('why.body')}</p>
            </div>
            <div className="ed-why-item">
              <div className="ed-why-ring" aria-hidden="true" />
              <h3 className="serif">Skin</h3>
              <p>{t('why.skin')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="ed-section ed-lifestyle">
        <div className="ed-lifestyle-bg" aria-hidden="true" />
        <div className="ed-wrap">
          <p className="ed-eyebrow">{t('lifestyle.eyebrow')}</p>
          <h2 className="ed-title serif">{t('lifestyle.title')}</h2>
          <p className="ed-lifestyle-lead">{t('lifestyle.lead')}</p>
          <div className="ed-poem">
            <p>{t('lifestyle.poemLeft')}</p>
            <p>{t('lifestyle.poemRight')}</p>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="ed-section ed-reviews">
        <div className="ed-wrap">
          <p className="ed-eyebrow">{t('reviews.eyebrow')}</p>
          <h2 className="ed-title serif">{t('reviews.title')}</h2>
          <div className="ed-reviews-grid">
            {reviews.map((review, i) => (
              <div key={i} className="ed-review">
                <div className="ed-review-stars" aria-hidden="true">★★★★★</div>
                <p>{review.body}</p>
                <div className="ed-review-name">{review.name}</div>
                <div className="ed-review-role">{review.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="ed-section ed-faq">
        <div className="ed-wrap">
          <p className="ed-eyebrow">{t('faq.eyebrow')}</p>
          <h2 className="ed-title serif">{t('faq.title')}</h2>
          <p className="ed-lead">{t('faq.body')}</p>
          <Link href="/faq" className="ed-btn">{t('faq.cta')}</Link>
        </div>
      </section>

      {/* ORDER CTA */}
      <section className="ed-section ed-order">
        <div className="ed-wrap">
          <p className="ed-eyebrow">{t('order.eyebrow')}</p>
          <h2 className="ed-title serif">{t('order.title')}</h2>
          <p>{t('order.body')}</p>
          <Link href="/shop" className="ed-btn-light">{t('order.cta')}</Link>
        </div>
      </section>

      {/* NOTE / blog */}
      <section className="ed-section ed-note">
        <div className="ed-wrap">
          <p className="ed-eyebrow">{t('note.eyebrow')}</p>
          <h2 className="ed-title serif">{t('note.title')}</h2>
          <p className="ed-lead">{t('note.description')}</p>
          <div className="ed-note-grid">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="ed-note-card">
                <div
                  className="ed-note-img"
                  style={{ backgroundImage: `url('${post.heroImage}')` }}
                  aria-hidden="true"
                />
                <div className="ed-note-body">
                  <span className="ed-note-tag">{post.category}</span>
                  <h3 className="serif">{post.title}</h3>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.6rem' }}>
            <Link href="/blog" className="ed-btn">{t('note.more')}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
