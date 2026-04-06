// billing.service.ts — Supabase-only version
// Stripe checkout / portal links go through Supabase Edge Functions.
// If you haven't set up Edge Functions yet, these will gracefully
// error-out at runtime only (they don't break the build).

export interface Plan {
  id: string;
  name: string;
  description?: string;
  priceCents: number;
  interval: string;
  features: string[];
  isPopular: boolean;
  stripePriceId: string;
}

export interface Subscription {
  status: string;
  plan: Plan;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// Static plans — replace with a Supabase DB query when ready
const DEFAULT_PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals & small teams',
    priceCents: 900,
    interval: 'month',
    features: ['5 projects', '10 GB storage', 'Basic analytics', 'Email support'],
    isPopular: false,
    stripePriceId: 'price_starter',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Everything you need to scale',
    priceCents: 2900,
    interval: 'month',
    features: ['Unlimited projects', '100 GB storage', 'Advanced analytics', 'Priority support', 'Custom integrations'],
    isPopular: true,
    stripePriceId: 'price_pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organisations',
    priceCents: 9900,
    interval: 'month',
    features: ['Unlimited everything', '1 TB storage', 'Dedicated support', 'SLA guarantee', 'Custom contracts'],
    isPopular: false,
    stripePriceId: 'price_enterprise',
  },
];

export const billingService = {
  async getPlans(): Promise<Plan[]> {
    // TODO: fetch from `plans` table in Supabase when set up
    return DEFAULT_PLANS;
  },

  async createCheckoutSession(priceId: string): Promise<string> {
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    if (!res.ok) throw new Error('Failed to create checkout session');
    const data = await res.json();
    return data.url;
  },

  async createPortalSession(): Promise<string> {
    const res = await fetch('/api/billing/portal', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to create portal session');
    const data = await res.json();
    return data.url;
  },

  async getSubscription(): Promise<Subscription | null> {
    // TODO: query `subscriptions` table in Supabase
    return null;
  },
};
