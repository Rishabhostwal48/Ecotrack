"use client"

import { FuturisticButton } from "@/components/futuristic-button"
import { FuturisticCard } from "@/components/futuristic-card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Clock, Coins } from "lucide-react"

interface ChallengeCardProps {
  title: string
  description: string
  points: number
  difficulty: "easy" | "medium" | "hard"
  timeLeft: string
  progress: number
  image?: string
  className?: string
  onContinue?: () => void
  continueText?: string
  isCompleted?: boolean
}

export function ChallengeCard({
  title,
  description,
  points,
  difficulty,
  timeLeft,
  progress,
  image,
  className,
  onContinue,
  continueText = "Continue",
  isCompleted = false,
}: ChallengeCardProps) {
  const difficultyColor = {
    easy: "text-green-500",
    medium: "text-yellow-500",
    hard: "text-red-500",
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <FuturisticCard className={cn("overflow-hidden", className)}>
        <div className="relative h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
          {image ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
          ) : (
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=128&width=400')] bg-cover bg-center" />
          )}
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
            <Coins className="h-3 w-3 text-green-500" />
            {points} points
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{title}</h3>
            <span className={cn("text-xs font-medium", difficultyColor[difficulty])}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">{description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Clock className="h-3 w-3" />
              <span>{timeLeft}</span>
            </div>
            <FuturisticButton
              size="sm"
              onClick={onContinue}
              disabled={isCompleted}
              className={isCompleted ? "opacity-50 cursor-not-allowed" : ""}
            >
              {continueText}
            </FuturisticButton>
          </div>
        </div>
      </FuturisticCard>
    </motion.div>
  )
}
