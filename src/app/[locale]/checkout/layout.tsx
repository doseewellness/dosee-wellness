'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import '../../../styles/pages.css'

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-container">
      <Navigation isScrolled={true} />
      <div style={{ paddingTop: '80px' }}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
