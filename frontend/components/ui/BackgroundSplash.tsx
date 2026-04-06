"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundSplash() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Animated Liquid Splashes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            scale: 0.5,
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%" 
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1],
            x: [
              (Math.random() * 20 - 10) + "vw", 
              (Math.random() * 20 - 10) + "vw",
              (Math.random() * 20 - 10) + "vw"
            ],
            y: [
              (Math.random() * 20 - 10) + "vh", 
              (Math.random() * 20 - 10) + "vh",
              (Math.random() * 20 - 10) + "vh"
            ]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: i % 2 === 0 ? "rgba(0, 102, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
            filter: "blur(120px)",
          }}
        />
      ))}

      {/* Grainy Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
