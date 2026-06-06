"use client"

import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { CalculatorForm } from "@/components/calculator-form"
import { MagicalHeader } from "@/components/magical-header"
import { PageTransition } from "@/components/page-transition"
import { LineChart } from "lucide-react"
import { motion } from "framer-motion"

export default function CalculatorPage() {
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

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedGradientBackground />
      <MagicalHeader showAuthButtons={false} />

      <PageTransition>
        <main className="flex-1 py-8">
          <div className="container px-4 md:px-6">
            <motion.div className="flex flex-col gap-8" variants={container} initial="hidden" animate="show">
              <motion.div variants={item}>
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    <LineChart className="h-6 w-6 text-green-500" />
                    Carbon Footprint Calculator
                  </h1>
                  <p className="text-muted-foreground mt-2 mb-8">
                    Answer a few questions to calculate your carbon footprint and get personalized recommendations to
                    reduce your environmental impact.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={item}>
                <CalculatorForm />
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
