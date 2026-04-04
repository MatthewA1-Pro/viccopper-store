'use client';
import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

const LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing',  href: '#pricing' },
    { label: 'Changelog', href: '#' },
    { label: 'Roadmap',   href: '#' },
  ],
  Company: [
    { label: 'About',   href: '#' },
    { label: 'Blog',    href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press',   href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy',  href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy',    href: '#' },
    { label: 'GDPR',             href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', paddingTop: 64, paddingBottom: 40, background: '#05070a' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={20} color="#fff" />
              </div>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9' }}>Nova<span className="text-gradient">SaaS</span></span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 220 }}>
              The all-in-one platform for ambitious teams building the next generation of products.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>{category}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(item => (
                  <li key={item.label}>
                    <a href={item.href} style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f1f5f9'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                    >{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider" style={{ marginBottom: 32 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} NovaSaaS, Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            <span className="badge badge-emerald" style={{ fontSize: '0.6875rem' }}>● All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
