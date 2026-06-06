"use client"

import { useEffect, useRef } from "react"

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient points
    const gradientPoints = [
      { x: canvas.width * 0.1, y: canvas.height * 0.1, radius: 300, color: "rgba(34, 197, 94, 0.05)" }, // Green
      { x: canvas.width * 0.8, y: canvas.height * 0.2, radius: 250, color: "rgba(20, 184, 166, 0.05)" }, // Teal
      { x: canvas.width * 0.5, y: canvas.height * 0.7, radius: 350, color: "rgba(16, 185, 129, 0.05)" }, // Emerald
    ]

    // Animation variables
    let animationFrameId: number
    let time = 0

    // Animation function
    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update gradient positions with subtle movement
      gradientPoints.forEach((point, index) => {
        point.x = canvas.width * (0.1 + 0.8 * Math.sin(time + index * 2) * 0.1 + index * 0.3)
        point.y = canvas.height * (0.1 + 0.8 * Math.cos(time + index) * 0.1 + index * 0.25)
      })

      // Draw gradients
      gradientPoints.forEach((point) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none" aria-hidden="true" />
}
