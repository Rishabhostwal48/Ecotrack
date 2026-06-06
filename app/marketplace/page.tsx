"use client"

import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { CartDrawer } from "@/components/cart-drawer"
import { FuturisticButton } from "@/components/futuristic-button"
import { FuturisticCard } from "@/components/futuristic-card"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ProductCard } from "@/components/product-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Filter, Search, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useEco } from "@/context/eco-context"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const { points, cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart, totalCartPoints } = useEco()

  // Mock data for products
  const products = {
    featured: [
      {
        id: "prod-1",
        name: "Eco-Friendly Water Bottle",
        description: "Reusable stainless steel water bottle with bamboo cap.",
        points: 1200,
        category: "Home",
        isNew: true,
      },
      {
        id: "prod-2",
        name: "Organic Cotton T-Shirt",
        description: "100% organic cotton t-shirt with eco-friendly dyes.",
        points: 1500,
        category: "Apparel",
      },
      {
        id: "prod-3",
        name: "Solar Power Bank",
        description: "Charge your devices with solar energy on the go.",
        points: 2000,
        category: "Tech",
        isNew: true,
      },
    ],
    all: [
      {
        id: "prod-1",
        name: "Eco-Friendly Water Bottle",
        description: "Reusable stainless steel water bottle with bamboo cap.",
        points: 1200,
        category: "Home",
        isNew: true,
      },
      {
        id: "prod-2",
        name: "Organic Cotton T-Shirt",
        description: "100% organic cotton t-shirt with eco-friendly dyes.",
        points: 1500,
        category: "Apparel",
      },
      {
        id: "prod-3",
        name: "Solar Power Bank",
        description: "Charge your devices with solar energy on the go.",
        points: 2000,
        category: "Tech",
        isNew: true,
      },
      {
        id: "prod-4",
        name: "Bamboo Cutlery Set",
        description: "Portable bamboo cutlery set with carrying case.",
        points: 800,
        category: "Home",
      },
      {
        id: "prod-5",
        name: "Recycled Notebook",
        description: "Notebook made from 100% recycled paper with seed-infused cover.",
        points: 500,
        category: "Office",
      },
      {
        id: "prod-6",
        name: "Plant a Tree Donation",
        description: "We'll plant a tree in your name in areas affected by deforestation.",
        points: 1000,
        category: "Donation",
      },
      {
        id: "prod-7",
        name: "Eco-Friendly Backpack",
        description: "Backpack made from recycled plastic bottles.",
        points: 2500,
        category: "Apparel",
      },
      {
        id: "prod-8",
        name: "Reusable Produce Bags",
        description: "Set of 5 mesh bags for plastic-free grocery shopping.",
        points: 700,
        category: "Home",
      },
      {
        id: "prod-9",
        name: "Solar-Powered LED Lights",
        description: "String of 20 LED lights powered by a small solar panel.",
        points: 1200,
        category: "Home",
      },
    ],
    digital: [
      {
        id: "prod-10",
        name: "1-Month Streaming Subscription",
        description: "One month of premium streaming service.",
        points: 1500,
        category: "Digital",
      },
      {
        id: "prod-11",
        name: "E-Book Bundle",
        description: "Collection of 3 e-books about sustainable living.",
        points: 1000,
        category: "Digital",
      },
      {
        id: "prod-12",
        name: "Meditation App Subscription",
        description: "3-month subscription to a premium meditation app.",
        points: 1800,
        category: "Digital",
      },
    ],
    donations: [
      {
        id: "prod-6",
        name: "Plant a Tree Donation",
        description: "We'll plant a tree in your name in areas affected by deforestation.",
        points: 1000,
        category: "Donation",
      },
      {
        id: "prod-13",
        name: "Ocean Cleanup Donation",
        description: "Support efforts to clean plastic from our oceans.",
        points: 1500,
        category: "Donation",
      },
      {
        id: "prod-14",
        name: "Renewable Energy Project",
        description: "Support the development of renewable energy in developing countries.",
        points: 2000,
        category: "Donation",
      },
    ],
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

  // Filter and sort products
  const filterAndSortProducts = (productList: any[]) => {
    let filtered = productList

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort products
    switch (sortOption) {
      case "price-low":
        return [...filtered].sort((a, b) => a.points - b.points)
      case "price-high":
        return [...filtered].sort((a, b) => b.points - a.points)
      case "newest":
      default:
        return filtered
    }
  }

  // Handle adding item to cart
  const handleAddToCart = (id: string) => {
    const product = [...products.featured, ...products.all, ...products.digital, ...products.donations].find(
      (p) => p.id === id,
    )

    if (!product) return

    addToCart(product)

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  // Handle checkout
  const handleCheckout = () => {
    if (totalCartPoints > points) {
      toast({
        title: "Insufficient points",
        description: "You don't have enough points to complete this purchase.",
        variant: "destructive",
      })
      return
    }

    // Process checkout
    toast({
      title: "Order placed successfully!",
      description: `You've redeemed ${totalCartPoints} points for your items.`,
    })

    // Clear cart
    clearCart()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedGradientBackground />

      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/60 border-b border-white/10">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <MobileNav />
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <Coins className="h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">{points.toLocaleString()} points</span>
            </div>
            <CartDrawer
              cartItems={cartItems}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateCartItemQuantity}
              onCheckout={handleCheckout}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <motion.div className="flex flex-col gap-8" variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-green-500" />
                    Marketplace
                  </h1>
                  <p className="text-muted-foreground mt-1">Redeem your points for eco-friendly products and rewards</p>
                </div>
                <div className="md:hidden flex items-center gap-2 text-sm bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                  <Coins className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-500">{points.toLocaleString()} points</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <FuturisticCard className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold">Earn More, Redeem More</h3>
                    <p className="text-muted-foreground">
                      Complete challenges to earn points and unlock premium rewards.
                    </p>
                  </div>
                  <FuturisticButton asChild>
                    <a href="/challenges">View Challenges</a>
                  </FuturisticButton>
                </div>
              </FuturisticCard>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Points: Low to High</SelectItem>
                      <SelectItem value="price-high">Points: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <FuturisticButton variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </FuturisticButton>
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6 bg-background/50 p-1 rounded-lg">
                  <TabsTrigger
                    value="featured"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                  >
                    Featured
                  </TabsTrigger>
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                  >
                    All Products
                  </TabsTrigger>
                  <TabsTrigger
                    value="digital"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                  >
                    Digital
                  </TabsTrigger>
                  <TabsTrigger
                    value="donations"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500 rounded-md"
                  >
                    Donations
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="featured" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filterAndSortProducts(products.featured).map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        points={product.points}
                        category={product.category}
                        isNew={product.isNew}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>

                  {filterAndSortProducts(products.featured).length === 0 && (
                    <FuturisticCard className="p-8 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No products found</h3>
                        <p className="text-sm text-muted-foreground">Try a different search term</p>
                      </div>
                    </FuturisticCard>
                  )}
                </TabsContent>

                <TabsContent value="all" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filterAndSortProducts(products.all).map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        points={product.points}
                        category={product.category}
                        isNew={product.isNew}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>

                  {filterAndSortProducts(products.all).length === 0 && (
                    <FuturisticCard className="p-8 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No products found</h3>
                        <p className="text-sm text-muted-foreground">Try a different search term</p>
                      </div>
                    </FuturisticCard>
                  )}
                </TabsContent>

                <TabsContent value="digital" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filterAndSortProducts(products.digital).map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        points={product.points}
                        category={product.category}
                        isNew={product.isNew}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>

                  {filterAndSortProducts(products.digital).length === 0 && (
                    <FuturisticCard className="p-8 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No digital products found</h3>
                        <p className="text-sm text-muted-foreground">Try a different search term</p>
                      </div>
                    </FuturisticCard>
                  )}
                </TabsContent>

                <TabsContent value="donations" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filterAndSortProducts(products.donations).map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        points={product.points}
                        category={product.category}
                        isNew={product.isNew}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>

                  {filterAndSortProducts(products.donations).length === 0 && (
                    <FuturisticCard className="p-8 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No donations found</h3>
                        <p className="text-sm text-muted-foreground">Try a different search term</p>
                      </div>
                    </FuturisticCard>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </main>

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
