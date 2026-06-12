'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import ParticlesCanvas from '../../components/ParticlesCanvas'
import Navigation from '../../components/Navigation'
import HeroSection from '../../components/HeroSection'
import InteractiveSection from '../../components/InteractiveSection'
import Footer from '../../components/Footer'
import { multiline, paragraphs } from '../../components/MultiLine'
import { getPurchaseUrl, USE_SHOPIFY } from '../../lib/constants/shop'
import { getAllPosts } from '../../lib/blog/posts'
import { shipporiMincho } from './fonts'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const t = useTranslations('home')
  const locale = useLocale()
  const latestPosts = getAllPosts().slice(0, 3)
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const tryScroll = () => {
      const el = document.querySelector(hash)
      if (!el) return false
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }

    // まず即トライ
    if (tryScroll()) return

    // 次に数フレーム待って再トライ（Turbopack/SSRで描画が間に合わない時の保険）
    let raf1 = requestAnimationFrame(() => {
      if (tryScroll()) return
      let raf2 = requestAnimationFrame(() => {
        tryScroll()
      })
      // @ts-ignore
      raf1 = raf2
    })

    return () => cancelAnimationFrame(raf1)
  }, [])

  // 構造化データ - 組織情報
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

  // 構造化データ - パンくずリスト
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
    <div className="app">
      {/* 構造化データの埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ParticlesCanvas />
      <Navigation isScrolled={isScrolled} />

      <HeroSection />

      <InteractiveSection id="philosophy" className="philosophy-section">
        <div className="philosophy-layout">
          {/* LEFT: text（ここはほぼそのまま） */}
          <div className="philosophy-copy">
            <p className="section-label">{t('philosophy.label')}</p>

            <h2 className="philosophy-title">{t('philosophy.title')}</h2>

            <div className="philosophy-lead">
              {paragraphs(t('philosophy.lead'))}
            </div>
          </div>

          {/* RIGHT: circles */}
          <div className="philosophy-visual">
            <div className="philosophy-circles">
              {/* Mind */}
              <div className="circle-wrap circle-mind">
                <button type="button" className="circle">
                  <span>Mind</span>
                </button>
                <div className="circle-caption">
                  {paragraphs(t('circles.mind'))}
                </div>
              </div>

              {/* Body */}
              <div className="circle-wrap circle-body">
                <button type="button" className="circle">
                  <span>Body</span>
                </button>
                <div className="circle-caption">
                  {paragraphs(t('circles.body'))}
                </div>
              </div>

              {/* Skin */}
              <div className="circle-wrap circle-skin">
                <button type="button" className="circle">
                  <span>Skin</span>
                </button>
                <div className="circle-caption">
                  {paragraphs(t('circles.skin'))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </InteractiveSection>

      <div className="parallax-section">
        <div className="parallax-bg" aria-hidden="true" />
        <div className="parallax-overlay" aria-hidden="true" />

        <div className="parallax-content">
          <h2 className="parallax-title">
            {multiline(t('parallax.title'))}
          </h2>
          <p className="parallax-lead">
            {multiline(t('parallax.lead'))}
          </p>
        </div>
      </div>

      <InteractiveSection id="products">
        <div className="products-header">
          <div>
            <p className="section-label">{t('products.label')}</p>
            <h2>{t('products.title')}</h2>
            <p className="section-description">
              {multiline(t('products.description'))}
            </p>
          </div>
        </div>

        <div className="products-grid-v2">
          {/* ✅ WellCha Card（外側Linkを廃止：a入れ子を根絶） */}
          <div
            className="product-card-v2-link"
            role="link"
            tabIndex={0}
            onClick={() => router.push('/wellcha')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') router.push('/wellcha')
            }}
          >
            <div className="product-card-v2 product-card-wellcha-v2">
              <div
                className="product-card-bg"
                style={{ backgroundImage: "url('/images/bg/wellcha-bg.jpg')" }}
              />
              <div className="product-card-overlay" />
              <div className="product-card-v2-content">
                <span className="product-badge-v2">{t('products.wellchaName')}</span>
                <h3>
                  {multiline(t('products.wellchaTitle'))}
                </h3>
                <p className="product-description-highlight">
                  {multiline(t('products.wellchaHighlight'))}
                </p>

                {/* クリック伝播を止めて、カード遷移と競合させない */}
                <div
                  className="product-actions"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <span className="action-label">{t('products.actionLabel')}</span>

                  <div className="product-tags-v2">
                    <a
                      href={getPurchaseUrl('matchaLatte')}
                      {...(USE_SHOPIFY ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="product-tag-v2 product-tag-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('products.matcha')}
                    </a>

                    <a
                      href={getPurchaseUrl('hojichaLatte')}
                      {...(USE_SHOPIFY ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="product-tag-v2 product-tag-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('products.hojicha')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DoSee Card - Background links to /dosee（中に<a>が無いのでLinkのままでOK） */}
          <Link href="/dosee" className="product-card-v2-link">
            <div className="product-card-v2 product-card-dosee-v2">
              <div
                className="product-card-bg"
                style={{ backgroundImage: "url('/images/bg/dosee-bg.jpg')" }}
              />
              <div className="product-card-overlay" />
              <div className="product-card-v2-content">
                <span className="product-badge-v2 product-badge-orange-v2">{t('products.doseeName')}</span>
                <h3>
                  {multiline(t('products.doseeTitle'))}
                </h3>
                <p>
                  {multiline(t('products.doseeDescription'))}
                </p>
                <div className="product-tags-v2">
                  <span className="product-tag-v2 product-tag-orange-v2">{t('products.doseeTag')}</span>
                  <span className="product-tag-status-v2">{t('products.comingSoon')}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </InteractiveSection>

      <InteractiveSection id="about" className="text-center about-section">
        <p className="section-label">
          {multiline(t('about.label'))}
        </p>
        <h2>
          {multiline(t('about.title'))}
        </h2>
        <p className="section-description">
          {multiline(t('about.description'))}
        </p>

        <div className="about-keywords">
          <div className="about-keyword">
            <h3>{t('about.keyword1Title')}</h3>
            <p>
              {multiline(t('about.keyword1Body'))}
            </p>
          </div>
          <div className="about-keyword">
            <h3>{t('about.keyword2Title')}</h3>
            <p>
              {multiline(t('about.keyword2Body'))}
            </p>
          </div>
          <div className="about-keyword">
            <h3>{t('about.keyword3Title')}</h3>
            <p>
              {multiline(t('about.keyword3Body'))}
            </p>
          </div>
        </div>
      </InteractiveSection>

      <section className="poetry-section">
        <div className={`poetry-inner ${shipporiMincho.className}`}>
          <p className="poetry-left">
            {multiline(t('poetry.left'))}
          </p>

          <p className="poetry-right">
            {multiline(t('poetry.right'))}
          </p>
        </div>
      </section>

      <section className="home-note-section">
        <div className="home-note-header">
          <p className="section-label">{t('note.label')}</p>
          <h2>{t('note.title')}</h2>
          <p className="home-note-description">
            {t('note.description')}
          </p>
        </div>

        <div className="home-note-grid">
          {latestPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="home-note-card">
              <div
                className="home-note-card-image"
                style={{ backgroundImage: `url('${post.heroImage}')` }}
                aria-hidden="true"
              />
              <div className="home-note-card-body">
                <span className="home-note-tag">{post.category}</span>
                <h3>{post.title}</h3>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
            </Link>
          ))}
        </div>

        <div className="home-note-cta">
          <Link href="/blog" className="home-note-more">
            {t('note.more')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}