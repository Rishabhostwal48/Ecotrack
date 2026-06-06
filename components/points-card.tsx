"use client"

import { FuturisticButton } from "@/components/futuristic-button"
import { FuturisticCard } from "@/components/futuristic-card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowUpRight, Award, Coins, TrendingUp } from "lucide-react"
import Link from "next/link"

interface PointsCardProps {
  totalPoints: number
  level: number
  pointsToNextLevel: number
  recentPoints: {
    amount: number
    source: string
    date: string
  }[]
  className?: string
}

export function PointsCard({ totalPoints, level, pointsToNextLevel, recentPoints, className }: PointsCardProps) {
  return (
    <FuturisticCard className={cn("p-6", className)} glowColor="green">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-green-500" />
            <h3 className="font-bold text-lg">EcoPoints</h3>
          </div>
          <FuturisticButton variant="outline" size="sm" asChild>
            <Link href="/marketplace" className="flex items-center gap-1">
              <span>Redeem</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </FuturisticButton>
        </div>

        <div className="flex items-center justify-between bg-background/30 rounded-lg p-4">
          <div>
            <div className="text-sm text-muted-foreground">Total Points</div>
            <div className="text-3xl font-bold text-green-500">{totalPoints.toLocaleString()}</div>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
            <Award className="h-6 w-6 text-green-500" />
          </div>
        </div>

        <div className="bg-background/30 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <div className="text-sm">Level {level}</div>
            <div className="text-sm text-muted-foreground">
              {pointsToNextLevel} points to Level {level + 1}
            </div>
          </div>
          <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              style={{ width: `${100 - (pointsToNextLevel / 1000) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Recent Activity</h4>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="space-y-3">
            {recentPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <Coins className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{item.source}</div>
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                  </div>
                </div>
                <div className="font-medium text-green-500">+{item.amount}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FuturisticCard>
  )
}
