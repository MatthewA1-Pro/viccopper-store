'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, Zap } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const PLANS = [
  {
    name: 'Starter',
    monthly: 900,
    annual: 700,
    stripePriceId: 'price_starter',
    description: 'Perfect for indie makers and small projects.',
    features: ['Up to 3 team members', '10K API calls/month', '5 workflows', 'Basic analytics', 'Email support'],
    isPopular: false,
  },
  {
    name: 'Pro',
    monthly: 2900,
    annual: 2200,
    stripePriceId: 'price_pro',
    description: 'For growing teams that need more power.',
    features: ['Up to 25 team members', '500K API calls/month', 'Unlimited workflows', 'Advanced analytics', 'Priority support', 'Custom integrations', 'SSO / SAML'],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    monthly: 9900,
    annual: 7900,
    stripePriceId: 'price_enterprise',
    description: 'Enterprise-grade, with white-glove service.',
    features: ['Unlimited members', 'Unlimited API calls', 'Unlimited workflows', 'AI-powered analytics', 'Dedicated support', 'Custom contracts', 'On-prem deployment', 'SLA guarantees'],
    isPopular: false,
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge badge-indigo" style={{ marginBottom: 16 }}>Pricing</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Simple, transparent <span className="text-gradient">pricing</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 480, margin: '0 auto 32px', fontSize: '1.0625rem' }}>
            Start free. Scale as you grow. No hidden fees, ever.
          </p>

          {/* Toggle */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 999, padding: '6px 8px',
          }}>
            <button
              onClick={() => setAnnual(false)}
              style={{
                padding: '6px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.875rem',
                background: !annual ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: !annual ? '#fff' : '#64748b',
                transition: 'all 0.2s',
              }}
            >Monthly</button>
            <button
              onClick={() => setAnnual(true)}
              style={{
                padding: '6px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.875rem',
                background: annual ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: annual ? '#fff' : '#64748b',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              Annual
              <span style={{
                fontSize: '0.6875rem', background: '#34d39920', color: '#6ee7b7',
                border: '1px solid #34d39940', borderRadius: 999, padding: '2px 8px',
              }}>–25%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="responsive-grid" style={{ gap: 24 }}>
          {PLANS.map(plan => {
            const price = annual ? plan.annual : plan.monthly;
            return (
              <div key={plan.name} className={`pricing-card${plan.isPopular ? ' popular' : ''}`} style={{ padding: '36px 28px' }}>
                {plan.isPopular && (
                  <div style={{
                    position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '0 0 10px 10px', padding: '4px 20px',
                    fontSize: '0.75rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em',
                    display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                  }}>
                    <Zap size={12} /> MOST POPULAR
                  </div>
                )}

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 6 }}>{plan.name}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: 24 }}>{plan.description}</p>

                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontSize: '2.75rem', fontWeight: 900, color: '#f1f5f9' }}>
                    {formatCurrency(price)}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>/month</span>
                  {annual && <div style={{ fontSize: '0.8125rem', color: '#6ee7b7', marginTop: 4 }}>Billed annually</div>}
                </div>

                <Link
                  href="/register"
                  className={`btn btn-lg ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', marginBottom: 28 }}
                >
                  Get Started
                </Link>

                <div className="divider" style={{ marginBottom: 24 }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                        background: 'rgba(99,102,241,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={12} color="#a5b4fc" />
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Enterprise CTA */}
        <div className="glass responsive-card-padding" style={{
          marginTop: 48, borderRadius: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
        }}>
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Need a custom plan?</h3>
            <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Talk to us about volume discounts, dedicated infrastructure, and white-labeling.</p>
          </div>
          <a href="mailto:sales@novasaas.io" className="btn btn-secondary" style={{ width: 'fit-content' }}>
            Contact Sales →
          </a>
        </div>
      </div>
    </section>
  );
}
