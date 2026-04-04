import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

const LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company:  ['About', 'Blog', 'Careers', 'Press'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', paddingTop: 64, paddingBottom: 40 }}>
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
              <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>Nova<span className="text-gradient">SaaS</span></span>
            </div>
            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 220 }}>
              The all-in-one platform for ambitious teams building the next generation of products.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[
                { icon: <Github size={16} />,   href: '#' },
                { icon: <Twitter size={16} />,  href: '#' },
                { icon: <Linkedin size={16} />, href: '#' },
              ].map(({ icon, href }, i) => (
                <a key={i} href={href} style={{
                  width: 34, height: 34, borderRadius: 8, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  color: '#64748b', textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>{category}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                    >{item}</a>
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
