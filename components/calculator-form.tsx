"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FuturisticButton } from "@/components/futuristic-button"
import { FuturisticCard } from "@/components/futuristic-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Car, Home, Leaf, ShoppingBag } from "lucide-react"
import { useEco } from "@/context/eco-context"

export function CalculatorForm() {
  const router = useRouter()
  const { formData, setFormData, calculateFootprint } = useEco()
  const [activeTab, setActiveTab] = useState("transportation")

  const handleOptionSelect = (category: string, value: string) => {
    setFormData({ ...formData, [category]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Calculate the carbon footprint
    calculateFootprint()
    // Navigate to results page
    router.push("/results")
  }

  const isComplete = Object.values(formData).every((value) => value !== "")

  const MotionOption = ({
    category,
    value,
    label,
    icon,
  }: {
    category: string
    value: string
    label: string
    icon?: React.ReactNode
  }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative cursor-pointer rounded-xl p-3 md:p-4 backdrop-blur-sm transition-all duration-300 ${
        formData[category as keyof typeof formData] === value
          ? "bg-green-500/20 border border-green-500/50"
          : "bg-background/30 border border-white/10 hover:border-green-500/30"
      }`}
      onClick={() => handleOptionSelect(category, value)}
    >
      <div className="flex items-center gap-2 md:gap-3">
        {icon && <div className="text-green-500">{icon}</div>}
        <span className="text-sm md:text-base font-medium">{label}</span>
      </div>
    </motion.div>
  )

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <FuturisticCard className="p-4 md:p-6 lg:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 md:mb-8 bg-background/50 p-1 rounded-lg">
            <TabsTrigger
              value="transportation"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
            >
              <Car className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Transportation</span>
            </TabsTrigger>
            <TabsTrigger
              value="energy"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
            >
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Energy</span>
            </TabsTrigger>
            <TabsTrigger
              value="diet"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
            >
              <Leaf className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Diet</span>
            </TabsTrigger>
            <TabsTrigger
              value="consumption"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Consumption</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transportation" className="space-y-4 mt-2">
            <h3 className="text-lg md:text-xl font-bold text-center mb-4 md:mb-6">How do you typically travel?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <MotionOption category="transportation" value="car" label="Car" icon={<Car className="h-5 w-5" />} />
              <MotionOption
                category="transportation"
                value="public"
                label="Public Transit"
                icon={<Car className="h-5 w-5" />}
              />
              <MotionOption
                category="transportation"
                value="bicycle"
                label="Bicycle"
                icon={<Car className="h-5 w-5" />}
              />
              <MotionOption
                category="transportation"
                value="walking"
                label="Walking"
                icon={<Car className="h-5 w-5" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="energy" className="space-y-4 mt-2">
            <h3 className="text-lg md:text-xl font-bold text-center mb-4 md:mb-6">What type of energy do you use?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <MotionOption
                category="energy"
                value="electricity"
                label="Electricity"
                icon={<Home className="h-5 w-5" />}
              />
              <MotionOption
                category="energy"
                value="natural_gas"
                label="Natural Gas"
                icon={<Home className="h-5 w-5" />}
              />
              <MotionOption category="energy" value="solar" label="Solar" icon={<Home className="h-5 w-5" />} />
              <MotionOption category="energy" value="other" label="Other" icon={<Home className="h-5 w-5" />} />
            </div>
          </TabsContent>

          <TabsContent value="diet" className="space-y-4 mt-2">
            <h3 className="text-lg md:text-xl font-bold text-center mb-4 md:mb-6">What is your typical diet?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <MotionOption category="diet" value="meat_heavy" label="Meat Heavy" icon={<Leaf className="h-5 w-5" />} />
              <MotionOption category="diet" value="balanced" label="Balanced" icon={<Leaf className="h-5 w-5" />} />
              <MotionOption category="diet" value="vegetarian" label="Vegetarian" icon={<Leaf className="h-5 w-5" />} />
              <MotionOption category="diet" value="vegan" label="Vegan" icon={<Leaf className="h-5 w-5" />} />
            </div>
          </TabsContent>

          <TabsContent value="consumption" className="space-y-4 mt-2">
            <h3 className="text-lg md:text-xl font-bold text-center mb-4 md:mb-6">
              How would you describe your shopping habits?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <MotionOption
                category="consumption"
                value="minimal"
                label="Minimal"
                icon={<ShoppingBag className="h-5 w-5" />}
              />
              <MotionOption
                category="consumption"
                value="average"
                label="Average"
                icon={<ShoppingBag className="h-5 w-5" />}
              />
              <MotionOption
                category="consumption"
                value="frequent"
                label="Frequent"
                icon={<ShoppingBag className="h-5 w-5" />}
              />
              <MotionOption
                category="consumption"
                value="excessive"
                label="Excessive"
                icon={<ShoppingBag className="h-5 w-5" />}
              />
            </div>
          </TabsContent>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2">
              {["transportation", "energy", "diet", "consumption"].map((step) => (
                <div
                  key={step}
                  className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all ${
                    formData[step as keyof typeof formData] ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-4 w-full sm:w-auto">
              {activeTab !== "transportation" && (
                <FuturisticButton
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const tabs = ["transportation", "energy", "diet", "consumption"]
                    const currentIndex = tabs.indexOf(activeTab)
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1])
                    }
                  }}
                  className="flex-1 sm:flex-auto"
                >
                  Previous
                </FuturisticButton>
              )}

              {activeTab !== "consumption" ? (
                <FuturisticButton
                  type="button"
                  onClick={() => {
                    const tabs = ["transportation", "energy", "diet", "consumption"]
                    const currentIndex = tabs.indexOf(activeTab)
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1])
                    }
                  }}
                  className="flex-1 sm:flex-auto"
                >
                  Next
                </FuturisticButton>
              ) : (
                <FuturisticButton
                  type="submit"
                  disabled={!isComplete}
                  className={`flex-1 sm:flex-auto ${!isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Calculate My Footprint
                </FuturisticButton>
              )}
            </div>
          </div>
        </Tabs>
      </FuturisticCard>
    </form>
  )
}
