"use client"

import { useEffect, useRef } from "react"

interface ParticleEffectProps {
  x: number
  y: number
  type: "points" | "success" | "warning"
  value?: number | string
}

export default function ParticleEffect({ x, y, type, value }: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
      color: string
    }> = []

    // Create particles
    const particleCount = 12
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const velocity = 3 + Math.random() * 2
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        size: 2 + Math.random() * 2,
        color:
          type === "points"
            ? `rgba(96, 165, 250, ${Math.random() * 0.5 + 0.5})`
            : type === "success"
              ? `rgba(34, 197, 94, ${Math.random() * 0.5 + 0.5})`
              : `rgba(249, 115, 22, ${Math.random() * 0.5 + 0.5})`,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.life -= 0.02
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // gravity

        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      if (particles.some((p) => p.life > 0)) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [x, y, type])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" style={{ mixBlendMode: "screen" }} />
  )
}

export function triggerParticleEffect(x: number, y: number, type: "points" | "success" | "warning") {
  const canvas = document.createElement("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.cssText = "position: fixed; top: 0; left: 0; pointer-events: none; z-index: 50; mix-blend-mode: screen;"
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    life: number
    size: number
    color: string
  }> = []

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2
    const velocity = 3 + Math.random() * 2
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      life: 1,
      size: 2 + Math.random() * 2,
      color:
        type === "points"
          ? `rgba(96, 165, 250, ${Math.random() * 0.5 + 0.5})`
          : type === "success"
            ? `rgba(34, 197, 94, ${Math.random() * 0.5 + 0.5})`
            : `rgba(249, 115, 22, ${Math.random() * 0.5 + 0.5})`,
    })
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((p) => {
      p.life -= 0.02
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.1

      ctx.globalAlpha = p.life
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })

    if (particles.some((p) => p.life > 0)) {
      requestAnimationFrame(animate)
    } else {
      document.body.removeChild(canvas)
    }
  }

  animate()
}
