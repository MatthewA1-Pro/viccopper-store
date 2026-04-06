"use client";

import { useCart } from "@/src/store/useCart";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Truck, ArrowRight, ChevronLeft, CreditCard, ShoppingBag, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  const subtotal = useMemo(() => items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0), [items]);
  const shipping = 2500; // $25 flat
  const tax = Math.round(subtotal * 0.08); // 8%
  const total = subtotal + shipping + tax;

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
      toast.success("Order Authenticated. Shipping sequence initiated.");
    }, 2500);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background space-y-8 pt-40">
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Protocol Error: Empty Sequence</p>
        <h1 className="text-4xl font-black uppercase">No assets found in terminal</h1>
        <Button onClick={() => router.push("/shop")}>Return to Shop</Button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background space-y-16 pt-40">
        <div className="relative">
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: "spring", damping: 12 }}
             className="w-32 h-32 border-4 border-accent flex items-center justify-center text-accent"
           >
              <ShieldCheck size={64} strokeWidth={1} />
           </motion.div>
           <motion.div 
             animate={{ opacity: [0.1, 0.4, 0.1] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute -inset-8 border border-accent/20"
           />
        </div>

        <div className="text-center space-y-6 max-w-xl">
           <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Status: Order Confirmed</p>
           <h1 className="text-6xl font-black uppercase tracking-tighter">Transmission Successful</h1>
           <p className="text-sm font-bold tracking-widest text-muted-foreground leading-relaxed uppercase italic">
             "Order #VC-7719-XP has been logged to the ledger. Your technical assets are being prepared for rapid transit."
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-6">
           <div className="p-8 border border-white/5 bg-white/5 text-center space-y-4">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Digital Receipt</p>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Sent to Terminal</p>
           </div>
           <div className="p-8 border border-white/5 bg-white/5 text-center space-y-4">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Tracking Protocol</p>
              <p className="text-sm font-bold uppercase tracking-widest">Active in 24H</p>
           </div>
        </div>

        <Button size="lg" className="min-w-[300px]" onClick={() => router.push("/")}>Return to Base</Button>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-background pt-40 min-h-screen">
      <div className="container px-6 mx-auto mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
        
        {/* Left: Form */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col space-y-16">
           <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[10px] font-black tracking-[0.4em] uppercase text-accent mb-4">
                 <span>Step 0{step}</span>
                 <span className="opacity-30">/</span>
                 <span className="opacity-30">Account Authorization</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">Checkout</h1>
           </div>

           <form onSubmit={handleProcessOrder} className="space-y-20">
              {/* Shipping Details */}
              <div className="space-y-12">
                 <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center space-x-4">
                       <span className="text-[12px] font-black text-accent">01</span>
                       <h2 className="text-lg font-black uppercase tracking-widest">Shipping Matrix</h2>
                    </div>
                 </div>

                 <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-2 group">
                          <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Identification</label>
                          <input required placeholder="First Name" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                       </div>
                       <div className="space-y-2 group">
                          <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground px-0">Last Name</label>
                          <input required placeholder="Last Name" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                       </div>
                    </div>
                    
                    <div className="space-y-2 group">
                       <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Physical Access Point (Address)</label>
                       <input required placeholder="123 Street Ave, Terminal 01" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                       <input required placeholder="City / Sector" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                       <input required placeholder="Province" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                       <input required placeholder="Access Code (Zip)" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                    </div>
                 </div>
              </div>

              {/* Payment Details (Mock) */}
              <div className="space-y-12">
                 <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center space-x-4">
                       <span className="text-[12px] font-black text-accent">02</span>
                       <h2 className="text-lg font-black uppercase tracking-widest">Financial Protocol</h2>
                    </div>
                    <div className="flex space-x-4">
                       <CreditCard size={18} className="opacity-40" />
                       <Terminal size={18} className="opacity-40" />
                    </div>
                 </div>

                 <div className="space-y-10">
                    <div className="space-y-2 group">
                       <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Cardholder Auth</label>
                       <input required placeholder="Full Name on Asset" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                    </div>
                    <div className="space-y-2 group">
                       <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Asset Identifier (Card Number)</label>
                       <input required placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <input required placeholder="Exp (MM/YY)" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                       <input required placeholder="Secret Code (CVV)" className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase focus:border-accent transition-colors" />
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-12 border-t border-white/5">
                 <Link href="/shop" className="group flex items-center space-x-3 text-[10px] font-black tracking-widest uppercase text-muted-foreground hover:text-white transition-all">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Cancel Sequence</span>
                 </Link>
                 <Button type="submit" size="lg" className="min-w-[240px]" disabled={isProcessing}>
                    {isProcessing ? (
                      <span className="animate-pulse">Authenticating...</span>
                    ) : (
                      <>
                        <span>Authorize Order</span>
                        <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                 </Button>
              </div>
           </form>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-12 xl:col-span-5 h-fit md:sticky md:top-40">
           <div className="bg-white/5 border border-white/5 p-8 md:p-12 space-y-12">
              <h2 className="text-xl font-black uppercase tracking-widest pb-4 border-b border-white/10">Order Summary</h2>
              
              <div className="space-y-8 max-h-[400px] overflow-y-auto no-scrollbar">
                 {items.map((item) => (
                   <div key={`${item.id}-${item.size}`} className="flex space-x-6 items-center">
                      <div className="relative h-20 w-16 overflow-hidden bg-black/40 border border-white/5">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-accent text-[8px] font-black text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 space-y-1">
                         <h3 className="text-xs font-black uppercase tracking-widest">{item.name}</h3>
                         <p className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">{item.size} / {item.color}</p>
                      </div>
                      <p className="text-xs font-black tracking-widest">{formatCurrency(item.price * item.quantity)}</p>
                   </div>
                 ))}
              </div>

              <div className="space-y-6 pt-12 border-t border-white/10">
                 <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    <span>Stealth Logistics (Shipping)</span>
                    <span>{formatCurrency(shipping)}</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    <span>Global Tax Protocol</span>
                    <span>{formatCurrency(tax)}</span>
                 </div>
                 <div className="flex justify-between items-center pt-6 text-xl font-black uppercase tracking-widest text-white border-t border-white/5">
                    <span>Total Access Cost</span>
                    <span className="text-accent">{formatCurrency(total)}</span>
                 </div>
              </div>

              <div className="flex flex-col space-y-4 pt-4">
                 <div className="flex items-center space-x-3 opacity-30 text-[9px] font-bold tracking-widest uppercase italic">
                    <ShieldCheck size={14} />
                    <span>Encrypted Connection Active</span>
                 </div>
              </div>
           </div>

           {/* Coupon/Promo Mock */}
           <div className="mt-8 relative group">
              <input placeholder="ENTER PROMO CODE" className="w-full bg-white/5 border border-white/5 p-5 text-[10px] font-black tracking-[0.3em] uppercase placeholder:text-muted-foreground/30 outline-none focus:border-accent/40" />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest uppercase text-accent">Apply</button>
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
