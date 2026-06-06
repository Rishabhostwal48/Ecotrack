"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedEcoIcon } from "@/components/animated-eco-icon"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { BarChart3, Home, LineChart, Menu, ShoppingBag, Trophy, User } from "lucide-react"
import { useState, useEffect } from "react"

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

export function MobileNav() {
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
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <AnimatedEcoIcon />
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
            EcoTrack
          </span>
        </div>
        <nav className="flex flex-col gap-4">
          {routes.map((route) => {
            const isActive = pathname === route.path

            return (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center py-2 text-base font-medium transition-colors gap-3",
                  isActive ? "text-green-500" : "text-muted-foreground hover:text-foreground hover:text-green-500",
                )}
              >
                <route.icon className={cn("h-5 w-5", isActive && "text-green-500")} />
                {route.name}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
