"use client"

import { FuturisticCard } from "@/components/futuristic-card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Leaf, TreePine, Droplets, Wind } from "lucide-react"

interface EcoImpactCardProps {
  treesSaved: number
  waterSaved: number
  co2Reduced: number
  className?: string
}

export function EcoImpactCard({ treesSaved, waterSaved, co2Reduced, className }: EcoImpactCardProps) {
  return (
    <FuturisticCard className={cn("p-6", className)} glowColor="teal">
      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Leaf className="h-5 w-5 text-teal-500" />
          Your Eco Impact
        </h3>

        <div className="grid grid-cols-3 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-background/30 rounded-lg p-3 text-center">
            <div className="mx-auto w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mb-2">
              <TreePine className="h-5 w-5 text-teal-500" />
            </div>
            <div className="text-xl font-bold text-teal-500">{treesSaved}</div>
            <div className="text-xs text-muted-foreground">Trees Saved</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-background/30 rounded-lg p-3 text-center">
            <div className="mx-auto w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
              <Droplets className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-xl font-bold text-blue-500">{waterSaved}L</div>
            <div className="text-xs text-muted-foreground">Water Saved</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-background/30 rounded-lg p-3 text-center">
            <div className="mx-auto w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
              <Wind className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-xl font-bold text-green-500">{co2Reduced}kg</div>
            <div className="text-xs text-muted-foreground">CO₂ Reduced</div>
          </motion.div>
        </div>

        <div className="bg-background/30 rounded-lg p-4 text-center">
          <p className="text-sm">
            Your eco-friendly actions have made a real difference! Keep up the good work to increase your positive
            impact.
          </p>
        </div>
      </div>
    </FuturisticCard>
  )
}
