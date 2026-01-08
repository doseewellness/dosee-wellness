'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image";
import { SHOP_URLS } from '../lib/constants/shop'

interface NavigationProps {
  isScrolled?: boolean
}

type MenuItem =
  | { label: string; href: string; type: 'anchor' }
  | { label: string; href: string; type: 'route' }

export default function Navigation({ isScrolled = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems: MenuItem[] = [
    { label: 'Philosophy', href: '#philosophy', type: 'anchor' },
    { label: 'Products', href: '#products', type: 'anchor' },
    { label: 'About', href: '#about', type: 'anchor' },
    { label: 'Contact', href: '/contact', type: 'route' }, // ← ここが重要
  ]

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="logo" onClick={closeMenu} aria-label="DoSee Wellness">
          <Image
            src="/images/logo/logo-dosee-wellness.png"
            alt="DoSee Wellness"
            width={180}
            height={60}
            priority
          />
        </Link>

        {/* デスクトップメニュー */}
        <ul className="desktop-menu">
          {menuItems.map((item) => (
            <li key={item.href}>
              {item.type === 'anchor' ? (
                <a
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                >
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

        {/* ハンバーガーボタン */}
        <button
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
        </button>

        {/* モバイルメニュー */}
        <div className={`mobile-dropdown ${isMenuOpen ? 'open' : ''}`}>
          {/* 葉っぱ装飾（背面） */}
          <div className="mobile-menu-ornament" aria-hidden="true">
            <img src="/images/ornaments/dosee-nav-ornament-leaf.svg" alt="" />
          </div>

          <ul>
            {menuItems.map((item) => (
              <li key={item.href}>
                {item.type === 'anchor' ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                  >
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
        </div>
      </nav>

      {/* 背景オーバーレイ */}
      {isMenuOpen && (
        <div className="menu-backdrop" onClick={closeMenu} />
      )}
    </>
  )
}