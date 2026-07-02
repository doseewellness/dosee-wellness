import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { pageMetadata, siteConfig } from '../../../lib/constants/metadata'
import { buildAlternates } from '../../../lib/i18n/alternates'
import type { Locale } from '../../../i18n/routing'
import '../../../styles/pages.css'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const title = t('shopTitle')
  const description = t('shopDescription')
  return {
    title,
    description,
    keywords: pageMetadata.shop.keywords,
    alternates: buildAlternates(locale, '/shop'),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/shop`,
    },
  }
}

export default async function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Footer等がサーバー側でuseTranslationsを使うため、ここでロケールを
  // 確定させないとheaders()参照となり静的生成（ISR）が効かなくなる。
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="page-container">
      <Navigation isScrolled={true} />
      <div style={{ paddingTop: '80px' }}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
