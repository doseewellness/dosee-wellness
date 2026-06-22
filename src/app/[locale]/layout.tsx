import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Playfair_Display, Geist } from 'next/font/google'
import { pageMetadata, siteConfig } from '../../lib/constants/metadata'
import { routing, type Locale } from '../../i18n/routing'
import { buildAlternates } from '../../lib/i18n/alternates'
import '../../styles/globals.css'
import GoogleAnalytics from '../../components/GoogleAnalytics'
import { cn } from "@/lib/utils";
import CartSheet from '@/components/cart/CartSheet';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
})



const OG_LOCALES: Record<Locale, string> = {
  ja: 'ja_JP',
  en: 'en_US',
  zh: 'zh_CN',
  fr: 'fr_FR',
  es: 'es_ES',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const title = t('homeTitle')
  const description = t('homeDescription')

  return {
    title,
    description,
    keywords: pageMetadata.home.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: buildAlternates(locale, ''),

    // ファビコン設定
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          url: '/icon.png',
        },
      ],
    },

    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: OG_LOCALES[locale],
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/images/og/home-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'DoSee Wellness - Busy days, gently reset.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}/images/og/home-og.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  return (
    <html lang={locale} className={cn("font-sans", geist.variable)}>
      <body className={playfair.className}>
        <NextIntlClientProvider>
          <GoogleAnalytics />
          {children}
          <CartSheet />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}