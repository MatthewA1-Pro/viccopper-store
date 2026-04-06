"use client";

import { useCart } from "@/src/store/useCart";
import { cn } from "@/lib/utils";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { items, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = items.reduce((acc, current) => acc + current.quantity, 0);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b py-4" : "bg-transparent py-8"
      )}
    >
      <div className="container px-6 mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={1} />
        </button>

        {/* Brand Logo */}
        <Link 
          href="/" 
          className="text-2xl font-black tracking-[0.4em] uppercase transition-all duration-300 hover:opacity-70"
        >
          VICCOOPPER
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:text-accent",
                pathname === link.href ? "text-accent" : "text-foreground/70"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 right-0 h-[1px] bg-accent"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button className="hidden md:block text-foreground/70 transition-colors hover:text-accent">
            <Search size={20} strokeWidth={1} />
          </button>
          <button className="hidden md:block text-foreground/70 transition-colors hover:text-accent">
            <User size={20} strokeWidth={1} />
          </button>
          <button 
            className="group relative flex items-center"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag 
              size={24} 
              strokeWidth={1} 
              className="text-foreground transition-all duration-300 group-hover:scale-110" 
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-none bg-accent text-[8px] font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background lg:hidden p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-20">
              <span className="text-2xl font-black tracking-widest text-[#FFF]">VICCOOPPER</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>
            <div className="flex flex-col space-y-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black tracking-tighter uppercase transition-colors hover:text-accent"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto space-y-8">
              <div className="flex space-x-8">
                <Search size={24} />
                <User size={24} />
              </div>
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">VICCOOPPER © 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
