import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import * as billingController from '../controllers/billing.controller';

const router = Router();

// Stripe webhook — no auth, raw body
router.post('/webhook', billingController.webhook);

// Protected billing routes
router.post('/checkout',     authenticate, billingController.checkout);
router.post('/portal',       authenticate, billingController.portal);
router.get('/subscription',  authenticate, billingController.getSubscription);

export default router;
