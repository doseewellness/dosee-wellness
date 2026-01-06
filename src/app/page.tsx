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
import { shipporiMincho } from './fonts'

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

      <InteractiveSection id="philosophy" className="philosophy-section">
        <div className="philosophy-layout">

          {/* LEFT: text（ここはほぼそのまま） */}
          <div className="philosophy-copy">
            <p className="section-label">OUR PHILOSOPHY</p>

            <h2 className="philosophy-title">
              整う余白を、日常に。
            </h2>

            <div className="philosophy-lead">
              <p>無理なルールも、頑張る習慣もいらない。</p>
              <p>日常の中の、ほんのひとつの余白が、</p>
              <p>心・からだ・肌を</p>
              <p>静かに、確かに、整えていきます。</p>
            </div>
          </div>

          {/* RIGHT: circles（← ここを差し替える） */}
          <div className="philosophy-visual">
            <div className="philosophy-circles">

              {/* Mind */}
              <div className="circle-wrap circle-mind">
                <button type="button" className="circle">
                  <span>Mind</span>
                </button>
                <div className="circle-caption">
                  <p>思考の緊張をほどき、</p>
                  <p>静けさの中で、</p>
                  <p>自然な集中へ。</p>
                </div>
              </div>

              {/* Body */}
              <div className="circle-wrap circle-body">
                <button type="button" className="circle">
                  <span>Body</span>
                </button>
                <div className="circle-caption">
                  <p>深い呼吸のように、</p>
                  <p>からだのリズムを、</p>
                  <p>やさしく整える。</p>
                </div>
              </div>

              {/* Skin */}
              <div className="circle-wrap circle-skin">
                <button type="button" className="circle">
                  <span>Skin</span>
                </button>
                <div className="circle-caption">
                  <p>うるおいが満ちて、</p>
                  <p>素肌が本来の</p>
                  <p>やわらかさへ。</p>
                </div>
              </div>

            </div>
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
                style={{ backgroundImage: "url('/images/bg/wellcha-bg.jpg')" }}
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
                style={{ backgroundImage: "url('/images/bg/dosee-bg.jpg')" }}
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

      </InteractiveSection>

      <section className="poetry-section">
        <div className={`poetry-inner ${shipporiMincho.className}`}>
          <p className="poetry-left">
            「整えなきゃ」と力むのではなく、<br />
            ふと一息つきたいときに、<br />
            そっと寄り添う存在でありたい。
          </p>

          <p className="poetry-right">
            DoSee Wellness を選ぶ時間が、<br />
            あなたの日常に、<br />
            静かな余白と、前向きなエネルギーを<br />
            やさしくもたらしますように。
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}