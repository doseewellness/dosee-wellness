import ContactForm from '../../components/ContactForm';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* ヒーローセクション */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-stone-500 uppercase tracking-widest mb-4">
            CONTACT
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
            お問い合わせ
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            DoSee Wellness に関するご質問・ご相談は、<br />
            以下のフォームよりお気軽にお問い合わせください。
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
              その他の連絡方法
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="mailto:doseewellness.com"
                className="text-green-700 hover:text-green-800 transition-colors"
              >
                📧 info@dosee-wellness.com
              </a>
              <a 
                href="https://www.instagram.com/wellchamatcha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:text-green-800 transition-colors"
              >
                📱 Instagram
              </a>
            </div>
          </div>

          {/* FAQへのリンク */}
          <div className="mt-12 p-6 bg-green-50 rounded-2xl text-center">
            <p className="text-stone-700 mb-4">
              よくある質問もご確認ください
            </p>
            <Link 
              href="/faq"
              className="inline-flex items-center text-green-700 hover:text-green-800 font-medium transition-colors"
            >
              FAQを見る →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}