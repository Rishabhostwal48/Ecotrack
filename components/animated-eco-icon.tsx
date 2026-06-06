"use client"

import { useEffect, useRef } from "react"

export function AnimatedEcoIcon() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 60
    canvas.height = 60

    // Animation variables
    let animationFrameId: number
    let time = 0

    // Animation function
    const animate = () => {
      time += 0.03
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw leaf shape
      ctx.fillStyle = "#22c55e" // Green-500
      ctx.beginPath()

      // Center of canvas
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw leaf
      ctx.save()
      ctx.translate(centerX, centerY)

      // Add subtle rotation
      ctx.rotate(Math.sin(time * 0.5) * 0.05)

      // Leaf shape
      ctx.beginPath()
      ctx.moveTo(0, -20)

      // Right curve
      ctx.bezierCurveTo(15, -15 + Math.sin(time) * 2, 20, 0 + Math.sin(time + 1) * 2, 0, 20)

      // Left curve
      ctx.bezierCurveTo(-20, 0 + Math.sin(time + 2) * 2, -15, -15 + Math.sin(time + 3) * 2, 0, -20)

      ctx.fill()

      // Draw vein
      ctx.strokeStyle = "#dcfce7" // Green-100
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(0, -18)
      ctx.lineTo(0, 18)
      ctx.stroke()

      // Draw side veins
      ctx.lineWidth = 0.8
      for (let i = -3; i <= 3; i++) {
        if (i === 0) continue
        const y = i * 5
        const length = 10 * Math.cos((Math.abs(y) / 20) * Math.PI)

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(i > 0 ? length : -length, y + i)
        ctx.stroke()
      }

      ctx.restore()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} width={60} height={60} className="w-10 h-10" aria-hidden="true" />
}
