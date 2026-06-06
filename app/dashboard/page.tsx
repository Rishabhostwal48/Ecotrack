"use client"

import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { EcoImpactCard } from "@/components/eco-impact-card"
import { FuturisticButton } from "@/components/futuristic-button"
import { FuturisticCard } from "@/components/futuristic-card"
import { MagicalHeader } from "@/components/magical-header"
import { PageTransition } from "@/components/page-transition"
import { PointsCard } from "@/components/points-card"
import { StreakCard } from "@/components/streak-card"
import { ChallengeCard } from "@/components/challenge-card"
import { Calendar, ChevronRight, LineChart } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEco } from "@/context/eco-context"

export default function DashboardPage() {
  const { points, streak, longestStreak, treesSaved, waterSaved, co2Reduced, carbonFootprint, activeChallenges } =
    useEco()

  // Calculate weekly progress based on streak
  const weeklyProgress = Math.min(100, (streak / 7) * 100)

  // Recent points activity
  const recentPoints = [
    { amount: 150, source: "Completed Challenge", date: "Today" },
    { amount: 50, source: "Daily Login", date: "Today" },
    { amount: 100, source: "Carbon Footprint Calculation", date: "Yesterday" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Get time left for a challenge
  const getTimeLeft = (challenge: any) => {
    if (!challenge.startDate) return "Not started"
    if (challenge.progress >= 100) return "Completed"

    const startDate = new Date(challenge.startDate)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + challenge.duration)

    const now = new Date()
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    return daysLeft <= 0 ? "Expired" : `${daysLeft} days`
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedGradientBackground />
      <MagicalHeader showAuthButtons={false} />

      <PageTransition>
        <main className="flex-1 py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <motion.div className="flex flex-col gap-6 md:gap-8" variants={container} initial="hidden" animate="show">
              <motion.div variants={item}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Track your eco-impact and progress</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <FuturisticButton variant="outline" size="sm" asChild className="flex-1 md:flex-auto">
                      <Link href="/calculator">
                        <LineChart className="h-4 w-4 mr-2" />
                        <span className="whitespace-nowrap">Calculate Footprint</span>
                      </Link>
                    </FuturisticButton>
                    <FuturisticButton size="sm" asChild className="flex-1 md:flex-auto">
                      <Link href="/challenges">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="whitespace-nowrap">View Challenges</span>
                      </Link>
                    </FuturisticButton>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={item} className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <StreakCard currentStreak={streak} longestStreak={longestStreak} weeklyProgress={weeklyProgress} />

                <PointsCard
                  totalPoints={points}
                  level={Math.floor(points / 1000) + 1}
                  pointsToNextLevel={1000 - (points % 1000)}
                  recentPoints={recentPoints}
                  className="md:col-span-2 lg:col-span-1"
                />

                <EcoImpactCard
                  treesSaved={treesSaved}
                  waterSaved={waterSaved}
                  co2Reduced={co2Reduced}
                  className="md:col-span-2 lg:col-span-1"
                />
              </motion.div>

              {carbonFootprint && (
                <motion.div variants={item}>
                  <FuturisticCard className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="text-center md:text-left">
                        <h3 className="text-lg md:text-xl font-bold">Your Carbon Footprint</h3>
                        <p className="text-green-500 font-medium">{carbonFootprint.total} tons CO₂ per year</p>
                      </div>
                      <FuturisticButton asChild className="w-full md:w-auto">
                        <Link href="/results">View Detailed Results</Link>
                      </FuturisticButton>
                    </div>
                  </FuturisticCard>
                </motion.div>
              )}

              <motion.div variants={item}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Active Challenges</h2>
                  <FuturisticButton variant="outline" size="sm" asChild>
                    <Link href="/challenges" className="flex items-center gap-1">
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </FuturisticButton>
                </div>

                <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {activeChallenges.slice(0, 3).map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      title={challenge.title}
                      description={challenge.description}
                      points={challenge.points}
                      difficulty={challenge.difficulty}
                      timeLeft={getTimeLeft(challenge)}
                      progress={challenge.progress}
                    />
                  ))}
                  {activeChallenges.length === 0 && (
                    <FuturisticCard className="p-6 col-span-full">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">No active challenges</h3>
                        <p className="text-muted-foreground mb-4">Start a challenge to see it here</p>
                        <FuturisticButton asChild>
                          <Link href="/challenges">Browse Challenges</Link>
                        </FuturisticButton>
                      </div>
                    </FuturisticCard>
                  )}
                </div>
              </motion.div>

              <motion.div variants={item}>
                <FuturisticCard className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                      <h3 className="text-lg md:text-xl font-bold">Ready to earn more points?</h3>
                      <p className="text-muted-foreground">
                        Complete challenges and maintain your streak to earn rewards.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <FuturisticButton variant="outline" asChild className="flex-1 md:flex-auto">
                        <Link href="/marketplace">Visit Marketplace</Link>
                      </FuturisticButton>
                      <FuturisticButton asChild className="flex-1 md:flex-auto">
                        <Link href="/challenges">Start Challenge</Link>
                      </FuturisticButton>
                    </div>
                  </div>
                </FuturisticCard>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </PageTransition>

      <footer className="w-full py-6 border-t border-white/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EcoTrack by Team OmniXForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
