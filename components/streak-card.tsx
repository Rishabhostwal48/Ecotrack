"use client"

import { FuturisticCard } from "@/components/futuristic-card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Calendar, CheckCircle, Circle, Trophy } from "lucide-react"

interface StreakCardProps {
  currentStreak: number
  longestStreak: number
  weeklyProgress: number
  className?: string
}

export function StreakCard({ currentStreak, longestStreak, weeklyProgress, className }: StreakCardProps) {
  // Generate the days of the week
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"]

  // Calculate which days are completed based on progress
  const completedDays = Math.floor(weeklyProgress / (100 / 7))

  return (
    <FuturisticCard className={cn("p-6", className)} glowColor="emerald">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-emerald-500" />
            <h3 className="font-bold text-lg">Weekly Streak</h3>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>This Week</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mt-2">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">{day}</span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  index < completedDays
                    ? "bg-emerald-500/20 text-emerald-500"
                    : "bg-background/50 text-muted-foreground",
                )}
              >
                {index < completedDays ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Weekly Progress</span>
            <span className="text-emerald-500 font-medium">{weeklyProgress}%</span>
          </div>
          <Progress value={weeklyProgress} className="h-2" indicatorClassName="bg-emerald-500" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-background/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-emerald-500">{currentStreak}</div>
            <div className="text-xs text-muted-foreground">Current Streak</div>
          </div>
          <div className="bg-background/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{longestStreak}</div>
            <div className="text-xs text-muted-foreground">Longest Streak</div>
          </div>
        </div>
      </div>
    </FuturisticCard>
  )
}
