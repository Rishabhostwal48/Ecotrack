"use client"

import Link from "next/link"
import { AnimatedEcoIcon } from "@/components/animated-eco-icon"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { FuturisticButton } from "@/components/futuristic-button"
import { FuturisticCard } from "@/components/futuristic-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { useEco } from "@/context/eco-context"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function ResultsPage() {
  const { carbonFootprint, addPoints, updateEcoImpact } = useEco()
  const router = useRouter()

  // Add this near the top of the component
  const pointsAwarded = useRef(false)

  // If no footprint data exists, redirect to calculator
  useEffect(() => {
    if (!carbonFootprint) {
      router.push("/calculator")
    } else if (!pointsAwarded.current) {
      // Only award points and update eco impact once
      addPoints(50)
      updateEcoImpact(1, 20, 15) // Simulate saving 1 tree, 20L water, and 15kg CO2
      pointsAwarded.current = true
    }
  }, [carbonFootprint, router, addPoints, updateEcoImpact])

  // If no data, show loading or redirect
  if (!carbonFootprint) {
    return null
  }

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

  // Calculate percentages for each category
  const transportationPercent = Math.round((carbonFootprint.transportation / carbonFootprint.total) * 100)
  const energyPercent = Math.round((carbonFootprint.energy / carbonFootprint.total) * 100)
  const dietPercent = Math.round((carbonFootprint.diet / carbonFootprint.total) * 100)
  const consumptionPercent = Math.round((carbonFootprint.consumption / carbonFootprint.total) * 100)

  // Generate recommendations based on the highest contributors
  const getRecommendations = () => {
    const recommendations = {
      transportation: [
        "Consider carpooling or using public transportation more frequently.",
        "For short trips, walk or bike instead of driving.",
        "If possible, work from home a few days a week to reduce commuting.",
      ],
      energy: [
        "Switch to LED light bulbs throughout your home.",
        "Consider installing solar panels or switching to a renewable energy provider.",
        "Unplug electronics when not in use to reduce phantom energy usage.",
      ],
      diet: [
        "Try incorporating more plant-based meals into your diet.",
        "Reduce food waste by planning meals and properly storing leftovers.",
        "Buy local and seasonal produce to reduce transportation emissions.",
      ],
      consumption: [
        "Practice the 'one in, one out' rule when buying new items.",
        "Repair items instead of replacing them when possible.",
        "Choose products with minimal packaging or packaging made from recycled materials.",
      ],
    }

    return recommendations
  }

  const recommendations = getRecommendations()

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedGradientBackground />

      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/60 border-b border-white/10">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <AnimatedEcoIcon />
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
              EcoTrack
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <FuturisticButton variant="outline" size="sm" className="hidden md:flex">
              Login
            </FuturisticButton>
            <FuturisticButton>Sign Up</FuturisticButton>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <motion.div className="flex flex-col gap-8" variants={container} initial="hidden" animate="show">
            <motion.div className="flex items-center gap-4" variants={item}>
              <FuturisticButton variant="outline" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="ml-2">Back</span>
                </Link>
              </FuturisticButton>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
                Your Carbon Footprint Results
              </h1>
            </motion.div>

            <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" variants={container}>
              <motion.div variants={item}>
                <FuturisticCard className="p-6" glowColor="green">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Your Annual Footprint</p>
                    <p className="text-4xl font-bold text-green-500">{carbonFootprint.total} tons</p>
                    <p className="text-sm text-muted-foreground">CO₂ equivalent per year</p>
                  </div>
                </FuturisticCard>
              </motion.div>

              <motion.div variants={item}>
                <FuturisticCard className="p-6" glowColor="teal">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Country Average</p>
                    <p className="text-4xl font-bold">12.5 tons</p>
                    <p className="text-sm text-muted-foreground">
                      You're {carbonFootprint.comparedToAverage}% below average
                    </p>
                  </div>
                </FuturisticCard>
              </motion.div>

              <motion.div variants={item}>
                <FuturisticCard className="p-6" glowColor="emerald">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Global Target</p>
                    <p className="text-4xl font-bold">2.0 tons</p>
                    <p className="text-sm text-muted-foreground">
                      You're still {carbonFootprint.comparedToTarget}% above the global target
                    </p>
                  </div>
                </FuturisticCard>
              </motion.div>

              <motion.div variants={item}>
                <FuturisticCard className="p-6" glowColor="green">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Your Progress</p>
                    <p className="text-4xl font-bold text-emerald-500">{carbonFootprint.progress}%</p>
                    <p className="text-sm text-muted-foreground">Towards sustainable living</p>
                  </div>
                </FuturisticCard>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <FuturisticCard className="p-6">
                <Tabs defaultValue="breakdown">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-background/50 p-1 rounded-lg">
                    <TabsTrigger
                      value="breakdown"
                      className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                    >
                      Breakdown
                    </TabsTrigger>
                    <TabsTrigger
                      value="comparison"
                      className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                    >
                      Comparison
                    </TabsTrigger>
                    <TabsTrigger
                      value="recommendations"
                      className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                    >
                      Recommendations
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="breakdown" className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Transportation</h3>
                        <span className="text-green-500 font-medium">{carbonFootprint.transportation} tons</span>
                      </div>
                      <Progress
                        value={transportationPercent}
                        className="h-2 bg-muted/50"
                        indicatorClassName="bg-green-500"
                      />
                      <p className="text-sm text-muted-foreground">{transportationPercent}% of your total footprint</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Home Energy</h3>
                        <span className="text-green-500 font-medium">{carbonFootprint.energy} tons</span>
                      </div>
                      <Progress value={energyPercent} className="h-2 bg-muted/50" indicatorClassName="bg-green-500" />
                      <p className="text-sm text-muted-foreground">{energyPercent}% of your total footprint</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Diet</h3>
                        <span className="text-green-500 font-medium">{carbonFootprint.diet} tons</span>
                      </div>
                      <Progress value={dietPercent} className="h-2 bg-muted/50" indicatorClassName="bg-green-500" />
                      <p className="text-sm text-muted-foreground">{dietPercent}% of your total footprint</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Consumption</h3>
                        <span className="text-green-500 font-medium">{carbonFootprint.consumption} tons</span>
                      </div>
                      <Progress
                        value={consumptionPercent}
                        className="h-2 bg-muted/50"
                        indicatorClassName="bg-green-500"
                      />
                      <p className="text-sm text-muted-foreground">{consumptionPercent}% of your total footprint</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="comparison" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Your Footprint vs. Country Average</h3>
                        <div className="relative h-64 w-full overflow-hidden rounded-xl">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl"></div>
                          <div className="relative h-full w-full flex items-center justify-center">
                            <div className="flex items-end h-3/4 gap-8">
                              <div className="flex flex-col items-center">
                                <div
                                  className="w-20 bg-green-500 rounded-t-lg"
                                  style={{ height: `${(carbonFootprint.total / 12.5) * 100}%` }}
                                ></div>
                                <p className="mt-2 text-sm font-medium">You</p>
                                <p className="text-xs text-muted-foreground">{carbonFootprint.total} tons</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-20 bg-gray-400 dark:bg-gray-600 rounded-t-lg h-full"></div>
                                <p className="mt-2 text-sm font-medium">Average</p>
                                <p className="text-xs text-muted-foreground">12.5 tons</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Your carbon footprint is {carbonFootprint.comparedToAverage}% lower than the average in your
                          country.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Your Footprint vs. Global Target</h3>
                        <div className="relative h-64 w-full overflow-hidden rounded-xl">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl"></div>
                          <div className="relative h-full w-full flex items-center justify-center">
                            <div className="flex items-end h-3/4 gap-8">
                              <div className="flex flex-col items-center">
                                <div
                                  className="w-20 bg-green-500 rounded-t-lg"
                                  style={{ height: `${(carbonFootprint.total / 12.5) * 100}%` }}
                                ></div>
                                <p className="mt-2 text-sm font-medium">You</p>
                                <p className="text-xs text-muted-foreground">{carbonFootprint.total} tons</p>
                              </div>
                              <div className="flex flex-col items-center">
                                <div
                                  className="w-20 bg-emerald-400 rounded-t-lg"
                                  style={{ height: `${(2.0 / 12.5) * 100}%` }}
                                ></div>
                                <p className="mt-2 text-sm font-medium">Target</p>
                                <p className="text-xs text-muted-foreground">2.0 tons</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You're still {(carbonFootprint.total - 2.0).toFixed(1)} tons above the global target needed to
                          limit warming to 1.5°C.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="recommendations" className="space-y-6">
                    <div className="grid gap-4">
                      <FuturisticCard className="p-4 border-green-500/20" glowColor="green">
                        <h3 className="font-medium text-green-500 mb-2">Transportation</h3>
                        <ul className="space-y-2 text-sm">
                          {recommendations.transportation.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0 mt-0.5">
                                {index + 1}
                              </div>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </FuturisticCard>

                      <FuturisticCard className="p-4 border-teal-500/20" glowColor="teal">
                        <h3 className="font-medium text-teal-500 mb-2">Home Energy</h3>
                        <ul className="space-y-2 text-sm">
                          {recommendations.energy.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 shrink-0 mt-0.5">
                                {index + 1}
                              </div>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </FuturisticCard>

                      <FuturisticCard className="p-4 border-emerald-500/20" glowColor="emerald">
                        <h3 className="font-medium text-emerald-500 mb-2">Diet</h3>
                        <ul className="space-y-2 text-sm">
                          {recommendations.diet.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                                {index + 1}
                              </div>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </FuturisticCard>
                    </div>
                  </TabsContent>
                </Tabs>
              </FuturisticCard>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={item}>
              <FuturisticButton className="gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </FuturisticButton>
              <FuturisticButton variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Results
              </FuturisticButton>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <footer className="w-full py-6 border-t border-white/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <AnimatedEcoIcon />
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
                EcoTrack
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EcoTrack by Team OmniXForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
