'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SHOP_URLS } from '../lib/constants/shop'

interface NavigationProps {
  isScrolled?: boolean
}

type MenuItem =
  | { label: string; href: string; type: 'anchor' }
  | { label: string; href: string; type: 'route' }

export default function Navigation({ isScrolled = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // ★ Instagram（必要なら後で差し替え）
  const INSTAGRAM_URL = 'https://www.instagram.com/wellcha_matcha?igsh=ZDBqcGx5ZjZncXZ6' // ここをDoSeeのIGに変更

  // ★ 英語サイト（後で /en に作る想定。運用が決まったら差し替え）
  const EN_URL = '/en'

  const menuItems: MenuItem[] = [
    { label: 'Philosophy', href: '#philosophy', type: 'anchor' },
    { label: 'Products', href: '#products', type: 'anchor' },
    { label: 'About', href: '#about', type: 'anchor' },
    { label: 'Contact', href: '/contact', type: 'route' },
  ]

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((v) => !v)

  // ★ メニューOPEN中はスクロールを止める（iPhoneで超重要）
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
        {/* モバイル用：左にハンバーガー */}
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

        {/* ロゴ（中央に来る） */}
        <Link href="/" className="logo logo-center" onClick={closeMenu} aria-label="DoSee Wellness">
          <Image
            src="/images/logo/logo-dosee-wellness.png"
            alt="DoSee Wellness"
            width={180}
            height={60}
            priority
          />
        </Link>

        {/* 右側の空白（中央寄せ用ダミー） */}
        <div className="nav-right-spacer" aria-hidden="true" />

        {/* デスクトップメニュー（現状維持） */}
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

      {/* ===== モバイル：フルスクリーンメニュー（白背景） ===== */}
      <div
        id="mobile-menu-overlay"
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        {/* 背景クリックで閉じる（Shopify風の挙動） */}
        <div className="menu-overlay-backdrop" onClick={closeMenu} />

        <div className="menu-panel" role="dialog" aria-modal="true">
          {/* 上：ロゴ（小さめ）＋ × */}
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

            {/* 右側のスペース合わせ（Shopifyの検索/カートっぽい余白） */}
            <div className="menu-header-spacer" aria-hidden="true" />
          </div>

          {/* 中：メニュー */}
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

          {/* 下：Instagram / Language(EN) */}
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