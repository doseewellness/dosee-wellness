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
  const title = t('doseeTitle')
  const description = t('doseeDescription')
  return {
    title,
    description,
    keywords: pageMetadata.dosee.keywords,
    alternates: buildAlternates(locale, '/dosee'),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/dosee`,
      images: [
        {
          url: `${siteConfig.url}/images/og/home-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'DoSee - 7-Day Ginger Shot',
        },
      ],
    },
  }
}

export default function DoSeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
