import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-md border-b border-white/5 animate-fade-in">
      <div className="flex items-center gap-2">
        <Sparkles className="w-8 h-8 text-primary animate-pulse-slow" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-primary tracking-tighter">
          NovaSaaS
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-dark-foreground">
        <Link href="#features" className="hover:text-white transition-colors duration-300">Features</Link>
        <Link href="#about" className="hover:text-white transition-colors duration-300">About</Link>
        <Link href="/pricing" className="hover:text-white transition-colors duration-300">Pricing</Link>
      </div>
      <div>
        <Button variant="hero" size="sm" asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
};
