"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedEcoIcon } from "@/components/animated-eco-icon"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { BarChart3, Home, LineChart, ShoppingBag, Trophy, User } from "lucide-react"
import { useEffect, useState } from "react"

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

export function MagicalNavbar() {
  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative flex items-center gap-4 md:gap-6">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative">
          <AnimatedEcoIcon />
          <motion.div
            className="absolute -inset-2 rounded-full bg-green-500/10 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <motion.span
          className="text-lg md:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          EcoTrack
        </motion.span>
      </Link>
      <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-background/30 backdrop-blur-sm rounded-full p-1 border border-white/10">
        {routes.map((route) => {
          const isActive = pathname === route.path
          const isHovered = hoveredPath === route.path

          return (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "relative px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5",
                isActive ? "text-white" : "text-muted-foreground hover:text-foreground",
              )}
              onMouseEnter={() => setHoveredPath(route.path)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  layoutId="navbar-active-pill"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                />
              )}
              {!isActive && isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full"
                  layoutId="navbar-hover-pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <route.icon
                className={cn(
                  "h-4 w-4 relative z-10 transition-transform",
                  isActive && "text-white",
                  isHovered && !isActive && "text-green-500 scale-110",
                )}
              />
              <span className="relative z-10">{route.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
