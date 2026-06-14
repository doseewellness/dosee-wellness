'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { routing, localeNames, type Locale } from '@/i18n/routing'

const localeShort: Record<Locale, string> = {
  ja: 'JA',
  en: 'EN',
  zh: '中文',
  fr: 'FR',
  es: 'ES',
}

interface NavigationProps {
  isScrolled?: boolean
}

type MenuItem =
  | { label: string; href: string; type: 'anchor' }
  | { label: string; href: string; type: 'route' }

export default function Navigation({ isScrolled = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLLIElement>(null)
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale() as Locale

  const INSTAGRAM_URL = 'https://www.instagram.com/wellchamatcha'

  const menuItems: MenuItem[] = [
    { label: t('philosophy'), href: '#story', type: 'anchor' },
    { label: t('products'), href: '#product', type: 'anchor' },
    { label: t('note'), href: '/blog', type: 'route' },
    { label: t('about'), href: '/about', type: 'route' },
    { label: t('contact'), href: '/contact', type: 'route' },
  ]

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((v) => !v)

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next })
    closeMenu()
    setIsLangOpen(false)
  }

  /**
   * アンカー挙動：
   * - Home("/") にいるなら、その場で scrollIntoView
   * - それ以外のページなら "/#xxx" に遷移（Home側が確実にスクロール処理）
   */
  const handleAnchorClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()

    const isHome = pathname === '/'
    if (isHome) {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      closeMenu()
      return
    }

    // 他ページ → Homeにハッシュ付きで遷移
    closeMenu()
    router.push(`/${href}`)
  }

  // メニューOPEN中はスクロールを止める（iPhone対策）
  useEffect(() => {
    if (!isMenuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isMenuOpen])

  // 言語ドロップダウン：外側クリック / Escで閉じる
  useEffect(() => {
    if (!isLangOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLangOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isLangOpen])

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <button
          className="hamburger-button hamburger-left"
          onClick={toggleMenu}
          aria-label={t('menuLabel')}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu-overlay"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
        </button>

        <Link
          href="/"
          className="logo logo-center"
          onClick={closeMenu}
          aria-label="DoSee Wellness"
        >
          <Image
            src="/images/logo/logo-dosee-wellness.png"
            alt="DoSee Wellness"
            width={180}
            height={60}
            priority
          />
        </Link>

        <div className="nav-right-spacer" aria-hidden="true" />

        <ul className="desktop-menu">
          {menuItems.map((item) => (
            <li key={item.href}>
              {item.type === 'anchor' ? (
                <a href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}>
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          <li>
            <Link href="/shop" className="shop-link" onClick={closeMenu}>
              {t('shop')}
            </Link>
          </li>

          <li className="lang-dropdown" ref={langRef}>
            <button
              type="button"
              className="lang-trigger"
              onClick={() => setIsLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              aria-label={localeNames[locale]}
            >
              <span className="lang-globe" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
                </svg>
              </span>
              <span className="lang-code">{localeShort[locale]}</span>
              <span className={`lang-caret ${isLangOpen ? 'open' : ''}`} aria-hidden="true" />
            </button>

            <ul className={`lang-menu ${isLangOpen ? 'open' : ''}`} role="listbox">
              {routing.locales.map((loc) => (
                <li key={loc} role="option" aria-selected={loc === locale}>
                  <button
                    type="button"
                    className={`lang-menu-option ${loc === locale ? 'active' : ''}`}
                    onClick={() => switchLocale(loc)}
                  >
                    {localeNames[loc]}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>

      {/* ===== モバイル：フルスクリーンメニュー ===== */}
      <div
        id="mobile-menu-overlay"
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="menu-overlay-backdrop" onClick={closeMenu} />

        <div className="menu-panel" role="dialog" aria-modal="true">
          <div className="menu-header">
            <button className="menu-close" onClick={closeMenu} aria-label={t('closeLabel')}>
              ×
            </button>

            <Link href="/" className="menu-logo" onClick={closeMenu} aria-label="DoSee Wellness">
              <Image
                src="/images/logo/logo-dosee-wellness.png"
                alt="DoSee Wellness"
                width={140}
                height={48}
                priority
              />
            </Link>

            <div className="menu-header-spacer" aria-hidden="true" />
          </div>

          <ul className="menu-links">
            {menuItems.map((item) => (
              <li key={item.href}>
                {item.type === 'anchor' ? (
                  <a href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}

            <li>
              <Link href="/shop" onClick={closeMenu}>
                {t('shop')}
              </Link>
            </li>
          </ul>

          <div className="menu-footer">
            <a
              className="menu-footer-link"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('instagram')}
            </a>

            <div className="menu-lang-switch">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className={`menu-lang-option ${loc === locale ? 'active' : ''}`}
                  onClick={() => switchLocale(loc)}
                  aria-current={loc === locale}
                >
                  {localeNames[loc]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
