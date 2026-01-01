'use client'

import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import '../../styles/pages.css'  

export default function CommercePage() {
  return (
    <div className="page-container">
      <Navigation isScrolled={true} />
      
      <section className="static-page-hero">
        <div className="static-page-content">
          <p className="product-category">LEGAL</p>
          <h1>特定商取引法に基づく表記</h1>
          <p className="subtitle">
            最終更新日：2026年1月1日
          </p>
        </div>
      </section>

      <section className="static-page-section">
        <div className="section-wrapper legal-content">
          <h2>販売業者</h2>
          <div className="info-row">
            <span className="info-label">販売業者</span>
            <span className="info-value">DoSee Wellness株式会社</span>
          </div>
          <div className="info-row">
            <span className="info-label">運営責任者</span>
            <span className="info-value">代表取締役</span>
          </div>

          <h2>所在地</h2>
          <div className="info-row">
            <span className="info-label">本社所在地</span>
            <span className="info-value">東京都</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            ※詳細な住所につきましては、請求があれば遅滞なく開示いたします。
          </p>

          <h2>お問い合わせ</h2>
          <div className="info-row">
            <span className="info-label">メールアドレス</span>
            <span className="info-value">
              <a href="mailto:info@dosee-wellness.com">info@dosee-wellness.com</a>
            </span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            ※お電話でのお問い合わせは受け付けておりません。<br />
            お問い合わせはメールにてお願いいたします。
          </p>

          <h2>販売価格</h2>
          <p>
            商品ごとの価格は、各商品ページに表示しております。<br />
            表示価格には消費税が含まれております。
          </p>
          <div className="info-row">
            <span className="info-label">WellCha 抹茶ラテ</span>
            <span className="info-value">¥3,980（税込）</span>
          </div>
          <div className="info-row">
            <span className="info-label">WellCha ほうじ茶ラテ</span>
            <span className="info-value">¥3,980（税込）</span>
          </div>

          <h2>商品代金以外の必要料金</h2>
          <h3>送料</h3>
          <p>
            配送先の地域により異なります。詳細は注文時に表示されます。
          </p>
          <ul>
            <li>全国一律：800円</li>
            <li>5,000円以上のご注文で送料無料</li>
          </ul>

          <h3>決済手数料</h3>
          <p>
            クレジットカード決済の場合、手数料は無料です。
          </p>

          <h2>支払方法</h2>
          <p>
            以下の支払方法がご利用いただけます：
          </p>
          <ul>
            <li>クレジットカード（Visa、Mastercard、American Express、JCB）</li>
            <li>Apple Pay</li>
            <li>Google Pay</li>
            <li>Shop Pay</li>
          </ul>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            ※決済はShopify Paymentsを利用しており、カード情報は当社では保持しません。
          </p>

          <h2>支払時期</h2>
          <p>
            各クレジットカード会社の引き落とし日に準じます。<br />
            商品注文時に決済が完了いたします。
          </p>

          <h2>商品の引渡時期</h2>
          <p>
            ご注文確定後、通常3〜7営業日以内に発送いたします。<br />
            配送状況により遅れる場合がございます。<br />
            発送完了時に、追跡番号をメールにてご連絡いたします。
          </p>

          <h2>返品・交換について</h2>
          
          <h3>不良品・誤送の場合</h3>
          <p>
            商品到着後7日以内にメールにてご連絡ください。<br />
            当社負担にて交換または返金させていただきます。
          </p>
          <ul>
            <li>商品に瑕疵（欠陥）がある場合</li>
            <li>ご注文と異なる商品が届いた場合</li>
            <li>配送中の破損があった場合</li>
          </ul>

          <h3>お客様都合による返品</h3>
          <p>
            以下の条件を満たす場合、返品を承ります：
          </p>
          <ul>
            <li>商品到着後7日以内</li>
            <li>未開封・未使用の商品</li>
            <li>商品タグ・パッケージが揃っている</li>
          </ul>
          <p>
            返送料はお客様負担となります。<br />
            食品の性質上、開封後の返品・交換はお受けできません。
          </p>

          <h3>返品不可の商品</h3>
          <ul>
            <li>開封済み・使用済みの商品</li>
            <li>お客様の責任による汚損・破損がある商品</li>
            <li>商品到着後8日以上経過した商品</li>
          </ul>

          <h2>返金について</h2>
          <p>
            返品確認後、5〜10営業日以内にご購入時の決済方法へ返金いたします。
          </p>

          <h2>特別な販売条件または提供条件</h2>
          <p>
            特にございません。
          </p>

          <h2>個人情報の取り扱い</h2>
          <p>
            お客様の個人情報は、当社の
            <Link href="/privacy" style={{ color: '#2c5f2d', textDecoration: 'underline' }}>
              プライバシーポリシー
            </Link>
            に基づき、厳重に管理いたします。
          </p>
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
