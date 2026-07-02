'use client'

import { useState, useEffect } from 'react'
import Navigation from './Navigation'

export default function HomeNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <Navigation isScrolled={isScrolled} />
}
