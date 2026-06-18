import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { multiline } from './MultiLine'

const Footer = () => {
  const t = useTranslations('footer')

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>{t('brand')}</h3>
          <p>{multiline(t('tagline'))}</p>
        </div>

        <div className="footer-section">
          <h3>{t('productsTitle')}</h3>
          <Link href="/wellcha">{t('wellcha')}</Link>
        </div>

        <div className="footer-section">
          <h3>{t('companyTitle')}</h3>
          <Link href="/about">{t('about')}</Link>
          <Link href="/blog">{t('note')}</Link>
          <a href="mailto:info@doseegroup.com">{t('contact')}</a>
        </div>

        <div className="footer-section">
          <h3>{t('followTitle')}</h3>
          <a href="https://www.instagram.com/wellchamatcha" target="_blank" rel="noopener noreferrer">{t('instagram')}</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          {t('copyright')} | {' '}
          <Link href="/privacy" style={{color: 'inherit', textDecoration: 'underline'}}>{t('privacy')}</Link> | {' '}
          <Link href="/terms" style={{color: 'inherit', textDecoration: 'underline'}}>{t('terms')}</Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
