'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CustomCursor from '../components/CustomCursor'
import ParticlesCanvas from '../components/ParticlesCanvas'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import InteractiveSection from '../components/InteractiveSection'
import Footer from '../components/Footer'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <CustomCursor />
      <ParticlesCanvas />
      <Navigation isScrolled={isScrolled} />
      
      <HeroSection />

      <InteractiveSection id="philosophy" className="text-center">
        <p className="section-label">OUR PHILOSOPHY</p>
        <h2>
          Wellness that fits into<br />
          <span className="highlight">busy lives.</span>
        </h2>
        <p className="section-description">
          DoSee Wellness は、「時間がないからこそ整えたい人」のためのブランドです。<br />
          むずかしいルールやストイックさではなく、日々の一杯を通じて<br />
          「こころ・からだ・肌」を少しずつ整えていく。<br />
          そんな、無理のないウェルネス習慣をデザインしています。
        </p>

        <div className="philosophy-cards">
          <div className="philosophy-card">
            <div className="philosophy-icon">🧠</div>
            <h3>Mind — こころ</h3>
            <p>
              カフェインとテアニンのバランスで、<br />
              張りつめた思考をほぐし、静かな集中へ。
            </p>
          </div>
          <div className="philosophy-card">
            <div className="philosophy-icon">💪</div>
            <h3>Body — からだ</h3>
            <p>
              ビタミンやポリフェノールなど、<br />
              日々のコンディションを支える成分をやさしく一杯に。
            </p>
          </div>
          <div className="philosophy-card">
            <div className="philosophy-icon">✨</div>
            <h3>Skin — 肌</h3>
            <p>
              抗酸化成分やビタミンCを含む素材で、<br />
              内側から満ちるような透明感をイメージしたブレンド設計。
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
                <div className="product-tags-v2">
                  <span className="product-tag-v2">Matcha Latte</span>
                  <span className="product-tag-v2">Hojicha Latte</span>
                </div>
              </div>
            </div>
          </Link>

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
          A small, gentle ritual<br />
          <span className="highlight">for every day.</span>
        </h2>
        <p className="section-description">
          DoSee Wellness は、「がんばるために整える」のではなく、<br />
          忙しい日々の中でも自分を大切にするための、小さな一杯を届けることを目指しています。<br />
          ライフスタイルや好みに合わせて、抹茶・ほうじ茶・ジンジャーなど、<br />
          いくつかのラインを展開しながら、「続けやすさ」と「心地よさ」のバランスを大切にしています。
        </p>

        <div className="about-keywords">
          <div className="keyword-card">
            <h3>Effortless</h3>
            <p>難しいルールではなく、<br />続けやすい習慣として。</p>
          </div>
          <div className="keyword-card">
            <h3>Everyday</h3>
            <p>忙しい日でも、<br />さっと取り入れられる形で届けます。</p>
          </div>
          <div className="keyword-card">
            <h3>Gentle</h3>
            <p>からだとこころに、<br />やさしく寄りそう味わいと設計。</p>
          </div>
        </div>

        <div className="about-message">
          <p>
            「整えなきゃ」と力むのではなく、<br />
            ふっと一息ついたときにそばにいてくれる一杯を。
          </p>
          <p>
            DoSee Wellness をお選びいただく時間が、あなたの日常に<br />
            静かな余白と、前向きなエネルギーをもたらしますように。
          </p>
        </div>
      </InteractiveSection>

      <Footer />
    </div>
  )
}
