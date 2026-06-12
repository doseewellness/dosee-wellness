'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { multiline, paragraphs } from '@/components/MultiLine'
import productsData from '../../../data/products.json'
import { localizeProductCopy } from '@/lib/products/i18n'
import type { Locale } from '@/i18n/routing'
import '../../../styles/pages.css'

export default function DoSeePage() {
  const t = useTranslations('doseePage')
  const tb = useTranslations('blog')
  const locale = useLocale() as Locale

  // 商品データを取得
  const gingerShot = productsData.find(p => p.id === 'ginger-shot')
  const gingerCopy = localizeProductCopy('ginger-shot', locale)

  // 構造化データ - 商品情報（ジンジャーショット）
  const gingerShotJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: gingerShot?.name || 'DoSee 7-Day Ginger Shot',
    description: gingerCopy.longDescription || gingerShot?.longDescription || '',
    brand: {
      '@type': 'Brand',
      name: 'DoSee Wellness',
    },
    category: 'Health & Wellness > Supplements',
    offers: {
      '@type': 'Offer',
      url: 'https://doseewellness.com/dosee',
      priceCurrency: 'JPY',
      price: gingerShot?.price || '2980',
      availability: 'https://schema.org/PreOrder',
      availabilityStarts: '2025-06-01',
      seller: {
        '@type': 'Organization',
        name: 'DoSee Wellness',
      },
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
        name: tb('breadcrumbHome'),
        item: 'https://doseewellness.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'DoSee',
        item: 'https://doseewellness.com/dosee',
      },
    ],
  }

  return (
    <div className="page-container">
      {/* 構造化データの埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gingerShotJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navigation isScrolled={true} />

      <section className="product-hero">
        <div className="hero-bg" style={{
          background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%)'
        }} />
        <div className="product-hero-content">
          <p className="product-category">{t('hero.category')}</p>
          <h1>{multiline(t('hero.title'))}</h1>
          <p className="product-subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="product-tags">
            <span className="tag tag-orange">
              <span className="tag-dot" style={{backgroundColor: '#f97316'}}></span>
              {t('hero.tag1')}
            </span>
            <span className="tag">
              {t('hero.tag2')}
            </span>
            <span className="tag">
              {t('hero.tag3')}
            </span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-wrapper">
          <p className="section-label">{t('story.label')}</p>
          <h2>{multiline(t('story.heading'))}</h2>

          <div className="text-content">
            {paragraphs(t('story.body'))}
          </div>
        </div>
      </section>

      <section className="content-section" id="ginger-shot" style={{backgroundColor: '#fafaf9'}}>
        <div className="section-wrapper">
          <p className="section-label" style={{color: '#ea580c'}}>{t('gingerShot.label')}</p>
          <h2>{multiline(t('gingerShot.heading'))}</h2>

          <div className="text-content">
            <p>
              {t('gingerShot.body')}
            </p>
          </div>

          <div className="concept-card">
            <h3>{t('gingerShot.concept.title')}</h3>
            <p>
              {t('gingerShot.concept.body')}
            </p>
          </div>

          <div className="how-to-box">
            <h3>{t('gingerShot.scenes.heading')}</h3>
            <ul>
              <li>{t('gingerShot.scenes.item1')}</li>
              <li>{t('gingerShot.scenes.item2')}</li>
              <li>{t('gingerShot.scenes.item3')}</li>
            </ul>
          </div>

          <div className="status-card">
            <p className="status-badge">{t('gingerShot.status.badge')}</p>
            <p>
              {t('gingerShot.status.body')}
            </p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-wrapper">
          <p className="section-label">{t('ritual.label')}</p>
          <h2>{multiline(t('ritual.heading'))}</h2>

          <div className="text-content">
            <p>
              {multiline(t('ritual.body'))}
            </p>
          </div>

          <div className="ritual-steps">
            <div className="ritual-step">
              <span className="step-number">1</span>
              <p>{t('ritual.step1')}</p>
            </div>
            <div className="ritual-step">
              <span className="step-number">2</span>
              <p>{t('ritual.step2')}</p>
            </div>
            <div className="ritual-step">
              <span className="step-number">3</span>
              <p>{t('ritual.step3')}</p>
            </div>
          </div>

          <div className="philosophy-card">
            <p>
              <strong>{t('ritual.philosophy.lead')}</strong>
            </p>
            <p>
              {t('ritual.philosophy.body')}
            </p>
          </div>
        </div>
      </section>

      <section className="content-section" style={{paddingTop: '2rem', paddingBottom: '4rem'}}>
        <div className="section-wrapper text-center">
          <Link href="/" className="back-button">
            {t('backButton')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
