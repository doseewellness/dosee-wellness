'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { SHOP_URLS } from '../lib/constants/shop'

interface NavigationProps {
  isScrolled?: boolean
}

type MenuItem =
  | { label: string; href: string; type: 'anchor' }
  | { label: string; href: string; type: 'route' }

export default function Navigation({ isScrolled = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const INSTAGRAM_URL =
    'https://www.instagram.com/wellcha_matcha?igsh=ZDBqcGx5ZjZncXZ6'
  const EN_URL = '/en'

  const menuItems: MenuItem[] = [
    { label: 'Philosophy', href: '#philosophy', type: 'anchor' },
    { label: 'Products', href: '#products', type: 'anchor' },
    { label: 'About', href: '#about', type: 'anchor' },
    { label: 'Contact', href: '/contact', type: 'route' },
  ]

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((v) => !v)

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

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <button
          className="hamburger-button hamburger-left"
          onClick={toggleMenu}
          aria-label="メニュー"
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
            <a
              href={SHOP_URLS.base}
              target="_blank"
              rel="noopener noreferrer"
              className="shop-link"
              onClick={closeMenu}
            >
              Shop
            </a>
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
            <button className="menu-close" onClick={closeMenu} aria-label="Close menu">
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
              <a
                href={SHOP_URLS.base}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Shop
              </a>
            </li>
          </ul>

          <div className="menu-footer">
            <a
              className="menu-footer-link"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a className="menu-footer-link" href={EN_URL}>
              EN
            </a>
          </div>
        </div>
      </div>
    </>
  )
}