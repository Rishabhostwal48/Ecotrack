"use client"

import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { ChallengeCard } from "@/components/challenge-card"
import { FuturisticButton } from "@/components/futuristic-button"
import { FuturisticCard } from "@/components/futuristic-card"
import { MagicalHeader } from "@/components/magical-header"
import { PageTransition } from "@/components/page-transition"
import { StreakCard } from "@/components/streak-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useEco } from "@/context/eco-context"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const {
    streak,
    longestStreak,
    activeChallenges,
    availableChallenges,
    completedChallenges,
    startChallenge,
    updateChallengeProgress,
    completeChallenge,
  } = useEco()

  // Calculate weekly progress based on streak
  const weeklyProgress = Math.min(100, (streak / 7) * 100)

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

  // Filter challenges based on search query
  const filterChallenges = (challengeList: any[]) => {
    if (!searchQuery) return challengeList

    return challengeList.filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Handle starting a challenge
  const handleStartChallenge = (id: string) => {
    startChallenge(id)
    toast({
      title: "Challenge Started!",
      description: "Good luck with your new challenge. Keep up the streak!",
    })
  }

  // Handle updating challenge progress
  const handleUpdateProgress = (id: string, progress: number) => {
    updateChallengeProgress(id, progress)

    // If progress is 100%, complete the challenge
    if (progress >= 100) {
      completeChallenge(id)
      toast({
        title: "Challenge Completed!",
        description: "Congratulations! You've earned points and made a positive impact.",
      })
    } else {
      toast({
        title: "Progress Updated",
        description: `You're now at ${progress}% completion.`,
      })
    }
  }

  // Calculate time left for a challenge
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
        <main className="flex-1 py-8">
          <div className="container px-4 md:px-6">
            <motion.div className="flex flex-col gap-8" variants={container} initial="hidden" animate="show">
              <motion.div variants={item} className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-green-500" />
                    Weekly Challenges
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Complete challenges to earn points and maintain your streak
                  </p>
                </div>

                <StreakCard
                  currentStreak={streak}
                  longestStreak={longestStreak}
                  weeklyProgress={weeklyProgress}
                  className="md:w-[350px]"
                />
              </motion.div>

              <motion.div variants={item} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search challenges..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <FuturisticButton variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </FuturisticButton>
                </div>

                <Tabs defaultValue="available" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6 bg-background/50 p-1 rounded-lg">
                    <TabsTrigger
                      value="active"
                      className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                    >
                      Active ({activeChallenges.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="available"
                      className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                    >
                      Available ({availableChallenges.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="completed"
                      className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                    >
                      Completed ({completedChallenges.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filterChallenges(activeChallenges).map((challenge) => (
                        <ChallengeCard
                          key={challenge.id}
                          title={challenge.title}
                          description={challenge.description}
                          points={challenge.points}
                          difficulty={challenge.difficulty}
                          timeLeft={getTimeLeft(challenge)}
                          progress={challenge.progress}
                          onContinue={() => handleUpdateProgress(challenge.id, Math.min(100, challenge.progress + 20))}
                        />
                      ))}
                    </div>

                    {filterChallenges(activeChallenges).length === 0 && (
                      <FuturisticCard className="p-8 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium">No active challenges found</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchQuery ? "Try a different search term" : "Start a new challenge to see it here"}
                          </p>
                        </div>
                      </FuturisticCard>
                    )}
                  </TabsContent>

                  <TabsContent value="available" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filterChallenges(availableChallenges).map((challenge) => (
                        <ChallengeCard
                          key={challenge.id}
                          title={challenge.title}
                          description={challenge.description}
                          points={challenge.points}
                          difficulty={challenge.difficulty}
                          timeLeft={`${challenge.duration} days`}
                          progress={0}
                          onContinue={() => handleStartChallenge(challenge.id)}
                          continueText="Start Challenge"
                        />
                      ))}
                    </div>

                    {filterChallenges(availableChallenges).length === 0 && (
                      <FuturisticCard className="p-8 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium">No available challenges found</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchQuery ? "Try a different search term" : "Check back later for new challenges"}
                          </p>
                        </div>
                      </FuturisticCard>
                    )}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filterChallenges(completedChallenges).map((challenge) => (
                        <ChallengeCard
                          key={challenge.id}
                          title={challenge.title}
                          description={challenge.description}
                          points={challenge.points}
                          difficulty={challenge.difficulty}
                          timeLeft="Completed"
                          progress={100}
                          onContinue={() => {}}
                          continueText="Completed"
                          isCompleted
                        />
                      ))}
                    </div>

                    {filterChallenges(completedChallenges).length === 0 && (
                      <FuturisticCard className="p-8 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium">No completed challenges found</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchQuery ? "Try a different search term" : "Complete challenges to see them here"}
                          </p>
                        </div>
                      </FuturisticCard>
                    )}
                  </TabsContent>
                </Tabs>
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
