"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
  {
    id: "men",
    name: "Men",
    image: "https://images.unsplash.com/photo-1516826957135-700ede19c6ce?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=men"
  },
  {
    id: "women",
    name: "Women",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=women"
  },
  {
    id: "streetwear",
    name: "Streetwear",
    image: "https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=streetwear"
  },
  {
    id: "essentials",
    name: "Essentials",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=essentials"
  },
];

export function FeaturedCollections() {
  return (
    <section className="section bg-background overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 space-y-4 md:space-y-0">
          <div className="space-y-4">
             <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Curated Drops</p>
             <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Featured Collections</h2>
          </div>
          <Link 
            href={"/shop" as any} 
            className="group flex items-center space-x-2 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            <span>View All</span>
            <div className="w-12 h-px bg-muted-foreground/30 transition-all group-hover:w-16 group-hover:bg-accent" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {COLLECTIONS.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] overflow-hidden bg-white/5"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-black/0 opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">0{index + 1}</p>
                <h3 className="text-3xl font-black tracking-tighter uppercase mb-6 group-hover:text-accent transition-colors">{collection.name}</h3>
                <Link href={collection.href as any}>
                   <button className="flex items-center space-x-3 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase overflow-hidden group/btn">
                      <span className="relative">
                        Explore
                        <div className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover/btn:w-full" />
                      </span>
                      <ArrowRight size={16} className="-translate-x-full opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-500" />
                   </button>
                </Link>
              </div>
              
              {/* Architectural Border Effect */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-accent/30 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
