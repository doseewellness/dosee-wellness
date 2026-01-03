'use client'

import { useState, useEffect } from 'react'

const HeroSection = () => {
  const [chars, setChars] = useState<string[]>([])

  useEffect(() => {
    const text = 'DoSee Wellness'
    setTimeout(() => {
      setChars(text.split(''))
    }, 500)
  }, [])

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <h1>
          {chars.map((char, i) => (
            <span
              key={i}
              className="split-char"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {char}
            </span>
          ))}
        </h1>
         
        <p className="highlight"></p> Balance, Redfined<br />
        整う余白を、日常に。
       
        <p className="subtitle2">
          DoSee Wellness は、忙しい毎日の中で<br />
          「こころ・からだ・肌」、自然に整っていく時間を<br />
          やさしく支えるウェルネスブランドです。
        </p>
        
        <div className="hero-badges">
          <span className="badge badge-mind">
            <span className="badge-dot"></span>
            Mind — 静かな集中と落ち着き
          </span>
          <span className="badge badge-body">
            <span className="badge-dot"></span>
            Body — 日々のコンディションケア
          </span>
          <span className="badge badge-skin">
            <span className="badge-dot"></span>
            Skin — 内側から満ちる透明感
          </span>
        </div>
      </div>
      <div className="scroll-indicator">SCROLL</div>
    </section>
  )
}

export default HeroSection
