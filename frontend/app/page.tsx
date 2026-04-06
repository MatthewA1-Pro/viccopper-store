import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/src/features/landing/navbar';
import { Hero } from '@/src/features/landing/hero';
import { Features } from '@/src/features/landing/features';
import { CTA } from '@/src/features/landing/cta';
import { Footer } from '@/src/features/landing/footer';
import type { Metadata } from 'next';

const SplashCursor = dynamic(() => import('@/src/components/ui/splash-cursor'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'NovaSaaS — Fluid SaaS Integration',
  description: 'The all-in-one SaaS platform with a premium fluid interface.',
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 antialiased">
      {/* Background Gradient Layer */}
      <div className="fixed inset-0 bg-gradient-dark z-[-2]" />
      
      <Suspense fallback={null}>
        <SplashCursor />
      </Suspense>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
