'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ParticlesCanvas from '../components/ParticlesCanvas'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import InteractiveSection from '../components/InteractiveSection'
import Footer from '../components/Footer'
import { getPurchaseUrl, USE_SHOPIFY } from '../lib/constants/shop'
import { getAllPosts } from '../lib/blog/posts'
import { shipporiMincho } from './fonts'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const latestPosts = getAllPosts().slice(0, 3)
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

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
            <p className="section-label">OUR PHILOSOPHY</p>

            <h2 className="philosophy-title">整う余白を、日常に。</h2>

            <div className="philosophy-lead">
              <p>無理なルールも、頑張る習慣もいらない。</p>
              <p>日常の中の、ほんのひとつの余白が、</p>
              <p>心・からだ・肌を</p>
              <p>静かに、確かに、整えていきます。</p>
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
        <div className="parallax-bg" aria-hidden="true" />
        <div className="parallax-overlay" aria-hidden="true" />

        <div className="parallax-content">
          <h2 className="parallax-title">
            日本茶の静けさを、<br />そのまま一杯に。
          </h2>
          <p className="parallax-lead">
            茶畑で育った茶葉の力を、<br className="sp-br" />
            忙しい毎日でも続けられるラテのかたちに。
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
                <span className="product-badge-v2">WellCha</span>
                <h3>
                  日本茶のやさしさで、<br />
                  毎日をしなやかに整える。
                </h3>
                <p className="product-description-highlight">
                  抹茶とほうじ茶の自然なエネルギーで、<br />
                  忙しい日々に落ち着きと集中を。
                </p>

                {/* クリック伝播を止めて、カード遷移と競合させない */}
                <div
                  className="product-actions"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <span className="action-label">購入はこちら:</span>

                  <div className="product-tags-v2">
                    <a
                      href={getPurchaseUrl('matchaLatte')}
                      {...(USE_SHOPIFY ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="product-tag-v2 product-tag-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Matcha Latte
                    </a>

                    <a
                      href={getPurchaseUrl('hojichaLatte')}
                      {...(USE_SHOPIFY ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="product-tag-v2 product-tag-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Hojicha Latte
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
                <span className="product-badge-v2 product-badge-orange-v2">DoSee</span>
                <h3>
                  1日を前向きにする、<br />
                  小さな一杯。
                </h3>
                <p>
                  ショット系ウェルネスライン。<br />
                  からだと気分をやさしく前に。
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
        <p className="section-label">
          ABOUT
          <br />
          DOSEE WELLNESS
        </p>
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
          <div className="about-keyword">
            <h3>No pressure*</h3>
            <p>
              難しいルールではなく、<br />
              続けやすい習慣として。
            </p>
          </div>
          <div className="about-keyword">
            <h3>Routine*</h3>
            <p>
              忙しい日でも、<br />
              さっと取り入れられる形で。
            </p>
          </div>
          <div className="about-keyword">
            <h3>With Care*</h3>
            <p>
              からだと心に、<br />
              やさしく寄りそって。
            </p>
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

      <section className="home-note-section">
        <div className="home-note-header">
          <p className="section-label">DOSEE WELLNESS NOTE</p>
          <h2>読みもの</h2>
          <p className="home-note-description">
            日本茶の文化と、続けやすいウェルネスのヒントを。
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
            読みものをもっと見る →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}