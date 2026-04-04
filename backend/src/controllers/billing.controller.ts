import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { billingService } from '../services/billing.service';
import { prisma } from '../config/prisma';
import { AuthRequest } from '../middleware/authenticate';
import { AppError } from '../middleware/errorHandler';
import { env } from '../config/env';

const checkoutSchema = z.object({
  priceId: z.string().startsWith('price_'),
});

export const checkout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { priceId } = checkoutSchema.parse(req.body);
    const { id: userId, email } = req.user!;

    const successUrl = `${env.FRONTEND_URL}/dashboard?checkout=success`;
    const cancelUrl  = `${env.FRONTEND_URL}/pricing?checkout=canceled`;

    const session = await billingService.createCheckoutSession(
      userId, email, priceId, successUrl, cancelUrl
    );

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
};

export const portal = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const returnUrl = `${env.FRONTEND_URL}/dashboard/billing`;
    const session = await billingService.createPortalSession(req.user!.id, returnUrl);
    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
};

export const webhook = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers['stripe-signature'] as string;
    if (!signature) throw new AppError('Missing stripe-signature header', 400);

    await billingService.handleWebhook(req.body as Buffer, signature);
    res.json({ received: true });
  } catch (err) {
    next(err);
  }
};

export const getSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user!.id },
      include: { plan: true },
    });
    res.json({ subscription });
  } catch (err) {
    next(err);
  }
};
