import { Metadata } from 'next'
import { pageMetadata, siteConfig } from '../../lib/constants/metadata'

export const metadata: Metadata = {
  title: pageMetadata.dosee.title,
  description: pageMetadata.dosee.description,
  keywords: pageMetadata.dosee.keywords,
  openGraph: {
    title: pageMetadata.dosee.title,
    description: pageMetadata.dosee.description,
    url: `${siteConfig.url}/dosee`,
    images: [
      {
        url: `${siteConfig.url}/dosee-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'DoSee - ジンジャーショット',
      },
    ],
  },
}

export default function DoSeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}