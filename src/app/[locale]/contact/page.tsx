import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';

export default function ContactPage() {
  const t = useTranslations('contactPage');

  return (
    <div className="min-h-screen bg-background">
      <Navigation isScrolled={true} />

      <main className="pt-20">
        {/* ヒーローセクション */}
        <section className="py-20 px-6 bg-gradient-to-b from-[#f1ece1] to-background">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs text-gold uppercase tracking-[0.36em] mb-4">
              {t('eyebrow')}
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              {t('heading')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('subheading')}
            </p>
          </div>
        </section>

        {/* フォームセクション */}
        <section className="pb-24 px-6">
          <div className="max-w-2xl mx-auto">
            {/* フォームカード */}
            <div className="bg-card rounded-2xl border border-border/70 shadow-[0_24px_60px_rgba(27,26,23,0.08)] p-8 md:p-12">
              <ContactForm />
            </div>

            {/* その他の連絡方法 */}
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {t('otherContact.heading')}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="mailto:info@doseegroup.com"
                  className="text-brand hover:text-brand-dark underline-offset-4 hover:underline transition-colors"
                >
                  📧 info@doseegroup.com
                </a>
                <a
                  href="https://www.instagram.com/wellchamatcha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand-dark underline-offset-4 hover:underline transition-colors"
                >
                  📱 {t('otherContact.instagram')}
                </a>
              </div>
            </div>

            {/* FAQへのリンク */}
            <div className="mt-12 p-6 bg-brand-soft/70 border border-brand/10 rounded-2xl text-center">
              <p className="text-foreground/80 mb-4">
                {t('faqPromo.text')}
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center text-brand hover:text-brand-dark font-medium underline-offset-4 hover:underline transition-colors"
              >
                {t('faqPromo.link')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
