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
  const title = t('wellchaTitle')
  const description = t('wellchaDescription')
  return {
    title,
    description,
    keywords: pageMetadata.wellcha.keywords,
    alternates: buildAlternates(locale, '/wellcha'),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/wellcha`,
      images: [
        {
          url: `${siteConfig.url}/images/og/wellcha-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'WellCha - Matcha & Hojicha Latte',
        },
      ],
    },
  }
}

export default function WellChaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
