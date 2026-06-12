import { Metadata } from 'next'
import { pageMetadata, siteConfig } from '../../../lib/constants/metadata'

export const metadata: Metadata = {
  title: pageMetadata.commerce.title,
  description: pageMetadata.commerce.description,
  keywords: pageMetadata.commerce.keywords,
  openGraph: {
    title: pageMetadata.commerce.title,
    description: pageMetadata.commerce.description,
    url: `${siteConfig.url}/commerce`,
  },
}

export default function CommerceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
