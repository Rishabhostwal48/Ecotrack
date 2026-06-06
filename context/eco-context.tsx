"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define types for our context
type FormData = {
  transportation: string
  energy: string
  diet: string
  consumption: string
}

type CarbonFootprint = {
  total: number
  transportation: number
  energy: number
  diet: number
  consumption: number
  comparedToAverage: number
  comparedToTarget: number
  progress: number
}

type Challenge = {
  id: string
  title: string
  description: string
  points: number
  difficulty: "easy" | "medium" | "hard"
  duration: number // in days
  startDate?: string
  progress: number
  category: "transportation" | "energy" | "diet" | "consumption" | "general"
}

export type CartItem = {
  id: string
  name: string
  points: number
  image?: string
  quantity: number
  category: string
}

type EcoContextType = {
  formData: FormData
  setFormData: (data: FormData) => void
  carbonFootprint: CarbonFootprint | null
  calculateFootprint: () => void
  points: number
  addPoints: (amount: number) => void
  streak: number
  incrementStreak: () => void
  resetStreak: () => void
  longestStreak: number
  treesSaved: number
  waterSaved: number
  co2Reduced: number
  updateEcoImpact: (trees: number, water: number, co2: number) => void
  challenges: Challenge[]
  activeChallenges: Challenge[]
  availableChallenges: Challenge[]
  completedChallenges: Challenge[]
  startChallenge: (id: string) => void
  updateChallengeProgress: (id: string, progress: number) => void
  completeChallenge: (id: string) => void
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalCartPoints: number
}

const defaultFormData: FormData = {
  transportation: "",
  energy: "",
  diet: "",
  consumption: "",
}

const defaultFootprint: CarbonFootprint = {
  total: 0,
  transportation: 0,
  energy: 0,
  diet: 0,
  consumption: 0,
  comparedToAverage: 0,
  comparedToTarget: 0,
  progress: 0,
}

// Sample challenges data
const sampleChallenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Zero Waste Week",
    description: "Reduce your waste by avoiding single-use plastics for a week.",
    points: 300,
    difficulty: "medium",
    duration: 7,
    progress: 0,
    category: "consumption",
  },
  {
    id: "challenge-2",
    title: "Public Transport Hero",
    description: "Use public transportation instead of a car for all your trips.",
    points: 250,
    difficulty: "easy",
    duration: 7,
    progress: 0,
    category: "transportation",
  },
  {
    id: "challenge-3",
    title: "Energy Saver",
    description: "Reduce your electricity usage by 20% this week.",
    points: 350,
    difficulty: "hard",
    duration: 7,
    progress: 0,
    category: "energy",
  },
  {
    id: "challenge-4",
    title: "Meatless Monday",
    description: "Go vegetarian for a full day to reduce your carbon footprint.",
    points: 200,
    difficulty: "easy",
    duration: 1,
    progress: 0,
    category: "diet",
  },
  {
    id: "challenge-5",
    title: "Bike to Work",
    description: "Use a bicycle for your commute instead of a car for a week.",
    points: 350,
    difficulty: "medium",
    duration: 7,
    progress: 0,
    category: "transportation",
  },
  {
    id: "challenge-6",
    title: "Local Food Challenge",
    description: "Only consume locally produced food for a week to reduce transportation emissions.",
    points: 400,
    difficulty: "hard",
    duration: 7,
    progress: 0,
    category: "diet",
  },
  {
    id: "challenge-7",
    title: "Digital Detox",
    description: "Reduce your screen time by 50% for a week to save energy.",
    points: 250,
    difficulty: "medium",
    duration: 7,
    progress: 0,
    category: "energy",
  },
  {
    id: "challenge-8",
    title: "Water Conservation",
    description: "Reduce your water usage by taking shorter showers and being mindful of usage.",
    points: 300,
    difficulty: "medium",
    duration: 7,
    progress: 0,
    category: "general",
  },
]

const EcoContext = createContext<EcoContextType | undefined>(undefined)

export function EcoProvider({ children }: { children: ReactNode }) {
  // State management
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [carbonFootprint, setCarbonFootprint] = useState<CarbonFootprint | null>(null)
  const [points, setPoints] = useState(0)
  const [streak, setStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [treesSaved, setTreesSaved] = useState(0)
  const [waterSaved, setWaterSaved] = useState(0)
  const [co2Reduced, setCo2Reduced] = useState(0)
  const [challenges, setChallenges] = useState<Challenge[]>(sampleChallenges)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Derived state for challenges
  const activeChallenges = challenges.filter((c) => c.startDate && c.progress < 100)
  const availableChallenges = challenges.filter((c) => !c.startDate)
  const completedChallenges = challenges.filter((c) => c.progress === 100)

  // Calculate total cart points
  const totalCartPoints = cartItems.reduce((total, item) => total + item.points * item.quantity, 0)

  // Load data from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("ecotrack_formData")
      const savedFootprint = localStorage.getItem("ecotrack_footprint")
      const savedPoints = localStorage.getItem("ecotrack_points")
      const savedStreak = localStorage.getItem("ecotrack_streak")
      const savedLongestStreak = localStorage.getItem("ecotrack_longestStreak")
      const savedTreesSaved = localStorage.getItem("ecotrack_treesSaved")
      const savedWaterSaved = localStorage.getItem("ecotrack_waterSaved")
      const savedCo2Reduced = localStorage.getItem("ecotrack_co2Reduced")
      const savedChallenges = localStorage.getItem("ecotrack_challenges")
      const savedCartItems = localStorage.getItem("ecotrack_cartItems")

      if (savedFormData) setFormData(JSON.parse(savedFormData))
      if (savedFootprint) setCarbonFootprint(JSON.parse(savedFootprint))
      if (savedPoints) setPoints(Number(savedPoints))
      if (savedStreak) setStreak(Number(savedStreak))
      if (savedLongestStreak) setLongestStreak(Number(savedLongestStreak))
      if (savedTreesSaved) setTreesSaved(Number(savedTreesSaved))
      if (savedWaterSaved) setWaterSaved(Number(savedWaterSaved))
      if (savedCo2Reduced) setCo2Reduced(Number(savedCo2Reduced))
      if (savedChallenges) setChallenges(JSON.parse(savedChallenges))
      if (savedCartItems) setCartItems(JSON.parse(savedCartItems))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ecotrack_formData", JSON.stringify(formData))
      if (carbonFootprint) {
        localStorage.setItem("ecotrack_footprint", JSON.stringify(carbonFootprint))
      }
      localStorage.setItem("ecotrack_points", String(points))
      localStorage.setItem("ecotrack_streak", String(streak))
      localStorage.setItem("ecotrack_longestStreak", String(longestStreak))
      localStorage.setItem("ecotrack_treesSaved", String(treesSaved))
      localStorage.setItem("ecotrack_waterSaved", String(waterSaved))
      localStorage.setItem("ecotrack_co2Reduced", String(co2Reduced))
      localStorage.setItem("ecotrack_challenges", JSON.stringify(challenges))
      localStorage.setItem("ecotrack_cartItems", JSON.stringify(cartItems))
    }
  }, [
    formData,
    carbonFootprint,
    points,
    streak,
    longestStreak,
    treesSaved,
    waterSaved,
    co2Reduced,
    challenges,
    cartItems,
  ])

  // Calculate carbon footprint based on form data
  const calculateFootprint = () => {
    // Base values for each category (in tons of CO2)
    const transportationValues = {
      car: 4.6,
      public: 1.5,
      bicycle: 0.1,
      walking: 0.0,
    }

    const energyValues = {
      electricity: 3.8,
      natural_gas: 5.5,
      solar: 0.4,
      other: 2.5,
    }

    const dietValues = {
      meat_heavy: 3.3,
      balanced: 2.5,
      vegetarian: 1.7,
      vegan: 1.1,
    }

    const consumptionValues = {
      minimal: 0.5,
      average: 2.0,
      frequent: 3.5,
      excessive: 5.0,
    }

    // Calculate footprint for each category
    const transportationFootprint =
      transportationValues[formData.transportation as keyof typeof transportationValues] || 0
    const energyFootprint = energyValues[formData.energy as keyof typeof energyValues] || 0
    const dietFootprint = dietValues[formData.diet as keyof typeof dietValues] || 0
    const consumptionFootprint = consumptionValues[formData.consumption as keyof typeof consumptionValues] || 0

    // Calculate total footprint
    const totalFootprint = transportationFootprint + energyFootprint + dietFootprint + consumptionFootprint

    // Average footprint for comparison (global average is around 4 tons per person)
    const averageFootprint = 12.5
    const targetFootprint = 2.0

    // Calculate percentages
    const comparedToAverage = ((averageFootprint - totalFootprint) / averageFootprint) * 100
    const comparedToTarget = ((totalFootprint - targetFootprint) / targetFootprint) * 100
    const progress = Math.max(
      0,
      Math.min(100, ((averageFootprint - totalFootprint) / (averageFootprint - targetFootprint)) * 100),
    )

    // Set the carbon footprint state
    const newFootprint: CarbonFootprint = {
      total: Number.parseFloat(totalFootprint.toFixed(1)),
      transportation: Number.parseFloat(transportationFootprint.toFixed(1)),
      energy: Number.parseFloat(energyFootprint.toFixed(1)),
      diet: Number.parseFloat(dietFootprint.toFixed(1)),
      consumption: Number.parseFloat(consumptionFootprint.toFixed(1)),
      comparedToAverage: Number.parseFloat(comparedToAverage.toFixed(0)),
      comparedToTarget: Number.parseFloat(comparedToTarget.toFixed(0)),
      progress: Number.parseFloat(progress.toFixed(0)),
    }

    setCarbonFootprint(newFootprint)

    // Award points for completing the calculator
    addPoints(100)

    return newFootprint
  }

  // Add points to the user's total
  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount)
  }

  // Increment streak and update longest streak if needed
  const incrementStreak = () => {
    const newStreak = streak + 1
    setStreak(newStreak)
    if (newStreak > longestStreak) {
      setLongestStreak(newStreak)
    }
  }

  // Reset streak to 0
  const resetStreak = () => {
    setStreak(0)
  }

  // Update eco impact metrics
  const updateEcoImpact = (trees: number, water: number, co2: number) => {
    setTreesSaved((prev) => prev + trees)
    setWaterSaved((prev) => prev + water)
    setCo2Reduced((prev) => prev + co2)
  }

  // Start a challenge
  const startChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((challenge) => {
        if (challenge.id === id) {
          return {
            ...challenge,
            startDate: new Date().toISOString(),
            progress: 0,
          }
        }
        return challenge
      }),
    )
    // Increment streak when starting a new challenge
    incrementStreak()
  }

  // Update challenge progress
  const updateChallengeProgress = (id: string, progress: number) => {
    setChallenges((prev) =>
      prev.map((challenge) => {
        if (challenge.id === id) {
          return {
            ...challenge,
            progress: Math.min(100, progress),
          }
        }
        return challenge
      }),
    )
  }

  // Complete a challenge
  const completeChallenge = (id: string) => {
    const challenge = challenges.find((c) => c.id === id)
    if (!challenge) return

    // Calculate eco impact based on challenge category
    let treesToAdd = 0
    let waterToAdd = 0
    let co2ToAdd = 0

    if (challenge.category === "transportation") {
      treesToAdd = 1
      waterToAdd = 10
      co2ToAdd = 50
    } else if (challenge.category === "energy") {
      treesToAdd = 1
      waterToAdd = 5
      co2ToAdd = 40
    } else if (challenge.category === "diet") {
      treesToAdd = 1
      waterToAdd = 30
      co2ToAdd = 20
    } else if (challenge.category === "consumption") {
      treesToAdd = 2
      waterToAdd = 20
      co2ToAdd = 30
    } else {
      treesToAdd = 1
      waterToAdd = 15
      co2ToAdd = 25
    }

    // Batch all state updates together
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            progress: 100,
          }
        }
        return c
      }),
    )

    // Add points and update eco impact in one go
    setPoints((prev) => prev + challenge.points)
    setTreesSaved((prev) => prev + treesToAdd)
    setWaterSaved((prev) => prev + waterToAdd)
    setCo2Reduced((prev) => prev + co2ToAdd)
  }

  // Add item to cart
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Update cart item quantity
  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  // Context value
  const value = {
    formData,
    setFormData,
    carbonFootprint,
    calculateFootprint,
    points,
    addPoints,
    streak,
    incrementStreak,
    resetStreak,
    longestStreak,
    treesSaved,
    waterSaved,
    co2Reduced,
    updateEcoImpact,
    challenges,
    activeChallenges,
    availableChallenges,
    completedChallenges,
    startChallenge,
    updateChallengeProgress,
    completeChallenge,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    totalCartPoints,
  }

  return <EcoContext.Provider value={value}>{children}</EcoContext.Provider>
}

// Custom hook to use the eco context
export function useEco() {
  const context = useContext(EcoContext)
  if (context === undefined) {
    throw new Error("useEco must be used within an EcoProvider")
  }
  return context
}
