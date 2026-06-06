"use client"

import { FuturisticButton } from "@/components/futuristic-button"
import { FuturisticCard } from "@/components/futuristic-card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Coins, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  description: string
  points: number
  image?: string
  category: string
  isNew?: boolean
  onAddToCart: (id: string) => void
  className?: string
}

export function ProductCard({
  id,
  name,
  description,
  points,
  image,
  category,
  isNew,
  onAddToCart,
  className,
}: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <FuturisticCard className={cn("overflow-hidden", className)}>
        <div className="relative h-48 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
          {image ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
          ) : (
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=192&width=400')] bg-cover bg-center" />
          )}

          {isNew && (
            <div className="absolute top-3 left-3 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-medium">
              New
            </div>
          )}

          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium">
            {category}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-green-500 font-medium">
              <Coins className="h-4 w-4" />
              <span>{points.toLocaleString()} points</span>
            </div>
            <FuturisticButton size="sm" onClick={() => onAddToCart(id)} className="gap-1">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </FuturisticButton>
          </div>
        </div>
      </FuturisticCard>
    </motion.div>
  )
}
