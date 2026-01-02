import Link from 'next/link'
import { SHOP_URLS } from '../lib/constants/shop'

interface NavigationProps {
  isScrolled?: boolean
}

export default function Navigation({ isScrolled = false }: NavigationProps) {
  const menuItems = [
    { label: 'Philosophy', href: '#philosophy', internal: true },
    { label: 'Products', href: '#products', internal: true },
    { label: 'About', href: '#about', internal: true },
    { label: 'Contact', href: '#contact', internal: true },
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="logo">
        Dosee Wellness
      </Link>
      
      <ul>
        {menuItems.map(item => (
          <li key={item.href}>
            <a 
              href={item.href} 
              onClick={(e) => handleClick(e, item.href)}
            >
              {item.label}
            </a>
          </li>
        ))}
        
        {/* Shop Link - External */}
        <li>
          <a 
            href={SHOP_URLS.base}
            target="_blank"
            rel="noopener noreferrer"
            className="shop-link"
          >
            Shop
          </a>
        </li>
      </ul>
    </nav>
  )
}