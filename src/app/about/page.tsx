'use client'

import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import CustomCursor from '../../components/CustomCursor'
import '../../styles/pages.css'

export default function AboutPage() {
  return (
    <div className="page-container">
      <CustomCursor />
      <Navigation isScrolled={true} />
      
      <section className="static-page-hero">
        <div className="static-page-content">
          <p className="product-category">ABOUT US</p>
          <h1>DoSee Wellness について</h1>
          <p className="subtitle">
            忙しい毎日でも続けられるウェルネスを。
          </p>
        </div>
      </section>

      <section className="static-page-section">
        <div className="section-wrapper">
          <h2>Our Story</h2>
          <div className="text-content">
            <p>
              DoSee Wellness は、「忙しい現代でも続けられるウェルネス」をテーマにした、
              日本発のブランドです。日本の茶文化、発酵や薬膳の知恵、そして日々の生活者としての実感をもとに、
              心・からだ・肌をやさしく整える一杯をデザインしています。
            </p>
            <p>
              私たちが大切にしているのは、瞬間的な刺激ではなく、
              穏やかで持続可能なコンディションづくりです。カフェインとテアニンのバランス、
              抗酸化成分やビタミンなど、素材に含まれるちからを尊重しながら、飲みやすさ・続けやすさを追求しています。
            </p>
            <p>
              カナダをはじめとした海外での展開も視野に入れつつ、
              「日本らしい細やかさ」と「グローバルに通じるデザイン」を掛け合わせることを目指しています。
            </p>
          </div>

          <h2>Our Mission</h2>
          <div className="text-content">
            <p>
              私たちのミッションは、「整えなきゃ」という義務感ではなく、
              「自分を大切にしたい」という気持ちから始まるウェルネス習慣を届けること。
            </p>
            <p>
              一杯のお茶を通じて、こころ・からだ・肌が少しずつ整っていく。
              そんな、無理のない日常のリチュアルをサポートします。
            </p>
          </div>

          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Effortless</h3>
              <p>難しいルールではなく、続けやすい習慣として。</p>
            </div>
            <div className="value-card">
              <h3>Everyday</h3>
              <p>忙しい日でも、さっと取り入れられる形で届けます。</p>
            </div>
            <div className="value-card">
              <h3>Gentle</h3>
              <p>からだとこころに、やさしく寄りそう味わいと設計。</p>
            </div>
          </div>

          <h2>Company Information</h2>
          <div className="company-info">
            <div className="info-row">
              <span className="info-label">会社名</span>
              <span className="info-value">DoSee Wellness株式会社</span>
            </div>
            <div className="info-row">
              <span className="info-label">設立</span>
              <span className="info-value">2024年</span>
            </div>
            <div className="info-row">
              <span className="info-label">所在地</span>
              <span className="info-value">東京都</span>
            </div>
            <div className="info-row">
              <span className="info-label">事業内容</span>
              <span className="info-value">ウェルネス食品の企画・製造・販売</span>
            </div>
            <div className="info-row">
              <span className="info-label">お問い合わせ</span>
              <span className="info-value">
                <a href="mailto:info@dosee-wellness.com">info@dosee-wellness.com</a>
              </span>
            </div>
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
