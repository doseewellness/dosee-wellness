import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '利用規約 | DoSee Wellness',
  description: 'DoSee Wellnessのウェブサイト及びオンラインストアの利用規約。',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
