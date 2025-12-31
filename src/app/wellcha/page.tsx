'use client'

import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import CustomCursor from '../../components/CustomCursor'
import '../../styles/pages.css'

export default function WellChaPage() {
  return (
    <div className="page-container">
      <CustomCursor />
      <Navigation isScrolled={true} />
      
      <section className="product-hero">
        <div className="hero-bg" style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)'
        }} />
        <div className="product-hero-content">
          <p className="product-category">BRAND / WELLCHA</p>
          <h1>日本茶のやさしさで、<br />毎日をしなやかに整える。</h1>
          <p className="product-subtitle">
            忙しい毎日の中で、「心・からだ・肌」をまとめて整える一杯を。
            WellCha の抹茶とほうじ茶が、集中・美容・リラックスの三方向から
            あなたを支えます。
          </p>
          
          <div className="product-tags">
            <span className="tag tag-green">
              <span className="tag-dot" style={{backgroundColor: '#10b981'}}></span>
              Matcha — 集中・美容・リラックス
            </span>
            <span className="tag">
              <span className="tag-dot" style={{backgroundColor: '#f59e0b'}}></span>
              Hojicha — 温もりと深いリラックス
            </span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-wrapper">
          <p className="section-label">STORY</p>
          <h2>現代人のコンディションを整える、<br />新しい抹茶習慣。</h2>
          
          <div className="text-content">
            <p>
              抹茶は、何百年も続く日本の茶文化から生まれた、
              いわば <strong>"飲むウェルネス"</strong>。
            </p>
            <p>
              DoSee Wellness は、その抹茶を
              <strong>「忙しい現代でも続けられるかたち」</strong>
              にデザインしました。
            </p>
            <p>
              ここでは、抹茶がもたらす
              <strong>3つのちから – 集中・肌ケア・リラックス</strong>
              を、わかりやすくご紹介します。
            </p>
          </div>
        </div>
      </section>

      <section className="content-section" id="matcha" style={{backgroundColor: '#fafaf9'}}>
        <div className="section-wrapper">
          <p className="section-label" style={{color: '#059669'}}>MATCHA LATTE</p>
          <h2>落ち着いた集中と、<br />飲むスキンケアを一杯に。</h2>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>落ち着いた集中力</h3>
              <p>
                カテキンとテアニンの組み合わせで、焦らない・荒れない
                「落ち着いた集中力」をサポート。
                テアニンは脳に働きかけ、コーヒーとは違う
                <strong>静かに冴える集中状態</strong>
                をつくると言われています。
              </p>
            </div>
            
            <div className="benefit-card">
              <h3>飲むスキンケア</h3>
              <p>
                抗酸化成分とビタミンが透明感とツヤを守り、
                まるで<strong>"飲むスキンケア"</strong>のような毎日を。
                ビタミンC・E、カテキンなどが、日々のダメージから肌を守り、
                内側からコンディションを整えます。
              </p>
            </div>
            
            <div className="benefit-card">
              <h3>深いリラックス</h3>
              <p>
                ビタミン・抗酸化成分が、日々のコンディションや腸内環境、
                心の緊張をクリアに。
                テアニンは副交感神経にも働きかけるため、
                <strong>寝る前の一杯</strong>や、
                1日の終わりのリセットタイムにもぴったりです。
              </p>
            </div>
          </div>

          <div className="how-to-box">
            <h3>あなたの1日に、どう取り入れる？</h3>
            <ul>
              <li>・朝のコーヒーの代わりに。</li>
              <li>・仕事・勉強前のウォームアップに。</li>
              <li>・夜のリラックスタイムのお供に。</li>
            </ul>
            <p>
              DoSee Wellness の抹茶は、お湯だけでも、ミルクでラテにしても、
              すっと溶けて、やさしい味わい。
            </p>
          </div>

          <div className="cta-box">
            <a 
              href="https://shop.doseewellness.com/products/matcha-latte"
              target="_blank"
              rel="noreferrer"
              className="shop-button"
            >
              抹茶ラテを購入する
            </a>
          </div>
        </div>
      </section>

      <section className="content-section" id="hojicha">
        <div className="section-wrapper">
          <p className="section-label" style={{color: '#d97706'}}>HOJICHA LATTE</p>
          <h2>心・からだ・呼吸をほどく、<br />新しいほうじ茶習慣。</h2>

          <div className="text-content">
            <p>
              忙しい毎日の中で、心・からだ・呼吸をゆっくりほどいてくれる一杯を。
              DoSee Wellness のほうじ茶が、やさしい温もりと深いリラックスで、
              あなたをそっと包みます。
            </p>
            <p>
              ほうじ茶は、緑茶をじっくり焙じて生まれる、
              香ばしくてやさしい <strong>"飲むウェルネス"</strong>。
            </p>
            <p>
              カフェインが抑えめで、子どもから大人まで飲みやすく、
              心とからだをゆるめたいときにぴったりのお茶です。
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>自然のやさしい力</h3>
              <p>
                茶葉本来のミネラルとポリフェノールが、
                日々のコンディションをやさしくサポート。
                カフェインは控えめなのに、頭がぼんやりしすぎない
                <strong>"ちょうどいい目覚め"</strong>
                を手伝ってくれます。
              </p>
            </div>
            
            <div className="benefit-card">
              <h3>負担のない温もり</h3>
              <p>
                焙煎によって生まれる香ばしさと、
                からだにしみ込むような温かさが特徴。
                冷えを感じやすい方や、
                「お腹にやさしい温かいもの」が欲しいタイミングにぴったりです。
              </p>
            </div>
            
            <div className="benefit-card">
              <h3>深いリラックス</h3>
              <p>
                ほうじ茶は、リラックスに関わるテアニンを含みつつ、
                カフェイン量が抑えられているのが大きな魅力。
                寝る前の一杯や、スマホを置いて深呼吸したい夜の時間に寄り添ってくれます。
              </p>
            </div>
          </div>

          <div className="how-to-box">
            <h3>あなたの1日に、どう取り入れる？</h3>
            <ul>
              <li>・朝、コーヒーの前に一杯。</li>
              <li>・仕事や家事がひと区切りついたタイミングに。</li>
              <li>・夜ごはんのあと、寝るまでのリラックスタイムに。</li>
            </ul>
            <p>
              DoSee Wellness のほうじ茶は、お湯だけでも、ミルクでラテにしても、
              香ばしさとやさしい甘みがふわっと広がります。
            </p>
          </div>

          <div className="cta-box">
            <a 
              href="https://shop.doseewellness.com/products/hojicha-latte"
              target="_blank"
              rel="noreferrer"
              className="shop-button"
            >
              ほうじ茶ラテを購入する
            </a>
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
