import React from 'react';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-lg font-bold">NovaSaaS</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-dark-foreground font-medium">
          <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy</Link>
          <Link href="/blog" className="hover:text-white transition-colors duration-300">Blog</Link>
          <Link href="/changelog" className="hover:text-white transition-colors duration-300">Changelog</Link>
        </div>
        
        <div className="text-sm text-muted-dark-foreground font-medium">
          &copy; {new Date().getFullYear()} NovaSaaS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
