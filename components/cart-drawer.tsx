"use client"

import { FuturisticButton } from "@/components/futuristic-button"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import type { CartItem } from "@/context/eco-context"

interface CartDrawerProps {
  cartItems: CartItem[]
  onRemoveItem: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onCheckout: () => void
}

export function CartDrawer({ cartItems, onRemoveItem, onUpdateQuantity, onCheckout }: CartDrawerProps) {
  const [open, setOpen] = useState(false)

  const totalPoints = cartItems.reduce((total, item) => total + item.points * item.quantity, 0)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">Browse the marketplace to add items to your cart</p>
            </div>
            <FuturisticButton onClick={() => setOpen(false)}>Continue Shopping</FuturisticButton>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <div className="h-full w-full bg-[url('/placeholder.svg?height=64&width=64')] bg-cover bg-center" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-sm text-green-500">
                          <span>{item.points.toLocaleString()} points</span>
                        </div>

                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-r-none"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            <span>-</span>
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <div className="h-6 px-2 flex items-center justify-center border-y">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-l-none"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <span>+</span>
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SheetFooter className="border-t pt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-green-500">{totalPoints.toLocaleString()} points</span>
                </div>
                <FuturisticButton
                  className="w-full"
                  onClick={() => {
                    onCheckout()
                    setOpen(false)
                  }}
                >
                  Checkout
                </FuturisticButton>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
