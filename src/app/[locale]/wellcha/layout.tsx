import { Metadata } from 'next'
import { pageMetadata, siteConfig } from '../../../lib/constants/metadata'

export const metadata: Metadata = {
  title: pageMetadata.wellcha.title,
  description: pageMetadata.wellcha.description,
  keywords: pageMetadata.wellcha.keywords,
  openGraph: {
    title: pageMetadata.wellcha.title,
    description: pageMetadata.wellcha.description,
    url: `${siteConfig.url}/wellcha`,
    images: [
      {
        url: `${siteConfig.url}/images/og/wellcha-og.jpg`, // ← ここだけ変更
        width: 1200,
        height: 630,
        alt: 'WellCha - 抹茶・ほうじ茶ラテ',
      },
    ],
  },
}

export default function WellChaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}