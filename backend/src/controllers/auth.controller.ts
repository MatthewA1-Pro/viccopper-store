import { Request, Response, NextFunction } from 'express';
import { authService, registerSchema, loginSchema } from '../services/auth.service';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/authenticate';
import { env } from '../config/env';

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const ip = req.ip;
    const { user, accessToken, refreshToken } = await authService.register(data, ip);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.status(201).json({ user, accessToken });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const ip = req.ip;
    const { user, accessToken, refreshToken } = await authService.login(data, ip);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.json({ user, accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) await authService.logout(refreshToken);

    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new AppError('No refresh token', 401);

    const tokens = await authService.refresh(refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, COOKIE_OPTS);
    res.json({ accessToken: tokens.accessToken });
  } catch (err) {
    next(err);
  }
};

export const me = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getMe(req.user!.id);
    if (!user) throw new AppError('User not found', 404);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const googleCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;
    if (!user) throw new AppError('Authentication failed', 401);

    const ip = req.ip;
    const { accessToken, refreshToken } = await authService.loginOAuth(user.id, user.email, user.role, ip);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    
    // Redirect to frontend with access token in URL (temporary, for client to store)
    // Or just redirect to dashboard and let client call /me
    res.redirect(`${env.FRONTEND_URL}/auth/callback?token=${accessToken}`);
  } catch (err) {
    next(err);
  }
};
