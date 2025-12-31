'use client'

import { useEffect, useRef } from 'react'

const ParticlesCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150) {
          const angle = Math.atan2(dy, dx)
          this.vx -= Math.cos(angle) * 0.05
          this.vy -= Math.sin(angle) * 0.05
        }

        this.vx *= 0.99
        this.vy *= 0.99

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.fill()
      }
    }

    for (let i = 0; i < 80; i++) {
      particlesRef.current.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach((p, i) => {
        p.update()
        p.draw()

        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / 120)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }
    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" />
}

export default ParticlesCanvas
