"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedEcoIcon } from "@/components/animated-eco-icon"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { BarChart3, Home, LineChart, Menu, ShoppingBag, Trophy, User } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

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

export function MagicalMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Initial check
      checkIfMobile()

      // Add event listener
      window.addEventListener("resize", checkIfMobile)

      // Cleanup
      return () => window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Don't render anything on desktop
  if (!isMobile) {
    return null
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Menu className="h-5 w-5 relative z-10" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0 w-[280px]">
        <div className="flex items-center gap-2 p-4 border-b border-white/10">
          <AnimatedEcoIcon />
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
            EcoTrack
          </span>
        </div>
        <nav className="flex flex-col p-2 flex-1 overflow-y-auto">
          <AnimatePresence>
            {routes.map((route, index) => {
              const isActive = pathname === route.path

              return (
                <motion.div
                  key={route.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={route.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 my-1 rounded-lg transition-all relative overflow-hidden group",
                      isActive
                        ? "text-white bg-gradient-to-r from-green-500 to-emerald-500 font-medium"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    <route.icon
                      className={cn(
                        "h-5 w-5 transition-transform group-hover:scale-110",
                        isActive ? "text-white" : "text-muted-foreground group-hover:text-green-500",
                      )}
                    />
                    <span className="relative z-10">{route.name}</span>
                    {isActive && (
                      <motion.div
                        className="absolute right-3 w-2 h-2 rounded-full bg-white"
                        layoutId="mobile-nav-indicator"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </nav>
        <div className="p-4 border-t border-white/10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EcoTrack
        </div>
      </SheetContent>
    </Sheet>
  )
}
