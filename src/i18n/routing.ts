import { defineRouting } from 'next-intl/routing'

export const locales = ['ja', 'en', 'zh', 'fr', 'es'] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
  fr: 'Français',
  es: 'Español',
}

export const routing = defineRouting({
  locales,
  defaultLocale: 'ja',
  // 日本語は接頭辞なし（/）、他言語は /en /zh /fr /es
  localePrefix: 'as-needed',
})
