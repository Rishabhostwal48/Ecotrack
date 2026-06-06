"use client"

import { FuturisticNavbar } from "@/components/futuristic-navbar"
import { useEffect, useState } from "react"

interface FuturisticHeaderProps {
  showAuthButtons?: boolean
}

export function FuturisticHeader({ showAuthButtons = true }: FuturisticHeaderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="relative z-50 h-16 sm:h-20">
      <FuturisticNavbar showAuthButtons={showAuthButtons} />
    </header>
  )
}
