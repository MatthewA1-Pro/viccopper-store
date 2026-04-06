"use client";

import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* Background Imagery */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0 bg-black/40 mix-blend-overlay"
      >
        <Image
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2487&auto=format&fit=crop"
          alt="VICCOOPPER Luxury Aesthetics"
          fill
          className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
           className="space-y-12"
        >
          <div className="space-y-4">
             <motion.p 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase text-accent"
             >
               Spring / Summer 2026
             </motion.p>
             <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase max-w-[1000px] mx-auto overflow-hidden">
               <motion.span 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                 className="block"
               >
                 Own Your Style.
               </motion.span>
               <motion.span 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                 className="block opacity-40 text-stroke"
               >
                 Define Your Presence.
               </motion.span>
             </h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12"
          >
            <Link href={"/shop" as any}>
              <Button size="lg" className="group min-w-[240px]">
                <span>Shop Now</span>
                <ArrowRight size={16} className="ml-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <div className="text-left hidden sm:flex flex-col items-start border-l border-white/20 pl-8 h-12 justify-center">
              <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Limited Release</p>
              <p className="text-sm font-bold tracking-tight">V02 Architectural Series</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative lines & elements */}
      <div className="absolute left-12 bottom-12 hidden md:block group cursor-default h-[120px] overflow-hidden">
        <motion.div 
           animate={{ y: [0, -60, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="flex flex-col space-y-4"
        >
          <div className="h-10 border-l border-white/10" />
          <div className="h-2 w-2 rounded-none bg-accent" />
          <div className="h-32 border-l border-white/10" />
        </motion.div>
      </div>

      <div className="absolute right-12 bottom-12 hidden md:flex flex-col items-end space-y-2 opacity-30 group cursor-default">
         <span className="text-[10px] font-black tracking-widest uppercase rotate-90 origin-right translate-x-2 translate-y-12 whitespace-nowrap">SCROLL TO DISCOVER</span>
         <div className="h-12 border-r border-white/10" />
      </div>

      <motion.div 
        style={{ translateY, opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <div className="h-12 w-px bg-white/20 relative overflow-hidden">
           <motion.div 
             animate={{ y: ["-100%", "100%"] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 left-0 w-full h-1/2 bg-accent"
           />
        </div>
      </motion.div>
    </section>
  );
}
