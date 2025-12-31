'use client'

import { useState, useEffect } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let animationFrameId: number
    const animate = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.1,
        y: prev.y + (position.y - prev.y) * 0.1
      }))
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [position])

  return (
    <>
      <div 
        className="custom-cursor" 
        style={{ left: position.x, top: position.y }} 
      />
      <div 
        className="cursor-follower" 
        style={{ left: followerPosition.x, top: followerPosition.y }} 
      />
    </>
  )
}

export default CustomCursor
