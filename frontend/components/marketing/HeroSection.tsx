'use client';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, BarChart3 } from 'lucide-react';

const BADGES = ['No credit card required', '14-day free trial', 'Cancel anytime'];

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
        paddingBottom: 80,
      }}
      className="bg-grid"
    >
      {/* Glow Orbs */}
      <div className="orb orb-indigo" style={{ width: 600, height: 600, top: -100, left: -200 }} />
      <div className="orb orb-violet" style={{ width: 400, height: 400, top: 200, right: -100 }} />
      <div className="orb orb-cyan"   style={{ width: 300, height: 300, bottom: 0, left: '50%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Eyebrow tag */}
        <div className="animate-fade-up" style={{ marginBottom: 28 }}>
          <span className="badge badge-indigo">
            <Sparkles size={12} />
            Now in Public Beta — Join 12,000+ teams
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up delay-100"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 24,
            maxWidth: 900,
            margin: '0 auto 24px',
          }}
        >
          Build Smarter.{' '}
          <span className="text-gradient">Scale&nbsp;Faster.</span>
          <br />Ship with Confidence.
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-up delay-200"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94a3b8',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}
        >
          NovaSaaS gives your team an all-in-one command center—automate workflows,
          centralize analytics, and launch products at warp speed.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up delay-300"
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}
        >
          <Link href="/register" className="btn btn-primary btn-lg animate-pulse-glow">
            Start Free Trial <ArrowRight size={18} />
          </Link>
          <a href="#features" className="btn btn-secondary btn-lg">
            See how it works
          </a>
        </div>

        {/* Trust badges */}
        <div
          className="animate-fade-up delay-400"
          style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}
        >
          {BADGES.map(b => (
            <span key={b} style={{ fontSize: '0.8125rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#34d399' }}>✓</span> {b}
            </span>
          ))}
        </div>

        {/* Dashboard preview */}
        <div
          className="animate-fade-up delay-500 animate-float glass"
          style={{
            maxWidth: 900,
            margin: '0 auto',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.15)',
          }}
        >
          {/* Mock browser chrome */}
          <div style={{
            padding: '12px 16px',
            background: '#0d1220',
            borderBottom: '1px solid rgba(99,102,241,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f43f5e', display: 'block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b', display: 'block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#34d399', display: 'block' }} />
            <div style={{
              flex: 1, height: 28, background: '#131929', borderRadius: 6,
              display: 'flex', alignItems: 'center', padding: '0 12px',
              color: '#475569', fontSize: '0.75rem',
            }}>
              app.novasaas.io/dashboard
            </div>
          </div>
          {/* Dashboard mockup */}
          <div style={{ background: '#080c14', padding: 20 }} className="responsive-grid">
            {[
              { label: 'Monthly Revenue', value: '$48,291', icon: <BarChart3 size={18} color="#6366f1" />, change: '+12.4%', color: '#6366f1' },
              { label: 'Active Users',    value: '12,847',  icon: <Sparkles  size={18} color="#8b5cf6" />, change: '+8.1%',  color: '#8b5cf6' },
              { label: 'Uptime',          value: '99.98%',  icon: <Shield    size={18} color="#22d3ee" />, change: 'This month', color: '#22d3ee' },
            ].map(s => (
              <div key={s.label} className="stat-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>{s.label}</span>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: `${s.color}1a`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{s.icon}</div>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f1f5f9', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <span className="badge badge-emerald" style={{ fontSize: '0.6875rem' }}>{s.change}</span>
              </div>
            ))}
            {/* Chart bar mockup */}
            <div className="stat-card" style={{ gridColumn: '1/-1' }}>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: 16 }}>Revenue over time</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                {[35,55,40,70,65,85,60,90,75,100,88,95].map((h, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: `${h}%`,
                    background: `linear-gradient(to top, #6366f1, #8b5cf6)`,
                    borderRadius: '4px 4px 0 0',
                    opacity: 0.7 + i * 0.025,
                    transition: 'opacity 0.2s',
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
