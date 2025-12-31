import type { Metadata } from 'next'
import '../styles/globals.css'
import GoogleAnalytics from '../components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'DoSee Wellness | 日本茶ウェルネス - 忙しい毎日をやさしく整える',
  description: '抹茶・ほうじ茶ベースのウェルネスブランド。こころ・からだ・肌を整える一杯。WellCha（抹茶ラテ・ほうじ茶ラテ）とDoSeeジンジャーショット。',
  keywords: ['抹茶ラテ', 'ほうじ茶ラテ', 'ウェルネス', '日本茶', 'DoSee Wellness', 'WellCha', 'ジンジャーショット', '健康習慣'],
  authors: [{ name: 'DoSee Wellness' }],
  openGraph: {
    title: 'DoSee Wellness - 日本茶のやさしさで毎日を整える',
    description: '忙しい毎日をやさしく整える一杯。抹茶・ほうじ茶ベースのウェルネス習慣。',
    url: 'https://doseewellness.com',
    siteName: 'DoSee Wellness',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://doseewellness.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DoSee Wellness - 日本茶ウェルネス',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DoSee Wellness',
    description: '忙しい毎日をやさしく整える一杯',
    images: ['https://doseewellness.com/og-image.jpg'],
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
  verification: {
    google: 'あとで追加',
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://doseewellness.com" />
      </head>
      <body>
        <GoogleAnalytics />  {/* 追加 */}
        {children}
      </body>
    </html>
  )
}
