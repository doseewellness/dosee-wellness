import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildAlternates } from '../../../lib/i18n/alternates'
import type { Locale } from '../../../i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('privacyTitle'),
    description: t('privacyDescription'),
    alternates: buildAlternates(locale, '/privacy'),
    robots: {
      index: true,
      follow: true,
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
