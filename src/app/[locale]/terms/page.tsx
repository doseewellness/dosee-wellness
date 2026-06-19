'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import '../../../styles/pages.css'

export default function TermsPage() {
  const t = useTranslations('legal')

  return (
    <div className="page-container">
      <Navigation isScrolled={true} />

      <section className="static-page-hero">
        <div className="static-page-content">
          <p className="product-category">LEGAL</p>
          <h1>{t('terms.title')}</h1>
          <p className="subtitle">{t('terms.lastUpdated')}</p>
        </div>
      </section>

      <section className="static-page-section">
        <div className="section-wrapper legal-content">
          <p className="legal-reference-notice">{t('referenceNotice')}</p>

          <h2>{t('terms.article1Title')}</h2>
          <p>{t('terms.article1Body')}</p>

          <h2>{t('terms.article2Title')}</h2>
          <ol>
            <li>{t('terms.article2P1')}</li>
            <li>
              {t('terms.article2P2Intro')}
              <ul>
                <li>{t('terms.article2P2Item1')}</li>
                <li>{t('terms.article2P2Item2')}</li>
                <li>{t('terms.article2P2Item3')}</li>
              </ul>
            </li>
          </ol>

          <h2>{t('terms.article3Title')}</h2>
          <ol>
            <li>{t('terms.article3P1')}</li>
            <li>{t('terms.article3P2')}</li>
            <li>{t('terms.article3P3')}</li>
          </ol>

          <h2>{t('terms.article4Title')}</h2>
          <ol>
            <li>{t('terms.article4P1')}</li>
            <li>{t('terms.article4P2')}</li>
            <li>{t('terms.article4P3')}</li>
          </ol>

          <h2>{t('terms.article5Title')}</h2>
          <p>{t('terms.article5Intro')}</p>
          <ul>
            <li>{t('terms.article5Item1')}</li>
            <li>{t('terms.article5Item2')}</li>
            <li>{t('terms.article5Item3')}</li>
            <li>{t('terms.article5Item4')}</li>
            <li>{t('terms.article5Item5')}</li>
            <li>{t('terms.article5Item6')}</li>
            <li>{t('terms.article5Item7')}</li>
            <li>{t('terms.article5Item8')}</li>
            <li>{t('terms.article5Item9')}</li>
            <li>{t('terms.article5Item10')}</li>
            <li>{t('terms.article5Item11')}</li>
          </ul>

          <h2>{t('terms.article6Title')}</h2>
          <ol>
            <li>
              {t('terms.article6P1Intro')}
              <ul>
                <li>{t('terms.article6P1Item1')}</li>
                <li>{t('terms.article6P1Item2')}</li>
                <li>{t('terms.article6P1Item3')}</li>
                <li>{t('terms.article6P1Item4')}</li>
              </ul>
            </li>
            <li>{t('terms.article6P2')}</li>
          </ol>

          <h2>{t('terms.article7Title')}</h2>
          <ol>
            <li>{t('terms.article7P1')}</li>
            <li>{t('terms.article7P2')}</li>
          </ol>

          <h2>{t('terms.article8Title')}</h2>
          <p>{t('terms.article8Body')}</p>

          <h2>{t('terms.article9Title')}</h2>
          <p>{t('terms.article9Body')}</p>

          <h2>{t('terms.article10Title')}</h2>
          <ol>
            <li>{t('terms.article10P1')}</li>
            <li>{t('terms.article10P2')}</li>
          </ol>

          <h2>{t('terms.contactTitle')}</h2>
          <p>{t('terms.contactIntro')}</p>
          <div className="contact-info">
            <p><strong>株式会社DoSee Group</strong></p>
            <p>Email: <a href="mailto:info@doseegroup.com">info@doseegroup.com</a></p>
          </div>
        </div>
      </section>

      <section className="content-section" style={{paddingTop: '2rem', paddingBottom: '4rem'}}>
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
