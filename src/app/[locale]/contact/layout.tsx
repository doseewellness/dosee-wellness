import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig, pageMetadata } from '../../../lib/constants/metadata';
import { buildAlternates } from '../../../lib/i18n/alternates';
import type { Locale } from '../../../i18n/routing';

const OG_LOCALES: Record<Locale, string> = {
  ja: 'ja_JP',
  en: 'en_US',
  zh: 'zh_CN',
  fr: 'fr_FR',
  es: 'es_ES',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('contactTitle');
  const description = t('contactDescription');
  return {
    title,
    description,
    keywords: pageMetadata.contact.keywords,
    alternates: buildAlternates(locale, '/contact'),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/contact`,
      siteName: siteConfig.name,
      locale: OG_LOCALES[locale],
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/images/og/home-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'DoSee Wellness - Contact',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}/images/og/home-og.jpg`],
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
