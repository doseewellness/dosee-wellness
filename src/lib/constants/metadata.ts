// サイト全体のメタデータを一元管理

export const siteConfig = {
  name: 'DoSee Wellness',
  title: 'DoSee Wellness - 忙しい毎日でも続けられるウェルネス',
  description: '日本発のウェルネスブランド。日本茶ベースのWellChaと、ショット系DoSeeで、こころ・からだ・肌をやさしく整える習慣を提案します。',
  url: 'https://doseewellness.com',
  ogImage: 'https://doseewellness.com/og-image.jpg',
  links: {
    instagram: 'https://www.instagram.com/wellcha_matcha',
    email: 'info@dosee-wellness.com',
  },
}

// ページごとのメタデータ
export const pageMetadata = {
  home: {
    title: 'DoSee Wellness - 忙しい毎日でも続けられるウェルネス',
    description: '日本発のウェルネスブランド。日本茶ベースのWellChaと、ショット系DoSeeで、こころ・からだ・肌をやさしく整える習慣を。無理のないウェルネスを毎日に。',
    keywords: ['ウェルネス', '日本茶', '抹茶ラテ', 'ほうじ茶ラテ', 'ジンジャーショット', 'DoSee Wellness', 'WellCha'],
  },
  
  wellcha: {
    title: 'WellCha - 抹茶・ほうじ茶ラテ | DoSee Wellness',
    description: '日本茶の力で心・からだ・肌を整える。抹茶ラテは集中力と美容を、ほうじ茶ラテは深いリラックスをサポート。続けやすいラテスタイルで毎日のウェルネス習慣を。',
    keywords: ['抹茶ラテ', 'ほうじ茶ラテ', 'WellCha', '日本茶', 'テアニン', 'カフェイン', 'リラックス', '集中力', 'スキンケア'],
  },
  
  dosee: {
    title: 'DoSee - 7-Day Ginger Shot（準備中）| DoSee Wellness',
    description: '1日を前向きにする、小さな一杯。ジンジャー×柑橘のショット系ウェルネス。負担なく続けられる新習慣を2025年夏リリース予定。発売通知を受け取る。',
    keywords: ['ジンジャーショット', 'DoSee', 'ウェルネスショット', 'ジンジャー', '健康習慣', '発売予定'],
  },
  
  about: {
    title: 'DoSee Wellness について - 私たちのストーリー',
    description: '忙しい現代でも続けられるウェルネスをテーマに、WellChaとDoSeeの2つのラインを展開。日本の伝統知識と現代ライフスタイルを掛け合わせた、新しいウェルネス習慣を提案します。',
    keywords: ['DoSee Wellness', '会社概要', 'ブランドストーリー', 'ウェルネス', '日本発'],
  },
  
  faq: {
    title: 'よくあるご質問（FAQ）| DoSee Wellness',
    description: 'WellCha（抹茶・ほうじ茶ラテ）とDoSee（ジンジャーショット）に関するよくある質問。飲み方、成分、購入方法、配送についてお答えします。',
    keywords: ['FAQ', 'よくある質問', '飲み方', '成分', '購入方法', '配送'],
  },
  
  privacy: {
    title: 'プライバシーポリシー | DoSee Wellness',
    description: 'DoSee Wellness株式会社のプライバシーポリシー。個人情報の取り扱い、Cookie使用、お客様の権利について説明します。',
    keywords: ['プライバシーポリシー', '個人情報保護', 'Cookie'],
  },
  
  terms: {
    title: '利用規約 | DoSee Wellness',
    description: 'DoSee Wellness株式会社の利用規約。サービス利用条件、商品購入、返品・交換、禁止事項について定めています。',
    keywords: ['利用規約', '返品', '交換', 'サービス利用'],
  },
  
  commerce: {
    title: '特定商取引法に基づく表記 | DoSee Wellness',
    description: 'DoSee Wellness株式会社の特定商取引法に基づく表記。事業者情報、販売価格、支払方法、配送・返品について記載しています。',
    keywords: ['特定商取引法', '事業者情報', '返品条件'],
  },
}

// OGP画像のパス
export const ogImages = {
  default: '/og-image.jpg',
  wellcha: '/wellcha-og.jpg',
  dosee: '/dosee-og.jpg',
}

// JSON-LD構造化データのベース
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '株式会社 DoSee Wellness',
  url: 'https://doseewellness.com',
  logo: 'https://doseewellness.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@dosee-wellness.com',
    contactType: 'Customer Service',
    availableLanguage: ['Japanese', 'English'],
  },
  sameAs: [
    'https://www.instagram.com/wellcha_matcha',
  ],
}