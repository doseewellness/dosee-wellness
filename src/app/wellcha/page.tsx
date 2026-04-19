'use client'

import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import CustomCursor from '../../components/CustomCursor'
import productsData from '../../data/products.json'
import { getProductUrl } from '../../lib/constants/shop'
import '../../styles/pages.css'

export default function WellChaPage() {
  // 商品データを取得
  const matchaLatte = productsData.find((p) => p.id === 'matcha-latte')
  const hojichaLatte = productsData.find((p) => p.id === 'hojicha-latte')

  // 構造化データ - 商品情報（抹茶ラテ）
  const matchaProductJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: matchaLatte?.name || 'WellCha 抹茶ラテ',
    description: matchaLatte?.longDescription || '日本茶の力で心・からだ・肌を整える抹茶ラテ。',
    brand: { '@type': 'Brand', name: 'DoSee Wellness' },
    category: 'Health & Wellness > Tea',
    offers: {
      '@type': 'Offer',
      url: matchaLatte?.shopifyUrl || 'https://shop.doseewellness.com/products/matcha-latte',
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
    name: hojichaLatte?.name || 'WellCha ほうじ茶ラテ',
    description: hojichaLatte?.longDescription || '心・からだ・呼吸をほどく、新しいほうじ茶習慣。',
    brand: { '@type': 'Brand', name: 'DoSee Wellness' },
    category: 'Health & Wellness > Tea',
    offers: {
      '@type': 'Offer',
      url: hojichaLatte?.shopifyUrl || 'https://shop.doseewellness.com/products/hojicha-latte',
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
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://doseewellness.com' },
      { '@type': 'ListItem', position: 2, name: 'WellCha', item: 'https://doseewellness.com/wellcha' },
    ],
  }

  return (
    <div className="page-container">
      {/* 構造化データ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(matchaProductJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hojichaProductJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <CustomCursor />
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
            日本茶のやさしさで、
            <br />
            毎日をしなやかに整える。
          </h1>

          <p className="wellcha-hero-subtitle">
            忙しい毎日の中で、「心・からだ・肌」をまとめて整える一杯を。
            <br />
            WellCha の抹茶とほうじ茶が、集中・美容・リラックスの三方向からあなたを支えます。
          </p>
        </div>
      </section>

      {/* 2) 抹茶LP（既存：4枚背景） */}
      <WellChaImageLP />

      {/* 3) ほうじ茶LP（画像の縦長デザイン風に置き換え） */}
      <HojichaImageLP productUrl={getProductUrl('hojichaLatte')} />

      {/* 戻る */}
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

function WellChaImageLP() {
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
              忙しい毎日に、
              <br />
              “まとめて整える”
              <br />
              一杯を
            </p>
          </div>
        </section>

        {/* 2) INTRO */}
        <section className="lpSection" style={{ ['--bg' as any]: "url('/images/wellcha/matcha-intro.png')" }}>
          <div className="lpInner">
            <p className="lpLead">
              {`忙しい毎日の中で、
心・からだ・肌をまとめて整える一杯を。

DoSee Wellness の抹茶は、
集中・美容・リラックスの三方向からあなたを支えます。

現代人のコンディションを整える、新しい抹茶習慣。
何百年も続く日本の茶文化から生まれた、いわば“飲むウェルネス”。

DoSee Wellness は、その抹茶を
「忙しい現代でも続けられるかたち」にデザインしました。`}
            </p>
          </div>
        </section>

        {/* 3) FEATURES */}
        <section className="lpSection lpFeatures" style={{ ['--bg' as any]: "url('/images/wellcha/matcha-features.png')" }}>
          <div className="lpInner">
            <div className="lpFeatureGrid">
              <div className="lpFeature">
                <h3 className="lpFeatureTitle">🍃 落ち着いた集中力</h3>
                <p className="lpFeatureText">{`カテキン × テアニン
焦らず、静かに続く集中力`}</p>
                <div className="lpNote">※コーヒーとは違う、穏やかな覚醒感。</div>
              </div>

              <div className="lpFeature">
                <h3 className="lpFeatureTitle">✨ 飲むスキンケア</h3>
                <p className="lpFeatureText">{`抗酸化 × ビタミン
内側から、透明感とツヤ`}</p>
                <div className="lpNote">※毎日のコンディションケアに。</div>
              </div>

              <div className="lpFeature">
                <h3 className="lpFeatureTitle">🌙 深いリラックス</h3>
                <p className="lpFeatureText">{`テアニンのリラックス作用、
心と体を、リラックスモードへ`}</p>
                <div className="lpNote">※1日の終わりの一杯に。</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4) CTA */}
        <section className="lpSection lpCta" style={{ ['--bg' as any]: "url('/images/wellcha/matcha-cta.png')" }}>
          <div className="lpInner">
            <div className="lpCtaWrap">
              <p className="lpCtaLeft">
                今日の一杯を、
                <br />
                抹茶に変えてみませんか？
              </p>
              <p className="lpCtaRight">
                {`ほんの一杯の習慣が、
集中力・コンディション・気分を、
静かに変えていきます。

DoSee Wellness の抹茶で、
あなたらしい「整う時間」を
はじめましょう。`}
              </p>
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
function HojichaImageLP({ productUrl }: { productUrl: string }) {
  return (
    <section className="hojicha-lp" id="hojicha">
      <div className="lp lp--hojicha">
        {/* 1) HERO：タイトル＋サブコピー（暗め背景） */}
        <section className="lpSection lpSection--hojichaHero" style={{ ['--bg' as any]: "url('/images/wellcha/hojicha-hero.png')" }}>
          <div className="lpInner lpInner--center">
            <h2 className="lpTitleJp">新しいほうじ茶習慣</h2>
            <p className="lpSub">
              現代の忙しさの中で、心とからだをゆるめる
              <br />
              ほうじ茶の魅力を体験してください。
            </p>
          </div>
        </section>

        {/* 2) MESSAGE：ラテ写真＋文章（半透明レイヤー） */}
        <section className="lpSection lpSection--hojichaMessage" style={{ ['--bg' as any]: "url('/images/wellcha/hojicha-message.png')" }}>
          <div className="lpInner">
            <div className="hojichaMessageCard">
              <p className="hojichaMessageText">
                忙しい毎日の中で、
                <br />
                心・からだ・呼吸を
                <br />
                ゆっくりほどいてくれる一杯を。
                <br />
                <br />
                DoSee Wellness のほうじ茶が
                <br />
                優しい温もりと深いリラックスで、
                <br />
                あなたを包みます。
              </p>
            </div>
          </div>
        </section>

        {/* 3) HABIT：説明＋チェックリスト（茶器背景） */}
        <section className="lpSection lpSection--hojichaHabit" style={{ ['--bg' as any]: "url('/images/wellcha/hojicha-habit.png')" }}>
          <div className="lpInner hojichaHabitInner">
            <div className="hojichaHabitLeft">
              <h3 className="hojichaBlockTitle">新しいほうじ茶習慣</h3>
              <p className="hojichaBlockLead">
                ほうじ茶は緑茶をじっくり焙じて生まれる
                <br />
                “飲むウェルネス”。
                <br />
                香ばしくて飲みやすく、カフェイン控えめ。
                <br />
                <br />
                そして DoSee Wellness は、
                <br />
                「忙しくても毎日続けられる形」へと
                <br />
                再デザインしました。
              </p>
            </div>

            <div className="hojichaHabitRight">
              <ul className="hojichaChecklist" aria-label="おすすめの飲むタイミング">
                <li>朝、コーヒーの前に</li>
                <li>昼のひと休み</li>
                <li>夜ごはんのあと、寝る前のリラックスタイムに</li>
                <li>ラテでやさしい香ばしさが ふわっと広がります</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4) BENEFITS：3カラム（粉＋スプーン背景） */}
        <section className="lpSection lpSection--hojichaBenefits" style={{ ['--bg' as any]: "url('/images/wellcha/hojicha-benefits.png')" }}>
          <div className="lpInner">
            <div className="hojichaBenefitsGrid">
              <div className="hojichaBenefit">
                <h4 className="hojichaBenefitTitle">自然のやさしい力</h4>
                <p className="hojichaBenefitText">
                  ミネラルとポリフェノールが
                  <br />
                  毎日のコンディションをサポート。
                  <br />
                  “ちょうどいい目覚め”に。
                </p>
              </div>

              <div className="hojichaBenefit">
                <h4 className="hojichaBenefitTitle">負担のない温もり</h4>
                <p className="hojichaBenefitText">
                  焙煎の香ばしさと、
                  <br />
                  内側から広がる温かさ。
                  <br />
                  冷えや胃腸ケアにも。
                </p>
              </div>

              <div className="hojichaBenefit">
                <h4 className="hojichaBenefitTitle">深いリラックス</h4>
                <p className="hojichaBenefitText">
                  テアニン＋カフェイン控えめ。
                  <br />
                  夜の深呼吸タイムにぴったり。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5) CTA：白背景＋メッセージ（画像の最後の白い締めに寄せる） */}
        <section className="hojichaFinalCta" aria-label="購入導線">
          <div className="hojichaFinalCtaInner">
            <h3 className="hojichaFinalTitle">Join us on your wellness journey today!</h3>
            <p className="hojichaFinalSub">
              今すぐ、ウェルネスの一歩を。
              <br />
              今日から、よりよい毎日へ。
            </p>

            <div className="hojichaFinalActions">
              <a href={productUrl} target="_blank" rel="noopener noreferrer" className="shop-button shop-button--hojicha">
                ほうじ茶ラテを購入する
              </a>
            </div>

            <div className="hojichaFinalBrand">DoSee Wellness</div>
          </div>
        </section>
      </div>
    </section>
  )
}