'use client';
import { useState, useEffect } from 'react';
import { billingService, Plan } from '@/lib/services/billing.service';
import { useAuthStore } from '@/lib/auth-store';
import { Check, Zap, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import toast from 'react-hot-toast';

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await billingService.getPlans();
        setPlans(data);
      } finally {
        setLoading(false);
      }
    }
    loadPlans();
  }, []);

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      toast.error('Please login to subscribe');
      return;
    }

    setCheckoutLoading(priceId);
    try {
      const checkoutUrl = await billingService.createCheckoutSession(priceId);
      window.location.href = checkoutUrl;
    } catch (err: any) {
      toast.error(err.message || 'Failed to initiate checkout');
    } finally {
      setCheckoutLoading(null);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pricing-page" style={{ padding: '100px 24px', background: 'var(--bg-main)', minHeight: '100vh', position: 'relative' }}>
        <div className="orb orb-indigo" style={{ width: 600, height: 600, top: -200, left: -200 }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="badge badge-indigo" style={{ marginBottom: 16 }}>Pricing Plans</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#f1f5f9', marginBottom: 20 }}>
              Powerful features for <span className="text-gradient">every team</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.25rem', maxWidth: 640, margin: '0 auto' }}>
              Choose the perfect plan for your needs. Change or cancel anytime. All plans include 14-day free trial.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, alignItems: 'stretch' }}>
            {plans.map(plan => {
              const isUserOnThisPlan = user?.planId === plan.id;
              
              return (
                <div key={plan.id} className={`card ${plan.isPopular ? 'popular-card' : ''}`} style={{ 
                  padding: 40, position: 'relative', border: plan.isPopular ? '2px solid #6366f1' : '1px solid var(--border)',
                  display: 'flex', flexDirection: 'column', gap: 24, transition: 'all 0.3s'
                }}>
                  {plan.isPopular && (
                    <div style={{ 
                      position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
                      fontSize: '0.75rem', fontWeight: 800, padding: '4px 12px', borderRadius: 20, 
                      display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(99,102,241,0.4)'
                    }}>
                      <Sparkles size={12} /> MOST POPULAR
                    </div>
                  )}

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>{plan.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f1f5f9' }}>${plan.priceCents / 100}</span>
                      <span style={{ color: '#475569', fontSize: '1rem' }}>/{plan.interval}</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: 12 }}>{plan.description}</p>
                  </div>

                  <div style={{ height: 1, background: 'var(--border)' }} />

                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Features</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {plan.features.map(f => (
                        <li key={f} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '0.9375rem', color: '#94a3b8' }}>
                          <div style={{ 
                            width: 20, height: 20, borderRadius: '50%', background: 'rgba(99,102,241,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', flexShrink: 0
                          }}>
                            <Check size={12} />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    className={`btn ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`} 
                    disabled={isUserOnThisPlan || !!checkoutLoading}
                    onClick={() => handleSubscribe(plan.stripePriceId)}
                    style={{ width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 700 }}
                  >
                    {checkoutLoading === plan.stripePriceId ? <Loader2 size={20} className="animate-spin" /> : 
                     isUserOnThisPlan ? 'Current Plan' : 
                     `Get ${plan.name} `}
                    {!isUserOnThisPlan && !checkoutLoading && <ArrowRight size={18} style={{ marginLeft: 8 }} />}
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 64, textAlign: 'center', color: '#475569', fontSize: '0.875rem' }}>
            <p>Secure payments by Stripe. All transactions are encrypted.</p>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .popular-card:hover { transform: translateY(-8px); border-color: #8b5cf6 !important; box-shadow: 0 30px 60px -20px rgba(99,102,241,0.4); }
        .card:hover { border-color: rgba(99,102,241,0.2) !important; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
