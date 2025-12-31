import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DoSee Wellnessについて | 会社概要',
  description: '忙しい現代でも続けられるウェルネスをテーマにした日本発のブランド。日本の茶文化から生まれた、心・からだ・肌をやさしく整える一杯。',
  openGraph: {
    title: 'DoSee Wellnessについて',
    description: '日本の茶文化、発酵や薬膳の知恵をもとに、心・からだ・肌をやさしく整える一杯をデザインしています。',
    url: 'https://doseewellness.com/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
