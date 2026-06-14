'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ProductImageSliderProps {
  images: string[]
  alt: string
  interval?: number
  delay?: number
  sizes?: string
  priority?: boolean
}

export default function ProductImageSlider({
  images,
  alt,
  interval = 4500,
  delay = 0,
  sizes = '(max-width: 860px) 100vw, 50vw',
  priority = false,
}: ProductImageSliderProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let timer: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      timer = setInterval(() => {
        setActive((i) => (i + 1) % images.length)
      }, interval)
    }, delay)

    return () => {
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [images.length, interval, delay])

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority && i === 0}
          className={`ed-pcard-slide${i === active ? ' is-active' : ''}`}
        />
      ))}
    </>
  )
}
