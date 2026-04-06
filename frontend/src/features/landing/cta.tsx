import React from 'react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export const CTA = () => {
  return (
    <section className="py-40 px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto rounded-[3rem] border border-white/5 bg-gradient-to-tr from-primary/20 to-accent/20 backdrop-blur-3xl p-12 md:p-24 text-center space-y-10 animate-fade-in shadow-2xl">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black leading-[1.1]">
            Ready to change the <br/>
            way you <span className="drop-shadow-glow">Build?</span>
          </h2>
          <p className="text-xl text-muted-dark-foreground max-w-2xl mx-auto font-medium">
            Join thousands of developers and teams delivering better software through our unified SaaS platform.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button variant="hero" size="xl" asChild>
            <Link href="/register">Get Started Free</Link>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <Link href="/pricing">View Plans</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
