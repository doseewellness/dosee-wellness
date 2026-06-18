'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { multiline, paragraphs } from '../../../components/MultiLine'
import '../../../styles/pages.css'

export default function AboutPage() {
  const t = useTranslations('aboutPage')

  // 構造化データ - 会社情報
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '株式会社DoSee Group',
    alternateName: 'DoSee Wellness',
    url: 'https://doseewellness.com',
    logo: 'https://doseewellness.com/logo.png',
    description: '忙しい現代でも続けられるウェルネスをテーマにした日本発のブランド。「整えなきゃ」という義務感ではなく、自分を大切にしたいという気持ちから始まる、無理のないウェルネス習慣を提供します。',
    foundingDate: '2026-04-22',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@doseegroup.com',
      contactType: 'Customer Service',
      availableLanguage: ['Japanese', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      postalCode: '150-0043',
      addressRegion: '東京都',
      addressLocality: '渋谷区',
      streetAddress: '道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F-C',
    },
    sameAs: [
      'https://www.instagram.com/wellchamatcha',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    brand: [
      {
        '@type': 'Brand',
        name: 'WellCha',
        description: '日本茶ベースのウェルネスライン',
      },
      {
        '@type': 'Brand',
        name: 'DoSee',
        description: 'ショット系ウェルネスライン',
      },
    ],
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://doseewellness.com/about',
      },
    ],
  }

  return (
    <div className="page-container about-page">
      {/* 構造化データの埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navigation isScrolled={true} />

      <section className="static-page-hero">
        <div className="static-page-content">
          <p className="product-category">{t('heroCategory')}</p>
          <h1>{t('heroTitle')}</h1>
          <p className="subtitle">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      <section className="static-page-section">
        <div className="section-wrapper">
          <h2>{t('ourStoryHeading')}</h2>
          <div className="text-content">
            <p>{t('storyP1')}</p>
            <p>
              {t('storyP2Pre')}<strong>WellCha</strong>{t('storyP2Mid')}<strong>DoSee</strong>{t('storyP2Post')}
            </p>
            <p>{t('storyP3')}</p>
            <p>{t('storyP4')}</p>
            <p>{t('storyP5')}</p>
          </div>

          <h2>{t('ourMissionHeading')}</h2>
          <div className="text-content">
            <p>{t('missionP1')}</p>
            <p>{t('missionP2')}</p>
          </div>

          <h2>{t('companyInfoHeading')}</h2>
          <div className="company-info">
            <div className="info-row">
              <span className="info-label">{t('companyNameLabel')}</span>
              <span className="info-value">{t('companyNameValue')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('foundedLabel')}</span>
              <span className="info-value">{t('foundedValue')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('addressLabel')}</span>
              <span className="info-value">
                {multiline(t('addressValue'))}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('businessLabel')}</span>
              <span className="info-value">{t('businessValue')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('contactLabel')}</span>
              <span className="info-value">
                <a href="mailto:info@doseegroup.com">info@doseegroup.com</a>
              </span>
            </div>
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
