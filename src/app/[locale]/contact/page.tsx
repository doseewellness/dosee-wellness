import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ContactForm from '../../../components/ContactForm';

export default function ContactPage() {
  const t = useTranslations('contactPage');

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* ヒーローセクション */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-stone-500 uppercase tracking-widest mb-4">
            {t('eyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
            {t('heading')}
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </div>
      </section>

      {/* フォームセクション */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* フォームカード */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <ContactForm />
          </div>

          {/* その他の連絡方法 */}
          <div className="mt-12 text-center">
            <p className="text-sm text-stone-500 mb-4">
              {t('otherContact.heading')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:doseewellness.com"
                className="text-brand hover:text-brand-dark transition-colors"
              >
                📧 info@doseegroup.com
              </a>
              <a
                href="https://www.instagram.com/wellchamatcha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-brand-dark transition-colors"
              >
                📱 {t('otherContact.instagram')}
              </a>
            </div>
          </div>

          {/* FAQへのリンク */}
          <div className="mt-12 p-6 bg-brand-soft rounded-2xl text-center">
            <p className="text-stone-700 mb-4">
              {t('faqPromo.text')}
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center text-brand hover:text-brand-dark font-medium transition-colors"
            >
              {t('faqPromo.link')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
