import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | DoSee Wellness',
  description: 'DoSee Wellness株式会社のプライバシーポリシー。個人情報の取り扱いについて。',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
