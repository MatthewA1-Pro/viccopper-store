"use client";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Send, MapPin, Mail, Phone, Instagram, Twitter, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message transmitted. Standing by.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex flex-col w-full bg-background pt-40 min-h-screen">
      <div className="container px-6 mx-auto mb-32">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            
            {/* Left: Info */}
            <div className="space-y-16">
               <div className="space-y-4">
                  <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Protocol: Interface</p>
                  <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">Connect<br />with the <span className="text-stroke opacity-30">Studio</span></h1>
                  <p className="text-lg md:text-xl font-medium tracking-tight text-muted-foreground leading-relaxed italic max-w-sm pt-8 border-l border-white/5 pl-8">
                     "Our human interface terminals are available for press inquiries and technical collaboration."
                  </p>
               </div>

               <div className="space-y-12">
                  <div className="flex items-center space-x-8 group">
                     <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:bg-accent group-hover:border-accent transition-all duration-500"><Mail size={16} /></div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Digital Address</p>
                        <p className="text-sm font-bold tracking-widest uppercase">nexus@viccoopper.tech</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-8 group">
                     <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:bg-accent group-hover:border-accent transition-all duration-500"><MapPin size={16} /></div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Physical Node</p>
                        <p className="text-sm font-bold tracking-widest uppercase">Shibuya District, Tokyo JP / Brera, Milan IT</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-8 group">
                     <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:bg-accent group-hover:border-accent transition-all duration-500"><Phone size={16} /></div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Comm Line</p>
                        <p className="text-sm font-bold tracking-widest uppercase">+81 03-XXXX-XXXX</p>
                     </div>
                  </div>
               </div>

               <div className="pt-8 flex space-x-12">
                  {[Instagram, Twitter, MessageSquare].map((Icon, i) => (
                    <motion.div 
                       key={i}
                       whileHover={{ y: -5 }}
                       className="text-muted-foreground hover:text-accent cursor-pointer transition-colors"
                    >
                       <Icon size={24} strokeWidth={1} />
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="bg-white/5 border border-white/5 p-8 md:p-16 space-y-12 relative overflow-hidden"
            >
               <div className="space-y-2">
                  <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Transmission Protocol</p>
                  <h2 className="text-3xl font-black uppercase tracking-tight">Direct Interface</h2>
               </div>

               <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2 group">
                       <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground group-focus-within:text-accent transition-colors">Identification</label>
                       <input 
                         required
                         type="text" 
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         placeholder="Your Name" 
                         className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase placeholder:text-muted-foreground/30 focus:border-accent transition-colors" 
                       />
                    </div>
                    <div className="space-y-2 group">
                       <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground group-focus-within:text-accent transition-colors">Digital Point</label>
                       <input 
                         required
                         type="email" 
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                         placeholder="Intelligence@domain.com" 
                         className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase placeholder:text-muted-foreground/30 focus:border-accent transition-colors" 
                       />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                     <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground group-focus-within:text-accent transition-colors">Subject Header</label>
                     <input 
                       type="text" 
                       value={formData.subject}
                       onChange={(e) => setFormData({...formData, subject: e.target.value})}
                       placeholder="Inquiry / Press / Collaboration" 
                       className="w-full bg-transparent border-b border-white/10 py-4 outline-none font-bold tracking-widest text-sm uppercase placeholder:text-muted-foreground/30 focus:border-accent transition-colors" 
                     />
                  </div>

                  <div className="space-y-4 group">
                     <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground group-focus-within:text-accent transition-colors">Message Context</label>
                     <textarea 
                       required
                       rows={6}
                       value={formData.message}
                       onChange={(e) => setFormData({...formData, message: e.target.value})}
                       placeholder="Enter detailed transmission content here..." 
                       className="w-full bg-transparent border border-white/10 p-6 outline-none font-bold tracking-widest text-xs uppercase placeholder:text-muted-foreground/10 focus:border-accent transition-colors resize-none" 
                     />
                  </div>

                  <Button size="full" className="group">
                    <span>Initiate Transmission</span>
                    <Send size={14} className="ml-3 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                  </Button>
               </form>

               {/* Decorative watermark */}
               <div className="absolute right-4 bottom-4 opacity-[0.02] text-6xl font-black tracking-widest pointer-events-none select-none">
                 VICCOOPPER CX
               </div>
            </motion.div>
         </div>
      </div>

      {/* Aesthetic Image / Map Section */}
      <section className="h-[60vh] relative grayscale hover:grayscale-0 transition-all duration-700 group overflow-hidden border-t border-white/5">
         <Image src="https://images.unsplash.com/photo-1492691523567-6119e2aa9ef1?q=80&w=3540&auto=format&fit=crop" alt="Tokyo District" fill className="object-cover transition-transform duration-[10s] group-hover:scale-105" />
         <div className="absolute inset-0 bg-black/40" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 border border-white/5 bg-black/40 backdrop-blur-xl p-12 transition-all group-hover:border-accent/40">
               <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Base Command</p>
               <h3 className="text-4xl font-black tracking-tighter uppercase">Shibuya District 01</h3>
               <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">35.6584° N, 139.7022° E</p>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
