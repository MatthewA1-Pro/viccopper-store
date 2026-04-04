import { Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { AuthRequest } from '../middleware/authenticate';

export const getStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    const [user, subscription, activityCount] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { createdAt: true, name: true, email: true, avatarUrl: true },
      }),
      prisma.subscription.findUnique({
        where: { userId },
        include: { plan: true },
      }),
      prisma.auditLog.count({ where: { userId } }),
    ]);

    const memberSince = user?.createdAt;
    const daysActive = memberSince
      ? Math.floor((Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    res.json({
      stats: {
        plan: subscription?.plan?.name ?? 'Free',
        planStatus: subscription?.status ?? 'NONE',
        daysActive,
        totalActions: activityCount,
        periodEnd: subscription?.currentPeriodEnd ?? null,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getActivity = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const page  = parseInt(req.query.page  as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: { id: true, action: true, metadata: true, ipAddress: true, createdAt: true },
      }),
      prisma.auditLog.count({ where: { userId } }),
    ]);

    res.json({
      logs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};
