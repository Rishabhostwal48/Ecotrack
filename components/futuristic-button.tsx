import type React from "react"
import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface FuturisticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
  className?: string
}

export const FuturisticButton = forwardRef<HTMLButtonElement, FuturisticButtonProps>(
  ({ variant = "primary", size = "default", children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative group overflow-hidden rounded-lg font-medium transition-all duration-300 flex items-center justify-center",
          "before:absolute before:inset-0 before:rounded-lg before:transition-all before:duration-500",
          "after:absolute after:inset-0 after:rounded-lg after:transition-all after:duration-500",
          {
            // Primary variant
            "text-white before:bg-gradient-to-r before:from-green-500 before:to-emerald-600 hover:before:brightness-110":
              variant === "primary",
            "after:bg-gradient-to-r after:from-green-500/0 after:via-white/20 after:to-green-500/0 after:w-[200%] after:left-[-50%] hover:after:left-[50%]":
              variant === "primary",

            // Secondary variant
            "text-green-500 dark:text-green-400 before:bg-green-500/10 hover:before:bg-green-500/20":
              variant === "secondary",

            // Outline variant
            "text-green-500 dark:text-green-400 border border-green-500/30 hover:border-green-500/50 before:opacity-0 hover:before:opacity-100 before:bg-green-500/10":
              variant === "outline",

            // Sizes
            "h-10 px-4 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base": size === "lg",
          },
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)

FuturisticButton.displayName = "FuturisticButton"
