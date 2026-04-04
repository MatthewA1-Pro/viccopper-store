import { Router } from 'express';
import passport from 'passport';
import { authRateLimiter } from '../middleware/rateLimiter';
import { authenticate } from '../middleware/authenticate';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/register', authRateLimiter, authController.register);
router.post('/login',    authRateLimiter, authController.login);
router.post('/logout',   authController.logout);
router.post('/refresh',  authController.refresh);
router.get('/me',        authenticate, authController.me);
router.get('/google',    passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), authController.googleCallback);
router.patch('/profile', authenticate, authController.updateProfile);
router.patch('/change-password', authenticate, authController.changePassword);

export default router;
