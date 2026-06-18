'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import '../../../styles/pages.css'

export default function PrivacyPage() {
  const t = useTranslations('legal')

  return (
    <div className="page-container">
      <Navigation isScrolled={true} />

      <section className="static-page-hero">
        <div className="static-page-content">
          <p className="product-category">LEGAL</p>
          <h1>{t('privacy.title')}</h1>
          <p className="subtitle">{t('privacy.lastUpdated')}</p>
        </div>
      </section>

      <section className="static-page-section">
        <div className="section-wrapper legal-content">
          <p className="legal-reference-notice">{t('referenceNotice')}</p>

          <h2>{t('privacy.section1Title')}</h2>
          <p>{t('privacy.section1Intro')}</p>
          <ul>
            <li>{t('privacy.section1Item1')}</li>
            <li>{t('privacy.section1Item2')}</li>
            <li>{t('privacy.section1Item3')}</li>
            <li>{t('privacy.section1Item4')}</li>
          </ul>

          <h2>{t('privacy.section2Title')}</h2>
          <p>{t('privacy.section2Intro')}</p>
          <ul>
            <li>{t('privacy.section2Item1')}</li>
            <li>{t('privacy.section2Item2')}</li>
            <li>{t('privacy.section2Item3')}</li>
            <li>{t('privacy.section2Item4')}</li>
            <li>{t('privacy.section2Item5')}</li>
          </ul>

          <h2>{t('privacy.section3Title')}</h2>
          <p>{t('privacy.section3Intro')}</p>
          <ul>
            <li>{t('privacy.section3Item1')}</li>
            <li>{t('privacy.section3Item2')}</li>
            <li>{t('privacy.section3Item3')}</li>
            <li>{t('privacy.section3Item4')}</li>
          </ul>

          <h2>{t('privacy.section4Title')}</h2>
          <p>{t('privacy.section4Body')}</p>

          <h2>{t('privacy.section5Title')}</h2>
          <p>{t('privacy.section5Body')}</p>

          <h2>{t('privacy.section6Title')}</h2>
          <p>{t('privacy.section6Intro')}</p>
          <ul>
            <li>{t('privacy.section6Item1')}</li>
            <li>{t('privacy.section6Item2')}</li>
            <li>{t('privacy.section6Item3')}</li>
            <li>{t('privacy.section6Item4')}</li>
          </ul>
          <p>{t('privacy.section6Outro')}</p>

          <h2>{t('privacy.section7Title')}</h2>
          <p>{t('privacy.section7Body')}</p>

          <h2>{t('privacy.section8Title')}</h2>
          <p>{t('privacy.section8Intro')}</p>
          <div className="contact-info">
            <p><strong>DoSee Wellness株式会社</strong></p>
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
