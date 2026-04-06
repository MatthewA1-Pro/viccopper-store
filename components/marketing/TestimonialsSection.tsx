"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "VICCOOPPER represents the pinnacle of technical streetwear. The architectural silhouettes are unlike anything else in the market.",
    author: "MARCUS V.",
    role: "CREATIVE DIRECTOR"
  },
  {
    quote: "The quality of the 450GSM fleece is exceptional. It's rare to find a brand that balances futuristic design with such high-end construction.",
    author: "ELARA K.",
    role: "FASHION ARCHIVIST"
  },
  {
    quote: "Frictionless acquisition process. The technical specs on the product page gave me the confidence to invest in the Vantage Parka.",
    author: "JUXTA P.",
    role: "TECH ENTHUSIAST"
  }
];

export function TestimonialsSection() {
  return (
    <section className="section bg-background py-40 border-t border-white/5">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-20">
           <div className="space-y-4">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Social Proof</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Verified Feedback</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-12 border border-white/5 bg-white/5 space-y-8 relative group hover:border-accent/30 transition-all duration-500"
                >
                  <Quote size={24} className="text-accent opacity-20 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm font-medium tracking-tight text-white leading-relaxed italic uppercase">
                    "{t.quote}"
                  </p>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white">{t.author}</p>
                     <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-muted-foreground">{t.role}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
