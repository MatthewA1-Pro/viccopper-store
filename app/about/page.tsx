"use client";

import { Footer } from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Box, Compass, Cpu, Layers } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-background pt-40 overflow-hidden">
      
      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col items-center justify-center text-center space-y-16 overflow-hidden">
         {/* Background Image Image */}
         <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=3540&auto=format&fit=crop" 
             alt="VicCoopper Manifesto Background" 
             className="w-full h-full object-cover opacity-20 grayscale"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />
         </div>

         <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 space-y-4 container px-6 mx-auto"
         >
           <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Manifesto v2.0</p>
           <h1 className="text-7xl sm:text-[10rem] md:text-[15rem] font-black tracking-tighter uppercase leading-[0.8] mb-12">
             <span className="block">BEYOND</span>
             <span className="block text-stroke opacity-30">TEXTURE</span>
           </h1>
           <p className="text-lg md:text-2xl font-medium tracking-tight text-white leading-relaxed max-w-2xl mx-auto italic drop-shadow-xl">
             "VICCOOPPER STUDIO is not a brand. It is an exploration of architectural silhouettes in the age of post-digital transit."
           </p>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1.5 }}
           className="h-24 w-px bg-white/20 relative z-10 overflow-hidden"
         >
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-accent/50"
            />
         </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="section bg-[#050505] relative z-10 border-y border-white/5 py-60">
         <div className="container px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-20">
               <div className="space-y-4">
                  <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">The Philosophy</p>
                  <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">Architectural Integrity</h2>
               </div>
               
               <div className="space-y-12">
                  <p className="text-xl md:text-2xl font-bold tracking-tight text-white leading-relaxed opacity-80">
                    We believe clothing should function as a shelter for the soul. Each seam is calculated, each fabric is tested for its behavioral response to the human form in motion.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                     {[
                       { icon: <Box size={24} />, title: "Structure", desc: "Rigid silhouettes that maintain their form regardless of external pressure." },
                       { icon: <Cpu size={24} />, title: "Tech", desc: "Integration of smart textiles and high-performance technical membranes." },
                       { icon: <Layers size={24} />, title: "Layering", desc: "Modular systems designed for rapid adaptation to climate shifts." },
                       { icon: <Compass size={24} />, title: "Direction", desc: "A forward-facing aesthetic that ignores cyclical trends." }
                     ].map((item, i) => (
                       <div key={i} className="space-y-4 border-l border-white/5 pl-6 group">
                          <div className="text-accent group-hover:scale-110 transition-transform">{item.icon}</div>
                          <h3 className="text-xs font-black tracking-[0.2em] uppercase">{item.title}</h3>
                          <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase leading-loose">{item.desc}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="relative aspect-[4/5] bg-white/5 border border-white/5 group overflow-hidden">
               <Image 
                 src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
                 alt="VICCOOPPER Narrative" 
                 fill 
                 className="object-cover opacity-50 grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[3s]" 
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent" />
               <div className="absolute right-4 bottom-4 opacity-[0.02] text-6xl font-black tracking-widest pointer-events-none select-none">
                 VICCOOPPER CX
               </div>
            </div>
         </div>
      </section>

      {/* The Grid / Statistics */}
      <section className="section bg-background py-40 relative">
        <div className="container px-6 mx-auto">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-32">
              {[
                { label: "Studio Location", value: "TOKYO / MILAN" },
                { label: "Founded", value: "2024.V1" },
                { label: "Fabric Partners", value: "GORE-TEX / COR" },
                { label: "Global Nodes", value: "128 ACCESS POINTS" }
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-4 group">
                   <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent group-hover:text-white transition-colors">{stat.label}</p>
                   <p className="text-xl md:text-2xl font-black tracking-tighter uppercase whitespace-nowrap">{stat.value}</p>
                </div>
              ))}
           </div>
        </div>
        <div className="absolute right-0 top-0 opacity-[0.02] text-[12rem] leading-none font-black tracking-widest select-none pointer-events-none rotate-90 translate-x-1/2 translate-y-1/2">
         VICCOOPPER
        </div>
      </section>

      {/* Full Width Imagery */}
      <section className="h-[80vh] relative overflow-hidden group">
         <Image 
           src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=3540&auto=format&fit=crop" 
           alt="VICCOOPPER Landscape" 
           fill 
           className="object-cover transition-transform duration-[10s] group-hover:scale-110" 
         />
         <div className="absolute inset-0 bg-black/40" />
         <div className="absolute inset-0 flex items-center justify-center text-center">
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-opacity cursor-default">EVOLVE</h2>
         </div>
      </section>

      <Footer />
    </div>
  );
}
