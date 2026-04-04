import Stripe from 'stripe';
import { env } from '../config/env';
import { prisma } from '../config/prisma';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const billingService = {
  async getOrCreateCustomer(userId: string, email: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError('User not found', 404);

    if (user.stripeCustomerId) return user.stripeCustomerId;

    const customer = await stripe.customers.create({ email, metadata: { userId } });

    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id },
    });

    return customer.id;
  },

  async createCheckoutSession(userId: string, email: string, priceId: string, successUrl: string, cancelUrl: string) {
    const customerId = await this.getOrCreateCustomer(userId, email);

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      subscription_data: {
        metadata: { userId },
        trial_period_days: 14,
      },
      allow_promotion_codes: true,
    });

    return session;
  },

  async createPortalSession(userId: string, returnUrl: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.stripeCustomerId) throw new AppError('No billing account found', 404);

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: returnUrl,
    });

    return session;
  },

  async handleWebhook(payload: Buffer, signature: string) {
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      throw new AppError(`Webhook signature verification failed`, 400);
    }

    logger.info(`Stripe webhook: ${event.type}`);

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await this.upsertSubscription(sub);
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: 'CANCELED', canceledAt: new Date() },
        });
        break;
      }
    }
  },

  async upsertSubscription(sub: Stripe.Subscription) {
    const customer = await stripe.customers.retrieve(sub.customer as string);
    if (customer.deleted) return;

    const userId = (customer as Stripe.Customer).metadata?.userId;
    if (!userId) return;

    const priceId = sub.items.data[0]?.price.id;
    const plan = await prisma.plan.findUnique({ where: { stripePriceId: priceId } });
    if (!plan) {
      logger.warn(`No plan found for priceId: ${priceId}`);
      return;
    }

    const statusMap: Record<string, string> = {
      active: 'ACTIVE',
      canceled: 'CANCELED',
      incomplete: 'INCOMPLETE',
      past_due: 'PAST_DUE',
      trialing: 'TRIALING',
      unpaid: 'UNPAID',
    };

    await prisma.subscription.upsert({
      where: { stripeSubscriptionId: sub.id },
      create: {
        userId,
        planId: plan.id,
        stripeSubscriptionId: sub.id,
        status: (statusMap[sub.status] ?? 'INCOMPLETE') as any,
        currentPeriodStart: new Date(sub.current_period_start * 1000),
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        cancelAtPeriodEnd: sub.cancel_at_period_end,
        trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      },
      update: {
        planId: plan.id,
        status: (statusMap[sub.status] ?? 'INCOMPLETE') as any,
        currentPeriodStart: new Date(sub.current_period_start * 1000),
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        cancelAtPeriodEnd: sub.cancel_at_period_end,
        trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      },
    });
  },
};
