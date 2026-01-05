import { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { pageMetadata, siteConfig } from '../lib/constants/metadata'
import '../styles/globals.css'
import GoogleAnalytics from '../components/GoogleAnalytics'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
})



export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
  
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
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'ja_JP',
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
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="canonical" href={siteConfig.url} />
      </head>
      <body className={playfair.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}