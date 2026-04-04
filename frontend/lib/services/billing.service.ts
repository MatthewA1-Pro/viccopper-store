import { api } from '../api';

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

export const billingService = {
  async getPlans() {
    const res = await api.get<{ plans: Plan[] }>('/plans');
    return res.plans;
  },

  async createCheckoutSession(priceId: string, token: string) {
    const res = await api.post<{ url: string }>('/billing/checkout', { priceId }, token);
    return res.url;
  },

  async createPortalSession(token: string) {
    const res = await api.post<{ url: string }>('/billing/portal', {}, token);
    return res.url;
  },

  async getSubscription(token: string) {
    const res = await api.get<{ subscription: Subscription | null }>('/billing/subscription', token);
    return res.subscription;
  },
};
