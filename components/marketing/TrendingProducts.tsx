"use client";

import { PRODUCTS } from "@/src/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TrendingProducts() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section 
      ref={containerRef}
      className="section bg-background overflow-hidden py-32"
    >
      <div className="container px-6 mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 relative z-10">
        <div className="space-y-4">
           <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Active Drops</p>
           <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Best Sellers</h2>
        </div>
        <Link 
          href={"/shop" as any} 
          className="group flex items-center space-x-2 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-all duration-300"
        >
          <span>See Trending</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="relative w-full overflow-hidden no-scrollbar cursor-grab px-6 md:px-0">
         <motion.div 
           style={{ x }}
           className="flex space-x-8 md:space-x-12 px-6"
         >
           {PRODUCTS.map((product) => (
             <div key={product.id} className="min-w-[320px] max-w-[400px]">
               <ProductCard product={product} />
             </div>
           ))}
         </motion.div>
      </div>
    </section>
  );
}

export function BrandIdentity() {
  return (
    <section className="section bg-[#050505] relative overflow-hidden py-40">
       <div className="container px-6 mx-auto relative z-10">
         <div className="max-w-4xl mx-auto space-y-24 text-center">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="space-y-8"
            >
               <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                 Engineered for the <span className="text-stroke opacity-30">Modern Voyager</span>
               </h2>
               <p className="text-lg md:text-xl font-medium tracking-tight text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
                 "Our philosophy is simple: Technical precision meets architectural silhouette. We build for those who inhabit the transit between digital and physical."
               </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
               {[
                 { label: "Technical Fabrics", sub: "Gore-Tex / Dyneema" },
                 { label: "Craftsmanship", sub: "Hand-finished / QC" },
                 { label: "Vision", sub: "Future-Forward / Gen Z" }
               ].map((item, index) => (
                 <motion.div 
                    key={item.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="space-y-2"
                 >
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">{item.label}</p>
                    <p className="text-sm font-bold tracking-widest">{item.sub}</p>
                 </motion.div>
               ))}
            </div>

            {/* Added Imagery to prevent scanty feeling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-24">
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="relative aspect-square border border-white/5 overflow-hidden group"
               >
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop" 
                    alt="VicCoopper Collection" 
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" 
                  />
                  <div className="absolute inset-0 bg-black/20" />
               </motion.div>
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative aspect-square border border-white/5 overflow-hidden group"
               >
                  <img 
                    src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1200&auto=format&fit=crop" 
                    alt="VicCoopper Vision" 
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" 
                  />
                  <div className="absolute inset-0 bg-black/20" />
               </motion.div>
            </div>
         </div>
       </div>

       {/* Decorative Watermark */}
       <div className="absolute right-0 top-0 opacity-[0.02] text-[15rem] leading-none font-black tracking-widest select-none pointer-events-none rotate-90 translate-x-1/2 translate-y-1/2">
         VICCOOPPER
       </div>
    </section>
  );
}
