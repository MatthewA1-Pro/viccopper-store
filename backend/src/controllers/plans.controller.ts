import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';

export const getPlans = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { priceCents: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        stripePriceId: true,
        priceCents: true,
        currency: true,
        interval: true,
        features: true,
        isPopular: true,
      },
    });
    res.json({ plans });
  } catch (err) {
    next(err);
  }
};
