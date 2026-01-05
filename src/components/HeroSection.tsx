'use client'

import { useState, useEffect } from 'react'

const HeroSection = () => {
  const [chars, setChars] = useState<string[]>([])
  const text = 'DoSee Wellness'

  useEffect(() => {
    setTimeout(() => {
      setChars(text.split(''))
    }, 500)
  }, [])

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content">

        {/* タイトル（本体＋反射） */}
        <div className="hero-title-wrap" aria-label={text}>
          {/* 本体 */}
          <h1 className="hero-title">
            {chars.map((char, i) => (
              <span
                key={`main-${i}`}
                className="split-char"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* 反射（同じ文字列をもう一回） */}
          <h1 className="hero-title hero-title-reflect" aria-hidden="true">
            {chars.map((char, i) => (
              <span
                key={`ref-${i}`}
                className="split-char"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* ※ここ、元コードは <p className="highlight"></p> Balance... になってて崩れるので整形 */}
        <p className="highlight">Balance, Redefined</p>
        <p className="subtitle">整う余白を、日常に。</p>

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