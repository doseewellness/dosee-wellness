'use client'

import { useRef, ReactNode } from 'react'

interface InteractiveSectionProps {
  id: string
  children: ReactNode
  className?: string
}

const InteractiveSection = ({ id, children, className = '' }: InteractiveSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bgRef.current || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    bgRef.current.style.setProperty('--mouse-x', `${x}%`)
    bgRef.current.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={bgRef} className="interactive-bg" />
      <div className="section-content">
        {children}
      </div>
    </section>
  )
}

export default InteractiveSection
