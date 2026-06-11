'use client'

import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import '../../styles/pages.css'

export default function PrivacyPage() {
  return (
    <div className="page-container">
      <Navigation isScrolled={true} />
      
      <section className="static-page-hero">
        <div className="static-page-content">
          <p className="product-category">LEGAL</p>
          <h1>プライバシーポリシー</h1>
          <p className="subtitle">
            最終更新日：2025年1月1日
          </p>
        </div>
      </section>

      <section className="static-page-section">
        <div className="section-wrapper legal-content">
          <h2>1. 個人情報の取得について</h2>
          <p>
            DoSee Wellness株式会社（以下「当社」）は、以下の目的で個人情報を取得いたします：
          </p>
          <ul>
            <li>商品の発送及びサービスの提供</li>
            <li>お客様からのお問い合わせへの対応</li>
            <li>新商品・サービスのご案内</li>
            <li>アンケート調査やキャンペーンのご案内</li>
          </ul>

          <h2>2. 個人情報の利用目的</h2>
          <p>
            当社は、お客様から取得した個人情報を以下の目的で利用いたします：
          </p>
          <ul>
            <li>商品・サービスの提供、契約の履行</li>
            <li>お客様からのお問い合わせ、ご相談への対応</li>
            <li>商品・サービスに関する情報提供、マーケティング活動</li>
            <li>アフターサービス、満足度調査</li>
            <li>統計データの作成（個人を特定できない形式）</li>
          </ul>

          <h2>3. 個人情報の第三者提供</h2>
          <p>
            当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません：
          </p>
          <ul>
            <li>お客様の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>人の生命、身体または財産の保護のために必要がある場合</li>
            <li>配送業者など、サービス提供に必要な範囲で業務委託先に提供する場合</li>
          </ul>

          <h2>4. 個人情報の管理</h2>
          <p>
            当社は、お客様の個人情報を正確かつ最新の状態に保ち、
            個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、
            セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、
            安全対策を実施し個人情報の厳重な管理を行います。
          </p>

          <h2>5. Cookieの使用について</h2>
          <p>
            当社のウェブサイトでは、より良いサービスを提供するために、Cookieを使用しています。
            Cookieの使用により、お客様のブラウザを識別することができますが、
            個人を特定することはできません。Cookieの使用を希望されない場合は、
            ブラウザの設定で無効にすることができます。
          </p>

          <h2>6. お客様の権利</h2>
          <p>
            お客様は、当社が保有する個人情報について、以下の権利を有します：
          </p>
          <ul>
            <li>開示請求</li>
            <li>訂正・追加・削除請求</li>
            <li>利用停止・消去請求</li>
            <li>第三者提供の停止請求</li>
          </ul>
          <p>
            これらの請求を行いたい場合は、下記のお問い合わせ先までご連絡ください。
          </p>

          <h2>7. プライバシーポリシーの変更</h2>
          <p>
            当社は、個人情報に関する法令及びその他の規範を遵守し、
            本ポリシーの内容を適宜見直し、改善に努めます。
            改定された場合は、当ウェブサイトにて公表いたします。
          </p>

          <h2>8. お問い合わせ窓口</h2>
          <p>
            個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください：
          </p>
          <div className="contact-info">
            <p><strong>DoSee Wellness株式会社</strong></p>
            <p>Email: <a href="mailto:privacy@dosee-wellness.com">privacy@dosee-wellness.com</a></p>
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
