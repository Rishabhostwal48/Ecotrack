"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedEcoIcon } from "@/components/animated-eco-icon"
import { cn } from "@/lib/utils"
import { BarChart3, Home, LineChart, ShoppingBag, Trophy, User } from "lucide-react"

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

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <Link href="/" className="flex items-center gap-2">
        <AnimatedEcoIcon />
        <span className="text-lg md:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
          EcoTrack
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-4 lg:gap-6">
        {routes.map((route) => {
          const isActive = pathname === route.path

          return (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors gap-1",
                isActive ? "text-green-500" : "text-muted-foreground hover:text-foreground hover:text-green-500",
              )}
            >
              <route.icon className={cn("h-4 w-4", isActive && "text-green-500")} />
              {route.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
