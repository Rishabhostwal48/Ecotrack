import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface FuturisticCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function FuturisticCard({ children, className, glowColor = "green" }: FuturisticCardProps) {
  const glowClasses = {
    green: "before:bg-green-500/10 after:bg-green-500/10",
    teal: "before:bg-teal-500/10 after:bg-teal-500/10",
    emerald: "before:bg-emerald-500/10 after:bg-emerald-500/10",
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl backdrop-blur-md bg-background/30 border border-white/10 dark:border-white/5",
        "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:blur-xl before:opacity-50 before:transform before:scale-95",
        "after:absolute after:inset-0 after:-z-10 after:rounded-2xl after:blur-md after:opacity-50 after:transform after:scale-105",
        "transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 hover:border-green-500/20",
        glowClasses[glowColor as keyof typeof glowClasses] || glowClasses.green,
        className,
      )}
    >
      {children}
    </div>
  )
}
