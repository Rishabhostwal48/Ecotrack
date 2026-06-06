import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { EcoProvider } from "@/context/eco-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EcoTrack - Carbon Footprint Calculator",
  description: "Track and reduce your carbon footprint with EcoTrack by Team OmniXForge",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="ecotrack-theme">
          <EcoProvider>
            {children}
            <Toaster />
          </EcoProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'