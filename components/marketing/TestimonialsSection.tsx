"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { BackgroundSplash } from "@/components/ui/BackgroundSplash";

const TESTIMONIALS = [
  {
    quote: "VICCOOPPER represents the pinnacle of technical streetwear. The architectural silhouettes are unlike anything else in the market.",
    author: "MARCUS V.",
    role: "CREATIVE DIRECTOR",
    image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800&auto=format&fit=crop"
  },
  {
    quote: "The quality of the 450GSM fleece is exceptional. It's rare to find a brand that balances futuristic design with such high-end construction.",
    author: "ELARA K.",
    role: "FASHION ARCHIVIST",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop"
  },
  {
    quote: "Frictionless acquisition process. The technical specs on the product page gave me the confidence to invest in the Vantage Parka.",
    author: "JUXTA P.",
    role: "TECH ENTHUSIAST",
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=800&auto=format&fit=crop"
  }
];

export function TestimonialsSection() {
  return (
    <section className="section bg-transparent py-40 border-t border-white/5 relative overflow-hidden">
      {/* Background Splash Animation */}
      <div className="absolute inset-0 z-0 opacity-50">
        <BackgroundSplash />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background z-0" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-20">
           <div className="space-y-4">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Social Proof</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Verified Feedback</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-12 border border-white/5 bg-black/40 backdrop-blur-md relative group hover:border-accent/30 transition-all duration-500 overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute inset-0 z-0 overflow-hidden">
                     <img src={t.image} alt="Cloth Texture" className="w-full h-full object-cover opacity-[0.1] group-hover:opacity-[0.25] group-hover:scale-110 transition-all duration-[2s] grayscale mix-blend-screen" />
                  </div>
                  
                  <div className="relative z-10 space-y-8 flex flex-col items-center">
                    <Quote size={24} className="text-accent opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    <p className="text-sm font-medium tracking-tight text-white leading-relaxed italic uppercase drop-shadow-md">
                      "{t.quote}"
                    </p>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white drop-shadow">{t.author}</p>
                       <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-accent">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
