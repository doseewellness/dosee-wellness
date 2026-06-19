'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import '../../../styles/pages.css'

export default function CommercePage() {
  const t = useTranslations('legal')

  return (
    <div className="page-container">
      <Navigation isScrolled={true} />

      <section className="static-page-hero">
        <div className="static-page-content">
          <p className="product-category">LEGAL</p>
          <h1>{t('commerce.title')}</h1>
          <p className="subtitle">{t('commerce.lastUpdated')}</p>
        </div>
      </section>

      <section className="static-page-section">
        <div className="section-wrapper legal-content">
          <p className="legal-reference-notice">{t('referenceNotice')}</p>

          <h2>{t('commerce.sellerHeading')}</h2>
          <div className="info-row">
            <span className="info-label">{t('commerce.sellerLabel')}</span>
            <span className="info-value">株式会社DoSee Group</span>
          </div>
          <div className="info-row">
            <span className="info-label">{t('commerce.managerLabel')}</span>
            <span className="info-value">{t('commerce.managerValue')}</span>
          </div>

          <h2>{t('commerce.addressHeading')}</h2>
          <div className="info-row">
            <span className="info-label">{t('commerce.addressLabel')}</span>
            <span className="info-value">東京都</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            {t('commerce.addressNote')}
          </p>

          <h2>{t('commerce.contactHeading')}</h2>
          <div className="info-row">
            <span className="info-label">{t('commerce.emailLabel')}</span>
            <span className="info-value">
              <a href="mailto:info@doseegroup.com">info@doseegroup.com</a>
            </span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            {t('commerce.contactNote')}
          </p>

          <h2>{t('commerce.pricesHeading')}</h2>
          <p>{t('commerce.pricesNote')}</p>
          <div className="info-row">
            <span className="info-label">WellCha 抹茶ラテ</span>
            <span className="info-value">¥3,980（税込）</span>
          </div>
          <div className="info-row">
            <span className="info-label">WellCha ほうじ茶ラテ</span>
            <span className="info-value">¥3,980（税込）</span>
          </div>

          <h2>{t('commerce.additionalFeesHeading')}</h2>
          <h3>{t('commerce.shippingSubheading')}</h3>
          <p>{t('commerce.shippingNote')}</p>
          <ul>
            <li>{t('commerce.shippingItem1')}</li>
            <li>{t('commerce.shippingItem2')}</li>
          </ul>

          <h3>{t('commerce.paymentFeeSubheading')}</h3>
          <p>{t('commerce.paymentFeeNote')}</p>

          <h2>{t('commerce.paymentMethodHeading')}</h2>
          <p>{t('commerce.paymentMethodIntro')}</p>
          <ul>
            <li>{t('commerce.paymentItem1')}</li>
            <li>{t('commerce.paymentItem2')}</li>
            <li>{t('commerce.paymentItem3')}</li>
            <li>{t('commerce.paymentItem4')}</li>
          </ul>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            {t('commerce.paymentNote')}
          </p>

          <h2>{t('commerce.paymentTimingHeading')}</h2>
          <p>{t('commerce.paymentTimingBody')}</p>

          <h2>{t('commerce.deliveryHeading')}</h2>
          <p>{t('commerce.deliveryBody')}</p>

          <h2>{t('commerce.returnsHeading')}</h2>

          <h3>{t('commerce.defectSubheading')}</h3>
          <p>{t('commerce.defectNote')}</p>
          <ul>
            <li>{t('commerce.defectItem1')}</li>
            <li>{t('commerce.defectItem2')}</li>
            <li>{t('commerce.defectItem3')}</li>
          </ul>

          <h3>{t('commerce.customerReturnSubheading')}</h3>
          <p>{t('commerce.customerReturnIntro')}</p>
          <ul>
            <li>{t('commerce.customerReturnItem1')}</li>
            <li>{t('commerce.customerReturnItem2')}</li>
            <li>{t('commerce.customerReturnItem3')}</li>
          </ul>
          <p>{t('commerce.customerReturnNote')}</p>

          <h3>{t('commerce.noReturnSubheading')}</h3>
          <ul>
            <li>{t('commerce.noReturnItem1')}</li>
            <li>{t('commerce.noReturnItem2')}</li>
            <li>{t('commerce.noReturnItem3')}</li>
          </ul>

          <h2>{t('commerce.refundHeading')}</h2>
          <p>{t('commerce.refundBody')}</p>

          <h2>{t('commerce.specialConditionsHeading')}</h2>
          <p>{t('commerce.specialConditionsBody')}</p>

          <h2>{t('commerce.privacyHeading')}</h2>
          <p>
            {t('commerce.privacyBodyPrefix')}
            <Link href="/privacy" style={{ color: '#1b1a17', textDecoration: 'underline' }}>
              {t('commerce.privacyPolicyLinkText')}
            </Link>
            {t('commerce.privacyBodySuffix')}
          </p>
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
