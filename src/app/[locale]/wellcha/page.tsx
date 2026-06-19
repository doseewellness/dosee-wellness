'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { multiline } from '@/components/MultiLine'
import productsData from '../../../data/products.json'
import { getPostsForProduct } from '@/lib/blog/related'
import { getPurchaseUrl, USE_SHOPIFY } from '../../../lib/constants/shop'
import { localizeProductCopy } from '@/lib/products/i18n'
import type { Locale } from '@/i18n/routing'
import '../../../styles/pages.css'

export default function WellChaPage() {
  const t = useTranslations('wellchaPage')
  const tb = useTranslations('blog')
  const locale = useLocale() as Locale

  // 商品データを取得
  const matchaLatte = productsData.find((p) => p.id === 'matcha-latte')
  const hojichaLatte = productsData.find((p) => p.id === 'hojicha-latte')
  const matchaCopy = localizeProductCopy('matcha-latte', locale)
  const hojichaCopy = localizeProductCopy('hojicha-latte', locale)
  const relatedPosts = getPostsForProduct('matcha-latte', 3)

  // 構造化データ - 商品情報（抹茶ラテ）
  const matchaProductJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: matchaLatte?.name || 'WellCha Matcha Latte',
    description: matchaCopy.longDescription || matchaLatte?.longDescription || '',
    brand: { '@type': 'Brand', name: 'DoSee Wellness' },
    category: 'Health & Wellness > Tea',
    offers: {
      '@type': 'Offer',
      url: 'https://doseewellness.com/shop/matcha-latte',
      priceCurrency: 'JPY',
      price: matchaLatte?.price || '3980',
      availability: matchaLatte?.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceValidUntil: '2025-12-31',
      seller: { '@type': 'Organization', name: 'DoSee Wellness' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: matchaLatte?.rating || '5.0',
      reviewCount: matchaLatte?.reviewCount || '1',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Y.M' },
        datePublished: '2024-12-15',
        reviewBody:
          '朝のコーヒーの代わりに飲み始めました。カフェインがマイルドで、集中力が続くのに夜もよく眠れます。抹茶の風味も本格的で、毎日続けられています。',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    ],
  }

  // 構造化データ - 商品情報（ほうじ茶ラテ）
  const hojichaProductJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: hojichaLatte?.name || 'WellCha Hojicha Latte',
    description: hojichaCopy.longDescription || hojichaLatte?.longDescription || '',
    brand: { '@type': 'Brand', name: 'DoSee Wellness' },
    category: 'Health & Wellness > Tea',
    offers: {
      '@type': 'Offer',
      url: 'https://doseewellness.com/shop/hojicha-latte',
      priceCurrency: 'JPY',
      price: hojichaLatte?.price || '3980',
      availability: hojichaLatte?.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceValidUntil: '2025-12-31',
      seller: { '@type': 'Organization', name: 'DoSee Wellness' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: hojichaLatte?.rating || '4.8',
      reviewCount: hojichaLatte?.reviewCount || '1',
      bestRating: '5',
      worstRating: '1',
    },
  }

  // 構造化データ - パンくずリスト
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tb('breadcrumbHome'), item: 'https://doseewellness.com' },
      { '@type': 'ListItem', position: 2, name: 'WellCha', item: 'https://doseewellness.com/wellcha' },
    ],
  }

  return (
    <div className="page-container">
      {/* 構造化データ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(matchaProductJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hojichaProductJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Navigation isScrolled={true} />

      {/* 1) WellChaの紹介（新Hero） */}
      <section className="wellcha-hero">
        <div
          className="wellcha-hero-bg"
          style={{ backgroundImage: "url('/images/wellcha/hero-bg.png')" }}
          aria-hidden="true"
        />
        <div className="wellcha-hero-overlay" aria-hidden="true" />

        <div className="wellcha-hero-inner">
          <h1 className="wellcha-hero-title">
            {multiline(t('hero.title'))}
          </h1>

          <p className="wellcha-hero-subtitle">
            {multiline(t('hero.subtitle'))}
          </p>
        </div>
      </section>

      {/* 2) 抹茶LP（既存：4枚背景） */}
      <WellChaImageLP productUrl={getPurchaseUrl('matchaLatte')} />

      {/* 3) ほうじ茶LP（画像の縦長デザイン風に置き換え） */}
      <HojichaImageLP />

      {/* もっと知る（ブログ導線） */}
      {relatedPosts.length > 0 && (
        <section className="content-section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <div className="section-wrapper">
            <h2 className="wellcha-learn-title">{t('learnMoreTitle')}</h2>
            <div className="wellcha-learn-grid">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="wellcha-learn-card"
                >
                  <span className="wellcha-learn-cat">{post.category}</span>
                  <span className="wellcha-learn-heading">{post.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 戻る */}
      <section className="content-section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
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

function WellChaImageLP({ productUrl }: { productUrl: string }) {
  const t = useTranslations('wellchaPage')

  return (
    <section className="wellcha-lp">
      <div className="lp">
        {/* 1) HERO */}
        <section className="lpSection" style={{ ['--bg' as any]: "url('/images/wellcha/matcha-hero.png')" }}>
          <div className="lpInner">
            <h2 className="lpBrand">
              DOSEE
              <br />
              WELLNESS
            </h2>
            <p className="lpHeroCopy">
              {multiline(t('matcha.heroCopy'))}
            </p>
          </div>
        </section>

        {/* 2) INTRO */}
        <section className="lpSection" style={{ ['--bg' as any]: "url('/images/wellcha/matcha-intro.png')" }}>
          <div className="lpInner">
            <p className="lpLead">
              {multiline(t('matcha.introLead'))}
            </p>
          </div>
        </section>

        {/* 3) FEATURES */}
        <section className="lpSection lpFeatures" style={{ ['--bg' as any]: "url('/images/wellcha/matcha-features.png')" }}>
          <div className="lpInner">
            <div className="lpFeatureGrid">
              <div className="lpFeature">
                <h3 className="lpFeatureTitle">{t('matcha.feature1.title')}</h3>
                <p className="lpFeatureText">{multiline(t('matcha.feature1.text'))}</p>
                <div className="lpNote">{t('matcha.feature1.note')}</div>
              </div>

              <div className="lpFeature">
                <h3 className="lpFeatureTitle">{t('matcha.feature2.title')}</h3>
                <p className="lpFeatureText">{multiline(t('matcha.feature2.text'))}</p>
                <div className="lpNote">{t('matcha.feature2.note')}</div>
              </div>

              <div className="lpFeature">
                <h3 className="lpFeatureTitle">{t('matcha.feature3.title')}</h3>
                <p className="lpFeatureText">{multiline(t('matcha.feature3.text'))}</p>
                <div className="lpNote">{t('matcha.feature3.note')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4) CTA */}
        <section className="lpSection lpCta" style={{ ['--bg' as any]: "url('/images/wellcha/matcha-cta.png')" }}>
          <div className="lpInner">
            <div className="lpCtaWrap">
              <p className="lpCtaLeft">
                {multiline(t('matcha.ctaLeft'))}
              </p>
              <p className="lpCtaRight">
                {multiline(t('matcha.ctaRight'))}
              </p>
            </div>

            <div className="lpCtaAction">
              <a
                href={productUrl}
                {...(USE_SHOPIFY ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="shop-button"
              >
                {t('matcha.ctaButton')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

/**
 * ほうじ茶：画像LP（あなたの添付デザイン風）
 * 画像はあなたが用意する前提で、パスだけ仮置きしてあります。
 */
function HojichaImageLP() {
  const t = useTranslations('wellchaPage')

  return (
    <section className="hojicha-lp" id="hojicha">
      <div className="lp lp--hojicha">
        {/* 1) HERO：タイトル＋サブコピー（暗め背景） */}
        <section className="lpSection lpSection--hojichaHero" style={{ ['--bg' as any]: "url('/images/wellcha/hojicha-hero.png')" }}>
          <div className="lpInner lpInner--center">
            <h2 className="lpTitleJp">{t('hojicha.heroTitle')}</h2>
            <p className="lpSub">
              {multiline(t('hojicha.heroSub'))}
            </p>
          </div>
        </section>

        {/* 2) MESSAGE：ラテ写真＋文章（半透明レイヤー） */}
        <section className="lpSection lpSection--hojichaMessage" style={{ ['--bg' as any]: "url('/images/wellcha/hojicha-message.png')" }}>
          <div className="lpInner">
            <div className="hojichaMessageCard">
              <p className="hojichaMessageText">
                {multiline(t('hojicha.messageText'))}
              </p>
            </div>
          </div>
        </section>

        {/* 3) HABIT：説明＋チェックリスト（茶器背景） */}
        <section className="lpSection lpSection--hojichaHabit" style={{ ['--bg' as any]: "url('/images/wellcha/hojicha-habit.png')" }}>
          <div className="lpInner hojichaHabitInner">
            <div className="hojichaHabitLeft">
              <h3 className="hojichaBlockTitle">{t('hojicha.habitTitle')}</h3>
              <p className="hojichaBlockLead">
                {multiline(t('hojicha.habitLead'))}
              </p>
            </div>

            <div className="hojichaHabitRight">
              <ul className="hojichaChecklist" aria-label={t('hojicha.checklistAriaLabel')}>
                <li>{t('hojicha.checklist.morning')}</li>
                <li>{t('hojicha.checklist.noon')}</li>
                <li>{t('hojicha.checklist.night')}</li>
                <li>{t('hojicha.checklist.latte')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4) BENEFITS：3カラム（粉＋スプーン背景） */}
        <section className="lpSection lpSection--hojichaBenefits" style={{ ['--bg' as any]: "url('/images/wellcha/hojicha-benefits.png')" }}>
          <div className="lpInner">
            <div className="hojichaBenefitsGrid">
              <div className="hojichaBenefit">
                <h4 className="hojichaBenefitTitle">{t('hojicha.benefit1.title')}</h4>
                <p className="hojichaBenefitText">
                  {multiline(t('hojicha.benefit1.text'))}
                </p>
              </div>

              <div className="hojichaBenefit">
                <h4 className="hojichaBenefitTitle">{t('hojicha.benefit2.title')}</h4>
                <p className="hojichaBenefitText">
                  {multiline(t('hojicha.benefit2.text'))}
                </p>
              </div>

              <div className="hojichaBenefit">
                <h4 className="hojichaBenefitTitle">{t('hojicha.benefit3.title')}</h4>
                <p className="hojichaBenefitText">
                  {multiline(t('hojicha.benefit3.text'))}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5) CTA：白背景＋メッセージ（画像の最後の白い締めに寄せる） */}
        <section className="hojichaFinalCta" aria-label={t('hojicha.ctaAriaLabel')}>
          <div className="hojichaFinalCtaInner">
            <h3 className="hojichaFinalTitle">{t('hojicha.finalCtaTitle')}</h3>
            <p className="hojichaFinalSub">
              {multiline(t('hojicha.finalCtaSub'))}
            </p>

            <div className="hojichaFinalActions">
              <span
                className="shop-button shop-button--hojicha shop-button--soon"
                aria-disabled="true"
              >
                {t('hojicha.comingSoon')}
              </span>
            </div>

            <div className="hojichaFinalBrand">DoSee Wellness</div>
          </div>
        </section>
      </div>
    </section>
  )
}
