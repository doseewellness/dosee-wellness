import { Metadata } from 'next';
import { siteConfig, pageMetadata } from '../../lib/constants/metadata';

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  keywords: pageMetadata.contact.keywords,
  
  openGraph: {
    title: pageMetadata.contact.title,
    description: pageMetadata.contact.description,
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/images/og/home-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'DoSee Wellness - お問い合わせ',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.contact.title,
    description: pageMetadata.contact.description,
    images: [`${siteConfig.url}/images/og/home-og.jpg`],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}