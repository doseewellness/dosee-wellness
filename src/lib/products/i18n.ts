import type { Locale } from '@/i18n/routing'
import productsData from '@/data/products.json'
import { productTranslationsEn } from './translations/en'
import { productTranslationsZh } from './translations/zh'
import { productTranslationsFr } from './translations/fr'
import { productTranslationsEs } from './translations/es'

export interface ProductBenefit {
  title: string
  description: string
}

export interface ProductCopy {
  description?: string
  longDescription?: string
  benefits?: ProductBenefit[]
  howToUse?: string[]
  ingredients?: string[]
}

export type ProductTranslations = Record<string, ProductCopy>

const registry: Partial<Record<Locale, ProductTranslations>> = {
  en: productTranslationsEn,
  zh: productTranslationsZh,
  fr: productTranslationsFr,
  es: productTranslationsEs,
}

function baseCopy(id: string): ProductCopy {
  const p = productsData.find((x) => x.id === id) as
    | (ProductCopy & { id: string })
    | undefined
  if (!p) return {}
  return {
    description: p.description,
    longDescription: p.longDescription,
    benefits: p.benefits,
    howToUse: p.howToUse,
    ingredients: p.ingredients,
  }
}

/** Localized product marketing copy with per-field fallback to Japanese source. */
export function localizeProductCopy(id: string, locale: Locale): ProductCopy {
  const base = baseCopy(id)
  if (locale === 'ja') return base
  const t = registry[locale]?.[id]
  if (!t) return base
  return {
    description: t.description ?? base.description,
    longDescription: t.longDescription ?? base.longDescription,
    benefits: t.benefits ?? base.benefits,
    howToUse: t.howToUse ?? base.howToUse,
    ingredients: t.ingredients ?? base.ingredients,
  }
}
