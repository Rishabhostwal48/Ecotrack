"use client"

import { MagicalNavbar } from "@/components/magical-navbar"
import { MagicalMobileNav } from "@/components/magical-mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { FuturisticButton } from "@/components/futuristic-button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface MagicalHeaderProps {
  showAuthButtons?: boolean
}

export function MagicalHeader({ showAuthButtons = true }: MagicalHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-all duration-300 ${
        scrolled ? "bg-background/70 border-white/10" : "bg-background/30 border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <MagicalMobileNav />
          <MagicalNavbar />
        </div>
        <div className="flex items-center gap-3">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
            <ThemeToggle />
          </motion.div>

          {showAuthButtons && (
            <>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden md:block"
              >
                <FuturisticButton variant="outline" size="sm">
                  Login
                </FuturisticButton>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <FuturisticButton>Sign Up</FuturisticButton>
              </motion.div>
            </>
          )}

          {!showAuthButtons && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex items-center gap-2 text-sm"
            >
              <span className="text-muted-foreground">Welcome back,</span>
              <span className="font-medium">Alex</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Animated glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
    </motion.header>
  )
}
