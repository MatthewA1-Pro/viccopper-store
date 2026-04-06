import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 min-h-[90vh]">
      <div className="z-10 text-center max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-sm font-medium animate-fade-in opacity-80">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>New: AI-Powered Insights are live!</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] animate-fade-up">
          Build <span className="bg-clip-text text-transparent bg-gradient-primary">Smarter.</span><br/>
          Scale <span className="text-white">Faster.</span>
        </h1>
        
        <p className="text-xl text-muted-dark-foreground font-medium max-w-2xl mx-auto animate-fade-up delay-100">
          The all-in-one SaaS platform that gives your team superpowers. Automate workflows, centralize data, and ship faster.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-200">
          <Button variant="hero" size="xl" asChild>
            <Link href="/register">Start Building Free <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
