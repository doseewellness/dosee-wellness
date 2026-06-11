import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Dosee Wellness</h3>
          <p>こころ・からだ・肌を整える、<br />日々の一杯を。</p>
        </div>
        
        <div className="footer-section">
          <h3>Products</h3>
          <Link href="/wellcha">WellCha</Link>
          <Link href="/dosee">DoSee</Link>
        </div>
        
        <div className="footer-section">
          <h3>Company</h3>
          <Link href="/about">会社概要</Link>
          <Link href="/blog">読みもの</Link>
          <a href="mailto:doseewellness@gmail.com">お問い合わせ</a>
        </div>
        
        <div className="footer-section">
          <h3>Follow</h3>
          <a href="https://www.instagram.com/wellchamatcha" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          &copy; 2025 Dosee Wellness. All rights reserved. | {' '}
          <Link href="/privacy" style={{color: 'inherit', textDecoration: 'underline'}}>Privacy Policy</Link> | {' '}
          <Link href="/terms" style={{color: 'inherit', textDecoration: 'underline'}}>Terms of Service</Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
