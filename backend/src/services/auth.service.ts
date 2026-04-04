import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../config/prisma';
import { env } from '../config/env';
import { AppError } from '../middleware/errorHandler';
import { z } from 'zod';

// ── Validators ────────────────────────────────────────────────────────────────
export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain a number'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ── Token Helpers ─────────────────────────────────────────────────────────────
const generateAccessToken = (userId: string, email: string, role: string) =>
  jwt.sign({ sub: userId, email, role }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY as any,
  });

const generateRefreshToken = () => uuidv4();

// ── Service Functions ─────────────────────────────────────────────────────────
export const authService = {
  async register(data: z.infer<typeof registerSchema>, ip?: string) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new AppError('Email already in use', 409);

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: 'USER_REGISTERED', ipAddress: ip },
    });

    const { accessToken, refreshToken } = await this.createSession(user.id, user.email, user.role, ip);
    return { user, accessToken, refreshToken };
  },

  async login(data: z.infer<typeof loginSchema>, ip?: string) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true, name: true, email: true, role: true, passwordHash: true },
    });

    if (!user || !user.passwordHash) throw new AppError('Invalid credentials', 401);

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) throw new AppError('Invalid credentials', 401);

    await prisma.auditLog.create({
      data: { userId: user.id, action: 'USER_LOGIN', ipAddress: ip },
    });

    const { accessToken, refreshToken } = await this.createSession(user.id, user.email, user.role, ip);
    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
  },

  async createSession(userId: string, email: string, role: string, ip?: string, userAgent?: string) {
    const refreshToken = generateRefreshToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
      data: { userId, refreshToken, expiresAt, ipAddress: ip, userAgent },
    });

    const accessToken = generateAccessToken(userId, email, role);
    return { accessToken, refreshToken };
  },

  async refresh(refreshToken: string) {
    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: { select: { id: true, email: true, role: true } } },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) await prisma.session.delete({ where: { id: session.id } });
      throw new AppError('Invalid or expired refresh token', 401);
    }

    // Rotate refresh token
    const newRefreshToken = generateRefreshToken();
    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const accessToken = generateAccessToken(session.user.id, session.user.email, session.user.role);
    return { accessToken, refreshToken: newRefreshToken };
  },

  async logout(refreshToken: string) {
    await prisma.session.deleteMany({ where: { refreshToken } });
  },

  async loginOAuth(userId: string, email: string, role: string, ip?: string) {
    await prisma.auditLog.create({
      data: { userId, action: 'USER_LOGIN_OAUTH', ipAddress: ip },
    });

    const { accessToken, refreshToken } = await this.createSession(userId, email, role, ip);
    return { accessToken, refreshToken };
  },

  async getMe(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        subscription: {
          include: { plan: true },
        },
      },
    });
  },
};
