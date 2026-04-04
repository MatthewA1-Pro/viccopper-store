'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Features' },
  { href: '/', label: 'Pricing' },
  { href: '/', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 24px',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(8,12,20,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,102,241,0.1)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9' }}>Nova<span className="text-gradient">SaaS</span></span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{
              padding: '8px 16px', color: '#94a3b8', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9375rem', borderRadius: 8,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >{l.label}</a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/login" className="btn btn-ghost btn-sm">Sign in</Link>
          <Link href="/register" className="btn btn-primary btn-sm xs-hide">Get Started <span className="desktop-only">Free</span></Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(o => !o)}
            style={{ display: 'none', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            className="mobile-menu-btn"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass" style={{
          padding: 20, borderRadius: 16, margin: '0 0 12px',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ padding: '10px 16px', color: '#94a3b8', textDecoration: 'none', borderRadius: 8 }}
            >{l.label}</a>
          ))}
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          <Link href="/login"    className="btn btn-ghost" onClick={() => setOpen(false)}>Sign in</Link>
          <Link href="/register" className="btn btn-primary" onClick={() => setOpen(false)}>Get Started Free</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
