import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { pageMetadata, siteConfig } from '../../../lib/constants/metadata'
import { buildAlternates } from '../../../lib/i18n/alternates'
import type { Locale } from '../../../i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const title = t('faqTitle')
  const description = t('faqDescription')
  return {
    title,
    description,
    keywords: pageMetadata.faq.keywords,
    alternates: buildAlternates(locale, '/faq'),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/faq`,
    },
  }
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
