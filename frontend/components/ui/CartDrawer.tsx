"use client";

import { useCart } from "@/src/store/useCart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "./Button";
import { Plus, Minus, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce((acc, current) => acc + current.price * current.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-background/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[100] h-full w-[400px] border-l bg-background p-8 flex flex-col shadow-2xl mobile:w-full"
          >
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-xl font-bold tracking-widest uppercase">Cart</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Close cart"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar -mx-8 px-8">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-8 opacity-0 animate-fade-in">
                  <ShoppingBagIcon className="h-12 w-12 text-muted-foreground/30" />
                  <div className="text-center space-y-4">
                    <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Empty Cart</p>
                    <p className="text-sm text-muted-foreground/70 max-w-[200px]">Find something that fits your futuristic edge.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="md" 
                    onClick={() => setIsOpen(false)}
                  >
                    Explore Shop
                  </Button>
                </div>
              ) : (
                <div className="space-y-12">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex space-x-6">
                      <div className="relative h-28 w-24 overflow-hidden bg-white/5 border border-white/10 group">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-bold tracking-wide uppercase">{item.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground/50 hover:text-red-500 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                            {item.size && `Size: ${item.size}`} {item.color && `· ${item.color}`}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 border border-white/10 px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-bold tracking-widest">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="mt-auto space-y-8 pt-12 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-bold tracking-widest">{formatCurrency(subtotal)}</span>
                </div>
                <Button size="full" className="group">
                  <span>Checkout</span>
                  <motion.div 
                    className="ml-3 h-px w-0 bg-white transition-all group-hover:w-8"
                    initial={false}
                  />
                </Button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShoppingBagIcon(props: any) {
  return (
    <svg 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1} 
      stroke="currentColor" 
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}
