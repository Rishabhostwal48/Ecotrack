"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedEcoIcon } from "@/components/animated-eco-icon"
import { ThemeToggle } from "@/components/theme-toggle"
import { FuturisticButton } from "@/components/futuristic-button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Home, LineChart, ShoppingBag, Trophy, User, Menu, X } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const routes = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Calculator",
    path: "/calculator",
    icon: LineChart,
  },
  {
    name: "Challenges",
    path: "/challenges",
    icon: Trophy,
  },
  {
    name: "Marketplace",
    path: "/marketplace",
    icon: ShoppingBag,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
]

interface FuturisticNavbarProps {
  showAuthButtons?: boolean
}

export function FuturisticNavbar({ showAuthButtons = true }: FuturisticNavbarProps) {
  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navbarRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Handle window resize to close menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={navbarRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-2" : "py-3 sm:py-4",
        isMenuOpen ? "h-screen bg-background/95 backdrop-blur-xl" : "h-auto",
      )}
    >
      <div className="container mx-auto px-4">
        {/* Top bar with logo and menu button */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-20">
            <div className="relative">
              <AnimatedEcoIcon />
              <div className="absolute -inset-2 rounded-full bg-green-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
            <motion.span
              className="text-lg sm:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              EcoTrack
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="relative mr-4">
              <div
                className={cn(
                  "absolute inset-0 rounded-full transition-all duration-300",
                  isScrolled ? "bg-background/70 backdrop-blur-md border border-white/10" : "bg-transparent",
                )}
              />
              <nav className="relative flex items-center rounded-full p-1 z-10">
                {routes.map((route) => {
                  const isActive = pathname === route.path
                  const isHovered = hoveredPath === route.path

                  return (
                    <Link
                      key={route.path}
                      href={route.path}
                      onMouseEnter={() => setHoveredPath(route.path)}
                      onMouseLeave={() => setHoveredPath(null)}
                      className={cn(
                        "relative px-2 lg:px-3 py-1.5 rounded-full transition-all duration-300 text-xs lg:text-sm font-medium",
                        isActive ? "text-white" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        <route.icon
                          className={cn(
                            "h-3.5 w-3.5 lg:h-4 lg:w-4 transition-all duration-300",
                            isActive && "text-white",
                            isHovered && !isActive && "text-green-500",
                          )}
                        />
                        <span className="hidden sm:inline">{route.name}</span>
                      </span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          layoutId="navbar-active-indicator"
                          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/80 to-emerald-500/80 rounded-full blur-sm" />
                        </motion.div>
                      )}

                      {/* Hover indicator */}
                      {!isActive && isHovered && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full"
                          layoutId="navbar-hover-indicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {showAuthButtons && (
                <>
                  <FuturisticButton variant="outline" size="sm" className="hidden lg:flex">
                    Login
                  </FuturisticButton>
                  <FuturisticButton size="sm">Sign Up</FuturisticButton>
                </>
              )}

              {!showAuthButtons && (
                <div className="hidden lg:flex items-center gap-2 text-xs sm:text-sm bg-background/70 backdrop-blur-md border border-white/10 px-2 sm:px-3 py-1.5 rounded-full">
                  <span className="text-muted-foreground">Welcome,</span>
                  <span className="font-medium">Alex</span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            {/* Menu Button (Mobile) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-20 w-9 h-9 flex items-center justify-center rounded-full bg-background/70 backdrop-blur-md border border-white/10 text-foreground"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute inset-x-0 top-16 p-4 z-10 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-1">
                {routes.map((route, index) => {
                  const isActive = pathname === route.path

                  return (
                    <motion.div
                      key={route.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={route.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden",
                          isActive
                            ? "text-white bg-gradient-to-r from-green-500 to-emerald-500 font-medium"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity" />
                        )}
                        <route.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground")} />
                        <span className="font-medium">{route.name}</span>

                        {/* Animated indicator for active item */}
                        {isActive && (
                          <motion.div
                            className="absolute right-4 w-2 h-2 rounded-full bg-white"
                            layoutId="mobile-nav-dot"
                            transition={{ type: "spring", duration: 0.5 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Mobile Auth Buttons */}
                {showAuthButtons && (
                  <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
                    <FuturisticButton variant="outline" className="w-full">
                      Login
                    </FuturisticButton>
                    <FuturisticButton className="w-full">Sign Up</FuturisticButton>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-pulse" />
      </div>
    </div>
  )
}
