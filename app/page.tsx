import Link from "next/link"
import { AnimatedEcoIcon } from "@/components/animated-eco-icon"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { FuturisticButton } from "@/components/futuristic-button"
import { FuturisticCard } from "@/components/futuristic-card"
import { FuturisticHeader } from "@/components/futuristic-header"
import { PageTransition } from "@/components/page-transition"
import { ParticleBackground } from "@/components/particle-background"
import { ChevronRight, Trophy, ShoppingBag, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedGradientBackground />
      <ParticleBackground />
      <FuturisticHeader showAuthButtons={true} />

      <PageTransition>
        <main className="flex-1 pt-20">
          <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32 relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
                      Track Your Carbon Footprint with EcoTrack
                    </h1>
                    <p className="max-w-[600px] text-sm md:text-base lg:text-lg text-muted-foreground">
                      Understand your environmental impact, complete weekly challenges, and earn rewards for sustainable
                      living.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <FuturisticButton size="lg" className="group w-full sm:w-auto" asChild>
                      <Link href="/dashboard" className="flex items-center justify-center">
                        Get Started
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </FuturisticButton>
                    <FuturisticButton variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                      <Link href="/calculator" className="flex items-center justify-center">
                        Calculate Footprint
                      </Link>
                    </FuturisticButton>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-8 lg:mt-0">
                  <div className="relative w-full max-w-[400px] aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
                    <FuturisticCard className="relative p-4 md:p-6 h-full w-full flex items-center justify-center">
                      <div className="w-full max-w-[300px] md:max-w-[400px] aspect-square bg-[url('/placeholder.svg?height=400&width=400')] bg-contain bg-center bg-no-repeat"></div>
                    </FuturisticCard>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-8 md:py-16 lg:py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-green-950/10 to-background opacity-30"></div>
            <div className="container px-4 md:px-6 relative">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-500">
                    Features
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">Eco-Friendly Rewards</h2>
                  <p className="max-w-[900px] text-sm md:text-base text-muted-foreground">
                    Complete challenges, maintain streaks, and earn points to redeem for eco-friendly rewards.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
                <FuturisticCard
                  className="p-4 md:p-6 flex flex-col items-center text-center space-y-4"
                  glowColor="green"
                >
                  <div className="rounded-full p-3 bg-green-500/10">
                    <Trophy className="h-8 w-8 md:h-10 md:w-10 text-green-500" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">Weekly Challenges</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Complete eco-friendly challenges each week to maintain your streak and earn points.
                  </p>
                  <FuturisticButton variant="outline" size="sm" asChild>
                    <Link href="/challenges">View Challenges</Link>
                  </FuturisticButton>
                </FuturisticCard>

                <FuturisticCard
                  className="p-4 md:p-6 flex flex-col items-center text-center space-y-4"
                  glowColor="teal"
                >
                  <div className="rounded-full p-3 bg-teal-500/10">
                    <BarChart3 className="h-8 w-8 md:h-10 md:w-10 text-teal-500" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">Track Progress</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Monitor your eco-impact and see how your sustainable choices make a difference.
                  </p>
                  <FuturisticButton variant="outline" size="sm" asChild>
                    <Link href="/dashboard">View Dashboard</Link>
                  </FuturisticButton>
                </FuturisticCard>

                <FuturisticCard
                  className="p-4 md:p-6 flex flex-col items-center text-center space-y-4 sm:col-span-2 lg:col-span-1"
                  glowColor="emerald"
                >
                  <div className="rounded-full p-3 bg-emerald-500/10">
                    <ShoppingBag className="h-8 w-8 md:h-10 md:w-10 text-emerald-500" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">Redeem Rewards</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Use your earned points to redeem eco-friendly products and exclusive offers.
                  </p>
                  <FuturisticButton variant="outline" size="sm" asChild>
                    <Link href="/marketplace">Visit Marketplace</Link>
                  </FuturisticButton>
                </FuturisticCard>
              </div>
            </div>
          </section>

          <section className="w-full py-8 md:py-16 lg:py-24 relative">
            <div className="container px-4 md:px-6 relative">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-500">
                      How It Works
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
                      Earn While You Save the Planet
                    </h2>
                    <p className="max-w-[600px] text-sm md:text-base text-muted-foreground">
                      Our unique streak system rewards consistency in eco-friendly habits. Complete weekly challenges to
                      maintain your streak and earn bonus points.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium">Complete Weekly Challenges</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose from various eco-friendly challenges each week.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium">Maintain Your Streak</h3>
                        <p className="text-sm text-muted-foreground">
                          Keep your streak going for bonus points and level up.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium">Redeem Rewards</h3>
                        <p className="text-sm text-muted-foreground">
                          Use your points in our marketplace for eco-friendly products.
                        </p>
                      </div>
                    </div>
                  </div>
                  <FuturisticButton className="w-full sm:w-auto" asChild>
                    <Link href="/signup">Join EcoTrack Today</Link>
                  </FuturisticButton>
                </div>
                <div className="flex items-center justify-center mt-8 lg:mt-0">
                  <div className="relative w-full max-w-[500px] aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl blur-3xl"></div>
                    <FuturisticCard className="relative p-4 md:p-6 h-full w-full flex items-center justify-center">
                      <div className="w-full max-w-[300px] md:max-w-[400px] aspect-video bg-[url('/placeholder.svg?height=225&width=400')] bg-contain bg-center bg-no-repeat"></div>
                    </FuturisticCard>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>

      <footer className="w-full py-6 border-t border-white/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AnimatedEcoIcon />
                <span className="text-lg md:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-400">
                  EcoTrack
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering individuals to understand and reduce their environmental impact.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Features</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/calculator" className="text-muted-foreground hover:text-green-500">
                    Carbon Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/challenges" className="text-muted-foreground hover:text-green-500">
                    Weekly Challenges
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="text-muted-foreground hover:text-green-500">
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-green-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-green-500">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-green-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-green-500">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-green-500">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-green-500">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} EcoTrack by Team OmniXForge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
