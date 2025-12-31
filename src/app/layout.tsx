import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'DoSee Wellness - 忙しい毎日をやさしく整える一杯',
  description: 'DoSee Wellnessは、こころ・からだ・肌を整える日本茶ベースのウェルネスブランドです。',
  keywords: ['ウェルネス', '抹茶', 'ほうじ茶', '日本茶', 'DoSee Wellness'],
  openGraph: {
    title: 'DoSee Wellness',
    description: '忙しい毎日をやさしく整える一杯',
    url: 'https://doseewellness.com',
    siteName: 'DoSee Wellness',
    locale: 'ja_JP',
    type: 'website',
  }
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
      </head>
      <body>{children}</body>
    </html>
  )
}
