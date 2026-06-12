import type { Metadata } from 'next'
import { siteConfig } from '@/lib/constants/metadata'
import { locales, type Locale } from '@/i18n/routing'

const DEFAULT_LOCALE: Locale = 'ja'

function localizedUrl(locale: Locale, path: string): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  return `${siteConfig.url}${prefix}${path}`
}

/**
 * Build canonical + hreflang alternates for a given path and locale.
 * `path` is the route without locale prefix (e.g. '' for home, '/wellcha').
 */
export function buildAlternates(
  locale: Locale,
  path = '',
): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[l] = localizedUrl(l, path)
  }
  languages['x-default'] = localizedUrl(DEFAULT_LOCALE, path)

  return {
    canonical: localizedUrl(locale, path),
    languages,
  }
}
