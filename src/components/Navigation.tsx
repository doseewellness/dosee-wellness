import Link from 'next/link'

interface NavigationProps {
  isScrolled: boolean
}

const Navigation = ({ isScrolled }: NavigationProps) => {
  const menuItems = [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Products', href: '#products' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
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
      <Link href="/" className="logo">Dosee Wellness</Link>
      <ul>
        {menuItems.map(item => (
          <li key={item.href}>
            <a href={item.href} onClick={(e) => handleClick(e, item.href)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
