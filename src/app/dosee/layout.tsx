import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DoSee - ジンジャーショット | DoSee Wellness',
  description: '1日を前向きにする小さな一杯。負担なく続けられるショット系ウェルネスライン。7-Day Ginger Shot（開発中）。',
  keywords: ['ジンジャーショット', 'DoSee', 'ウェルネスショット', '健康習慣', 'デトックス'],
  openGraph: {
    title: 'DoSee - 1日を前向きにする、小さな一杯',
    description: 'さっと飲めて、からだと気分をやさしく前に進める。',
    url: 'https://doseewellness.com/dosee',
    images: [
      {
        url: 'https://doseewellness.com/dosee-og.jpg',
        width: 1200,
        height: 630,
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
