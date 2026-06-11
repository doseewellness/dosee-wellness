'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import faqData from '../../data/faq.json'
import '../../styles/pages.css'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQData {
  wellcha: FAQItem[]
  dosee: FAQItem[]
  general: FAQItem[]
}

const typedFaqData = faqData as FAQData

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'wellcha' | 'dosee' | 'general'>('all')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  // 構造化データ（FAQ Schema）
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ...typedFaqData.wellcha.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
      ...typedFaqData.dosee.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
      ...typedFaqData.general.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    ],
  }

  const categories = [
    { id: 'all' as const, label: 'すべて' },
    { id: 'wellcha' as const, label: 'WellCha' },
    { id: 'dosee' as const, label: 'DoSee' },
    { id: 'general' as const, label: '一般' },
  ]

  const getFilteredFAQs = () => {
    if (activeCategory === 'all') {
      return [
        ...typedFaqData.wellcha,
        ...typedFaqData.dosee,
        ...typedFaqData.general,
      ]
    }
    return typedFaqData[activeCategory]
  }

  return (
    <div className="page-container">
      {/* 構造化データの埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      <Navigation isScrolled={true} />

      <section className="static-page-hero">
        <div className="static-page-content">
          <p className="product-category">SUPPORT</p>
          <h1>よくあるご質問</h1>
          <p className="subtitle">
            DoSee Wellness の商品やサービスについて、<br />
            よくいただくご質問にお答えします。
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-wrapper">
          {/* カテゴリーフィルター */}
          <div className="faq-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-button ${
                  activeCategory === category.id ? 'active' : ''
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ一覧 */}
          <div className="faq-list">
            {getFilteredFAQs().map((item) => (
              <div key={item.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={openItems.has(item.id)}
                >
                  <span className="faq-q-icon">Q</span>
                  <span className="faq-q-text">{item.question}</span>
                  <span
                    className={`faq-toggle-icon ${
                      openItems.has(item.id) ? 'open' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {openItems.has(item.id) && (
                  <div className="faq-answer">
                    <span className="faq-a-icon">A</span>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* お問い合わせCTA */}
          <div className="faq-contact-box">
            <h3>解決しない場合は</h3>
            <p>
              お探しの情報が見つからない場合は、<br />
              お気軽にお問い合わせください。
            </p>
            <a
              href="mailto:info@dosee-wellness.com"
              className="contact-button"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </section>

      <section
        className="content-section"
        style={{ paddingTop: '2rem', paddingBottom: '4rem' }}
      >
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
