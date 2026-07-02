import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { pageMetadata, siteConfig, ogImages } from '../../../lib/constants/metadata'
import { buildAlternates } from '../../../lib/i18n/alternates'
import type { Locale } from '../../../i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const title = t('commerceTitle')
  const description = t('commerceDescription')
  return {
    title,
    description,
    keywords: pageMetadata.commerce.keywords,
    alternates: buildAlternates(locale, '/commerce'),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/commerce`,
      siteName: siteConfig.name,
      type: 'website',
      images: [{ url: `${siteConfig.url}${ogImages.default}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}${ogImages.default}`],
    },
  }
}

export default function CommerceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
