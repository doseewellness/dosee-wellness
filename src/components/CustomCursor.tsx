'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  // 生のマウス位置
  const mouseRef = useRef({ x: 0, y: 0 })
  // フォロワーが追従していく位置（補間）
  const followerPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      // カーソル本体は即追従
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    let rafId = 0
    const animate = () => {
      const target = mouseRef.current
      const pos = followerPosRef.current

      // 追従スムージング
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      }

      rafId = window.requestAnimationFrame(animate)
    }

    rafId = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}