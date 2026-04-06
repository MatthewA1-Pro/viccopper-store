"use client";

import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-background pt-32 pb-16 overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-24">
          {/* Newsletter Signup */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Status Update</p>
              <h3 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.9]">Join the <span className="text-stroke opacity-30">VICCOOPPER</span> Roster</h3>
              <p className="text-sm font-medium tracking-tight text-muted-foreground leading-relaxed max-w-md italic">
                "Be the first to access our limited-run collections and technical insights."
              </p>
            </div>
            
            <form className="relative max-w-md group bg-white/5 p-4 border border-white/5 transition-all focus-within:border-accent">
               <input 
                 type="email" 
                 placeholder="Enter Intelligence Address (Email)" 
                 className="w-full bg-transparent border-none outline-none font-bold tracking-widest text-[10px] uppercase placeholder:text-muted-foreground/30 py-2"
               />
               <button className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors">
                 <ArrowRight size={20} />
               </button>
            </form>
          </div>

          {/* Site Map */}
          <div className="space-y-8">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Navigation</p>
            <div className="flex flex-col space-y-4">
              {["Shop", "About", "Our Philosophy", "Technicals", "Contact"].map((link) => (
                <Link 
                  key={link} 
                  href={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-bold tracking-widest uppercase hover:text-accent transition-all duration-300"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Social / Legal */}
          <div className="space-y-16">
            <div className="space-y-8">
               <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Terminal</p>
               <div className="flex space-x-6">
                 <Instagram size={20} strokeWidth={1.5} className="hover:text-accent cursor-pointer transition-colors" />
                 <Twitter size={20} strokeWidth={1.5} className="hover:text-accent cursor-pointer transition-colors" />
                 <Youtube size={20} strokeWidth={1.5} className="hover:text-accent cursor-pointer transition-colors" />
               </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Privacy Protocol</p>
              <div className="flex flex-col space-y-2 opacity-50 text-[10px] font-bold tracking-widest uppercase">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-white/5 pt-16 space-y-8 md:space-y-0">
          <div className="space-y-4">
             <span className="text-4xl font-black tracking-[0.2em] uppercase opacity-10">VICCOOPPER STUDY</span>
             <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground">© 2026 VICCOOPPER STUDIO. ALL RIGHTS RESERVED.</p>
          </div>
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground/30">BUILT FOR DESTINATION: FUTURE</p>
        </div>
      </div>
    </footer>
  );
}
