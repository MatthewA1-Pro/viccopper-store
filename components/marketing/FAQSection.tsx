'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'Is there a free trial?', a: 'Yes! Every plan comes with a 14-day free trial. No credit card required to start. You can upgrade, downgrade, or cancel at any time.' },
  { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately and are prorated automatically.' },
  { q: 'How does billing work?', a: 'We use Stripe for secure payment processing. You can pay monthly or annually (save 25%). Invoices are generated automatically and sent to your email.' },
  { q: 'Is my data secure?', a: 'Security is our top priority. We are SOC 2 Type II certified, use AES-256 encryption at rest, TLS 1.3 in transit, and maintain strict access controls.' },
  { q: 'Do you offer an API?', a: 'Yes, we provide a comprehensive REST API and GraphQL API. Full documentation, SDKs for 10+ languages, and interactive playground are available in your dashboard.' },
  { q: 'What kind of support do you offer?', a: 'All plans include email support. Pro plans get priority support with 4-hour response time. Enterprise plans include a dedicated account manager and 24/7 phone support.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="glass-hover"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'all 0.2s ease',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', textAlign: 'left', padding: '20px 24px',
          background: 'var(--bg-surface)',
          border: 'none', cursor: 'pointer', color: '#f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          fontWeight: 600, fontSize: '1rem', fontFamily: 'inherit',
        }}
      >
        {q}
        <ChevronDown
          size={18}
          color="#64748b"
          style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>
      {open && (
        <div style={{
          padding: '0 24px 20px',
          background: 'var(--bg-surface)',
          color: '#64748b',
          fontSize: '0.9375rem',
          lineHeight: 1.7,
          borderTop: '1px solid var(--border)',
        }}>
          <p style={{ paddingTop: 16 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge badge-indigo" style={{ marginBottom: 16 }}>FAQ</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Common <span className="text-gradient">questions</span>
          </h2>
        </div>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
        </div>
      </div>
    </section>
  );
}
