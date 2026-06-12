import { Metadata } from 'next'
import { pageMetadata, siteConfig } from '../../../lib/constants/metadata'

export const metadata: Metadata = {
  title: pageMetadata.faq.title,
  description: pageMetadata.faq.description,
  keywords: pageMetadata.faq.keywords,
  openGraph: {
    title: pageMetadata.faq.title,
    description: pageMetadata.faq.description,
    url: `${siteConfig.url}/faq`,
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}