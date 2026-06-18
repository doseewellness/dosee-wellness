'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { multiline } from '@/components/MultiLine'
import faqData from '../../../data/faq.json'
import '../../../styles/pages.css'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQData {
  wellcha: FAQItem[]
  general: FAQItem[]
}

const typedFaqData = faqData as FAQData

export default function FAQPage() {
  const t = useTranslations('faqPage')
  const [activeCategory, setActiveCategory] = useState<'all' | 'wellcha' | 'general'>('all')
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

  // 構造化データ（FAQ Schema）— kept in source-language Japanese from faq.json
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
    { id: 'all' as const, label: t('categories.all') },
    { id: 'wellcha' as const, label: t('categories.wellcha') },
    { id: 'general' as const, label: t('categories.general') },
  ]

  const getFilteredFAQs = () => {
    if (activeCategory === 'all') {
      return [
        ...typedFaqData.wellcha,
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
          <p className="product-category">{t('hero.eyebrow')}</p>
          <h1>{t('hero.heading')}</h1>
          <p className="subtitle">
            {multiline(t('hero.subtitle'))}
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
                  <span className="faq-q-text">{t(`items.${item.id}.q`)}</span>
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
                    <p>{t(`items.${item.id}.a`)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* お問い合わせCTA */}
          <div className="faq-contact-box">
            <h3>{t('contact.heading')}</h3>
            <p>
              {multiline(t('contact.body'))}
            </p>
            <a
              href="mailto:info@doseegroup.com"
              className="contact-button"
            >
              {t('contact.cta')}
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
            {t('backToTop')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
