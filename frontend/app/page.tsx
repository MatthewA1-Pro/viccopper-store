import Navbar         from '@/components/marketing/Navbar';
import HeroSection    from '@/components/marketing/HeroSection';
import FeaturesSection from '@/components/marketing/FeaturesSection';
import PricingSection  from '@/components/marketing/PricingSection';
import FAQSection      from '@/components/marketing/FAQSection';
import Footer          from '@/components/marketing/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NovaSaaS — Build Smarter, Scale Faster',
  description: 'The all-in-one SaaS platform that gives your team superpowers.',
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Social proof */}
        <section style={{ padding: '40px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: 24, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              Trusted by 12,000+ teams at
            </p>
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              {['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Stark Industries'].map(co => (
                <span key={co} style={{
                  fontSize: '1.125rem', fontWeight: 800, color: '#334155',
                  letterSpacing: '-0.02em',
                }}>{co}</span>
              ))}
            </div>
          </div>
        </section>

        <FeaturesSection />

        {/* Testimonials */}
        <section className="section" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="badge badge-indigo" style={{ marginBottom: 16 }}>Testimonials</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Loved by <span className="text-gradient">thousands of teams</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {[
                { name: 'Sarah K.',  role: 'CTO @ Velox', quote: 'NovaSaaS cut our deployment time by 70%. The workflow automation alone paid for itself in the first month.', stars: 5 },
                { name: 'James M.', role: 'CEO @ Foundry', quote: "We evaluated 6 platforms. NovaSaaS won on reliability, developer experience, and price. It's not even close.", stars: 5 },
                { name: 'Priya S.', role: 'Head of Eng @ Apex', quote: 'The API-first design let us integrate everything in a weekend. Our team productivity is through the roof.', stars: 5 },
              ].map(t => (
                <div key={t.name} className="card glass-hover" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <span key={i} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>
                    ))}
                  </div>
                  <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.9375rem', fontStyle: 'italic' }}>"{t.quote}"</p>
                  <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.9375rem' }}>{t.name}</p>
                    <p style={{ color: '#475569', fontSize: '0.8125rem' }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingSection />
        <FAQSection />

        {/* Final CTA */}
        <section className="section" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="orb orb-indigo" style={{ width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Ready to build something <span className="text-gradient">amazing?</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.125rem', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>
              Join 12,000+ teams already shipping faster with NovaSaaS. Start free, no credit card needed.
            </p>
            <Link href="/register" className="btn btn-primary btn-lg animate-pulse-glow">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
