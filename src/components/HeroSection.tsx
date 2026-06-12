'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { multiline } from './MultiLine'

const HeroSection = () => {
  const [chars, setChars] = useState<string[]>([])
  const text = 'DoSee Wellness'
  const t = useTranslations('home.hero')

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
        <p className="highlight">{t('highlight')}</p>
        <p className="subtitle">{t('subtitle')}</p>

        <p className="subtitle2">
          {multiline(t('subtitle2'))}
        </p>

        <div className="hero-badges">
          <span className="badge badge-mind">
            <span className="badge-dot"></span>
            {t('badgeMind')}
          </span>
          <span className="badge badge-body">
            <span className="badge-dot"></span>
            {t('badgeBody')}
          </span>
          <span className="badge badge-skin">
            <span className="badge-dot"></span>
            {t('badgeSkin')}
          </span>
        </div>
      </div>

      <div className="scroll-indicator">{t('scroll')}</div>
    </section>
  )
}

export default HeroSection