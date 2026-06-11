'use client'

import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import productsData from '../../data/products.json'
import '../../styles/pages.css'

export default function DoSeePage() {
  // 商品データを取得
  const gingerShot = productsData.find(p => p.id === 'ginger-shot')

  // 構造化データ - 商品情報（ジンジャーショット）
  const gingerShotJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: gingerShot?.name || 'DoSee 7-Day Ginger Shot',
    description: gingerShot?.longDescription || '1日を前向きにする、小さな一杯。負担なく続けられるショット系ウェルネスライン。',
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
        name: 'ホーム',
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
          <p className="product-category">BRAND / DOSEE</p>
          <h1>1日を前向きにする、<br />小さな一杯。</h1>
          <p className="product-subtitle">
            DoSee は、負担なく続けられるショット系ウェルネスライン。
            「ちゃんと整えたいけれど、時間も気力も限られている」そんな毎日のために、
            さっと飲めて、からだと気分をやさしく前に進める一杯を目指しています。
          </p>
          
          <div className="product-tags">
            <span className="tag tag-orange">
              <span className="tag-dot" style={{backgroundColor: '#f97316'}}></span>
              Ginger & Botanical Wellness
            </span>
            <span className="tag">
              Daily small ritual
            </span>
            <span className="tag">
              Shot style, easy to keep
            </span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-wrapper">
          <p className="section-label">STORY</p>
          <h2>「ちゃんと整えたい」と<br />「続けられない」のあいだで。</h2>
          
          <div className="text-content">
            <p>
              サプリメントや健康食品はたくさんあるのに、
              結局はどれも続かなかった——。DoSee が見つめたのは、
              その「続かなさ」そのものです。
            </p>
            <p>
              忙しい日々のなかで、からだのことを後回しにしたくない。
              けれど、難しいことを毎日続ける余裕はない。
              DoSee は、そんな気持ちに寄り添うために生まれた、
              <strong>"ショット系" のウェルネスライン</strong>です。
            </p>
            <p>
              必要なものをぎゅっと凝縮しながらも、
              一気飲みして終わりではなく、
              「今日もひとつ、自分のために何かをしてあげられた」という
              小さな実感を残せる存在でありたいと考えています。
            </p>
          </div>
        </div>
      </section>

      <section className="content-section" id="ginger-shot" style={{backgroundColor: '#fafaf9'}}>
        <div className="section-wrapper">
          <p className="section-label" style={{color: '#ea580c'}}>7-DAY GINGER SHOT</p>
          <h2>キュッと一杯で、<br />からだと気分をオンにする。</h2>

          <div className="text-content">
            <p>
              ジンジャーの温かさと、柑橘のすっきり感を組み合わせたショット。
              朝いちばんの目覚ましとして、または午後のリセットとして。
              糖分やカフェインに頼りすぎず、からだ本来のリズムをやさしく後押しします。
            </p>
          </div>

          <div className="concept-card">
            <h3>CONCEPT</h3>
            <p>
              「飲まなきゃいけない」ではなく、
              「飲んであげたい」と思える量と味わいを目指しています。
              がんばりすぎなくても、自分をケアできる選択肢として。
            </p>
          </div>

          <div className="how-to-box">
            <h3>こんなシーンにおすすめ</h3>
            <ul>
              <li>・ 朝の一杯で、1日を前向きにスタートしたいとき</li>
              <li>・ コーヒーやエナジードリンクを減らしたいとき</li>
              <li>・ 食べ過ぎた日や、からだをリセットしたい一週間のはじまりに</li>
            </ul>
          </div>

          <div className="status-card">
            <p className="status-badge">COMING SOON</p>
            <p>
              7-Day Ginger Shot は現在、
              レシピ・フレーバー・ラインナップ構成を開発中です。
              リリース時期が決まり次第、このページと公式サイトでお知らせします。
            </p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-wrapper">
          <p className="section-label">FUTURE RITUAL</p>
          <h2>「今日をリセットする一杯」を、<br />もっと手軽に。</h2>

          <div className="text-content">
            <p>
              最終的な仕様は変更になる可能性がありますが、
              DoSee のジンジャーショットは、
              <strong>"冷蔵庫から取り出して、そのまま一杯"</strong>
              をイメージしています。
            </p>
          </div>

          <div className="ritual-steps">
            <div className="ritual-step">
              <span className="step-number">1</span>
              <p>朝、歯磨きのあとにキュッと一杯。</p>
            </div>
            <div className="ritual-step">
              <span className="step-number">2</span>
              <p>または午後のだるさをリセットしたいタイミングで。</p>
            </div>
            <div className="ritual-step">
              <span className="step-number">3</span>
              <p>一週間続けることで、からだの「軽さ」を実感できる設計を目指します。</p>
            </div>
          </div>

          <div className="philosophy-card">
            <p>
              <strong>DoSee のショットは、「気合い」ではなく「習慣」で続けるためのもの。</strong>
            </p>
            <p>
              忙しくても、自分を気づかう「1アクション」だけは残しておきたい。
              そのための、一番ささやかで、一番続けやすい形を、
              これからも探し続けていきます。
            </p>
          </div>
        </div>
      </section>

      <section className="content-section" style={{paddingTop: '2rem', paddingBottom: '4rem'}}>
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