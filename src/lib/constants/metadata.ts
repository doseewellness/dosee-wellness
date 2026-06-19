// サイト全体のメタデータを一元管理

export const siteConfig = {
  name: 'DoSee Wellness',
  title: 'DoSee Wellness - 忙しい毎日でも続けられるウェルネス',
  description: '日本発のウェルネスブランド。日本茶ベースのWellChaと、ショット系DoSeeで、こころ・からだ・肌をやさしく整える習慣を提案します。',
  url: 'https://doseewellness.com',
  ogImage: 'https://doseewellness.com/og-image.jpg',
  links: {
    instagram: 'https://www.instagram.com/wellchamatcha',
    email: 'info@doseegroup.com',
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

  shop: {
    title: 'ショップ - 抹茶・ほうじ茶ラテを購入 | DoSee Wellness',
    description: 'DoSee Wellnessのオンラインショップ。日本茶ベースのWellCha（抹茶ラテ・ほうじ茶ラテ）を販売。送料無料・30日返金保証で、毎日のウェルネス習慣を気軽に始められます。',
    keywords: ['抹茶ラテ 通販', 'ほうじ茶ラテ 通販', 'WellCha 購入', '日本茶 オンラインショップ', 'ウェルネスドリンク'],
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
    description: '株式会社DoSee Groupのプライバシーポリシー。個人情報の取り扱い、Cookie使用、お客様の権利について説明します。',
    keywords: ['プライバシーポリシー', '個人情報保護', 'Cookie'],
  },
  
  terms: {
    title: '利用規約 | DoSee Wellness',
    description: '株式会社DoSee Groupの利用規約。サービス利用条件、商品購入、返品・交換、禁止事項について定めています。',
    keywords: ['利用規約', '返品', '交換', 'サービス利用'],
  },
  
  commerce: {
    title: '特定商取引法に基づく表記 | DoSee Wellness',
    description: '株式会社DoSee Groupの特定商取引法に基づく表記。事業者情報、販売価格、支払方法、配送・返品について記載しています。',
    keywords: ['特定商取引法', '事業者情報', '返品条件'],
  },
  // 既存のpageMetadataオブジェクトに以下を追加

  contact: {
    title: 'お問い合わせ | DoSee Wellness',
    description: 'DoSee Wellness へのお問い合わせはこちらから。商品・注文・取引に関するご質問など、お気軽にご連絡ください。',
    keywords: ['お問い合わせ', 'コンタクト', 'DoSee Wellness', '問い合わせフォーム', '取引相談'],
  },
}

// OGP画像のパス
export const ogImages = {
  default: '/og-image.jpg',
  wellcha: '/wellcha-og.jpg',
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
    email: 'info@doseegroup.com',
    contactType: 'Customer Service',
    availableLanguage: ['Japanese', 'English'],
  },
  sameAs: [
    'https://www.instagram.com/wellchamatcha',
  ],
}
