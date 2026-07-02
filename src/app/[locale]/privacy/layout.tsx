import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { siteConfig, ogImages } from '../../../lib/constants/metadata'
import { buildAlternates } from '../../../lib/i18n/alternates'
import type { Locale } from '../../../i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const title = t('privacyTitle')
  const description = t('privacyDescription')
  return {
    title,
    description,
    alternates: buildAlternates(locale, '/privacy'),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/privacy`,
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

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
