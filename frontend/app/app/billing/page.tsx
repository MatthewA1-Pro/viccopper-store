'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { useAuthStore } from '@/lib/auth-store';
import { billingService, Plan, Subscription } from '@/lib/services/billing.service';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CreditCard, ExternalLink, Zap, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BillingPage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState<string | null>(null);

  const { data: subscription, mutate: mutateSub } = useSWR<Subscription | null>(
    user ? 'subscription' : null,
    () => billingService.getSubscription()
  );

  const { data: plans } = useSWR<Plan[]>(
    'plans',
    () => billingService.getPlans()
  );

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const url = await billingService.createCheckoutSession(priceId);
      window.location.href = url;
    } catch (err: any) {
      toast.error(err.message || 'Failed to start checkout');
    } finally {
      setLoading(null);
    }
  };

  const handlePortal = async () => {
    setLoading('portal');
    try {
      const url = await billingService.createPortalSession();
      window.location.href = url;
    } catch (err: any) {
      toast.error(err.message || 'Failed to open billing portal');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 900 }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 6 }}>Billing</h1>
        <p style={{ color: '#64748b' }}>Manage your subscription and payment methods.</p>
      </div>

      {/* Current subscription */}
      {subscription ? (
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(99,102,241,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CreditCard size={22} color="#6366f1" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9' }}>{subscription.plan.name} Plan</h2>
                <span className={`badge ${subscription.status === 'ACTIVE' ? 'badge-emerald' : subscription.status === 'TRIALING' ? 'badge-indigo' : 'badge-rose'}`}>
                  {subscription.status}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                {subscription.cancelAtPeriodEnd
                  ? `Cancels on ${formatDate(subscription.currentPeriodEnd)}`
                  : `Renews on ${formatDate(subscription.currentPeriodEnd)}`}
              </p>
            </div>
          </div>
          <button onClick={handlePortal} disabled={!!loading} className="btn btn-secondary">
            {loading === 'portal' ? <RefreshCw size={16} className="spinning" /> : <><ExternalLink size={16} /> Manage Subscription</>}
          </button>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CreditCard size={24} color="#6366f1" />
          </div>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>No active subscription</h2>
          <p style={{ color: '#64748b', marginBottom: 24, fontSize: '0.9rem' }}>Choose a plan below to unlock more features.</p>
        </div>
      )}

      {/* Plans */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>Available Plans</h2>
        <div className="responsive-grid" style={{ gap: 20 }}>
          {plans?.map(plan => {
            const isCurrent = subscription?.plan?.id === plan.id;
            return (
              <div key={plan.id} className={`pricing-card${plan.isPopular ? ' popular' : ''}`}>
                {plan.isPopular && (
                  <div style={{
                    position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '0 0 10px 10px', padding: '4px 20px',
                    fontSize: '0.75rem', fontWeight: 700, color: '#fff',
                    display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                  }}>
                    <Zap size={12} /> MOST POPULAR
                  </div>
                )}

                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 4 }}>{plan.name}</h3>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: 20 }}>{plan.description}</p>

                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: '#f1f5f9' }}>
                    {formatCurrency(plan.priceCents)}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>/{plan.interval}</span>
                </div>

                <button
                  onClick={() => !isCurrent && handleCheckout(plan.stripePriceId)}
                  disabled={loading === plan.stripePriceId || isCurrent}
                  className={`btn ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', marginBottom: 20, opacity: isCurrent ? 0.6 : 1 }}
                >
                  {loading === plan.stripePriceId ? 'Redirecting…' : isCurrent ? '✓ Current Plan' : 'Select Plan'}
                </button>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={14} color="#a5b4fc" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
