'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CustomCursor from '../components/CustomCursor'
import ParticlesCanvas from '../components/ParticlesCanvas'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import InteractiveSection from '../components/InteractiveSection'
import Footer from '../components/Footer'
import { getProductUrl } from '../lib/constants/shop'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 購入ボタンのクリックハンドラー
  const handlePurchaseClick = (productKey: 'matchaLatte' | 'hojichaLatte') => {
    const url = getProductUrl(productKey)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // 構造化データ - 組織情報
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DoSee Wellness',
    url: 'https://doseewellness.com',
    logo: 'https://doseewellness.com/logo.png',
    description: '忙しい毎日をやさしく整える日本茶ベースのウェルネスブランド',
    sameAs: [
      'https://www.instagram.com/wellcha_matcha',
    ],
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
      
      <CustomCursor />
      <ParticlesCanvas />
      <Navigation isScrolled={isScrolled} />
      
      <HeroSection />

      <InteractiveSection id="philosophy" className="text-center">
        <p className="section-label">OUR PHILOSOPHY</p>
        <h2>
          <span className="highlight">整う余白を、日常に。</span>
        </h2>
        <p className="section-description">
          無理なルールも、頑張る習慣もいらない。<br />
          日常の中の、ほんのひとつの余白が、<br />
          心・からだ・肌を<br />
          静かに、確かに、整えていきます。
        </p>

        <div className="philosophy-cards">
          <div className="philosophy-card">
            <div className="philosophy-icon">🧠</div>
            <h3>Mind — こころ</h3>
            <p>
              思考の緊張をほどき、<br />
              静けさの中で、<br />
              自然な集中へ。
            </p>
          </div>
          <div className="philosophy-card">
            <div className="philosophy-icon">💪</div>
            <h3>Body — からだ</h3>
            <p>
              深い呼吸のように、<br />
              からだのリズムを、<br />
              やさしく整える。
            </p>
          </div>
          <div className="philosophy-card">
            <div className="philosophy-icon">✨</div>
            <h3>Skin — 肌</h3>
            <p>
              うるおいが満ちて、<br />
              素肌が本来の<br />
              やわらかさへ。
            </p>
          </div>
        </div>
      </InteractiveSection>

      <div className="parallax-section">
        <div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 200, marginBottom: '2rem' }}>
            日本茶の静けさを、<br />そのまま一杯に。
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            茶畑で育った茶葉の力を、忙しい毎日でも続けられるラテのかたちに。
          </p>
        </div>
      </div>

      <InteractiveSection id="products">
        <div className="products-header">
          <div>
            <p className="section-label">PRODUCT LINES</p>
            <h2>DoSee Wellness Lineup</h2>
            <p className="section-description">
              日本茶ベースの <strong>WellCha</strong> と、<br />
              ショット系ウェルネス <strong>DoSee</strong>。<br />
              忙しい日々でも続けやすい形で、こころ・からだのケアを届けます。
            </p>
          </div>
        </div>

        <div className="products-grid-v2">
          {/* WellCha Card - Background links to /wellcha, Buttons open Shopify in new tab */}
          <Link href="/wellcha" className="product-card-v2-link">
            <div className="product-card-v2 product-card-wellcha-v2">
              <div 
                className="product-card-bg" 
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200)'}}
              />
              <div className="product-card-overlay" />
              <div className="product-card-v2-content">
                <span className="product-badge-v2">WellCha</span>
                <h3>日本茶のやさしさで、<br />毎日をしなやかに整える。</h3>
                <p>
                  抹茶とほうじ茶の自然なエネルギーで、<br />
                  忙しい日々に落ち着きと集中を。
                </p>
                
                {/* Purchase Buttons Area - Uses buttons instead of <a> tags to avoid nesting */}
                <div 
                  className="product-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="action-label">購入はこちら:</span>
                  <div className="product-tags-v2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePurchaseClick('matchaLatte')
                      }}
                      className="product-tag-v2 product-tag-button"
                    >
                      Matcha Latte
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePurchaseClick('hojichaLatte')
                      }}
                      className="product-tag-v2 product-tag-button"
                    >
                      Hojicha Latte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* DoSee Card - Background links to /dosee */}
          <Link href="/dosee" className="product-card-v2-link">
            <div className="product-card-v2 product-card-dosee-v2">
              <div 
                className="product-card-bg" 
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1582026963556-2863b2d6b2c6?w=1200)'}}
              />
              <div className="product-card-overlay" />
              <div className="product-card-v2-content">
                <span className="product-badge-v2 product-badge-orange-v2">DoSee</span>
                <h3>1日を前向きにする、<br />小さな一杯。</h3>
                <p>
                  負担なく続けられるショット系ウェルネスライン。<br />
                  さっと飲めて、からだと気分をやさしく前に。
                </p>
                <div className="product-tags-v2">
                  <span className="product-tag-v2 product-tag-orange-v2">7-Day Ginger Shot</span>
                  <span className="product-tag-status-v2">Coming soon</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </InteractiveSection>

      <InteractiveSection id="about" className="text-center about-section">
        <p className="section-label">ABOUT DOSEE WELLNESS</p>
        <h2>
          Wellness, <br />
          designed to fit into everyday life.
        </h2>
        <p className="section-description">
          DoSee Wellness は、<br />
          整えるために頑張る」のではなく、<br />
          忙しい日常の中で、自然に整っていくことを<br />
          大切にしたウェルネスブランドです<br />
          時間がない日も、余裕がない日も。<br />
          ほんのひととき、<br />
          自分に立ち戻るための、<br />
          小さく、やさしい習慣を届けます。
        </p>

        <div className="about-keywords">
          <div className="keyword-card">
            <h3>Effortless</h3>
            <p>難しいルールではなく、<br />続けやすい習慣として。</p>
          </div>
          <div className="keyword-card">
            <h3>Everyday</h3>
            <p>忙しい日でも、<br />さっと取り入れられる形で。</p>
          </div>
          <div className="keyword-card">
            <h3>Gentle</h3>
            <p>からだと心に、<br />やさしく寄りそって。</p>
          </div>
        </div>

        <div className="about-message">
          <p>
            「整えなきゃ」と力むのではなく、<br />
            ふと一息つきたいときに、そっと寄り添う存在でありたい。
          </p>
          <p>
            DoSee Wellness を選ぶ時間が、<br />
            あなたの日常に、<br />
            静かな余白と、前向きなエネルギーを<br />
            やさしくもたらしますように。
          </p>
        </div>
      </InteractiveSection>

      <Footer />
    </div>
  )
}